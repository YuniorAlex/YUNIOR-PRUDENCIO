import express from 'express';
import { verifytoken } from '../auth/jwt.verify';
import { AppDataSource } from '../../database';
import { Pedidoscab } from './entities/pedidoscab';
import { Pedidosdet } from './entities/pedidosdet';
import { authRole } from '../auth/middelware';
const router = express.Router();

router.post('/create', verifytoken, authRole(['1','2']), async (req: any, res: any) => {
    try {
        const { fechaPedido, listaProductos } = req.body;
        const pedidoCabRepository = AppDataSource.getRepository(Pedidoscab);
        const pedidoDetRepository = AppDataSource.getRepository(Pedidosdet);

        const pedidoCab = new Pedidoscab();
        pedidoCab.fechaPedido = fechaPedido,
        pedidoCab.codVendedor = req.user.codigo;
        pedidoCab.codEstado = '1';

        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            var registro = await pedidoCabRepository.save(pedidoCab);

            for (let i = 0; i < listaProductos.length; i++) {
                const data = listaProductos[i];
                const pedidoDet = new Pedidosdet();
                pedidoDet.codProducto = data.codProducto;
                pedidoDet.numPedido = registro;

                await pedidoDetRepository.save(pedidoDet);
            }

            return res.status(200).json({ message: 'create_success', data: registro, status: true });
        } catch (error: any) {
            await queryRunner.rollbackTransaction();
            return res.status(400).json({ message: error.message, data: {}, status: false });
        } finally {
            await queryRunner.release();
        }

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message, status: false });
        }
    }
});

router.put('/actualizarEstado/:estado/:numPedido', verifytoken, authRole(['1','3','4']), async (req: any, res: any) => {
    try {
        const { estado, numPedido } = req.params;
        const fecha = req.body.fecha;
        const pedidoCabRepository = AppDataSource.getRepository(Pedidoscab);

        const updateRegistro = await pedidoCabRepository.findOneBy({ numPedido });

        if (fecha) {
            if (updateRegistro) {
                if (estado > updateRegistro?.codEstado) {
                    updateRegistro.codEstado = estado;
                    switch (estado) {
                        case '2':
                            updateRegistro.fechaRecepcion = fecha;
                            await pedidoCabRepository.save(updateRegistro)
                            break;
                        case '3':
                            updateRegistro.fechaDespacho = fecha;
                            await pedidoCabRepository.save(updateRegistro)
                            break;
                        case '4':
                            updateRegistro.fechaEntrega = fecha;
                            updateRegistro.codRepartidor = req.user.codigo
                            await pedidoCabRepository.save(updateRegistro)
                            break;
                    }
                    return res.status(200).json({ message: 'update_success', data: updateRegistro, status: true });
                } else {
                    return res.status(400).json({ message: 'estado_incorrecto', data: updateRegistro, status: false });
                }
            } else {
                return res.status(400).json({ message: 'no_existe_pedido', data: {}, status: true });
            }
        }else{
            return res.status(400).json({ message: 'formato_fecha_incorrecto', data: {}, status: true });
        }

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message, status: false });
        }
    }
});

router.get('lista', verifytoken, async(req, res) => {
    try {
        
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message, status: false });
        }
    }
});

export default router;
import express from 'express';
import { verifytoken } from '../auth/jwt.verify';
import { AppDataSource } from '../../database';
import { Pedidos } from './entities/pedidos';
import { authRole } from '../auth/middelware';
import { Productos } from '../productos/entities/productos';
const router = express.Router();

const pedidoRepository = AppDataSource.getRepository(Pedidos);
const productosRepository = AppDataSource.getRepository(Productos);

router.post('/create', verifytoken, authRole(['1','2']), async (req: any, res: any) => {
    try {
        const { fechaPedido, listaProductos } = req.body;

        const pedido = new Pedidos();
        pedido.fechaPedido = fechaPedido,
        pedido.codVendedor = req.user.codigo;
        pedido.codEstado = '1';

        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            var listaProducto = [];
            for (let i = 0; i < listaProductos.length; i++) {
                const element = listaProductos[i];

                var productos = await productosRepository.findBy({sku: element.codProducto})
                if (productos.length == 0) {
                    return res.status(400).json({ message: 'producto_no_existe', data: {codProducto: element.codProducto}, status: true });
                }
                listaProducto.push(productos[0]);
            }
            pedido.listaProductos = listaProducto;

            var registro = await pedidoRepository.save(pedido);

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

        const updateRegistro = await pedidoRepository.findOneBy({ numPedido });

        if (fecha) {
            if (updateRegistro) {
                if (estado > updateRegistro?.codEstado) {
                    updateRegistro.codEstado = estado;
                    switch (estado) {
                        case '2':
                            updateRegistro.fechaRecepcion = fecha;
                            await pedidoRepository.save(updateRegistro)
                            break;
                        case '3':
                            updateRegistro.fechaDespacho = fecha;
                            await pedidoRepository.save(updateRegistro)
                            break;
                        case '4':
                            updateRegistro.fechaEntrega = fecha;
                            updateRegistro.codRepartidor = req.user.codigo
                            await pedidoRepository.save(updateRegistro)
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

router.get('/lista', verifytoken, async(req, res) => {
    try {
        const lista =  await pedidoRepository.find({relations: ['listaProductos']});
        return res.status(200).json(lista);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message, status: false });
        }
    }
});

export default router;
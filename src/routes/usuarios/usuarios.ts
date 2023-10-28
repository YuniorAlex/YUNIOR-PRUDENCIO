import express from 'express';
import { Usuarios } from './entities/usuarios';
import { CreateUsuario } from './interfaces/usuario';
import { verifytoken } from '../auth/jwt.verify';
import { AppDataSource } from '../../database';
const router = express.Router();

const usuarioRepository = AppDataSource.getRepository(Usuarios);

router.get('/lista', verifytoken, async (req: any, res) => {
    try {
        const lista = await usuarioRepository.find({relations: ['rol']});
        res.status(200).send(lista);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message, status: false});
        }
    }
});

router.post('/create', async (req, res) => {
    try {
        const data: CreateUsuario = req.body;

        const usuario = new Usuarios();
        usuario.codigo = data.codigo;
        usuario.nombre = data.nombre;
        usuario.email = data.email;
        usuario.telefono = data.telefono;
        usuario.puesto = data.puesto;
        usuario.codRol = data.codRol;
        
        await usuarioRepository.save(usuario);

        return res.status(200).json({message: 'create_success', data: usuario, status: true});
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message, status: false});
        }
    }
});

router.put('/update', async (req, res) => {
    res.send('asdsd');
});

router.delete('/delete', async (req, res) => {
    res.send('asdsd');
});

export default router;
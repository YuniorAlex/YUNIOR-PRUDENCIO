import express from 'express';
import { Usuarios } from './entities/usuarios';
import { CreateUsuario } from './interfaces/usuario';
const router = express.Router();

router.get('/list', async (req, res) => {
    res.send('asdsd');
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
        
        await usuario.save();

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
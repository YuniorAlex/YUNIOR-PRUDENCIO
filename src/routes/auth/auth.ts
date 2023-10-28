import express from 'express';
import jwt from 'jsonwebtoken';
import { Usuarios } from '../usuarios/entities/usuarios';
import { AppDataSource } from '../../database';
const router = express.Router();

router.post('/login', async (req, res) => {
    const {codigo, nombre} = req.body;
    const usuarioRepository = AppDataSource.getRepository(Usuarios);

    const isUsuario = await usuarioRepository.findOneBy({codigo, nombre});
    if (isUsuario) {
        const user = {
            codigo, 
            nombre,
            codRol: isUsuario.codRol
        };
    
        jwt.sign({user}, 'SECRETKEY@2020', {expiresIn: 60 * 60 * 24}, (err: any, token: any) => {
            res.json({message: 'generete_token', token, status: true});
        });
    } else {
        res.json({message: 'incorrect_user', status: false});
    }
});

export default router;
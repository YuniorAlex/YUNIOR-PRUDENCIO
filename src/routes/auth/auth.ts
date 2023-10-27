import express from 'express';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.post('/login', async (req, res) => {
    const user = {
        codigo: '01',
        nombre: 'Yunior'
    };
    
    jwt.sign({user}, 'secretkey', (err: any, token: any) => {
        res.json({
            token
        });
    });
});

export default router;
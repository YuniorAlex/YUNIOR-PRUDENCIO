import "reflect-metadata"
import express from 'express';
import {AppDataSource} from './database';

import authRouter from './routes/auth/auth';
import usuarioRouter from './routes/usuarios/usuarios';
import pedidoRouter from './routes/pedidos/pedidos';

const app = express();

AppDataSource.initialize();

app.set('port', 5100)

app.use(express.json());
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/usuarios', usuarioRouter);
app.use('/api/v1/pedidos', pedidoRouter);

app.listen(app.get('port'), () => {
    console.log('Server is in port', app.get('port'));
})
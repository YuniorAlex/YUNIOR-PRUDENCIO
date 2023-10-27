import { DataSource } from "typeorm";
import { Usuarios } from "./routes/usuarios/entities/usuarios";
import { Roles } from "./routes/roles/entities/roles";
import { Productos } from "./routes/productos/entities/productos";
import { Pedidoscab } from "./routes/pedidos/entities/pedidoscab";
import { Pedidosdet } from "./routes/pedidos/entities/pedidosdet";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: '12345',
    port: 5432,
    database: 'db_boutique',
    entities: [Usuarios, Roles, Productos, Pedidoscab, Pedidosdet],
    logging: true,
    synchronize: true
})
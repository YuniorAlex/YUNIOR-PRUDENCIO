# NODEJS API REST EXPRESS CON TYPEORM POSTGRESQL

<p>Este Poryecto a sido realizado con las siguientes herramientas.</p>

- NodeJs
- Express
- JsonWebToken
- Typeorm
- PostgreSQL

### INSTALACIÓN
- Clonar el proyecto de github.
  ```
  git clone https://github.com/YuniorAlex/YUNIOR-PRUDENCIO.git
- Ejecutar el siguiente comando en el terminal del proyecto.
   ```
  npm install
- Instalar la base de datos **PostgreSQL**.
- Crear la base de datos **db_boutique**.
  ```
  CREATE DATABASE db_boutique
- Modificar la conexion a la base de datos si fuera necesario, archivo "database.ts".
   ```
  export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: '12345',
    port: 5432,
    database: 'db_boutique',
    entities: [Usuarios, Roles, Productos, Pedidoscab, Pedidosdet],
    logging: false,
    synchronize: true
  })
   
### CREACION DE DATOS PARA LAS PRUEBAS DE LA API REST
- Creacion de los roles y usuarios en la base de datos.
  ```
  INSERT INTO roles(codigo, nombre) VALUES ('1', 'Encargado');
  INSERT INTO roles(codigo, nombre) VALUES ('2', 'Vendedor');
  INSERT INTO roles(codigo, nombre) VALUES ('3', 'Delivery');
  INSERT INTO roles(codigo, nombre) VALUES ('4', 'Repartidor');

  INSERT INTO usuarios(codigo, nombre, email, telefono, puesto, "codRol") 
  VALUES ('77243621', 'YUNIOR', 'email01@hotmail.com', '942156478', 'Admin', '1');
  INSERT INTO usuarios(codigo, nombre, email, telefono, puesto, "codRol") 
  VALUES ('77242621', 'MARIA', 'email02@hotmail.com', '942154478', 'Vendedor', '2');
  INSERT INTO usuarios(codigo, nombre, email, telefono, puesto, "codRol") 
  VALUES ('77233621', 'LUIS', 'email03@hotmail.com', '942356478', 'Delibery', '3');
  INSERT INTO usuarios(codigo, nombre, email, telefono, puesto, "codRol") 
  VALUES ('77256621', 'PEDRO', 'email04@hotmail.com', '942146478', 'Repartidor', '4');
- Creacion de productos de prueba.
  ```
  INSERT INTO productos(sku, nombre, tipo, etiqueta, precio, undmedida)
  VALUES ('15235646', 'VESTIDO', '', '', 75, 'UND');
  INSERT INTO productos(sku, nombre, tipo, etiqueta, precio, undmedida)
  VALUES ('15235646', 'POLO', '', '', 55, 'UND');
  INSERT INTO productos(sku, nombre, tipo, etiqueta, precio, undmedida)
  VALUES ('15685646', 'PANTALON', '', '', 120, 'UND');
  INSERT INTO productos(sku, nombre, tipo, etiqueta, precio, undmedida)
  VALUES ('13435646', 'CAMISA', '', '', 58, 'UND');
  INSERT INTO productos(sku, nombre, tipo, etiqueta, precio, undmedida)
  VALUES ('15985646', 'CARTERA', '', '', 85, 'UND');
  INSERT INTO productos(sku, nombre, tipo, etiqueta, precio, undmedida)
  VALUES ('15675646', 'CASACA', '', '', 150, 'UND');
  INSERT INTO productos(sku, nombre, tipo, etiqueta, precio, undmedida)
  VALUES ('12456646', 'ZAPATILLAS', '', '', 250, 'UND');

### ENDPOINT'S DEL PROYECTO: ESTRUCTURA ENVIADA Y RESPUESTA
#### Para el login y autenticacion
  ```
  POST http://localhost:5100/api/v1/auth/login
  ```
  - Dato tipo Json enviado por el **Body**
  ```
  {
      "codigo": "77243621",
      "nombre": "YUNIOR"
  }
  ```
  - Respuestas Recibidas
  ```
  200: {
    "message": "generete_token",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImNOTcsImV4cCI6MTY5ODU5NjA5N30.7z9gqo3mw33PXvXL3kokktbiVYTZFLpyWrt9ijyO2Rs",
    "status": true
  }
  400: {
    "message": "incorrect_user",
    "status": false
  }
  ```
#### Para la creacion de pedidos
  ```
  POST http://localhost:5100/api/v1/pedidos/create
  ```
  - Dato tipo Json enviado por el **Body**
  ```
  {
      "codigo": "77243621",
      "nombre": "YUNIOR"
  }
  ```
  - Respuestas Recibidas
  ```
  200: {
    "message": "generete_token",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImNOTcsImV4cCI6MTY5ODU5NjA5N30.7z9gqo3mw33PXvXL3kokktbiVYTZFLpyWrt9ijyO2Rs",
    "status": true
  }
  400: {
    "message": "incorrect_user",
    "status": false
  }
  ```

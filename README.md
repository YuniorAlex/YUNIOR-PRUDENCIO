# NODEJS API REST EXPRESS CON TYPEORM POSTGRESQL

<p>El proyecto te permite iniciar sesion mendiante una validacion de token el cual permitira crear pedidos y actualizar los estados de los pedidos segun los roles que tenga el usuario logeado.</p>

<p>Este Poryecto ha sido realizado con las siguientes herramientas.</p>

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
  VALUES ('15235446', 'POLO', '', '', 55, 'UND');
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

### COMANDO PARA LA EJECUCION DEL PROYECTO Y CREACION DEL BUILD DE PRODUCCION
- Comando para ejecutar el poyecto
  ```
  npm run dev
- Comando para generar el build de produccion
  ```
  npm run tsc

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
  - Dato enviado por el **Header**
  ```
  'Authorization' : Bearer token
  ```
  - Dato tipo Json enviado por el **Body**, Formato Fecha: "YYYY-mm-dd"
  ```
  {
   "fechaPedido": "2023-10-28",
   "listaProductos":[
    {
      "codProducto": "15235646"
    },
    {
      "codProducto": "15235446"
    }
   ]
  }
  ```
  - Respuestas Recibidas
  ```
  200:  {
    "message": "create_success",
    "data": {
        "fechaPedido": "2023-10-28",
        "codVendedor": "77243621",
        "codEstado": "1",
        "listaProductos": [
            {
                "sku": "15235646",
                "nombre": "VESTIDO",
                "tipo": "",
                "etiqueta": "",
                "precio": 75,
                "undmedida": "UND"
            },
            {
                "sku": "12456646",
                "nombre": "ZAPATILLAS",
                "tipo": "",
                "etiqueta": "",
                "precio": 250,
                "undmedida": "UND"
            }
        ],
        "fechaRecepcion": null,
        "fechaDespacho": null,
        "fechaEntrega": null,
        "codRepartidor": null,
        "numPedido": 10
    },
    "status": true
  }

  - Respuesta recibida si la fecha del pedido esta vacia
  400: {
    "message": "la sintaxis de entrada no es válida para tipo timestamp: «0NaN-NaN-NaNTNaN:NaN:NaN.NaN+NaN:NaN»",
    "data": {},
    "status": false
  }

  - Respuesta recibida cuando el producto del pedido no existe.
  400: {
    "message": "producto_no_existe",
    "data": {
        "codProducto": "12436646"
    },
    "status": true
  }

  - Respuesta recibida si usuario no tiene el permiso adecuado para operacion
  401: {
    "message": "permiso_denegado",
    "status": false
  }
  ```
#### Para actualizar el estado del pedido
```
  PUT http://localhost:5100/api/v1/pedidos/actualizarEstado/:estado/:numPedido
  ```
  - Dato enviado por el **Header**
  ```
  'Authorization' : Bearer token
  ```
  - Datos enviados por el **Path Variables**
  ```
  estado:
    - 1 : Por atender
    - 2 : En proceso
    - 3 : En delivery
    - 4 : Recibido

  numPedido: El dato es recibido al crear el pedido del endpoint anterior.
  ```
  - Dato tipo Json enviado por el **Body**, Formato Fecha: "YYYY-mm-dd"
  ```
  {
    "fecha": "2023-10-28"
  }
  ```
  - Respuestas Recibidas
  ```
  200: {
    "message": "create_success",
    "data": {
        "fechaPedido": "2023-10-28",
        "codVendedor": "77243621",
        "codEstado": "1",
        "fechaRecepcion": null,
        "fechaDespacho": null,
        "fechaEntrega": null,
        "codRepartidor": null,
        "numPedido": 1
    },
    "status": true
  }

  - Respuesta recibida si el estado enviado es menor al estado actual del pedido
  400: {
    "message": "estado_incorrecto",
    "data": {
        "numPedido": 1,
        "fechaPedido": "2023-10-27T05:00:00.000Z",
        "fechaRecepcion": "2023-10-28T05:00:00.000Z",
        "fechaDespacho": "2023-10-29T05:00:00.000Z",
        "fechaEntrega": "2023-10-30T05:00:00.000Z",
        "codVendedor": "77243621",
        "codRepartidor": "77256621",
        "codEstado": "4"
    },
    "status": false
  }

  - Respuesta recibida si el numero de pedido enviado no existe
  400: {
    "message": "no_existe_pedido",
    "data": {},
    "status": true
  }

  - Respuesta recibida si el formato de la fecha es incorrecta
  400: {
    "message": "formato_fecha_incorrecto",
    "data": {},
    "status": true
  }

  - Respuesta recibida si usuario no tiene el permiso adecuado para operacion
  401: {
    "message": "permiso_denegado",
    "status": false
  }
  ```
#### Para listar los pedidos
```
  GET http://localhost:5100/api/v1/pedidos/lista
  ```
  - Dato enviado por el **Header**
  ```
  'Authorization' : Bearer token
  ```
  - Respuestas Recibidas
  ```
  200: [
    {
        "numPedido": 1,
        "fechaPedido": "2023-10-28T05:00:00.000Z",
        "fechaRecepcion": "2023-10-28T17:01:00.000Z",
        "fechaDespacho": null,
        "fechaEntrega": null,
        "codVendedor": "77243621",
        "codRepartidor": null,
        "codEstado": "2",
        "listaProductos": [
            {
                "sku": "15235646",
                "nombre": "VESTIDO",
                "tipo": "",
                "etiqueta": "",
                "precio": 75,
                "undmedida": "UND"
            },
            {
                "sku": "15235446",
                "nombre": "POLO",
                "tipo": "",
                "etiqueta": "",
                "precio": 55,
                "undmedida": "UND"
            }
        ]
    },
    {
        "numPedido": 2,
        "fechaPedido": "2023-10-28T05:00:00.000Z",
        "fechaRecepcion": null,
        "fechaDespacho": null,
        "fechaEntrega": null,
        "codVendedor": "77243621",
        "codRepartidor": null,
        "codEstado": "1",
        "listaProductos": [
            {
                "sku": "15235646",
                "nombre": "VESTIDO",
                "tipo": "",
                "etiqueta": "",
                "precio": 75,
                "undmedida": "UND"
            },
            {
                "sku": "15235446",
                "nombre": "POLO",
                "tipo": "",
                "etiqueta": "",
                "precio": 55,
                "undmedida": "UND"
            }
        ]
    }
]
  ```

#### Para listar los usuarios
```
  GET http://localhost:5100/api/v1/usuarios/lista
  ```
  - Dato enviado por el **Header**
  ```
  'Authorization' : Bearer token
  ```
  - Respuestas Recibidas
  ```
  200: [
    {
        "codigo": "77243621",
        "nombre": "YUNIOR",
        "email": "email01@hotmail.com",
        "telefono": "942156478",
        "puesto": "Admin",
        "codRol": "1",
        "rol": {
            "codigo": "1",
            "nombre": "Encargado"
        }
    },
    {
        "codigo": "77242621",
        "nombre": "MARIA",
        "email": "email02@hotmail.com",
        "telefono": "942154478",
        "puesto": "Vendedor",
        "codRol": "2",
        "rol": {
            "codigo": "2",
            "nombre": "Vendedor"
        }
    },
    {
        "codigo": "77233621",
        "nombre": "LUIS",
        "email": "email03@hotmail.com",
        "telefono": "942356478",
        "puesto": "Delibery",
        "codRol": "3",
        "rol": {
            "codigo": "3",
            "nombre": "Delivery"
        }
    },
    {
        "codigo": "77256621",
        "nombre": "PEDRO",
        "email": "email04@hotmail.com",
        "telefono": "942146478",
        "puesto": "Repartidor",
        "codRol": "4",
        "rol": {
            "codigo": "4",
            "nombre": "Repartidor"
        }
    }
]
  ```

import express from "express";
/* import product from "./src/data/fs/products.fs.js";
import user from "./src/data/fs/users.fs.js";
import apiRouter from "./routers/api/index.router.js" */
import router from "./src/routers/index.router.js"
import errorHandler from './src/middlewares/errorHandler.mid.js'
import pathHandler from './src/middlewares/pathHandler.mid.js'
import __dirname from "./utils.js";
import morgan from "morgan";

const server = express(); 

const PORT = 8080;
const ready = () => console.log("server ready on port " + PORT);

//midelwares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname+"/public"))
server.use(morgan("dev"))
server.use('/',router)
server.use(errorHandler)
server.use(pathHandler)
//obliga al sv a utilizar la funcion encargada de recibir urls complejas
//me habilita el manejo de queries(consultas) y params(parametros)

server.listen(PORT, ready);

//ENDPOINTS









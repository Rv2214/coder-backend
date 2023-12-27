import express from "express";
import product from "./data/fs/products.fs.js";

const server = express();

const PORT = 8080;
const ready = () => console.log("server ready on port " + PORT);

//midelwares
server.use(express.urlencoded({ extended: true }));
//obliga al sv a utilizar la funcion encargada de recibir urls complejas
//me habilita el manejo de queries(consultas) y params(parametros)

server.listen(PORT, ready);

//endpoints
server.get("api/products", (req,res)=>{
    try{
        const all = product.readProducts()
        return res.status(200).json(all)
    } catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})


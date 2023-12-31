import express from "express";
import product from "./data/fs/products.fs.js";
import user from "./data/fs/users.fs.js";

const server = express();

const PORT = 8080;
const ready = () => console.log("server ready on port " + PORT);

//midelwares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
//obliga al sv a utilizar la funcion encargada de recibir urls complejas
//me habilita el manejo de queries(consultas) y params(parametros)

server.listen(PORT, ready);

//endpoints
server.get("/api/products", async (req,res)=>{
    try{
        const all = await product.readProducts()
        if (all.lenght === 0){
            return res.json({
                statusCode: 400,
                message: "not found products"
            });
        }
        return res.json({
            statusCode: 200,
            response: all,
        });
    } catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

server.get("/api/products/:pid", async (req, res) =>{
    try{
        const {pid} = req.params;

        const one = await product.readOne(pid);
        if (!one){
            return res.json({
                statusCode: 404,
                message:"Product not found",
            });
        } else{
            console.log(one);
            return res.json({
                one
            })
        }
    }catch(error){
        return res.json({
            statusCode: 500,
            message: error.message,
        }) 
    }
})

server.get("/api/users", async (req, res)=>{
    try{
        const all = await user.readUsers()
        if(all.lenght === 0){
            return res.json({
                statusCode: 200,
                response: all, 
            });
        }
        console.log(all);

        return res.json ({
            statusCode: 200,
            response: all,
        });
        }catch(error){
            console.log(error);
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
})

server.get("/api/users/:uid", async (req, res) =>{
    try{
        const {uid} = req.params;

        const one = await user.readOne(uid);
        if (!one){
            return res.json({
                statusCode: 404,
                message:"User not found",
            });
        }else{
            console.log(one);
            return res.json({
                one
            })
        }
    }catch(error){
        return res.json({
            statusCode: 500,
            message: error.message,
        }) 
    }
})

server.get("/api/delete/:pid", async (req, res) =>{
    try{
        const {pid} = req.params;

        const one = await product.deleteProductById(pid);
        if (!one){
            return res.json({
                statusCode: 404,
                message:"Product not found",
            });
        } else{
            console.log(one);
            return res.json({
                statusCode: 200,
                one
            })
        }
    }catch(error){
        return res.json({
            statusCode: 500,
            message: error.message,
        }) 
    }
})

server.get("/api/deleteuser/:uid", async (req, res) =>{
    try{
        const { uid } = req.params
        
        const one = await user.deleteUserById(uid);  
        if (!one){
            return res.json({
                statusCode: 404,
                message: "User not found",
            });
        }else {
            console.log(one);
            return res.json({
                statusCode: 200,
                one
            })
        }
    }catch(error){
        return res.json({
            statusCode: 500,
            message: error.message,
        }) 
    }
})
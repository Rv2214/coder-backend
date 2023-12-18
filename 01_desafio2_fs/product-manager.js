const fs = require("fs")


class productManager {
    static #perGain = 0.3;
    static #totalGain = 0;

    constructor(path) {
        this.path = path;
        this.products = [];
        this.init();
    }
    init() {
        const file = fs.existsSync(this.path);
        if (file) {
            this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
        }else {
            fs.writeFileSync(this.path, JSON.stringify([], null, 2));
        }
    }
    async createProduct ({ title, ...data}) {
        try {
            if (!title) {
                throw new Error("Pleasi, insert title");
            }
            const product = {
                id: this.products.length === 0
                ? 1
                : this.products[this.products.length - 1].id + 1,
                title,
                photo: "sin imagen",
                price: data.price,
                stock: data.stock,
            }
            this.products.push(product)
            console.log("this.products:", this.products);
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(this.products, null, 2)
            );
            return true;
        }catch(error){
            return error.message;
        }
    }
    readProducts() {
        try {
            if (this.products.length === 0) {
                throw new Error ("No se encontraron productos")
            } else {
                return this.products 
            }
        }catch(error){
            return error.message
        }
    }
    readOne(id) {
        try{
            const productId = this.products.find((each) => each.id === Number(id));
            if (!productId) {
                throw new Error ("no se encontro el producto")
            }else {
                return productId
            }
        }catch (error) {
            return error.message;
        } 
    }
    async soldProduct(quantity, id){
        try {
            if (!(quantity > 0)) {
                throw new Error ("inserte una cantidad valida");
            }else {
                const product = this.readOne(id);
                if (typeof product == "string") throw new Error (product)
                if (quantity > product.stock) throw new Error ("sin stock");
                product.stock = product.stock - quantity;
                productManager.#totalGain = productManager.#totalGain + productManager.#perGain * quantity * product.price;
                await fs.promises.writeFile(
                    this.path. 
                    JSON.stringify(this.products, null, 2)
                );
                return true;
            }
        }catch (error) {
            return error.message;
        }
    }
}

const product = new productManager("./01_desafio2_fs/app/data/products.json");

// Crear un nuevo objeto usando la función createProduct
product.createProduct({
    title: "Nuevo Producto",
    price: 19.99,
    stock: 50
})
    .then((newProduct) => {
        // Imprimir el nuevo producto creado
        console.log(newProduct);
    })
    .catch((error) => {
        // Manejar el error si ocurre
        console.error(error);
    });

product 
    .soldProduct(10, 5)
    .then((res)=> console.log(res))
    .catch((error) => console.log(error));
console.log(product.readOne(2));
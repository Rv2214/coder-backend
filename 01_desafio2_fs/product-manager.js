const fs = require("fs");

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
    } else {
      fs.writeFileSync(this.path, JSON.stringify([], null, 2));
    }
  }
  async createProduct({ title, description, ...data }) {
    try {
      if (!title || !description) {
        throw new Error("Inserte titulo y descripcion");
      }
      const product = {
        id:
          this.products.length === 0
            ? 1
            : this.products[this.products.length - 1].id + 1,
        title,
        description,
        photo: "sin imagen",
        price: data.price,
        stock: data.stock,
      };
      this.products.push(product);
      //console.log("this.products:", this.products);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, 2)
      );
      return true;
    } catch (error) {
      return error.message;
    }
  }
  readProducts() {
    try {
      if (this.products.length === 0) {
        throw new Error("No se encontraron productos");
      } else {
        return this.products;
      }
    } catch (error) {
      return error.message;
    }
  }
  readOne(id) {
    try {
      const productId = this.products.find((each) => each.id === Number(id));
      if (!productId) {
        throw new Error("no se encontro el producto");
      } else {
        return productId;
      }
    } catch (error) {
      return error.message;
    }
  }
  async soldProduct(quantity, id) {
    try {
      if (!(quantity > 0)) {
        throw new Error("inserte una cantidad valida");
      } else {
        const product = this.readOne(id);
        if (typeof product == "string") throw new Error(product);
        if (quantity > product.stock) throw new Error("sin stock");
        product.stock = product.stock - quantity;
        productManager.#totalGain =
          productManager.#totalGain +
          quantity * product.price * productManager.#perGain;
        await fs.promises.writeFile(
          this.path.JSON.stringify(this.products, null, 2)
        );
        return true;
      }
    } catch (error) {
      return error.message;
    }
  }
  getGain() {
    return productManager.#totalGain;
  }
  async deleteProductById(id) {
    try {
      const index = this.products.findIndex(
        (product) => product.id === Number(id)
      );

      if (index === -1) {
        throw new Error("No se encontró el producto con el ID proporcionado");
      }

      this.products.splice(index, 1);

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, 2)
      );

      return true;
    } catch (error) {
      return error.message;
    }
  }
}

const product = new productManager("./01_desafio2_fs/app/data/products.json");

product
  .createProduct({
    /*     title: "Nuevo Producto", 
    price: 19.99,
    stock: 50 */
  })
  .then((newProduct) => {
    console.log(newProduct);
  })
  .catch((error) => {
    console.error(error);
  });

// Probar método eliminar
const productIdToDelete = 13; // id a eliminar
const productToDelete = product.readOne(productIdToDelete);

if (productToDelete) {
  product
    .deleteProductById(productIdToDelete)
    .then((result) => {
      if (result) {
        console.log("Producto eliminado correctamente");
      } else {
        console.log(
          "Error: No se encontró el producto con el ID proporcionado"
        );
      }
    })
    .catch((error) => {
      console.error(error);
    });
} else {
  console.log("Error: No se encontró el producto con el ID proporcionado");
}

/* product.soldProduct(10, 5);

console.log(product.getGain());
console.log(product.readOne(5));
//console.log(product.readProducts()); */

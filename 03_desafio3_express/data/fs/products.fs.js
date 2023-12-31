import fs from "fs"
import crypto from "crypto"



class productManager {
  static #perGain = 0.3;
  static #totalGain = 0;
  static #products = [];

  constructor(path) {
    this.path = path;
    this.init();
  }

  init() {
    try {
      const file = fs.existsSync(this.path);
      if (!file) {
        fs.writeFileSync(this.path, JSON.stringify([], null, 2));
      } else {
        const fileContent = fs.readFileSync(this.path, "utf-8");
        if (fileContent.trim() === "") {
          productManager.#products = [];
        } else {
          productManager.#products = JSON.parse(fileContent);
        }
      }
    } catch (error) {
      console.error("Error initializing productManager:", error.message);
    }
  }

  async create(data) {
    try {
      if (!data.title || !data.price || !data.stock) {
        throw new Error("Inserte titulo, precio y stock");
      } else {
        const product = {
          id: crypto.randomBytes(12).toString("hex"),
          title: data.title,
          photo: "sin imagen",
          price: data.price,
          stock: data.stock,
        };
        productManager.#products.push(product);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(productManager.#products, null, 2)
        );
        return true;
      }
    } catch (error) {
      return error.message;
    }
  }
  readProducts() {
    try {
      if (productManager.#products.length === 0) {
        throw new Error("No se encontraron productos");
      } else {
        return productManager.#products;
      }
    } catch (error) {
      return error.message;
    }
  }
  readOne(id) {
    try {
      const productId = productManager.#products.find(
        (each) => each.id === String(id)
      );
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
          this.path,
          JSON.stringify(productManager.#products, null, 2)
        );
        return { stock: product.stock, totalGain: productManager.#totalGain };
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
      const index = productManager.#products.findIndex(
        (product) => product.id === id
      );

      if (index === -1) {
        throw new Error("No se encontró el producto con el ID proporcionado");
      }

      productManager.#products.splice(index, 1);

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(productManager.#products, null, 2)
      );
      return {message:`Producto borrado correctamente`,
        updateProducts: productManager.#products,
      };

    } catch (error) {
      return error.message;
    }
  }

  async updateProduct(id, newData) {
    try {
      const index = productManager.#products.findIndex(
        (product) => product.id === id
      );
      if (index === -1) {
        throw new Error("No se encontro el producto con el ID proporcionado");
      }

      const updatedProduct = { ...productManager.#products[index], ...newData };
      productManager.#products[index] = updatedProduct;

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(productManager.#products, null, 2)
      );
      return updatedProduct;
    } catch (error) {
      error.message;
    }
  }
}

const product = new productManager("./data/products.json");

product.create({
/*     title: "papas",
    price: "500",
    stock: 100, */
}) 

export default product
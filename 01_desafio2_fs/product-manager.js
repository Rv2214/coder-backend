const fs = require("fs");
const crypto = require("crypto");

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
          // Handle empty file
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

      return true;
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

const product = new productManager("./01_desafio2_fs/app/data/products.json");

product.create({
  /*     title: "Nuevo Producto",
    price: 19.99,
    stock: 50, */
});
/*   .then((newProduct) => {
    console.log(newProduct);
  })
  .catch((error) => {
    console.error(error);
  });

//leer producto
try {
  const products = product.readProducts();
  console.log("Productos:", products);
} catch (error) {
  console.error("Error al leer los productos:", error);
}

//leer producto por id
const productIdToRead = "c6ab3c36cd07447e7dde28e2";
try {
  const productById = product.readOne(productIdToRead);
  console.log("Producto por ID:", productById);
} catch (error) {
  console.error("Error al leer el producto por ID:", error);
}

//vender producto
const productIdToSell = "c6ab3c36cd07447e7dde28e2";
const quantityToSell = 5;
product
  .soldProduct(quantityToSell, productIdToSell)
  .then(({ stock, totalGain }) => {
    console.log(
      `Producto vendido. Stock restante: ${stock}. Ganancia total: ${totalGain}`
    );
  })
  .catch((error) => {
    console.error("Error al vender el producto:", error);
  });
 */

//eliminar producto por id

/* const productIdToDelete = "3be2748e60c419e9d768c74c"; // Reemplazar con un ID real
product
  .deleteProductById(productIdToDelete)
  .then((result) => {
    console.log("Producto eliminado");
  })
  .catch((error) => {
    console.error("Error al eliminar el producto:", error);
  });
 */

/* // actualizar producto
const productIdToUpdate = "c6ab3c36cd07447e7dde28e2"; // Reemplazar con un ID real
const newData = {
  title: "Cebollas",
  price: 30,
  stock: 50,
};
product
  .updateProduct(productIdToUpdate, newData)
  .then((updatedProduct) => {
    console.log("Producto actualizado:", updatedProduct);
  })
  .catch((error) => {
    console.error("Error al actualizar el producto:", error);
  }); */

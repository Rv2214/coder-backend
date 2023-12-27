class ProductManager {
  static products = [];
  static #perGain = 0.3;
  static #totalGain = 0;

  constructor(data) {}

  create(data) {
    const product = {
      id:
        ProductManager.products.length === 0
          ? 1
          : ProductManager.products[ProductManager.products.length - 1].id + 1,
      title: data.title,
      description: data.description,
      price: data.price || 10,
      stock: data.stock || 50,
      date: data.date || new Date(),
    };
    ProductManager.products.push(product);
  }
  read() {
    return ProductManager.products;
  }
  readById(id) {
    const productId = ProductManager.products.find(
      (each) => each.id === Number(id)
    );
    if (!productId) {
      throw new Error(`El producto con ID ${id} es inexistente`);
    }

    return productId;
  }
  soldProduct(quantity, productId) {
    const product = this.readById(productId);
    product.stock = product.stock - quantity;
    ProductManager.#totalGain =
      ProductManager.#totalGain +
      quantity * product.price * ProductManager.#perGain;
  }
  getGain() {
    return ProductManager.#totalGain;
  }
}

const products = new ProductManager();

products.create({
  title: "cebollas",
  description: "Este es un producto de prueba",
});
products.create({
  title: "tomates",
  description: "Este es un producto de prueba",
});
products.create({
  title: "zanahorias",
  description: "Este es un producto de prueba",
});
products.create({
  title: "papas",
  description: "Este es un producto de prueba",
});
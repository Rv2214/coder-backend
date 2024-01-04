const fs = require("fs");

const ruta = "./01_desafio2_fs/app/data/products.json";
const datos = JSON.stringify(
  [
    {
      id: 1,
      title: "papas",
      price: 20,
      stock: 50,
    },
    {
      id: 2,
      title: "tomates",
      price: 20,
      stock: 50,
    },
    {
      id: 3,  
      title: "manzanas",
      price: 20,
      stock: 50,
    },
    {
      id: 4,  
      title: "bananas",
      price: 20,
      stock: 50,
    },
  ],
  null,
  2
);
fs.writeFileSync(ruta, datos);

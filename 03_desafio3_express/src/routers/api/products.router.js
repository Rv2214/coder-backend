import { Router } from "express";
import product from "../../data/fs/products.fs.js";
import propsProducts from "../../middlewares/propsProducts.mid.js";

const productsRouter = Router();

productsRouter.get("/", async (req, res, next) => {
  try {
    const all = await product.readProducts();
    if (all.lenght === 0) {
      return res.json({
        statusCode: 400,
        message: "not found products",
      });
    }
    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;

    const one = await product.readOne(pid);
    if (typeof one === "string") {
      return res.json({
        statusCode: 404,
        message: one,
      });
    } else {
      console.log(one);
      return res.json({
        one,
      });
    }
  } catch (error) {
    return next(error);
  }
});

productsRouter.put("/:pid/:quantity", async (req, res, next) => {
  try {
    const { pid, quantity } = req.params;
    const response = await product.soldProduct(quantity, pid);
    if (response) {
      return res.json({
        statusCode: 200,
        response: "capacity available: " + JSON.stringify(response),
      });
    } else {
    }
  } catch (error) {
    return next(error);
  }
});

productsRouter.delete("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;

    const one = await product.deleteProductById(pid);
    if (!one) {
      return res.json({
        statusCode: 404,
        message: "Product not found",
      });
    } else {
      console.log(one);
      return res.json({
        statusCode: 200,
        one,
      });
    }
  } catch (error) {
    return next(error);
  }
});

productsRouter.post("/", propsProducts, async (req, res, next) => {
  try {
    const data = req.body;
    await product.create(data);
    const response = await product.create(data);
    return res.json({
        statusCode: 201,
        response,
      });
  } catch (error) {
    return next(error);
  }
});

productsRouter.put("/:pid", propsProducts, async (req, res, next) =>{
  try {
    const { pid } = req.params;
    const data = req.body;
    const response = await product.updateProduct(pid, data);
    return res.json({
      statusCode: 200,
      response
    }); 
  } catch (error) {
    return next(error);
  }
});

export default productsRouter;

import { Router } from "express";
import user from "../../data/fs/users.fs.js";
import propsUsers from "../../middlewares/propsUsers.mid.js";

const usersRouter = Router();

usersRouter.get("/", async (req, res, next) => {
  try {
    const all = await user.readUsers();
    if (all.lenght === 0) {
      return res.json({
        statusCode: 200,
        response: all,
      });
    }
    console.log(all);

    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

usersRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;

    const one = await user.readOne(uid);
    if (!one) {
      return res.json({
        statusCode: 404,
        message: "User not found",
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

usersRouter.delete("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;

    const one = await user.deleteUserById(uid);
    if (!one) {
      return res.json({
        statusCode: 404,
        message: "User not found",
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

usersRouter.post("/", propsUsers, async (req, res, next) => {
  try {
    const data = req.body;
    const response = await user.createUser(data);
      res.json({
        statusCode: 201,
        response,
      });
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

usersRouter.put("/:uid", propsUsers, async (req, res, next) => {
  try {
    const { uid } = req.params;
    const data = req.body;
    const response = await user.updateUser(uid, data);
    return res.json({
      statusCode: 200,
      response
    })
  } catch (error) {
    console.log(error);
    return next(error);
  }
})

export default usersRouter;

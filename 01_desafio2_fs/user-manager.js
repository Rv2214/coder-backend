const fs = require("fs");

class userManager {
  constructor(path) {
    this.path = path;
    this.users = [];
    this.init();
  }

  init() {
    const file = fs.existsSync(this.path);
    if (file) {
      try {
        this.users = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      } catch (error) {
        // Si hay un error al parsear, trata el contenido como un array vacío
        this.users = [];
      }
    } else {
      fs.writeFileSync(this.path, JSON.stringify([], null, 2));
    }
  }

  async createUser({ name, email, ...data }) {
    try {
      if (!name) {
        throw new Error("Inserte un nombre");
      }
      const user = {
        id:
          this.users.length === 0
            ? 1
            : this.users[this.users.length - 1].id + 1,
        name,
        email,
        photo: "sin imagen",
      };
      this.users.push(user);

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.users, null, 2)
      );
      return true;
    } catch (error) {
      return error.message;
    }
  }
  readUsers() {
    try {
      if (this.users.length === 0) {
        throw new Error("No se encontraron usuarios");
      } else {
        return this.users;
      }
    } catch (error) {
      return error.message;
    }
  }
  readOne(id) {
    try {
      const userId = this.users.find((each) => each.id === Number(id));
      if (!userId) {
        throw new Error("no se encontro el usuario");
      } else {
        return userId;
      }
    } catch (error) {
      return error.message;
    }
  }
}

const user = new userManager("./01_desafio2_fs/app/data/users.json");

user
  .createUser({
    name: "Pedro",
    email: "pedro@hotmail.com",
  })
  .then((newUser) => {
    console.log(newUser);
  })
  .catch((error) => {
    console.error(error);
  });

console.log(user.readOne(2));

import fs from "fs"
import crypto from "crypto"

class userManager {
    static #users = []

  constructor(path) {
    this.path = path;
    //this.users = [];
    this.init();
  }

  init() {
    try{
        const file = fs.existsSync(this.path);
        if (!file){
            fs.writeFileSync(this.path, JSON.stringify([], null, 2));
        }else {
            const fileContent = fs.readFileSync(this.path, "utf-8");
            if(fileContent.trim() === "") {
                userManager.#users = [];
            } else {
                userManager.#users = JSON.parse(fileContent);
            }
        } 
    } catch (error) {
      console.error("Error initializing usersManager:", error.message);
    }
  }


  async createUser(data) {
    try {
      if (!data.name || !data.email ) {
        throw new Error("name & email required");
      }else {
        const user = {
        id: crypto.randomBytes(12).toString("hex"),
        name: data.name,
        email: data.email,
        photo: "sin imagen",
      };
        userManager.#users.push(user);
        await fs.promises.writeFile(
        this.path,
        JSON.stringify(userManager.#users, null, 2)
        );
        return true;
      };
    } catch (error) {
      return error.message;
    }
  }
  
  readUsers() {
    try {
      if (userManager.#users.length === 0) {
        throw new Error("No se encontraron usuarios");
      } else {
        return userManager.#users;
      }
    } catch (error) {
      return error.message;
    }
  }
  readOne(id) {
    try {
      const userId = userManager.#users.find((each) => each.id === (id));
      if (!userId) {
        throw new Error("no se encontro el usuario");
      } else {
        return userId;
      }
    } catch (error) {
      return error.message;
    }
  }

  async deleteUserById(id) {
    try {
      const index = userManager.#users.findIndex(
        (user) => user.id === id
      );

      if (index === -1) {
        throw new Error("No se encontró el usuario con el ID proporcionado");
      }

      userManager.#users.splice(index, 1);

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(userManager.#users, null, 2)
      );
      return { message: `Usuario borrado correctamente`, updatedUsers: userManager.#users };

    } catch (error) {
      return error.message;
    }
  }

}




const user = new userManager("./data/users.json");

/* user
  .createUser({
    name: "Jose",
    email: "Jose@hotmail.com",
     
  })
    .then((newUser) => {
    console.log(newUser);
  })
    .catch((error) => {
    console.error(error);
  });


  user.createUser({
    name: "Juan",
    email: "Juan@hotmail.com", 
  })
      .then((newUser) => {
    console.log(newUser);
  })
    .catch((error) => {
    console.error(error);
  });

  user.createUser({
    name: "Raul",
    email: "Raul@hotmail.com", 
  })
    .then((newUser) => {
    console.log(newUser);
  })
    .catch((error) => {
    console.error(error);
  });

  user.createUser({
    name: "Raquel",
    email: "Raquel@hotmail.com", 
  })
    .then((newUser) => {
    console.log(newUser);
  })
    .catch((error) => {
    console.error(error);
  });

  user.createUser({
    name: "Maria",
    email: "Maria@hotmail.com", 
  })
    .then((newUser) => {
    console.log(newUser);
  })
    .catch((error) => {
    console.error(error);
  }); */


//console.log(user.readOne(2));


export default user
class userManager {
  static users = [];

  constructor(data) {}

  create(data) {
    const user = {
      id:
        userManager.users.length === 0
          ? 1
          : userManager.users[userManager.users.length - 1].id + 1,
      name: data.name,
      email: data.email,
      photo: "sin imagen",
    };
    userManager.users.push(user);
  }
  read() {
    return userManager.users;
  }
  getUserById(id) {
    const userId = userManager.users.find((each) => each.id === Number(id));
    if (!userId) {
      throw new Error(`El usuario con ID ${id} es inexistente`);
    }
    return userId;
  }
}

const users = new userManager();

users.create({
  name: "Ramon Diaz",
  email: "ramondiaz@gmail.com",
});
users.create({
  name: "Natalia Gomez",
  email: "nataliagomez@hotmail.com",
});
users.create({
  name: "Carlos Galarza",
  email: "carlosgalarza@gmail.com",
});
users.create({
  name: "Rosaura Marolio",
  email: "rosamarolio@hotmail.com",
});

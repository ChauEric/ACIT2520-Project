const Database = [
  {
    id: 1,
    name: 'Jimmy Smith',
    email: 'jimmy123@gmail.com',
    password: 'jimmy123!',
    reminders: [
      {
        id: 1,
        title: 'Grocery shopping',
        description: 'Buy milk and bread from safeway',
        completed: false,
      },
    ],
    role: 'user',
  },
  {
    id: 2,
    name: 'Johnny Doe',
    email: 'johnny123@gmail.com',
    password: 'johnny123!',
    reminders: [
      {
        id: 1,
        title: 'TEST DELETE',
        description: 'Buy milk and bread from safeway',
        completed: false,
      },
    ],
    role: 'user',
  },
  {
    id: 3,
    name: 'Jonathan Chen',
    email: 'jonathan123@gmail.com',
    password: 'jonathan123!',
    reminders: [],
    role: 'admin',
  },
];

const userModel = {
  findOne: (email) => {
    const user = Database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  findById: (id) => {
    const user = Database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
};

module.exports = { Database, userModel };

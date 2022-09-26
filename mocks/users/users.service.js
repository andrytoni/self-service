// mock
import mongoose from 'mongoose';
import users from './users.js';

const UsersService = (User) => {
  const createUser = (user) => {
    // Logica de criacao de usuario
    users.push(user);
    // console.log(users);

    return user;
  };

  const findByEmail = (email) => {
    return users.find((user) => user.email === email);
  };

  const findById = (id) => {
    return users.find((user) => user._id === id);
  };

  const find = (query) => {
    return users.filter((user) => {
      // const { name, role, isActive, date } = query;
      // const finalQuery = {};
      // if (name) finalQuery.name = name;
      // if (role) finalQuery.role = role;
      // if (isActive) finalQuery.isActive = isActive;
      // if (date) finalQuery.createdAt = date;
      // console.log(finalQuery);

      return user.name === query.name;
    });
  };
  const updateUser = (id, update) => {
    let user = users.find((user) => user._id === id);
    user.name = update.name;
    return user;
  };

  const changePassword = (id, update) => {
    let user = users.find((user) => user._id === id);
    user.password = update.password;
    return user;
  };

  const changeUserStatus = (id) => {
    let user = users.find((user) => user._id === id);
    user.isActive = !user.isActive;
    return user;
  };

  return {
    createUser,
    changeUserStatus,
    changePassword,
    findByEmail,
    findById,
    find,
    updateUser,
  };
};

export default UsersService;

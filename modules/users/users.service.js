import mongoose from 'mongoose';
import User from '../../models/user.js';
import Salt from '../../models/salt.js';

const UsersService = (User) => {
  const getPasswordErrors = (password, email, name) => {
    if (!name || !password || !email) {
      throw new Error('Name, email or password is required.');
    }

    const partsOfName = name.toString().toUpperCase().split(' ');
    const uppercasePassword = password.toString().toUpperCase();
    const partOfEmail = email.toString().split('@')[0].toUpperCase();
    const passwordError = {
      hasError: false,
      errors: ['Password validations:'],
    };

    if (password.length < 8) {
      passwordError.errors.push('- At least 8 characteres.');
    }
    if (/[a-z]/.test(password) === false) {
      passwordError.errors.push('- At least 1 lowercase character.');
    }
    if (/[A-Z]/.test(password) === false) {
      passwordError.errors.push('- At least 1 uppercase character.');
    }
    if (/[0-9]/.test(password) === false) {
      passwordError.errors.push('- At least 1 number.');
    }
    if (
      /[\u0020-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007E]/.test(
        password
      ) === false
    ) {
      passwordError.errors.push('- At least 1 special character.');
    }
    if (uppercasePassword.includes(partOfEmail) === true) {
      passwordError.errors.push('- Cannot contain parts of email.');
    }
    for (let i = 0; i < partsOfName.length; i++) {
      if (uppercasePassword.includes(partsOfName[i])) {
        passwordError.errors.push('- Cannot contain parts of the name.');
        break;
      }
    }

    if (passwordError.errors.length > 1) {
      passwordError.hasError = true;
    }
    return passwordError;
  };

  const encryptPassword = async (userID, password, operation) => {
    let salt;
    if (operation == 'comparison') {
      salt = await Salt.findOne({ user_id: userID });
      salt = salt.salt1;
    } else {
      // Save || Update
      salt = await salting(userID, operation);
    }

    let encryptedPassword = password + salt;
    encryptedPassword = moveAsciiCharacters(encryptedPassword);
    encryptedPassword = reverseString(encryptedPassword);

    return encryptedPassword;
  };

  const salting = async (id, operation) => {
    let saltedString = '';
    for (let i = 0; i < 6; i++) {
      const randomAsciiNumber = Math.floor(Math.random() * (127 - 33) + 33);
      saltedString += String.fromCharCode(randomAsciiNumber);
    }

    if (operation == 'save') {
      const userSalt = new Salt({ user_id: id, salt1: saltedString });
      await userSalt.save();
    } else {
      // Update
      await Salt.findOneAndUpdate({ user_id: id }, { salt1: saltedString });
    }

    return saltedString;
  };

  const moveAsciiCharacters = (string) => {
    let newString = '';
    for (let i = 0; i < string.length; i++) {
      const code = string.charCodeAt(i);
      if (code < 97) {
        newString += String.fromCharCode(code + 10);
      } else if (code > 96 && code < 127) {
        newString += String.fromCharCode(code - 10);
      } else if (code > 191 && code < 227) {
        newString += String.fromCharCode(code - 100);
      } else {
        newString += String.fromCharCode(code - 130);
      }
    }

    return newString;
  };

  const reverseString = (string) => {
    let reversedString = '';
    for (let i = string.length - 1; i >= 0; i--) {
      reversedString += string[i];
    }

    return reversedString;
  };

  const createNewUser = async (user) => {
    if (!user) {
      throw new Error('Parameters are required.');
    }
    if (
      // eslint-disable-next-line
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        user.email
      )
    ) {
      throw new Error('Email not valid.');
    }

    const newUser = new User(user);
    await newUser.validate();

    const passwordErrors = getPasswordErrors(
      newUser.password,
      newUser.email,
      newUser.name
    );

    if (passwordErrors.hasError === true) {
      throw new Error(passwordErrors.errors.join('\n'));
    }

    const encryptedPassword = await encryptPassword(
      newUser._id,
      newUser.password,
      'save'
    );
    newUser.password = encryptedPassword;

    return newUser.save();
  };

  const findById = async (id) => {
    if (!id) {
      throw new Error('Id is required.');
    }
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      throw new Error('Id not valid.');
    }

    return User.findById(id, '-password -tokenGeneration -token');
  };

  const findUserToken = async (token) => {
    // if (!/^[0-9a-fA-F]{24}$/.test(token)) {
    //   return false;
    // }

    return User.findOne({ token: token });
  };

  const find = async (query) => {
    const { name, role, isActive, date, email } = query;
    const finalQuery = {};

    if (email) {
      if (
        // eslint-disable-next-line
        !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          email
        )
      ) {
        throw new Error('Email not valid.');
      }
      finalQuery.email = email;
    }
    if (name) finalQuery.name = { $regex: name, $options: 'i' };
    if (role) finalQuery.role = role.toUpperCase();
    if (isActive || isActive === false) {
      if (
        isActive !== false &&
        isActive !== true &&
        (isActive !== 'false') & (isActive !== 'true')
      ) {
        throw new Error('User status must be true or false.');
      }
      finalQuery.isActive = isActive.toString() === 'true';
    }

    if (date) {
      const startDate = new Date(date);
      const finalDate = new Date(date);
      finalDate.setDate(startDate.getDate() + 1);
      finalQuery.createdAt = { $gte: startDate, $lt: finalDate };
    }

    return User.find(finalQuery, '-password -token -tokenGeneration');
  };

  const updateUser = async (id, userUpdate) => {
    if (!id) {
      throw new Error('ID is required.');
    }

    if (!userUpdate) {
      throw new Error('Update parameter is required.');
    }
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      throw new Error('Id not valid.');
    }
    if (
      userUpdate.email &&
      // eslint-disable-next-line
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        userUpdate.email
      )
    ) {
      throw new Error('Email not valid.');
    }
    if (userUpdate.password) {
      throw new Error('Password is not allowed to update.');
    }
    if (userUpdate.isActive || userUpdate.isActive === false) {
      throw new Error('isActive status is not allowed to update.');
    }

    return User.findByIdAndUpdate(id, userUpdate, {
      projection: '-password -token -tokenGeneration',
      returnDocument: 'after',
    });
  };

  const changePassword = async (id, passwordUpdate1, passwordUpdate2) => {
    if (!id) {
      throw new Error('ID is required');
    }
    if (!passwordUpdate1 || !passwordUpdate2) {
      throw new Error('New password is required.');
    }
    if (passwordUpdate1 !== passwordUpdate2) {
      throw new Error('Passwords should match.');
    }

    const user = await User.findById(id);

    if (!user) {
      throw new Error('User not found.');
    }

    const oldEncryptedPassword = await encryptPassword(
      id,
      passwordUpdate1,
      'comparison'
    );

    if (oldEncryptedPassword === user.password) {
      throw new Error('New password cannot be the same as old password.');
    }

    const passwordErrors = getPasswordErrors(
      passwordUpdate1,
      user.email,
      user.name
    );

    if (passwordErrors.hasError === true) {
      throw new Error(passwordErrors.errors.join('\n'));
    }

    const newEncryptedPassword = await encryptPassword(
      id,
      passwordUpdate1,
      'update'
    );

    return User.findByIdAndUpdate(
      id,
      { password: newEncryptedPassword },
      { projection: '-password -token -tokenGeneration' }
    );
  };

  const changeUserStatus = async (id) => {
    if (!id) {
      throw new Error('ID is required');
    }

    const user = await findById(id);
    if (!user) {
      throw new Error('User not found.');
    }

    return User.findByIdAndUpdate(
      id,
      { isActive: !user.isActive },
      {
        projection: '-password -token -tokenGeneration',
        returnDocument: 'after',
      }
    );
  };

  return {
    createNewUser,
    findById,
    findUserToken,
    find,
    updateUser,
    changePassword,
    changeUserStatus,
    encryptPassword,
  };
};

export default UsersService;

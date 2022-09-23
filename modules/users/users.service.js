import mongoose from 'mongoose';

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
    if (/[\u0020-\u002F\u003A-\u0040]/.test(password) === false) {
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

  const createNewUser = async (user) => {
    if (!user) {
      throw new Error('Parameters are required.');
    }
    if (
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

    return newUser.save();
  };

  const findByEmail = async (email) => {
    if (!email) {
      throw new Error('Email is required.');
    }

    return User.findOne({ email: email });
  };

  const findById = async (id) => {
    if (!id) {
      throw new Error('Id is required.');
    }
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      throw new Error('Id not valid.');
    }

    return User.findById(id);
  };

  const find = async (query) => {
    const { name, role, isActive, date } = query;
    const finalQuery = {};

    if (name) finalQuery.name = { $regex: name, $options: 'i' };
    if (role) finalQuery.role = role.toUpperCase();
    if (isActive || isActive === false)
      finalQuery.isActive = isActive.toString() === 'true';
    if (date) {
      const startDate = new Date(date);
      const finalDate = new Date(date);
      finalDate.setDate(startDate.getDate() + 1);
      finalQuery.createdAt = { $gte: startDate, $lt: finalDate };
    }

    return User.find(finalQuery);
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

    return User.findByIdAndUpdate(id, userUpdate);
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

    const user = await findById(id);
    if (!user) {
      throw new Error('User not found.');
    }

    if (passwordUpdate1 === user.password) {
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

    return User.findByIdAndUpdate(id, { password: passwordUpdate1 });
  };

  const changeUserStatus = async (id) => {
    if (!id) {
      throw new Error('ID is required');
    }

    const user = await findById(id);
    if (!user) {
      throw new Error('User not found.');
    }

    return User.findByIdAndUpdate(id, { isActive: !user.isActive });
  };

  return {
    createNewUser,
    findByEmail,
    findById,
    find,
    updateUser,
    changePassword,
    changeUserStatus,
  };
};

export default UsersService;

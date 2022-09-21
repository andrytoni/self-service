import mongoose from 'mongoose';

const userService = (User) => {
  const getPasswordErrors = (password, email, name) => {
    const uppercaseName = name.toUpperCase();
    const uppercasePassword = password.toUpperCase();
    const partOfEmail = email.split('@')[0].toUpperCase();
    const partsOfName = uppercaseName.split(' ');
    const passwordError = {
      hasError: false,
      errors: ['Password validations:'],
    };

    if (password.length < 8) {
      passwordError.errors.push('- At least 8 characteres');
    }
    if (/[a-z]/.test(password) === false) {
      passwordError.errors.push('- At least 1 lowercase character');
    }
    if (/[A-Z]/.test(password) === false) {
      passwordError.errors.push('- At least 1 uppercase character');
    }
    if (/[0-9]/.test(password) === false) {
      passwordError.errors.push('- At least 1 number');
    }
    if (/[\u0020-\u002F\u003A-\u0040]/.test(password) === false) {
      passwordError.errors.push('- At least 1 special character.');
    }
    if (uppercasePassword.includes(partOfEmail) === true) {
      passwordError.errors.push("- Can't contain parts of email");
    }

    for (let i = 0; i < partsOfName.length; i++) {
      if (uppercasePassword.includes(partsOfName[i])) {
        passwordError.errors.push("- Can't contain parts of the name.");
      }
    }

    if (passwordError.errors.length > 1) {
      passwordError.hasError = true;
      return passwordError;
    } else {
      return passwordError;
    }
  };

  const createNewUser = async (user) => {
    if (!user) {
      throw new Error('Parameters are required');
    }

    if (!user.email.includes('@')) {
      throw new Error('Email not valid');
    }

    let passwordErrors = getPasswordErrors(
      user.password,
      user.email,
      user.name
    );

    if (passwordErrors.hasError === true) {
      throw new Error(passwordErrors.errors.join('\n'));
    }

    return new User(user).save();
  };

  const findByEmail = async (email) => {
    if (!email) {
      throw new Error('Email is required');
    }

    return User.findOne({ email: email });
  };

  const findById = async (id) => {
    if (!id) {
      throw new Error('Id is required');
    }

    return User.findById(id);
  };

  const find = async (query) => {
    const { name, role, isActive, date } = query;
    const finalQuery = {};

    if (name) finalQuery.name = name.toUpperCase();
    if (role) finalQuery.role = role.toUpperCase();
    if (isActive) finalQuery.isActive = isActive === 'true';
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
    if (userUpdate.password) {
      throw new Error('Password is not allowed to update.');
    }
    if (userUpdate.isActive) {
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

    let user = await findById(id);
    if (user == null) {
      throw new Error('User not found');
    }

    let passwordErrors = getPasswordErrors(
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

    let user = await findById(id);
    if (user == null) {
      throw new Error('User not found');
    }

    if (user.isActive === true) {
      return User.findByIdAndUpdate(id, { isActive: false });
    } else {
      return User.findByIdAndUpdate(id, { isActive: true });
    }
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

export default userService;

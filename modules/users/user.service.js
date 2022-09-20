import mongoose from 'mongoose';

const userService = (User) => {
  const validatePassword = (password, email, name) => {
    name = name.toUpperCase();
    const partOfEmail = email.split('@')[0];
    const partsOfName = name
      .split(' ')
      .map((nome) => password.toUpperCase().includes(nome));
    let finalValidation = ['Password validations:'];

    if (password.length < 8) {
      finalValidation.push('- At least 8 characteres');
    }
    if (/[a-z]/.test(password) === false) {
      finalValidation.push('- At least 1 lowercase character');
    }
    if (/[A-Z]/.test(password) === false) {
      finalValidation.push('- At least 1 uppercase character');
    }
    if (/[0-9]/.test(password) === false) {
      finalValidation.push('- At least 1 number');
    }
    if (/[\u0020-\u002F\u003A-\u0040]/.test(password) === false) {
      finalValidation.push('- At least 1 special character.');
    }
    if (password.includes(partOfEmail) === true) {
      finalValidation.push("- Can't contain parts of email");
    }

    for (let i = 0; i < partsOfName.length; i++) {
      if (partsOfName[i] === true) {
        finalValidation.push("- Can't contain parts of the name.");
        break;
      }
    }
    // finalValidation = finalValidation.join('\n');

    return finalValidation;
  };

  const createNewUser = async (user) => {
    if (!user) {
      throw new Error('Parameters are required');
    }
    let passwordValidation = validatePassword(
      user.password,
      user.email,
      user.name
    );

    if (passwordValidation.length > 1) {
      passwordValidation = passwordValidation.join('\n');
      throw new Error(passwordValidation);
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

    if (name) finalQuery.name = name;
    if (role) finalQuery.role = role;
    if (date) {
      const startDate = new Date(date);
      const finalDate = new Date(date);
      finalDate.setDate(startDate.getDate() + 1);
      finalQuery.createdAt = { $gte: startDate, $lt: finalDate };
    }
    if (isActive) finalQuery.isActive = isActive;

    return User.find(finalQuery);
  };

  const updateUser = async (id, userUpdate) => {
    if (!id) {
      throw new Error('ID is required');
    }
    if (!userUpdate) {
      throw new Error('Update parameter is required');
    }

    return User.findByIdAndUpdate(id, userUpdate);
  };

  const changePassword = async (id, passwordUpdate) => {
    if (!id) {
      throw new Error('ID is required');
    }
    if (!passwordUpdate) {
      throw new Error('New password is required');
    }

    // let passwordValidation = validatePassword(id.password, id.email, id.name);

    // if (passwordValidation.length > 1) {
    //   passwordValidation = passwordValidation.join('\n');
    //   throw new Error(passwordValidation);
    // }
    return User.findByIdAndUpdate(id, { password: passwordUpdate });
  };

  // const changeUserStatus = async (id) => {
  //   if (!id) {
  //     throw new Error('ID is required');
  //   }

  //   return User.findByIdAndUpdate(id, function() => {
  //     if({isActive: true}){
  //       return {isActive: false}
  //     }
  //   })
  // }

  return {
    createNewUser,
    findByEmail,
    findById,
    find,
    updateUser,
    changePassword,
  };
};

export default userService;

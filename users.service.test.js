import UsersService from './modules/users/users.service.js';
import User from './models/user.js';

const usersService = UsersService(User);

const user1 = {
  'name': 'andre luiz fernandes de brito',
  'email': 'andreez@hotmail.com',
  'password': 'Andry@12',
};

const user2 = {
  'name': 'fulano da silva esqueleto',
  'email': 'fulano@outlook.com',
  'password': 'Ciclano4532@',
};

const user3 = {
  'name': 'antonio pereira',
  'email': 'antonio@outlook.com',
  'password': 'Ciclano4532@',
};

const usersServiceTest = async () => {
  //Create new user
  //const newUser1 = await usersService.createNewUser(user3);
  // const newUser2 = await usersService.createNewUser(user2);
  // console.log(newUser1, newUser2);
  // //
  //Validate password
  const validatePassword = (password) => {
    let finalValidation = 'Password must have ';
    if (password.length < 8) {
      finalValidation = +'at least 8 characteres';
    }
    if (/[a-z]/.test(password) === false) {
      finalValidation = +'at least 1 lowercase character.';
    }
    if (/[A-Z]/.test(password) === false) {
      finalValidation = +'at least 1 uppercase character.';
    }
    if (/[0-9]/.test(password) === false) {
      finalValidation = +'at least 1 number.';
    }
    if (/[\u0020-\u002F\u003A-\u0040]/) {
      finalValidation = +'at least 1 special character.';
    }
    return finalValidation;
  };
  // validatePassword(user1.password);
  //Find user By Email
  // const findByEmail = await usersService.findByEmail('fulano@outlook.com');
  // console.log(findByEmail);
  //
  //Find user by Id
  // try {
  // const findById = await usersService.findById('632e2037e8b3f295bf4d5166');
  // console.log(findById);
  // } catch (error) {
  //   console.log(`error`);
  // }

  //
  //Find user by Query
  // const find = await usersService.find({
  //   // date: '2022-09-23',
  //   isActive: 'rrsds',
  //   // name: 'antonio',
  // });
  // console.log(find);
  // //
  //Update User
  // const update = await usersService.updateUser('632a3df98477882393ac11ba', {
  //   name: 'ANDRE LUIZ FERNANDES DE BRITO',
  // });
  //
  //Change password
  // const findById = await usersService.findById('63290b02a3cf76cd6928208f');
  // console.log(findById._id);
  // try {
  // const passwordUpdate = await usersService.changePassword(
  //   '632a3df98477882393ac11bb',
  //   'sdfHDHDJ',
  //   'sdfHDHDJ'
  // );
  // } catch (error) {
  //   console.log(`error`);
  // }

  // const changeUserStatus = await usersService.changeUserStatus(
  //   '63290b02a3cf76cd6928208f'
  // );
};

export default usersServiceTest;

// if (id.match(/^[0-9a-fA-F]{24}$/)) {
//   // Yes, it's a valid ObjectId, proceed with `findById` call.
// }
// var check2 = 'BARBARA FOO-BAR';
// var check3 = "JASON D'WIDGET";

// var isUpper1 = hasLowerCase(check1);
// var isUpper2 = hasLowerCase(check2);
// var isUpper3 = hasLowerCase(check3);

// console.log(isUpper1);

// function hasLowerCase(str) {
//   return /[a-z]/.test(str);
// }

// console.log(/[a-z]/.test(check1));

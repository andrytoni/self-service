import UsersService from './users.service.js';
import users from '../../mocks/users/users.js';
import User from '../../models/user.js';

let usersService;

beforeAll(() => {
  usersService = UsersService(User);
});

// Definições

test('Método Create New User deve existir', () => {
  expect(usersService.createNewUser).toBeDefined();
});

test('Método Find By Id deve existir', () => {
  expect(usersService.findById).toBeDefined();
});

test('Método Find deve existir', () => {
  expect(usersService.find).toBeDefined();
});

test('Método Update User deve existir', () => {
  expect(usersService.updateUser).toBeDefined();
});

test('Método Change User Password deve existir', () => {
  expect(usersService.changePassword).toBeDefined();
});

test('Método Change User Status deve existir', () => {
  expect(usersService.changeUserStatus).toBeDefined();
});

/* Outros testes */

test('Método findById deve retornar o usuário do ID 632e2037e8b3f295bf4d5166', async () => {
  const user = await usersService.findById('632e2037e8b3f295bf4d5166');
  console.log(user);

  expect(user).toEqual(users[2]);
});

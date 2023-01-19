import 'dotenv/config';
import UsersService from './users.service.js';
import User from '../../models/user.js';
import { users } from '../../mocks/users/users.js';
import mongoose from 'mongoose';

let usersService;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  });
  usersService = UsersService(User);
});

afterAll(() => {
  mongoose.connection.close();
});

// Definições

// test('Método Create New User deve existir', () => {
//   expect(usersService.createNewUser).toBeDefined();
// });

// test('Método Find By Id deve existir', () => {
//   expect(usersService.findById).toBeDefined();
// });

// test('Método Find deve existir', () => {
//   expect(usersService.find).toBeDefined();
// });

// test('Método Update User deve existir', () => {
//   expect(usersService.updateUser).toBeDefined();
// });

// test('Método Change User Password deve existir', () => {
//   expect(usersService.changePassword).toBeDefined();
// });

// test('Método Change User Status deve existir', () => {
//   expect(usersService.changeUserStatus).toBeDefined();
// });

// /* Outros testes */

// test('Método createNewUser deve retornar usuário criado com ID 6333628013493dae4883c514.', async () => {
//   const user = await usersService.createNewUser(users[3]);
//   const userObject = user.toObject();

//   expect(userObject).toEqual(users[3]);
// });

// test('Método createNewUser deve retornar erro por email não válido.', async () => {
//   try {
//     // eslint-disable-next-line
//     const user = await usersService.createNewUser(users[4]);
//   } catch (error) {
//     expect(error).toEqual(Error('Email not valid.'));
//   }
// });

// test('Método find deve retornar usuários com nome Andre e criados no dia 2022-09-23.', async () => {
//   const query = { name: 'andre', date: '2022-09-23' };
//   const user = await usersService.find(query);
//   const userObject = user.map((object) => object.toObject());

//   expect(userObject).toEqual([users[2], users[8]]);
// });

// test('Método find deve retornar erro por digitação incorreta do parâmetro isActive.', async () => {
//   try {
//     const query = { name: 'andre', isActive: 'verdadeiro' };
//     // eslint-disable-next-line
//     const user = await usersService.find(query);
//   } catch (error) {
//     expect(error).toEqual(Error('User status must be true or false.'));
//   }
// });

// test('Método findById deve retornar o usuário do ID 6333628013493dae4883c514.', async () => {
//   const user = await usersService.findById('6333628013493dae4883c514');
//   const userObject = user.toObject();

//   expect(userObject).toEqual(users[3]);
// });

// test('Método findById deve retornar erro por ID inválido.', async () => {
//   try {
//     // eslint-disable-next-line
//     const user = await usersService.findById('6333628013493dae4883c51');
//   } catch (error) {
//     expect(error).toEqual(Error('Id not valid.'));
//   }
// });

// test('Método uptadeUser deve retornar usuário de ID 6333628013493dae4883c514.', async () => {
//   // eslint-disable-next-line
//   const newUser = await usersService.updateUser('6333628013493dae4883c514', {
//     name: 'GUILHERME DENOITE',
//     email: 'guiga@outlook.com',
//   });
//   const user = await usersService.findById('6333628013493dae4883c514');
//   const userObject = user.toObject();

//   expect(userObject).toEqual(users[5]);
// });

// test('Método uptadeUser deve retornar erro por não ser permitido alterar o status do parâmetro isActive.', async () => {
//   try {
//     // eslint-disable-next-line
//     const user = await usersService.updateUser('6333628013493dae4883c514', {
//       name: 'GUILHERME DEDIA',
//       isActive: false,
//     });
//   } catch (error) {
//     expect(error).toEqual(Error('isActive status is not allowed to update.'));
//   }
// });

// test('Método changePassword deve retornar usuário de ID 6333628013493dae4883c514 com senha alterada.', async () => {
//   // eslint-disable-next-line
//   const newUser = await usersService.changePassword(
//     '6333628013493dae4883c514',
//     'G@ilhe123',
//     'G@ilhe123'
//   );
//   const user = await usersService.findById('6333628013493dae4883c514');
//   const userObject = user.toObject();

//   expect(userObject).toEqual(users[6]);
// });

// test('Método changePassword deve retornar erro: Nova senha não pode ser a mesma que antiga senha.', async () => {
//   try {
//     // eslint-disable-next-line
//     const newUser = await usersService.changePassword(
//       '6333628013493dae4883c514',
//       'G@ilhe123',
//       'G@ilhe123'
//     );
//   } catch (error) {
//     expect(error).toEqual(
//       Error('New password cannot be the same as old password.')
//     );
//   }
// });

// test('Método changeUserStatus deve retornar usuário com status isActive alterado para false.', async () => {
//   // eslint-disable-next-line
//   const newUser = await usersService.changeUserStatus(
//     '6333628013493dae4883c514'
//   );
//   const user = await usersService.findById('6333628013493dae4883c514');
//   const userObject = user.toObject();

//   expect(userObject).toEqual(users[7]);
// });

// test('Método changeUserStatus deve retornar erro por usuário não encontrado.', async () => {
//   try {
//     // eslint-disable-next-line
//     const newUser = await usersService.changeUserStatus(
//       '6333628013493dae4883c504'
//     );
//   } catch (error) {
//     expect(error).toEqual(Error('User not found.'));
//   }
// });

// test('Método createNewUser deve retornar usuário com senha criptografada')

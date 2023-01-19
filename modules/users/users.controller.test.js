const { default: axios } = require('axios');
import { usersController } from '../../mocks/users/users.js';
import 'dotenv/config';
//arrumar porta fixa

const { PORT, SERVER_ADDRESS } = process.env;
const url = `${SERVER_ADDRESS}:${PORT}/users`;

test('Rota de Create User /users/ deve retornar um novo objeto de user', async () => {
  const { status, data } = await axios.post(url, usersController[3]);

  expect(status).toBe(200);
  expect(data).toEqual(usersController[3]);
});

test('Rota de Create User /users/ deve retornar um erro por valor de objeto único duplicado', async () => {
  try {
    // eslint-disable-next-line
    const { status, data } = await axios.post(url, usersController[3]);
  } catch (error) {
    expect(error.response.status).toBe(500);
    expect(error.response.data).toEqual({
      'error':
        "E11000 duplicate key error collection: self-service.users index: _id_ dup key: { _id: ObjectId('6333628013493dae4883c302') }",
    });
  }
});

test('Rota de Find User by Id /users/632a3df98477882393ac11be deve retornar um objeto do user com ID 632a3df98477882393ac11be', async () => {
  const { status, data } = await axios.get(`${url}/632a3df98477882393ac11be`);

  expect(status).toBe(200);
  expect(data).toEqual(usersController[0]);
});

test('Rota de Find User by Id /users/632a3df98477882393ac11b deve retornar um erro de ID não válido', async () => {
  try {
    // eslint-disable-next-line
    const { status, data } = await axios.get(`${url}/632a3df98477882393ac11b`);
  } catch (error) {
    expect(error.response.status).toBe(500);
    expect(error.response.data).toEqual({
      'error': 'Id not valid.',
    });
  }
});

test('Rota de Find Users /users/?name=andre&date=2022-09-23 deve retornar uma array de users com o nome Andre e que foram criados no dia 2022-09-23', async () => {
  const { status, data } = await axios.get(
    `${url}/?name=andre&date=2022-09-23`
  );

  expect(status).toBe(200);
  expect(data).toEqual([usersController[2], usersController[7]]);
});

test('Rota de Find Users /users/?name=andre&isActive=falso deve retornar um erro de "User status must be true or false"', async () => {
  try {
    // eslint-disable-next-line
    const { status } = await axios.get(`${url}/?name=andre&isActive=falso`);
  } catch (error) {
    expect(error.response.status).toBe(500);
    expect(error.response.data).toEqual({
      'error': 'User status must be true or false.',
    });
  }
});

test('Rota Update User /users/6333628013493dae4883c302 deve retornar um objeto de user com nome atualizado', async () => {
  const { status } = await axios.put(`${url}/6333628013493dae4883c302`, {
    name: 'guilherme cavalcante',
  });

  const { data } = await axios.get(`${url}/6333628013493dae4883c302`);

  expect(status).toBe(200);
  expect(data).toEqual(usersController[4]);
});

test('Rota Update User /users/6333628013493dae4883c302 deve retornar um erro de não permissão de troca de senha para essa rota', async () => {
  try {
    // eslint-disable-next-line
    const { status } = await axios.put(`${url}/6333628013493dae4883c302`, {
      password: 'gui123',
    });
  } catch (error) {
    expect(error.response.status).toBe(500);
    expect(error.response.data).toEqual({
      'error': 'Password is not allowed to update.',
    });
  }
});

test('Rota Change User Password /users/password/6333628013493dae4883c302 deve retornar usuário com senha atualizada', async () => {
  const { status } = await axios.put(
    `${url}/password/6333628013493dae4883c302`,
    {
      password1: 'G@ilhe123',
      password2: 'G@ilhe123',
    }
  );

  const { data } = await axios.get(`${url}/6333628013493dae4883c302`);

  expect(status).toBe(200);
  expect(data).toEqual(usersController[5]);
});

test('Rota Change User Password /users/password/6333628013493dae4883c302 deve retornar erro de senhas não identicas', async () => {
  try {
    //eslint-disable-next-line
    const { status } = await axios.put(
      `${url}/password/6333628013493dae4883c302`,
      {
        password1: 'G@ilhe12',
        password2: 'G@ilhe124',
      }
    );
  } catch (error) {
    expect(error.response.status).toBe(500);
    expect(error.response.data).toEqual({
      'error': 'Passwords should match.',
    });
  }
});

test('Rota Change User Status /users/status/6333628013493dae4883c302 de retornar usuário com status isActive alterado para false', async () => {
  const { status } = await axios.put(`${url}/status/6333628013493dae4883c302`);

  const { data } = await axios.get(`${url}/6333628013493dae4883c302`);

  expect(status).toBe(200);
  expect(data).toEqual(usersController[6]);
});

test('Rota Change User Status /users/status/6333628013493dae4883c30 deve retornar um erro de ID não válido', async () => {
  try {
    //eslint-disable-next-line
    const { status } = await axios.put(`${url}/6333628013493dae4883c30`);
  } catch (error) {
    expect(error.response.status).toBe(500);
    expect(error.response.data).toEqual({
      'error': 'Id not valid.',
    });
  }
});

// alterar validaçao de senha para retornar todas as regras
// não deixar o update user receber algo vazio

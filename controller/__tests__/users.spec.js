const bcrypt = require('bcrypt');
const User = require('../../models/User');
const {
  createUser,
  updateUser,
  getUsers,
  // getUsersById,
  deleteUser,
} = require('../users');

jest.mock('../../models/User');

beforeEach(() => {
  jest.clearAllMocks();
});

const req = {
  body: {
    id: '1',
    email: 'test@example.com',
    password: 'password',
    role: 'admin',
  },
};

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe('createUser', () => {
  it('should success create a new user', async () => {
    bcrypt.hash = jest.fn().mockResolvedValue('hashedPassword');
    User.prototype.save = jest.fn().mockResolvedValue({});
    await createUser(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(bcrypt.hash).toHaveBeenCalledWith('password', 10);
    expect(User).toHaveBeenCalledWith({
      id: '1',
      email: 'test@example.com',
      password: 'hashedPassword',
      role: 'admin',
    });
  });

  it('should return a 400 error if any required field is empty', async () => {
    const req = {
      body: {
        id: '',
        email: '',
        password: '',
        role: '',
      },
    };
    await createUser(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'All fields are required' });
  });

  it('should handle error if cant create user', async () => {
    bcrypt.hash = jest.fn().mockRejectedValue(new Error('Hashing error'));
    await createUser(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
});

describe('updateUser', () => {
  it('should update user data', async () => {
    const req = {
      params: { id: '1' },
      body: {
        email: 'admin@example.com',
        password: 'password',
        role: 'admin',
      },
    };
    User.findByIdAndUpdate = jest.fn().mockResolvedValue({ email: 'updated@example.com', role: 'waiter' });
    await updateUser(req, res);
    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
      '1',
      { email: 'admin@example.com', password: 'password', role: 'admin' },
      { new: true },
    );
    expect(res.json).toHaveBeenCalledWith({ updatedUser: { email: 'updated@example.com', role: 'waiter' } });
  });

  it('should handle error 404 if user not found', async () => {
    const req = {
      params: { id: 'invalidId' },
      body: {
        email: 'updated@example.com',
        password: 'password',
        role: 'waiter',
      },
    };
    User.findByIdAndUpdate = jest.fn().mockResolvedValue(null);
    await updateUser(req, res);
    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
      'invalidId',
      { email: 'updated@example.com', password: 'password', role: 'waiter' },
      { new: true },
    );
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
  });

  it('should handle error if cant update user', async () => {
    const req = {
      params: { id: '1' },
      body: {
        email: 'waiter@example.com',
        password: 'password',
        role: 'waiter',
      },
    };
    User.findByIdAndUpdate = jest.fn().mockRejectedValue(new Error('Update error'));
    await updateUser(req, res);
    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
      '1',
      { email: 'waiter@example.com', password: 'password', role: 'waiter' },
      { new: true },
    );
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
});

describe('getUsers', () => {
  it('should return all users', async () => {
    const users = [{ email: 'waiter@example.com' }, { email: 'admin@example.com' }];
    const req = {};
    User.find = jest.fn().mockResolvedValue(users);
    await getUsers(req, res);
    expect(User.find).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(users);
  });

  it('should handle error if cant get users', async () => {
    const req = {};
    User.find = jest.fn().mockRejectedValue(new Error('Query error'));
    await getUsers(req, res);
    expect(User.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
});

/* describe('getUsersById', () => {
  it('should return user by id', async () => {
    const fakeUser = {
      id: '1',
    };
    const req = {
      params: {
        id: '1',
      },
    };
    User.findById = jest.fn().mockRejectedValue(fakeUser);
    await getUsersById(req, res);
    expect(User.findById).toHaveBeenCalledWith('1');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ findUser: fakeUser });
  });
}); */

describe('deleteUser', () => {
  it('should delete user', async () => {
    const fakeUser = {
      id: '1',
    };
    const req = {
      params: {
        id: '1',
      },
    };
    User.findByIdAndDelete = jest.fn().mockResolvedValue(fakeUser);
    await deleteUser(req, res);
    expect(User.findByIdAndDelete).toHaveBeenCalledWith('1');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Success deleted user' });
  });

  it('should handle error 404 if user not found', async () => {
    const req = {
      params: {
        id: 'invalid_id',
      },
    };
    User.findByIdAndDelete = jest.fn().mockResolvedValue(null);
    await deleteUser(req, res);
    expect(User.findByIdAndDelete).toHaveBeenCalledWith('invalid_id');
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
  });

  it('should handle error if cant deleteUser', async () => {
    const req = {
      params: {
        id: 'user_id',
      },
    };
    User.findByIdAndDelete = jest.fn().mockRejectedValue(new Error('Query error'));
    await deleteUser(req, res);
    expect(User.findByIdAndDelete).toHaveBeenCalledWith('user_id');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
});

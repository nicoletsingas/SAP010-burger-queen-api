const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const auth = require('../auth');
const User = require('../../models/User');
// const { secret } = require('../config');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockUser = {
  email: 'test@email.com',
  password: bcrypt.hashSync('password123', 10),
  role: 'waiter',
};

jest.mock('../../models/User');

describe('Auth controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a valid JWT token when login with correct credentials', async () => {
    const req = {
      body: {
        email: mockUser.email,
        password: 'password123',
      },
    };
    const res = mockResponse();
    User.findOne.mockResolvedValue(mockUser);
    await auth.login(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ token: expect.any(String) }));
  });

  it('should return error 400 if email and password not provided', async () => {
    const req = {
      body: {},
    };
    const res = mockResponse();
    await auth.login(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Bad request' });
  });

  it('shoul return error 404 if user is not found', async () => {
    const req = {
      body: {
        email: 'usuarioinexistente@email.com',
        password: 'password123',
      },
    };
    const res = mockResponse();
    User.findOne.mockResolvedValue(null);
    await auth.login(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Not found' });
  });

  it('shoul return error 401 if password is invalid', async () => {
    const req = {
      body: {
        email: mockUser.email,
        password: 'senhaerrada',
      },
    };
    const res = mockResponse();
    User.findOne.mockResolvedValue(mockUser);
    await auth.login(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Invalid password' });
  });

  it('shoul return error 500 if internal error', async () => {
    const req = {
      body: {
        email: mockUser.email,
        password: 'password123',
      },
    };
    const res = mockResponse();
    User.findOne.mockRejectedValue(new Error('internal error'));
    await auth.login(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Internal server error' });
  });
});

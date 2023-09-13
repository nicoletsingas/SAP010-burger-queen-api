const Orders = require('../../models/Orders');
const {
  createOrder,
  updateOrder,
  getOrders,
  getOrdersById,
  deleteOrder,
} = require('../order');

jest.mock('../../models/Orders');

beforeEach(() => {
  jest.clearAllMocks();
});

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe('createOrder', () => {
  it('should success create a new order', async () => {
    const req = {
      body: {
        client: 'nicole',
        userName: 'floquinho',
        status: 'pending',
        products: [{ name: 'Café americano', quantity: 1 }],
      },
    };
    Orders.prototype.save = jest.fn().mockResolvedValue({});
    await createOrder(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(Orders).toHaveBeenCalledWith({
      client: 'nicole',
      userName: 'floquinho',
      status: 'pending',
      products: [{ name: 'Café americano', quantity: 1 }],
    });
  });

  it('should handle error if cant create order', async () => {
    const req = jest.fn().mockRejectedValue(new Error('Cant create order'));
    await createOrder(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
});

describe('updateOrder', () => {
  it('should update order data ', async () => {
    const req = {
      params: { id: '1' },
      body: {
        client: 'nicole',
        userName: 'floquinho',
        status: 'pending',
        products: [{ name: 'Café americano', quantity: 1 }],
      },
    };
    Orders.findByIdAndUpdate = jest.fn().mockResolvedValue(req.body);
    await updateOrder(req, res);
    expect(Orders.findByIdAndUpdate).toHaveBeenCalledWith(
      '1',
      req.body,
      { new: true },
    );
  });

  it('should return error 404 if order is not found', async () => {
    const req = {
      params: { id: 'invalidId' },
      body: {
        client: 'nicole',
        userName: 'floquinho',
        status: 'pending',
        products: [{ name: 'Café americano', quantity: 1 }],
      },
    };
    Orders.findByIdAndUpdate = jest.fn().mockResolvedValue(null);
    await updateOrder(req, res);
    expect(Orders.findByIdAndUpdate).toHaveBeenCalledWith(
      'invalidId',
      req.body,
      { new: true },
    );
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Order not found' });
  });

  it('should return error if cant update order', async () => {
    const req = {
      params: { id: '1' },
      body: {
        client: 'nicole',
        userName: 'floquinho',
        status: 'pending',
        products: [{ name: 'Café americano', quantity: 1 }],
      },
    };
    Orders.findByIdAndUpdate = jest.fn().mockRejectedValue(new Error('Update error'));
    await updateOrder(req, res);
    expect(Orders.findByIdAndUpdate).toHaveBeenCalledWith(
      '1',
      req.body,
      { new: true },
    );
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
});

describe('getOrders', () => {
  it('should return all orders', async () => {
    const orders = [{ client: 'nicole', status: 'pending' }, { client: 'hideki', status: 'completed' }];
    const req = {};
    Orders.find = jest.fn().mockResolvedValue(orders);
    await getOrders(req, res);
    expect(Orders.find).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({ orders });
  });

  it('should handle error if cant get orders', async () => {
    const req = {};
    Orders.find = jest.fn().mockRejectedValue(new Error('Query error'));
    await getOrders(req, res);
    expect(Orders.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
});

describe('getOrdersById', () => {
  it('should return orders by id', async () => {
    const orderMock = {
      client: 'nicole',
      status: 'pending',
    };
    const req = {
      params: { id: '1' },
    };
    Orders.findById = jest.fn().mockResolvedValue(orderMock);
    await getOrdersById(req, res);
    expect(Orders.findById).toHaveBeenCalledWith('1');
    expect(res.json).toHaveBeenCalledWith({ order: orderMock });
  });

  it('should return error 404 if order is not found', async () => {
    const req = {
      params: { id: 'invalidId' },
    };
    Orders.findById = jest.fn().mockResolvedValue(null);
    await getOrdersById(req, res);
    expect(Orders.findById).toHaveBeenCalledWith('invalidId');
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Order not found' });
  });

  it('should return error if cant get order by ID', async () => {
    const req = {};
    Orders.findById = jest.fn().mockRejectedValue(new Error('Query error'));
    await getOrdersById(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
});

describe('deleteOrders', () => {
  it('should delete order', async () => {
    const orderMock = {
      id: '1',
    };
    const req = {
      params: { id: '1' },
    };
    Orders.findByIdAndDelete = jest.fn().mockResolvedValue(orderMock);
    await deleteOrder(req, res);
    expect(Orders.findByIdAndDelete).toHaveBeenCalledWith('1');
    expect(res.json).toHaveBeenCalledWith({ msg: 'Success deleted order' });
  });

  it('should return error 404 if order is not found', async () => {
    const req = {
      params: { id: 'invalidId' },
    };
    Orders.findByIdAndDelete = jest.fn().mockResolvedValue(null);
    await deleteOrder(req, res);
    expect(Orders.findByIdAndDelete).toHaveBeenCalledWith('invalidId');
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Order not found' });
  });

  it('should handle error if cant delete product', async () => {
    const req = {
      params: { id: 'productId' },
    };
    Orders.findByIdAndDelete = jest.fn().mockRejectedValue(new Error('Query error'));
    await deleteOrder(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
});

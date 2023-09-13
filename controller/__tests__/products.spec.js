const Products = require('../../models/Products');
const {
  createProduct,
  updateProduct,
  getProducts,
  getProductsById,
  deleteProduct,
} = require('../products');

jest.mock('../../models/Products');

beforeEach(() => {
  jest.clearAllMocks();
});

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe('createProduct', () => {
  it('should success create a product', async () => {
    const req = {
      body: {
        name: 'Café americano',
        price: 7.50,
        image: 'https://www.cafesetentaysiete.com/wp-content/uploads/2022/03/cafe-americano.png',
        type: 'Café da manhã',
        details: 'café americano 300ml',
      },
    };
    Products.prototype.save = jest.fn().mockResolvedValue({});
    await createProduct(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(Products).toHaveBeenCalledWith({
      name: 'Café americano',
      price: 7.50,
      image: 'https://www.cafesetentaysiete.com/wp-content/uploads/2022/03/cafe-americano.png',
      type: 'Café da manhã',
      details: 'café americano 300ml',
    });
  });

  it('should return a 400 error if any required field is empty', async () => {
    const req = {
      body: {
        name: '',
        price: 7.50,
        image: 'https://www.cafesetentaysiete.com/wp-content/uploads/2022/03/cafe-americano.png',
        type: 'Café da manhã',
        details: 'café americano 300ml',
      },
    };
    await createProduct(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Fields name, price and type are required' });
  });

  it('should return error if cant create a product', async () => {
    const req = jest.fn().mockRejectedValue(new Error('Cant create product'));
    await createProduct(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
});

describe('UpdateProduct', () => {
  it('should update product data', async () => {
    const req = {
      params: { id: '1' },
      body: {
        name: 'Café americano',
        price: 7.50,
        image: 'https://www.cafesetentaysiete.com/wp-content/uploads/2022/03/cafe-americano.png',
        type: 'Café da manhã',
        details: 'café americano 300ml',
      },
    };
    Products.findByIdAndUpdate = jest.fn().mockResolvedValue(req.body);
    await updateProduct(req, res);
    expect(Products.findByIdAndUpdate).toHaveBeenCalledWith(
      '1',
      req.body,
      { new: true },
    );
  });

  it('should return error 404 if product is not found', async () => {
    const req = {
      params: { id: 'invalidId' },
      body: {
        name: 'Café americano',
        price: 7.50,
        image: 'https://www.cafesetentaysiete.com/wp-content/uploads/2022/03/cafe-americano.png',
        type: 'Café da manhã',
        details: 'café americano 300ml',
      },
    };
    Products.findByIdAndUpdate = jest.fn().mockResolvedValue(null);
    await updateProduct(req, res);
    expect(Products.findByIdAndUpdate).toHaveBeenCalledWith(
      'invalidId',
      {
        name: 'Café americano',
        price: 7.50,
        image: 'https://www.cafesetentaysiete.com/wp-content/uploads/2022/03/cafe-americano.png',
        type: 'Café da manhã',
        details: 'café americano 300ml',
      },
      { new: true },
    );
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Product not found' });
  });

  it('should handle error if cant update product', async () => {
    const req = {
      params: { id: '1' },
      body: {
        name: 'Café americano',
        price: 7.50,
        image: 'https://www.cafesetentaysiete.com/wp-content/uploads/2022/03/cafe-americano.png',
        type: 'Café da manhã',
        details: 'café americano 300ml',
      },
    };
    Products.findByIdAndUpdate = jest.fn().mockRejectedValue(new Error('Update error'));
    await updateProduct(req, res);
    expect(Products.findByIdAndUpdate).toHaveBeenCalledWith(
      '1',
      {
        name: 'Café americano',
        price: 7.50,
        image: 'https://www.cafesetentaysiete.com/wp-content/uploads/2022/03/cafe-americano.png',
        type: 'Café da manhã',
        details: 'café americano 300ml',
      },
      { new: true },
    );
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
});

describe('getProducts', () => {
  it('should return all products', async () => {
    const products = [{ name: 'Café americano' }, { name: 'Misto quente' }];
    const req = {};
    Products.find = jest.fn().mockResolvedValue(products);
    await getProducts(req, res);
    expect(Products.find).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({ products });
  });

  it('should handle error if cant get products', async () => {
    const req = {};
    Products.find = jest.fn().mockRejectedValue(new Error('Query error'));
    await getProducts(req, res);
    expect(Products.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
});

describe('getProductsById', () => {
  it('should return product by id', async () => {
    const productMock = {
      id: '1',
      name: 'Café americano',
    };
    const req = {
      params: {
        id: '1',
      },
    };
    Products.findById = jest.fn().mockResolvedValue(productMock);
    await getProductsById(req, res);
    expect(Products.findById).toHaveBeenCalledWith('1');
    expect(res.json).toHaveBeenCalledWith({ product: productMock });
  });

  it('should return 404 when product is not found', async () => {
    const req = {
      params: { id: 'invalidId' },
    };
    Products.findById = jest.fn().mockResolvedValue(null);
    await getProductsById(req, res);
    expect(Products.findById).toHaveBeenCalledWith('invalidId');
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Product not found' });
  });

  it('should handle error if cant get products by ID', async () => {
    const req = {};
    Products.findById = jest.fn().mockRejectedValue(new Error('Query error'));
    await getProductsById(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
});

describe('deleteProducts', () => {
  it('should delete product', async () => {
    const mockProduct = {
      id: '1',
    };

    const req = {
      params: { id: '1' },
    };
    Products.findByIdAndDelete = jest.fn().mockResolvedValue(mockProduct);
    await deleteProduct(req, res);
    expect(Products.findByIdAndDelete).toHaveBeenCalledWith('1');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Success deleted product' });
  });

  it('should return error 404 if product is not found', async () => {
    const req = {
      params: { id: 'invalidId' },
    };
    Products.findByIdAndDelete = jest.fn().mockResolvedValue(null);
    await deleteProduct(req, res);
    expect(Products.findByIdAndDelete).toHaveBeenCalledWith('invalidId');
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Product not found' });
  });

  it('should handle error if cant delete product', async () => {
    const req = {
      params: { id: 'productId' },
    };
    Products.findByIdAndDelete = jest.fn().mockRejectedValue(new Error('Query error'));
    await deleteProduct(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
});

const port = process.argv[2] || process.env.PORT || 8080;
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/test';
const secret = process.env.JWT_SECRET || 'esta-e-api-burger-queen';
const adminEmail = process.env.ADMIN_EMAIL || 'admin@email.com';
const adminPassword = process.env.ADMIN_PASSWORD || '123456';

module.exports = {
  port,
  dbUrl,
  secret,
  adminEmail,
  adminPassword,
};

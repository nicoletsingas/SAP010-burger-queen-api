port = process.argv[2] || process.env.PORT || 8080;
dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/test';
secret = process.env.JWT_SECRET || 'esta-e-api-burger-queen';
adminEmail = process.env.ADMIN_EMAIL || 'admin@localhost';
adminPassword = process.env.ADMIN_PASSWORD || 'changeme';

module.exports = {
  port,
  dbUrl,
  secret,
  adminEmail,
  adminPassword
};
export default () => ({
  jwt: {
    secret: process.env.SECRET_KEY || 'expense_secret',
    expires: process.env.EXPIRES_IN || 3600,
  },
});

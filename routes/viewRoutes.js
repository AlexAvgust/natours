const express = require('express');
const {
  getTour,
  getOverview,
  getLogin,
  getAccount,
  updateUserData,
  renderResetPassword
} = require('../controllers/viewsController');
const {
  isLoggedIn,
  protect,
  resetPassword
} = require('../controllers/authController');

const router = express.Router();

router.get('/', isLoggedIn, getOverview);
router.get('/tours/:slug', isLoggedIn, getTour);
router.get('/login', isLoggedIn, getLogin);
router.get('/me', protect, getAccount);
router.patch('/submit-user-data', protect, updateUserData);
router.get('/resetPassword/:token', renderResetPassword, resetPassword);
module.exports = router;

const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  //get tour data
  //build template
  // render that template using tour data from 1
  const tours = await Tour.find();
  res.status(200).render('overview', {
    tours,
    title: 'All tours'
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  try {
    const tour = await Tour.find({ slug: req.params.slug }).populate({
      path: 'reviews',
      fields: 'review rating user'
    });

    res
      .status(200)
      .set(
        'Content-Security-Policy',
        'connect-src https://*.tiles.mapbox.com https://api.mapbox.com https://events.mapbox.com'
      )
      .render('tour', {
        tour: tour[0],
        title: tour[0].name
      });
  } catch (e) {
    return next(new AppError('There is no tour with this name', 404));
  }
});

exports.getLogin = (req, res, next) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('login', {});
};

exports.getAccount = (req, res, next) => {
  console.log(req.user);
  res.status(200).render('account', {
    title: 'Your Account',
    user: req.user
  });
};

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email
    },
    {
      new: true,
      runValidators: true
    }
  );
  res.status(200).render('account', {
    title: 'Your Account',
    user: updatedUser
  });
});

exports.renderResetPassword = catchAsync(async (req, res, next) => {
  res.status(200).render('resetPassword');
});

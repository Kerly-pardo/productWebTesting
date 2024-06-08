var jwt = require('jsonwebtoken');
var config = require('../middlewares/config.json');

var db = require('../config/db');

var User = db.User;

/**
 * @type {{error: string}}
 */
var error = {error: "error"};

/**
 * @method
 * @description This method use for get all list of users
 * @returns {Promise<*>}
 */
var getAllUsers = async function () {
  return await User.find().select('firstname lastname email phone status id').exec();

  // return await User.find().select('firstname lastname email phone status id').exec(); // by soft delete
};

/**
 * @method
 * @param userParam
 * @description This method use for create user, and receive userParam object
 * @returns {Promise}
 */
var createUser = async function (userParam) {
  if (userParam === undefined || await User.findOne({email: userParam.email})) {
    throw {code: 409, message: 'User ' + userParam.email + ' is already taken'};
  }
  var user = new User(userParam);
  user.status = true;
  await user.save();

  return getUserByEmail(userParam.email);
};

/**
 * @method
 * @description This method use for get user by email, and receive email object
 * @param email lmedy23w@gesties.com
 * @returns {Promise<*>}
 */
var getUserByEmail = async function (email) {
  var user = await User.findOne({email: email, status: true})
    .select('firstname lastname email phone status id').exec();

  if (!user) {
    throw {code: 404, message: 'User ' + email + ' does not exist'};
  }

  return user;
};

/**
 * @method
 * @description This method use for update user by email, and receive email object
 * @param email
 * @param userParam
 * @returns {Promise<*>}
 */
var updateUserByEmail = async function (email, userParam) {
  var userForUpdate = await User.findOne({email: email, status: true});

  if (!userForUpdate) {
    throw {code: 404, message: 'User ' + email + ' does not exist'};
  }

  var userUpdatedResult = await User.findByIdAndUpdate(userForUpdate.id,
    {firstname: userParam.firstname, lastname: userParam.lastname, phone: userParam.phone});

  if (userUpdatedResult && userUpdatedResult.errors) {
    throw {code: 400, message: userUpdatedResult.errors};
  }

  return getUserByEmail(userForUpdate.email);
};

/**
 * @method
 * @description This method use for delete user by email
 * @param email
 * @returns {Promise<*>}
 */
var deleteUserByEmail = async function (email) {
  var userForSoftDelete = await User.findOne({email: email, status: true});

  if (!userForSoftDelete) {
    throw {code: 404, message: 'User ' + email + ' does not exist'};
  }

  var userSoftDeleteResult = await User.findByIdAndUpdate(userForSoftDelete.id,
    {status: false});

  if (userSoftDeleteResult && userSoftDeleteResult.errors) {
    throw {code: 400, message: userSoftDeleteResult.errors};
  }
};

/**
 * @method
 * @description This method use for sign user by email and password
 * @param email
 * @param password
 * @returns {Promise}
 */
var authenticate = async ({email, password}) => {
  var userForAuth = await User.findOne({email: email, password: password});

  if (!userForAuth) {
    throw {code: 400, message: 'Please check the credentials'};
  }

  var userAuth = {
    email: email,
    firstname: userForAuth.firstname,
    lastname: userForAuth.lastname,
    phone: userForAuth.phone,
    status: userForAuth.status,
    id: userForAuth.id
  };

  userAuth.token = jwt.sign(
    {
      sub:
        {
          email: email,
          firstname: userAuth.firstname,
          lastname: userAuth.lastname,
          locale: 'CO',
          roles: {
            is_admin: true,
            is_user: true
          }
        }
    },
    config.secret,
    {expiresIn: '120m'}
  );

  return userAuth;
};

/**
 * @description Export services for use in the controller or routes * @type {{getUserByEmail: (function(*): Promise),
 * getAllUsers: (function(): Promise),
 * authenticate: (function({email: *, password: *}): Promise),
 * createUser: (function(*): Promise),
 * deleteUserByEmail: (function(*): Promise),
 * updateUserByEmail: (function(*, *): Promise)}}
 */
module.exports = {
  getAllUsers,
  createUser,
  getUserByEmail,
  updateUserByEmail,
  deleteUserByEmail,
  authenticate
};
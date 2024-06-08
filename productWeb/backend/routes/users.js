var express = require('express');
var router = express.Router();
var userService = require('../services/users');
var verifyToken = require("../middlewares/authMiddleware");

/**
 * @method
 * @description This method use with receive request HTTP GET through middleware from Node.JS and expressJS and response
 * object Request. Use method or verb GET
 * @param req
 * @param res
 * @param next
 */
var getAllUsers = function (req, res, next) {
  userService.getAllUsers()
    .then(users => res.json(users))
    .catch(err => next(err));
};

/**
 * @method
 * @description This method use with receive request HTTP POST through middleware from Node.JS and expressJS and
 * response object Request. Use method or verb POST
 * @param req
 * @param res
 * @param next
 */
var createUser = function (req, res, next) {
  userService.createUser(req.body)
    .then((user) => res.status(201).json(user))
    .catch(err => res.status(409).json(err));
};

/**
 * @method
 * @description This method use with receive an email request HTTP GET through middleware from Node.JS and expressJS
 * and response object Request. Use method or verb GET
 * @param req
 * @param res
 * @param next
 */
var getUserByEmail = function (req, res, next) {
  userService.getUserByEmail(req.params.email)
    .then((user) => res.status(200).json(user))
    .catch(err => res.status(404).json(err));
}

/**
 * @method
 * @description This method use with receive an email and body request HTTP PUT through middleware
 * from Node.JS and expressJS and response object Request. Use method or verb PUT
 * @param req
 * @param res
 * @param next
 */
var updateUserByEmail = function (req, res, next) {
  userService.updateUserByEmail(req.params.email, req.body)
    .then((user) => res.json(user))
    .catch(err => res.status(404).json(err));
};

/**
 * @method
 * @description This method use with receive an email by request HTTP DELETE through middleware
 * from Node.JS and expressJS and response No Content Request. Use method or verb DELETE
 * @param req
 * @param res
 * @param next
 */
var deleteUserByEmail = (req, res, next) => {
  userService.deleteUserByEmail(req.params.email)
    .then(() => res.sendStatus(204))
    .catch(err => res.status(404).json(err));
};

/**
 * @method
 * @description This method use with receive body by request HTTP POST through middleware
 * from Node.JS and expressJS and response the user data with authentication token. Use method or verb POST
 * @param req
 * @param res
 * @param next
 */
var authenticate = (req, res, next) => {
  userService.authenticate(req.body)
    .then(user => res.json(user))
    .catch(err => res.status(400).json(err));
};

/**
 * @description This definition section is responsible for indicating the methods or verbs that HTTP uses to receive
 * the Request and its respective Response.
 */
router.get('/', verifyToken, getAllUsers);
router.post('/create', createUser);
router.delete('/:email/delete', verifyToken, deleteUserByEmail);
router.put('/:email/update', verifyToken, updateUserByEmail);
router.get('/:email/detail', verifyToken, getUserByEmail);
router.post('/authenticate', authenticate);

module.exports = router;
const { check, validationResult, body } = require("express-validator");

exports.registerValidator = [
    check('companyname').not().isEmpty().trim().withMessage('CompanyName must have more than 2 characters').isLength({ min: 2 }),
    check('domainname', 'DomainName must have more than 2 characters').not().isEmpty().trim().isLength({ min: 2 }),
    check('firstname', 'FirstName must have more than 2 characters').not().isEmpty().trim().isLength({ min: 2 }),
    check('lastname', 'FirstName must have more than 2 characters').not().isEmpty().trim().isLength({ min: 2 }),
    check('mobile', 'Enter valid Mobile No.').not().isEmpty().trim().isLength({ min: 7 }),
    check('email', 'Enter valid Email or User Already exist').not().isEmpty().trim().isEmail().isLength({ min: 2 }),
    check('password', 'Password must atleast be 5 character').not().isEmpty().trim().isLength({ min: 5 }),

]

exports.loginValidator = [
    check('email', 'Enter valid Email or User Already exist').not().isEmpty().trim().isEmail().isLength({ min: 2 }),
    check('password', 'Password must atleast be 5 character').not().isEmpty().trim().isLength({ min: 5 }),
]

exports.verifymailValidator = [
    check('email', 'Enter valid Email or User Already exist').not().isEmpty().trim().isEmail().isLength({ min: 2 }),
]

exports.passwordForgotValidator = [
    check('email', 'Enter valid Email or User Already exist').not().isEmpty().trim().isEmail().isLength({ min: 2 }),
]

exports.passwordResetValidator = [
    
]
import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const handleValidationError = (req: Request, res: Response, nf: NextFunction) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }

    nf() 
};


export const validateMember = [

  body('first_name').isLength({ max: 100 }).isString().notEmpty(),
    
  body('last_name').isLength({ max: 100 }).isString().notEmpty(),

  body('date_of_entry').isDate().notEmpty(),

  body('email').isEmail().normalizeEmail().notEmpty(),

  body('gender').isLength({ max: 1 }).isString().notEmpty(),

  body('phone').isMobilePhone("any").notEmpty(), 

  body('birthday').isDate().notEmpty(),

  body('address.country').notEmpty().notEmpty(),

  body('address.post_code').isLength({ max: 100 }).isString().notEmpty(),

  body('address.street_name').isLength({ max: 100 }).isString().notEmpty(),

  body('address.street_number').isNumeric().notEmpty(),

  body('address.floor').isLength({ max: 100}).isString(),

  body('address.apartment').isLength({ max: 100}).isString(),

  body('image.name').isLength({ max: 100 }).isString().notEmpty(),

  body('image.description').isLength({ max: 300 }).isString().notEmpty(),

  body('image.type').isLength({ max: 10 }).isString().notEmpty(),

  body('image.url').isLength({ max: 1000 }).isURL().notEmpty(),

];


export const validateUpdateMember = [

  body('first_name').isLength({ max: 100 }).isString().optional(),
    
  body('last_name').isLength({ max: 100 }).isString().optional(),

  body('date_of_entry').isDate().optional(),

  body('email').isEmail().normalizeEmail().optional(),

  body('gender').isLength({ max: 1 }).isString().optional(),

  body('phone').isMobilePhone("any").optional(), 

  body('birthday').isDate().optional(),

  body('address.country').isString().isLength({ max: 100 }).optional(),

  body('address.post_code').isLength({ max: 100 }).isString().optional(),

  body('address.street_name').isLength({ max: 100 }).isString().optional(),

  body('address.street_number').isNumeric().optional(),

  body('address.floor').isLength({ max: 100}).isString().optional(),

  body('address.apartment').isLength({ max: 100}).isString().optional(),

  body('image.name').isLength({ max: 100 }).isString().optional(),

  body('image.description').isLength({ max: 300 }).isString().optional(),

  body('image.type').isLength({ max: 10 }).isString().optional(),

  body('image.url').isLength({ max: 1000 }).isURL().optional(),

];

 
export const validateClub = [

  body('name').isLength({ max: 100 }).isString().optional(),
    
  body('description').isLength({ max: 4000 }).isString().optional(),

];

export const validateEvent = [

  body('name').isLength({ max: 100 }).isString().optional(),
    
  body('description').isLength({ max: 10000 }).isString().optional(),

  body('is_public').isBoolean().optional(),

  body('start_at').isDate().optional(),

  body('ends_at').isDate().optional(),

  body('capacity').isNumeric().optional(),

];



export const validateUserRegistration = [

  body('password').notEmpty().withMessage('Password is required.'),
  body('password').isLength({ min: 8, max: 20 }).withMessage('Password must be between 8 and 20 characters long.'),
  body('password').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':;?/>.<,|`\]\[-]).{8,20}$/).withMessage('Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.'),
 
  body('username').notEmpty().withMessage('Email is required.'),
  body('username').isEmail().withMessage('Email is not valid.')
 ];
 
 
 export const validateUserLogin = [
 
  body('username').notEmpty().withMessage('Username is required.'),
  body('password').notEmpty().withMessage('Password is required.')
 ];
 
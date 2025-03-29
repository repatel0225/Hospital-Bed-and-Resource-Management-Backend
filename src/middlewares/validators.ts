import Joi from "joi";

// validation schema for SignUp
export const signUpSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required().min(5),
  //password should have at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character:
  password: Joi.string()
    .required()
    .pattern(
      new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
    ),
  role: Joi.string().valid("user", "admin").default("user"),
});

export const signInSchema = Joi.object({
  email: Joi.string().email().required().min(5),
  //password should have at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character:
  password: Joi.string()
    .required()
    .pattern(
      new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
    ),
});

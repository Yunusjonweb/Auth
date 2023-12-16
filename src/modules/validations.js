const Joi = require("joi");

const SignUpValidation = async (data) => {
  const schema = Joi.object({
    full_name: Joi.string().min(5).max(50).required(),
    username: Joi.string().min(4).max(25).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
  });

  try {
    const validatedData = await schema.validateAsync(data);
    return { value: validatedData };
  } catch (error) {
    return { error };
  }
};

module.exports = { SignUpValidation };

const LoginValidation = async (data) => {
  const schema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
  });

  try {
    const validatedData = await schema.validateAsync(data);
    return { value: validatedData };
  } catch (error) {
    return { error };
  }
};

module.exports = { LoginValidation };

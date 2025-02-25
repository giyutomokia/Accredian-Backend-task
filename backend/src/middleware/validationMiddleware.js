import Joi from "joi";

const referralSchema = Joi.object({
  referredBy: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
  referee: Joi.string().required(),
  message: Joi.string().allow(""),
});

export const validateReferral = (req, res, next) => {
  const { error } = referralSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

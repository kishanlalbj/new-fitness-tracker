import Joi from "joi";

const validateHealthStat = (stat) => {
  const JoiSchema = Joi.object({
    weight: Joi.number().strict().required().label("weight"),
    neck: Joi.number().strict().required().label("neck"),
    waist: Joi.number().strict().required().label("waist"),
  });

  return JoiSchema.validate(stat);
};

const validateRegisterData = (data) => {
  const JoiSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    password: Joi.string().strict().required(),
    dateOfBirth: Joi.string().required(),
    height: Joi.number().strict().required(),
    gender: Joi.string(),
  });

  return JoiSchema.validate(data);
};

export { validateHealthStat, validateRegisterData };

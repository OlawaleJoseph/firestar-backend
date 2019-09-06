import models from '../models';

export const checkIfExistsInDb = async (Model, id, errorMessage) => {
  try {
    const exists = await Model.findOne({
      attributes: ['id', 'name'],
      where: {
        id
      }
    });
    if (exists) return exists.dataValues;
    throw new Error(errorMessage);
  } catch (error) {
    throw new Error(errorMessage);
  }
};

export const findByEmail = async (email) => {
  try {
    const foundUser = await models.User.findOne({
      where: {
        email
      }
    });
    if (!foundUser) {
      throw new Error('User with the given email does not exist');
    }
    return foundUser;
  } catch (error) {
    error.status = 404;
    throw new Error(error.message);
  }
};

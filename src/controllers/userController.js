import UserService from '../services/userServices';
import Util from '../utils/index';
import Helper from '../middlewares/index';
const { findUserById, updateUser } = UserService;
const util = new Util();

/** Class representing user controller. */
class UserController {
  /**
  * get user profile
  * @param {Object} req - server request
  * @param {Object} res - server response
  * @returns {Object} - custom response
  * @description get details of registered user
  */
  static async getUserProfile(req, res) {
    const { id } = req.params;
    try {
      const user = await findUserById(id);
      const token = Helper.generateToken(id);
      console.log(token)
      if (!user) {
        util.setError(401, `User with id: ${id} not found`);
        return util.send(res);
      }
      util.setSuccess(200, 'Succesfully found user', user);
      return util.send(res);
    } catch (error) {
      console.log('dssad')
      util.setError(401, error.message);
      return util.send(res);
    }
  }

  /**
  * update user profile
  * @param {Object} req - server request
  * @param {Object} res - server response
  * @returns {Object} - custom response
  * @description get's details of registered user
  */
  static async updateUserProfile(req, res) {
    const { id } = req.params;
    if (req.user.id !== id) {
      util.setError(401, 'Unauthorized')
      return util.send(res)
    }

    const {
      firstName, lastName, birthdate, preferredLanguage,
      preferredCurrency, gender, company, lineManager,
      residentialLocation, countryCode, department
    } = req.body;

    try {
      const values = {
        firstName, lastName, birthdate, preferredLanguage,
        preferredCurrency, gender, company, lineManager,
        residentialLocation, countryCode, department
      };
      const updatedUser = await updateUser(id, values);

      util.setSuccess(
        201,
        'You ve successfully updated your profile',
        updatedUser
      );
      return util.send(res);
    } catch (error) {
      util.setError(401, 'undefined property');
      return util.send(res);
    }
  }
}

export default UserController;

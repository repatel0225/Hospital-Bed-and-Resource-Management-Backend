import { IUser } from "../interfaces/users";
import { User } from "../models/users.model";

// To insert new user into the user document
const createNewUser = async (employee: IUser) => {
  const newUser = await User.create(employee);
  return await User.findById(newUser._id).select("-password");
};
// To check the entered user details correct or not
const checkLoginUserDetails = async (req: any) => {
  const userData = {
    email: req.email,
    password: req.password,
  };
  return await User.findOne({email:userData.email}).select('+password');
};

// To check the user details already exists in user document
const checkUserAlreadyExists = async (email: string) => {
  return await User.findOne({ email: email });
};

export const userService = {
  createNewUser,
  checkLoginUserDetails,
  checkUserAlreadyExists,
};

import { User } from './user.interface';
import { UserModel } from './user.model';

const createUserIntoDB = async (user: User) => {
  if (await UserModel.isUserExists(user.userId)) {
    throw new Error('User already exists!');
  }
  const result = await UserModel.create(user);
  return result;
};

const getUserFromDB = async () => {
  const result = await UserModel.find().select(
    '-_id username fullName age email address',
  );
  return result;
};

const getSingleUserFromDB = async (userId: Number) => {
  // const result = await UserModel.aggregate([{ $match: { userId } }]);
  const result = await UserModel.find({ userId }).select(
    '-_id username fullName age email address',
  );
  return result;
};

const updateUserIntoDB = async (user: User , id: Number) => {
    const filter = {userId: id}
  
    const result = await UserModel.findOneAndUpdate(filter, user);
    return result;
  
};

export const UserServices = {
  createUserIntoDB,
  getUserFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
};

import { Product, User } from './user.interface';
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
  const result = await UserModel.find({ userId }).select(
    '-_id username fullName age email address',
  );
  return result;
};

const updateUserIntoDB = async (user: User, id: Number) => {
  const filter = { userId: id };

  const result = await UserModel.findOneAndUpdate(filter, user);
  return result;
};
const deleteSingleUserFromDB = async (userId: Number) => {
  const result = await UserModel.deleteOne({ userId });
  return result;
};

const putSingeOrderIntoDB = async (order: Product, id: Number) => {
  const filter = { userId: id };
  const updateDoc = {
    $set: {
      orders: order,
    },
  };

  const result = await UserModel.updateOne(filter, updateDoc, { upsert: true });
  return result;
};
const getSingleOrderFromDB = async (userId: Number) => {
  const result = await UserModel.find({ userId }).select('-_id orders');
  return result;
};
const getSingleOrderSumFromDB = async (userId: Number) => {
  const result = await UserModel.aggregate([
    { $match: { userId } },
    { $unwind: '$orders' },
    {
      $group: {
        _id: '$userId',
        totalPrice: {
          $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
        },
      },
    },
    {
      $project: {
        _id: 0,
        totalPrice: 1,
      },
    },
  ]);
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getUserFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteSingleUserFromDB,
  putSingeOrderIntoDB,
  getSingleOrderFromDB,
  getSingleOrderSumFromDB,
};

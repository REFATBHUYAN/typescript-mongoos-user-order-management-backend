import { Request, Response } from 'express';
import { UserServices } from './user.service';
import UserValidationSchema from './user.zodvalidation';
import { User } from './user.interface';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    // zod validation data
    const userParseData = UserValidationSchema.parse(user);

    const result = await UserServices.createUserIntoDB(userParseData);
    const {
      userId,
      username,
      password,
      fullName,
      age,
      email,
      isActive,
      hobbies,
      address,
    } = result;
    const allData = {
      userId,
      username,
      fullName,
      age,
      email,
      isActive,
      hobbies,
      address,
    };

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: allData,
    });
  } catch (error) {
    console.log(error);
  }
};

const allUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getUserFromDB();
    // const {username, fullName, age, email, address}: any = result;
    // const getUser = {username, fullName, age, email, address};

    res.status(200).json({
      success: true,
      message: 'User  fetched  successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);

    const result = await UserServices.getSingleUserFromDB(userId);

    if (result.length === 0) {
      res.status(200).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'User  fetched  successfully!',
        data: result,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const data = req.body;

    const result = await UserServices.updateUserIntoDB(data, userId);
    // res.status(200).json({
    //   success: true,
    //   message: 'User  fetched  successfully!',
    //   data: result,
    // });

    if (result === null) {
      res.status(200).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'User  fetched  successfully!',
        data: result,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const UserControler = {
  createUser,
  allUser,
  getSingleUser,
  updateSingleUser,
};

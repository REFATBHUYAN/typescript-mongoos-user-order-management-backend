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

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
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
const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);

    const result = await UserServices.deleteSingleUserFromDB(userId);
    
    if (result.deletedCount === 0) {
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
        data: null,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const putSingleOrder = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const data = req.body;

    const result = await UserServices.putSingeOrderIntoDB(data, userId);

    if (result.modifiedCount === 0) {
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
        message: 'Order created successfully!',
        data: null,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getSingleUserOrder = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);

    const result = await UserServices.getSingleOrderFromDB(userId);

    if (result.length === 0) {
      res.status(200).json({
        success: false,
        message: 'Order not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'User  fetched  successfully!',
        data: result[0],
      });
    }
  } catch (error) {
    console.log(error);
  }
};
const getSingleUserOrderSum = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);

    const result = await UserServices.getSingleOrderSumFromDB(userId);
   
    res.status(200).json({
      success: true,
      message: 'User  fetched  successfully!',
      data: result[0],
    });

    // if (result > 0) {
    //   res.status(200).json({
    //     success: false,
    //     message: 'Order not found',
    //     error: {
    //       code: 404,
    //       description: 'User not found!',
    //     },
    //   });
    // } else {
    //   res.status(200).json({
    //     success: true,
    //     message: 'User  fetched  successfully!',
    //     data: result[0],
    //   });
    // }
  } catch (error) {
    console.log(error);
  }
};

export const UserControler = {
  createUser,
  allUser,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  putSingleOrder,
  getSingleUserOrder,
  getSingleUserOrderSum
};

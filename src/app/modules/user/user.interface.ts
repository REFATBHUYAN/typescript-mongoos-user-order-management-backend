import { Schema, model, connect, Model } from 'mongoose';



export type Product = {
  productName: string;
  price: number;
  quantity: number;
};

export type User = {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  orders?: Product[]


}

export interface UserMod extends Model<User> {
  isUserExists(id: Number): Promise<User | null>;
}

// type UserMethod = {
//   isUserExists(id: string): Promise<User | null>;
// }

// export type UserModel = Model<User, Record<string, never>, UserMethod>;
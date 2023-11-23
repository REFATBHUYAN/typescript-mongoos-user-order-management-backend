import { Schema, model } from 'mongoose';
import { Product, User } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const productSchema = new Schema<Product>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userSchema = new Schema<User>({
  userId: { type: Number, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: [{ type: String, required: true }],
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  orders: [{ type: productSchema, required: false }],
});

// pre save middleware
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// post save middleware / hook
userSchema.post('save', function (doc, next) {
  doc.password = '';
  
  next();
});

export const UserModel = model<User>('User', userSchema);

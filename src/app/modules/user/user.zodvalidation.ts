import { z } from 'zod';

// Define a schema for the product
const ProducValidationtSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

// Define a schema for the user
const UserValidationSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string(),
  fullName: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }),
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
  }),
  orders: z.array(ProducValidationtSchema).optional(),
});


export default UserValidationSchema;

// Example usage:
// const userData = {
//   // ... your user data
// };

// const validationResult = UserValidationSchema.validate(userData);

// validationResult will contain the validated data or throw an error if validation fails

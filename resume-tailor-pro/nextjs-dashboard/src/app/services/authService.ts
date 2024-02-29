import { hash, verify } from "argon2";
import UserModel, { User } from '../../models/auth';

interface ServiceResponse<T> {
  data: T | null;
  message: string | null;
}

export async function createUser(username: string, email: string, password: string): Promise<ServiceResponse<User>> {
  const hashedPassword = await hash(password);
  try {

    const newUser = new UserModel({ username, email, password: hashedPassword });

    const user: User = await newUser.save();


    return { data: user, message: "created" };
  } catch (error) {
    console.error('Error creating user:', error);
    return { data: null, message: 'Error creating user' };
  }
}

export async function getUserByUsername(username: string): Promise<ServiceResponse<User>> {
  try {
    const user: User | null = await UserModel.findOne({ username });
    if (!user) {
      return { data: null, message: 'User not found' };
    }
    return { data: user, message: null };
  } catch (error) {
    console.error('Error getting user by username:', error);
    return { data: null, message: 'Error getting user by username' };
  }
}

export async function getUserByEmail(email: string): Promise<ServiceResponse<User>> {
  try {
    const user: User | null = await UserModel.findOne({ email });
    if (!user) {
      return { data: null, message: 'User not found' };
    }
    return { data: user, message: null };
  } catch (error) {
    console.error('Error getting user by email:', error);
    return { data: null, message: 'Error getting user by email' };
  }
}

export async function updateUser(id: string, updates: Partial<User>): Promise<ServiceResponse<User>> {
  try {
    const user: User | null = await UserModel.findByIdAndUpdate(id, updates, { new: true });
    if (!user) {
      return { data: null, message: 'User not found' };
    }
    return { data: user, message: null };
  } catch (error) {
    console.error('Error updating user:', error);
    return { data: null, message: 'Error updating user' };
  }
}

export async function deleteUser(id: string): Promise<ServiceResponse<boolean>> {
  try {
    const result = await UserModel.findByIdAndDelete(id);
    if (!result) {
      return { data: null, message: 'User not found' };
    }
    return { data: true, message: null };
  } catch (error) {
    console.error('Error deleting user:', error);
    return { data: null, message: 'Error deleting user' };
  }
}

export async function signIn(email: string, password: string): Promise<ServiceResponse<User>> {
  try {
    // Fetch user by email
    const user: User | null = await UserModel.findOne({ email });
    
    console.log(user, "signin")
    if (!user) {
      return { data: null, message: 'User not found' };
    }
    
    // Verify password
    const isValidPassword = await verify(user.password, password);
    if (!isValidPassword) {
      return { data: null, message: 'Incorrect password' };
    }
    
    return { data: user, message: "login successfull" };
  } catch (error) {
    console.error('Error signing in user:', error);
    return { data: null, message: 'Error signing in user' };
  }
}

export async function signOut(userId: string): Promise<ServiceResponse<boolean>> {
  try {
    // Perform sign-out logic if any
    return { data: true, message: null };
  } catch (error) {
    console.error('Error signing out user:', error);
    return { data: null, message: 'Error signing out user' };
  }
}

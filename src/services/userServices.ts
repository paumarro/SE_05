import Member from '../database/models/members';
import { User } from '../database/models/users'
import bcrypt from "bcrypt";
import { RegisterUserProps } from '../types/interfaces';

interface LoginResponse {
  error: boolean;
  status?: number;
  msg: string;
  user?: any;
}

export const loginService = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    const user: any = await User.findOne({ where: { username: username } });

    if (!user) {
      return { error: true, status: 401, msg: "Invalid credentials" };
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      console.log(user.password)
      console.log(password)
      return { error: true, status: 401, msg: "Invalid credentialsS" };
    };
    
    return { error: false, user: user, msg: "Success" };
  } catch (err) {
    console.error(err);
    return { error: true, status: 500, msg: "Server error" };
  }
};


//Fix error handeling in try block
//make the username linked to the Member.email, without it needing to be the same value to remove redundncy
export const registerService = async ({ username, password, isAdmin }: RegisterUserProps) => {
  try {
    if (!password) {
      throw new Error('Please choose a password');
    }

    const member: any = await Member.findOne({ where: { email: username } });
    let user: any = await User.findOne({ where: { username: username } });

    if (isAdmin && member.roleId !== 3) {
      throw new Error('Cannot set isAdmin to true');
    };

    if (!user && member && password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = await User.create({ username, password: hashedPassword, isAdmin, memberId: member.id });
      return newUser;
    }
    if (user && member) {
      throw new Error('This email address is already registered');
    }
    if (!member) {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    throw new Error('Registration not possible');
  }
};



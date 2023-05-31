import { Injectable } from '@nestjs/common';
import { User, UserDocument } from '../shemas/user';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDto } from './dto/user-dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
              private jwtService: JwtService) {
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find();
  }

  async getUserByID(id): Promise<User> {
    return this.userModel.findById(id);
  }

  async sendUser(data): Promise<User> {
    const userData = new this.userModel(data)
    return userData.save();
  }

  async updateUsers(id: string, body): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, body);
  }

  async deleteUsers(): Promise<User> {
    return this.userModel.findByIdAndDelete();
  }

  async deleteUserByID(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id);
  }

  async checkAuthUser(login: string, psw: string): Promise<User[]> {
    const usersArr = await this.userModel.find({login: login, psw: psw});
    return usersArr.length === 0 ? null : usersArr
  }

  async checkRegUser(login: string): Promise<User[]> {
    return this.userModel.find({login: login});
  }

  async login(user: UserDto) {
    const payload = {login: user.login, psw: user.psw};
    const userFromDb = await this.userModel.find({login: user.login})
    return {
      id: userFromDb[0]._id,
      access_token: this.jwtService.sign(payload)
    }
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from  'typeorm';
import { User } from './models/user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){
    }
  
    async all(): Promise<User[]>{
      return await this.userRepository.find()
    }

    async create(body) {
        await this.userRepository.save(body)
        return body 
    }

    async findOne(condition): Promise<User>{
      return await this.userRepository.findOne(condition)
    }
}

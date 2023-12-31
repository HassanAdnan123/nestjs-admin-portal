import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './models/register.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common/exceptions';

@Controller()
export class AuthController {

    constructor(private userService: UserService){

    }
    
    @Post('register')
    async register(@Body() body: RegisterDto){
        if(body.password !== body.confirm_password)
            throw new BadRequestException("Passwords don't match.")

        let hashed = await bcrypt.hash(body.password,12)
        body.password = hashed
        return this.userService.create(body)
    }

    @Post('login')
    async login(
        @Body("email") email: string, 
        @Body("password") password: string
    ){
        const user = await this.userService.findOne({where: {email}})
        
        if(!user){
            throw new NotFoundException("User not found")
        }

        if(! await bcrypt.compare(password,user.password)){
            throw new BadRequestException("Invalid credentials")
        }

        return user
    }
}

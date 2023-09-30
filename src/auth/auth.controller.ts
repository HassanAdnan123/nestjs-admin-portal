import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';

@Controller()
export class AuthController {

    constructor(private userService: UserService){

    }
    
    @Post('register')
    async register(@Body() body){
        let hashed = await bcrypt.hash(body.password,12)
        body.password = hashed
        return this.userService.create(body)
    }
}

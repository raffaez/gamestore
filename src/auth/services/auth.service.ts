import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { MessagesHelper } from '../../helpers/messages.helper';
import { UserLogin } from '../entities/userLogin.entity';
import { UserService } from './../../user/services/user.service';

@Injectable()
export class AuthService{
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ){}

    async login(userLogin: UserLogin){
        const payload = { sub: 'gamestore', username: userLogin.user}

        return {
            user: userLogin.user,
            token: `Bearer ${this.jwtService.sign(payload)}`
        }
    }

    async validateUser(email: string, password:string): Promise<any>{
        const user = await this.userService.findByEmail(email);

        if(!user)
            throw new NotFoundException(MessagesHelper.USER_NOT_FOUND);

        const isPasswordValid = compareSync(password, user.password);

        if(!isPasswordValid) return null;

        return user;

    }
}
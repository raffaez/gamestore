import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import PoolCluster from "mysql2/typings/mysql/lib/PoolCluster";
import { UserLogin } from "../entities/userLogin.entity";
import { AuthService } from "../services/auth.service";

@Controller('/auth')
export class AuthController{
    constructor(private authService: AuthService){}

    @UseGuards(AuthGuard('local'))
    @HttpCode(HttpStatus.OK)
    @Post('/login')
    async login(@Body() user: UserLogin): Promise<any>{
        return this.authService.login(user);
    }
}
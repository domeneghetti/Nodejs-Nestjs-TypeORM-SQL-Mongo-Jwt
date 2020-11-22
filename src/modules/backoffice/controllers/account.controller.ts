import { ChangePasswordDto } from './../dtos/account/change-password.dto';
import { AuthService } from './../../../shared/services/auth.service';
import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { JwtAuthGuard } from 'src/shared/guards/auth.guard';
import { RoleInterceptor } from 'src/shared/interceptors/role.interceptor';
import { Result } from '../models/result.model';
import { AuthenticateDto } from '../dtos/account/authenticate.dto';
import { AccountService } from '../services/account.service';
import { ResetPasswordDto } from '../dtos/account/reset-password.dto';
import { Guid } from 'guid-typescript';

@Controller('v1/accounts')
export class AccountController {
    constructor(private authService: AuthService, private accountService: AccountService) {

    }

    @Post('authenticate')
    async authenticate(@Body() model: AuthenticateDto): Promise<any> {
        const customer = await this.accountService.authenticate(model.username, model.password);

        if(!customer) 
            throw new HttpException(new Result('Usuário ou senha inválida', false, null, null), HttpStatus.UNAUTHORIZED);

        if(!customer.user.active)
            throw new HttpException(new Result('Usuário inativo', false, null, null), HttpStatus.UNAUTHORIZED);

        const token = await this.authService.createToken(customer.document, customer.email, '', customer.user.roles);
        return new Result(null, true, token, null);
    }

    @Post('reset-password')
    async resetPassword(@Body() model: ResetPasswordDto): Promise<any> {
        try {
            const password = Guid.create().toString().substring(0, 8).replace('-', '');
            await this.accountService.update(model.document, {password: password});

            return new Result('Uma nova senha foi enviada para seu E-mail', true, null, null);
        } catch (error) {
            throw new HttpException(new Result('Não foi possivel recuperar sua senha', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post('change-password')
    @UseGuards(JwtAuthGuard)
    async changePassword(@Req() request, @Body() model: ChangePasswordDto): Promise<any> {
        try {
            await this.accountService.update(request.user.document, { password: model.newPassword });
            return new Result('Sua senha foi alterada com sucesso', true, null, null);
        } catch (error) {
            throw new HttpException(new Result('Não foi alterar sua senhaa', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post('refresh')
    @UseGuards(JwtAuthGuard)
    async refreshToken(@Req() request): Promise<any> {
        const token = await this.authService.createToken(request.user.document, request.user.email, request.user.image, request.user.roles);
        return new Result(null, true, token, null);
    }

    // @Post('')
    // async createToken(): Promise<any> {
    //     return await this.authService.createToken();
    // }

    // @Get('')
    // @UseGuards(JwtAuthGuard)
    // @UseInterceptors(new RoleInterceptor(['admin']))
    // findAll() {
    //     return [];
    // }
}
import { QueryDto } from '../dtos/query.dto';
import { Customer } from '../models/customer.model';
import { CustomerService } from '../services/customer.service';
import { AccountService } from '../services/account.service';
import { CreateCustomerDto } from '../dtos/customer/create-customer-dto';
import { Result } from '../models/result.model';
import { Body, CacheInterceptor, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { User } from '../models/user.model';
import { UpdateCustomerDto } from '../dtos/customer/update-customer.dto';
import { CreditCard } from '../models/credit-card.model';
import { Md5 } from 'md5-typescript';

@Controller('v1/customers')
export class CustomerController {

    constructor(private readonly accountServices: AccountService,
                private readonly customerServices: CustomerService) {

    }

    @Post()
    //@UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
    async post(@Body() model: CreateCustomerDto) {
        try {
            const password = await Md5.init(`${model.password}${process.env.SALT_KEY}`);
            const user = await this.accountServices.create(new User(model.document, password, true, ['user']));
            const customer = new Customer(model.name, model.document, model.email, null, null, null, null, user);
            
            const result = await this.customerServices.create(customer);

            return new Result('Cliente criado com sucesso!', true, result, null);
        } catch (error) {
            //Rollback manual
            throw new HttpException(new Result('Não foi possível realizar seu cadastro', false, null, error), HttpStatus.BAD_REQUEST)
        }
    }

    @Put(':document')
    async put(@Param('document') document, @Body() model: UpdateCustomerDto) {
        try {
            await this.customerServices.update(document, model);
            return new Result('Cliente atualizado com sucesso!', true, model, null);
        } catch (error) {
            return new Result('Não foi possível alterar o Cliente!', false, null, error);   
        }
    }

    @Delete(':document')
    delete() {
        return new Result('Cliente removido com sucesso!', true, null, null);
    }

    @Get('getAll')
    @UseInterceptors(CacheInterceptor)
    async getAll() {
        const customers = await this.customerServices.findAll();
        return new Result(null, true, customers, null);
    }

    @Get('getAllWithoutName')
    async getAllWithoutName() {
        const customers = await this.customerServices.findAllWithouName();
        return new Result(null, true, customers, null);
    }

    @Get(':document') 
    async get(@Param('document') document) {
        const customer = await this.customerServices.find(document);
        return new Result(null, true, customer, null);
    }

    @Post('query')
    async query(@Body() model: QueryDto) {
        const customers = await this.customerServices.query(model);
        return new Result(null, true, customers, null);
    }

    @Post(':document/credt-cards')
    async createCreditCard(@Param('document') document, @Body() model: CreditCard) {
        try {
            await this.customerServices.saveOrUpdateCreditCard(document, model);
            return new Result(null, true, model, null);
        } catch (error) {
            throw new HttpException(new Result('Erro ao cadastrar cartão de crédito', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
}
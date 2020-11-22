import { AddressService } from '../services/address.service';
import { Address } from '../models/address.model';
import { Result } from '../models/result.model';
import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from "@nestjs/common";
import { AddressType } from '../enums/address-type.enum';
import { response } from 'express';

@Controller('v1/address')
export class AddressController {

    constructor(private readonly addressService: AddressService) {

    }

    @Post(':document/billing')
    //@UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addBillingAddress(@Param('document') document, @Body() model: Address) {
        try {
            await this.addressService.create(document, model, AddressType.Billing);
            return model;
        } catch(error) {
            throw new HttpException(new Result('Não foi possivel adicionar seu endereço de Cobrança', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post(':document/shipping')
    //@UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addShippingAddress(@Param('document') document, @Body() model: Address) {
        try {
            await this.addressService.create(document, model, AddressType.Shipping);
            return model;
        } catch(error) {
            throw new HttpException(new Result('Não foi possivel adicionar seu endereço de Entrega', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Get('search/:zipcode')
    async search(@Param('zipcode') zipcode) {
        try {
            const response = await this.addressService.getAddressByZipCode(zipcode).toPromise();
            return new Result(null, true, response.data, null);
        } catch (error) {
            throw new HttpException(new Result('Não foi possivel localizar o cep', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
}
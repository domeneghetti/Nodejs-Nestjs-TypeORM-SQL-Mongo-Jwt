import { CreateCustomerDto } from '../../dtos/customer/create-customer-dto';
import { Flunt } from '../../../../utils/flunt';
import { Contract } from '../contract';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateCustomerContract implements Contract {
    errors: any[];

    validate(model: CreateCustomerDto): boolean {
        const flunt = new Flunt();

        console.log("----------------------------------------------------");
        console.log("[model]: " + model);
        console.log("----------------------------------------------------");
        
        flunt.hasMinLen(model.name, 5, 'Nome inválido');
        flunt.isEmail(model.email, 'E-mail inválido');
        flunt.isFixedLen(model.document, 11, 'CPF inválido');
        flunt.hasMinLen(model.password, 6, 'Senha inválida');

        this.errors = flunt.errors;
        return flunt.isValid();
    }

}
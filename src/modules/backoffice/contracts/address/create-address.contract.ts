import { Flunt } from '../../../../utils/flunt';
import { Address } from '../../models/address.model';
import { Contract } from '../contract';
import { Injectable } from "@nestjs/common";

@Injectable()
export class CreateAddressContract implements Contract {
    errors: any[];

    validate(model: Address) : boolean {
        const flunt = new Flunt();

        console.log(`Model: ${model}`)

        flunt.isFixedLen(model.zipCode, 8, 'CEP inválido');
        flunt.hasMinLen(model.street, 3, 'Rua inválida');
        flunt.hasMinLen(model.neighborhood, 3, 'Bairro inválido');
        flunt.hasMinLen(model.city, 3, 'Cidade inválida');
        flunt.isFixedLen(model.state, 2, 'Estado inválido');
        flunt.isFixedLen(model.country, 3, 'Pais inválido');

        this.errors = flunt.errors;
        return flunt.isValid();
    }
}
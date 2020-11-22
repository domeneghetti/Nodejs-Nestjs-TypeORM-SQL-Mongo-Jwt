import { Pet } from '../models/pet.model';
import { Customer } from '../models/customer.model';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class PetService {
    constructor(@InjectModel('Customer') private readonly model: Model<Customer>) {

    }

    async create(document: string, data: Pet): Promise<Customer> {
        const options = { upsert: true, new: true };
        
        return await this.model.findOneAndUpdate({ document },  {
            $push: {
                pets: data,
            },
        }, options);
    }

    async update(id: string, data: Pet): Promise<Customer> {
        return await this.model.findOneAndUpdate({ document, 'pets._id': id }, {
            $set: {
                'pets.$': data,
            },
        });
    }
}
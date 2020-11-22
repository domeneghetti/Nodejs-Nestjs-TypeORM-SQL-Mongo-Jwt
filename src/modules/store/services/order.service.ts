import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from "../entities/order.entity";

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly repository: Repository<Order>,
    ) {}

    async getByNumber(number: string): Promise<Order> {
        return this.repository.findOne({ number: number });
    }

    async getByCustomer(customer: string): Promise<Order[]> {
        return this.repository.find({ customer: customer });
    }

    async post(order: Order) {
        await this.repository.save(order);
    }
}
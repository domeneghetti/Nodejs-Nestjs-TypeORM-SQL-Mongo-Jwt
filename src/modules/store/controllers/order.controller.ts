import { Controller, HttpException, HttpStatus, Get, Post, Body, Param } from "@nestjs/common";
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { OrderService } from "../services/order.service";
import { OrderItemService } from "../services/order-item.service";
import { ProductService } from "../services/product.service";
import { Result } from "src/modules/backoffice/models/result.model";
import { OrderItemDto } from "../dtos/order-item.dto";


@Controller('v1/orders')
export class OrderController {
    constructor(
        private readonly orderService: OrderService,
        private readonly orderItemService: OrderItemService,
        private readonly productService: ProductService,
    ){}

    @Get(':order')
    async get(@Param('order') order: string) {
        try {
            const orders = await this.orderService.getByNumber(order);
            return new Result(null, true, orders, null);
        } catch (error) {
            throw new HttpException(new Result('Não foi possivel listar as orders', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Get(':customer')
    async getByCustomer(@Param('customer') customer: string) {
        try {
            const orders = await this.orderService.getByCustomer(customer);
            return new Result(null, true, orders, null);
        } catch (error) {
            throw new HttpException(new Result('Não foi possivel listar as orders', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post()
    async post(@Body() model: OrderItemDto[]) {
        try {
            let order = new Order();
            order.customer = '12345678911';
            order.date = new Date();
            order.number = '1B2D3F5';
            order.items = [];
            await this.orderService.post(order);

            for(const item of model) {
                let product = await this.productService.getById(item.product);
                let orderItem = new OrderItem();
                orderItem.order = order;
                orderItem.product = product;
                orderItem.price = product.price;
                orderItem.quantity = item.quantity;
                await this.orderItemService.post(orderItem);
            };

            return new Result(null, true, order, null);
        } catch (error) {
            throw new HttpException(new Result('Não foi possivel salvar o pedido', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
}
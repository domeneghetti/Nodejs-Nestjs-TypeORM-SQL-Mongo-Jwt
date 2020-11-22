import { Order } from './entities/order.entity';
import { Product } from './entities/product.entity';
import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './entities/order-item.entity';
import { OrderService } from './services/order.service';
import { OrderItemService } from './services/order-item.service';
import { OrderController } from './controllers/order.controller';

@Module({
    imports: [TypeOrmModule.forFeature([
        Product,
        Order,
        OrderItem
    ])],
    controllers: [ProductController, OrderController],
    providers: [ProductService, OrderService, OrderItemService]
})
export class StoreModule { }

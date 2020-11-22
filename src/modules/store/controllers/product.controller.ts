import { Controller, HttpException, HttpStatus, Get, Post, Body, Put, Delete , Param} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { Result } from 'src/modules/backoffice/models/result.model';
import { Product } from 'src/modules/store/entities/product.entity';
import { get } from 'http';

@Controller('v1/products')
export class ProductController {
    constructor(private readonly service: ProductService) { }

    @Get('teste')
    async teste(){
        return new Result(null, true, 'teste ok', null);
    }

    @Get() 
    async get() {
        try {
            const products = await this.service.get();
            return new Result(null, true, products, null);
        }catch(error) {
            throw new HttpException(new Result('Não foi possivel listar os produtos', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post()
    async post(@Body() model: Product) {
        try {
            await this.service.post(model);
            return new Result(null, true, model, null);
        }catch(error) {
            throw new HttpException(new Result('Não foi possivel cadastrar o produto', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id')
    async put(@Param('id') id, @Body() model: Product) {
        try {
            await this.service.put(id, model);
            return new Result(null, true, model, null);
        }catch(error) {
            throw new HttpException(new Result('Não foi possivel atualizar o produto', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':id')
    async delete(@Param('id') id) {
        try {
            await this.service.delete(id);
            return new Result(null, true, id, null);
        }catch(error) {
            throw new HttpException(new Result('Não foi possivel excluir o produto', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
}
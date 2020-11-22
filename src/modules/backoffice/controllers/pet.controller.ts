import { Pet } from '../models/pet.model';
import { Result } from '../models/result.model';
import { Body, Controller, HttpException, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { PetService } from '../services/pet.service';

@Controller('v1/pet')
export class PetController {

    constructor(private readonly petServices: PetService) {

    }

    @Post(':document')
    async createPet(@Param('document') document, @Body() model: Pet) {
        try {
            await this.petServices.create(document, model);
            return model;
        } catch(error) {
            throw new HttpException(new Result('Não foi possivel cadastrar o Pet', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':document/:id')
    async updatePet(@Param('id') id, @Body() model: Pet) {
        try {
            await this.petServices.update(id, model);
            return model;
        } catch (error) {
            throw new HttpException(new Result('Não foi possivel atualizar o Pet', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
}
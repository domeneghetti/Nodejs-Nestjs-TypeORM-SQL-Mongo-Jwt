import { HttpException, HttpStatus } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Result } from "src/modules/backoffice/models/result.model";
import { RoomRepository } from "../../repositories/room.repository";
import { BookRoomCommand } from "../book-rom.command";

@CommandHandler(BookRoomCommand)
export class BookRoomHandler implements ICommandHandler<BookRoomCommand> {
    constructor(
        private readonly repository: RoomRepository,
    ){ }

    async execute(command: BookRoomCommand) {
        const room = await this.repository.checkAvailability(command.roomId, command.date);

        if(room) {
            room.book(command.customerId, command.date);
            await this.repository.book(room);
            return;
        }

        throw new HttpException(new Result('Sala não disponivel', false, null, null), HttpStatus.BAD_REQUEST);
    }
}
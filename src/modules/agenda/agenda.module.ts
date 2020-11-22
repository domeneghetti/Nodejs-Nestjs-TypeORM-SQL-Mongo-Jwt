import { CommandHandlers } from './commands/handlers/index';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AgendaController } from './controllers/agenda.controller';
import { RoomRepository } from './repositories/room.repository';
import { RoomBookService } from './services/room-book.service';
import { EventHandlers } from './events/handlers';

@Module({
    imports: [CqrsModule],
    controllers: [AgendaController],
    providers: [
        RoomBookService,
        RoomRepository,
        ...CommandHandlers,
        ...EventHandlers,
    ],
})
export class AgendaModule {}

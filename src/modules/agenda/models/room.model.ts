import { AggregateRoot } from '@nestjs/cqrs';
import { RoomBookedEvent } from '../events/room-booked.event';

export class Room extends AggregateRoot {
    constructor(private readonly id: string, date: Date) { 
        super();
    }

    book(customerId: string, date: Date) { 
        console.log('chamando o event');
        this.apply(new RoomBookedEvent(customerId, this.id));
    }
}
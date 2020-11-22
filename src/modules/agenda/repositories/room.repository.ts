import { Injectable } from "@nestjs/common";
import { Room } from "../models/room.model";

@Injectable()
export class RoomRepository {
    async findOneById(id: string): Promise<Room> {
        console.log('RoomRepository:findOneBydId - Recuperando a sala...');

        return new Room('123456', new Date());
    }

    async checkAvailability(id: string, date: Date): Promise<Room> {
        return new Room('123456', new Date());
    }

    async book(room: Room) {

    }
}
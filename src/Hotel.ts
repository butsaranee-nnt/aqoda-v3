import { Keycard } from "./Keycard";
import { Room } from "./Room";

export class Hotel {
    rooms: Room[]
    keycards: Keycard[]
    numberOfRooms: Number
    numberOfFloors: Number
    numberOfRoomsPerFloor: Number

    constructor(numberOfFloors: Number, numberOfRoomsPerFloor: Number){
        this.numberOfFloors = this.numberOfFloors
        this.numberOfRoomsPerFloor = this.numberOfRoomsPerFloor
        this.numberOfRooms = this.calculateNumberOfRooms()
        this.rooms = this.generateRooms()
        this.keycards = this.generateKeycards()
    }

    calculateNumberOfRooms(): Number {
        return
    }

    generateRooms(): Room[] { 
        return
    }

    generateKeycards(): Keycard[] {
        return
    }
}
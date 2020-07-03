import { Keycard } from "./Keycard";
import { Room } from "./Room";

export class Hotel {
    rooms: Room[]
    keycards: Keycard[]
    numberOfRooms: number
    numberOfFloors: number
    numberOfRoomsPerFloor: number

    constructor(numberOfFloors: number, numberOfRoomsPerFloor: number){
        this.numberOfFloors = numberOfFloors
        this.numberOfRoomsPerFloor = numberOfRoomsPerFloor
        this.numberOfRooms = this.calculateNumberOfRooms(numberOfFloors, numberOfRoomsPerFloor)
        this.rooms = this.generateRooms(numberOfFloors, numberOfRoomsPerFloor)
        this.keycards = this.generateKeycards(this.numberOfRooms)
    }

    calculateNumberOfRooms(numberOfFloors: number, numberOfRoomsPerFloor: number): number {
        let numberOfRooms = numberOfFloors * numberOfRoomsPerFloor
        return numberOfRooms
    }

    generateRooms(numberOfFloors: number, numberOfRoomsPerFloor: number): Room[] { 
        let rooms = []
        for (var floorNumber = 0; floorNumber < numberOfFloors; floorNumber++) {
            for (var roomNumberPerFloor = 0; roomNumberPerFloor < numberOfRoomsPerFloor; roomNumberPerFloor++){
                let roomId = (((floorNumber+1) * 100)+(roomNumberPerFloor+1)).toString()
                let room = new Room(roomId, floorNumber+1)
                rooms.push(room)
            }
        }
        return rooms
    }

    generateKeycards(numberOfRooms: number): Keycard[] {
        let keycards = []
        for (var keycardId = 0; keycardId < numberOfRooms; keycardId++){
            let keycard = new Keycard((keycardId + 1).toString())
            keycards.push(keycard)
        }
        return keycards
    }

    getKeycard(): Keycard {
        let keycard = this.keycards.shift() as Keycard
        return keycard
    }

    
}
import { GuestData } from "./GuestData"

class BookingRecord {
    roomNumber: Number
    guestData: GuestData

    constructor(roomNumber: Number, guestData: GuestData) {
        this.roomNumber = roomNumber
        this.guestData = guestData
    }
}
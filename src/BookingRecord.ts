import { GuestData } from "./GuestData"

export class BookingRecord {
    roomNumber: string
    guestName: string
    guestAge: number

    constructor(roomNumber: string, guestName: string, guestAge: number) {
        this.roomNumber = roomNumber
        this.guestName = guestName
        this.guestAge = guestAge
    }
}
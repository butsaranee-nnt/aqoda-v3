import { Hotel } from "./Hotel";
import { BookingRecord } from "./BookingRecord";
import { KeycardRecord } from "./KeycardRecord";
import { GuestData } from "./GuestData";
import { Keycard } from "./Keycard";

export interface BookingStatus {
    bookingRecord: BookingRecord
    isSuccess: boolean
}

export class HotelManager {
    hotel: Hotel
    bookingRecords: BookingRecord[]
    keycardRecords: KeycardRecord[]
    
    constructor(hotel: Hotel) {
        this.hotel = hotel
        this.bookingRecords = []
        this.keycardRecords = []
    }

    book(roomNumber: string, guestData: GuestData): BookingStatus {
        if (this.isAvailableRoom(roomNumber)){
            let bookingRecord = new BookingRecord(roomNumber, guestData.name, guestData.age)
            this.bookingRecords.push(bookingRecord)
            return {
                bookingRecord: bookingRecord,
                isSuccess: true
            }
        }
        else {
            let bookingRecord = this.bookingRecords.filter(bookingRecord => bookingRecord.roomNumber === roomNumber).shift() as BookingRecord
            return {
                bookingRecord: bookingRecord,
                isSuccess: false
            }
        }
    }

    isAvailableRoom(roomNumber: string): boolean{
        let availableRoomsNumber = this.getAvailableRoomsNumber()
        if (availableRoomsNumber.includes(roomNumber)){
            return true
        }
        return false
    }
    
    getAvailableRoomsNumber(): string[]{
        let totalRoomsNumber = this.hotel.rooms.map(room => room.id)
        let bookedRoomsNumber = this.bookingRecords.map(record => record.roomNumber)
        let availableRoomsNumber = totalRoomsNumber.filter(roomNumber => !bookedRoomsNumber.includes(roomNumber))
        return availableRoomsNumber
    }

    checkIn(bookingRecord: BookingRecord): Keycard{
        let keycard = this.hotel.getKeycard()
        let keycardRecord = new KeycardRecord(keycard.id, bookingRecord.guestName, bookingRecord.roomNumber)
        this.keycardRecords.push(keycardRecord)
        return keycard
    }
}
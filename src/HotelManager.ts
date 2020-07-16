import { Hotel } from "./Hotel";
import { BookingRecord } from "./BookingRecord";
import { KeycardRecord } from "./KeycardRecord";
import { GuestData } from "./GuestData";
import { Keycard } from "./Keycard";

export interface BookingStatus {
    bookingRecord: BookingRecord
    isSuccess: boolean
}

export interface CheckOutStatus {
    keycardRecord: KeycardRecord
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

    checkInAndAnnounceResult(bookingStatus: BookingStatus, guestData: GuestData){
        if (bookingStatus.isSuccess) {
            let keycard = this.checkIn(bookingStatus.bookingRecord)
            console.log(`Room ${bookingStatus.bookingRecord.roomNumber} is booked by ${bookingStatus.bookingRecord.guestName} with keycard number ${keycard.id}.`)
        }
        else {
        console.log(`Cannot book room ${bookingStatus.bookingRecord.roomNumber} for ${guestData.name}, The room is currently booked by ${bookingStatus.bookingRecord.guestName}.`)
        }
    }

    checkOut(keycardId: string, guestName: string): CheckOutStatus {
        let keycardRecord = this.findKeycardRecordFromKeycardId(keycardId)

        if (this.isMatchKeycardWithGuestName(keycardRecord, guestName)){
            let bookingRecord = this.findBookingRecordFromGuestName(guestName)
            this.removeBookingRecordInBookingRecords(bookingRecord)
            this.removeKeycardRecordInKeycardRecords(keycardRecord)
            let keycard = new Keycard(keycardId)
            this.hotel.restoreKeycard(keycard)
            return {
                keycardRecord: keycardRecord,
                isSuccess: true
            }
        }
        return {
            keycardRecord: keycardRecord,
            isSuccess: false
        }
    }

    announceCheckOutResult(checkOutStatus: CheckOutStatus){
        if (checkOutStatus.isSuccess) {
            console.log(`Room ${checkOutStatus.keycardRecord.roomNumber} is checkout.`)
        }
        else {
        console.log(`Only ${checkOutStatus.keycardRecord.guestName} can checkout with keycard number ${checkOutStatus.keycardRecord.keycardId}.`)
        }
    }

    findKeycardRecordFromKeycardId(keycardId: string): KeycardRecord {
        let keycardRecord = this.keycardRecords.filter(keycardRecord => keycardRecord.keycardId === keycardId).shift() as KeycardRecord
        return keycardRecord
    }

    findBookingRecordFromGuestName(guestName: string): BookingRecord {
        let bookingRecord = this.bookingRecords.filter(bookingRecord => bookingRecord.guestName === guestName).shift() as BookingRecord
        return bookingRecord
    }

    isMatchKeycardWithGuestName(keycardRecord: KeycardRecord, guestName: string): boolean {
        if (keycardRecord.guestName === guestName){
            return true
        }
        return false
    }

    removeKeycardRecordInKeycardRecords(keycardRecord: KeycardRecord){
        this.keycardRecords.splice(this.keycardRecords.indexOf(keycardRecord),1)
    }

    removeBookingRecordInBookingRecords(bookingRecord: BookingRecord){
        this.bookingRecords.splice(this.bookingRecords.indexOf(bookingRecord),1)
    }

    getGuestNameInRoom(roomNumber: string): string {
        let keycardRecord = this.keycardRecords.filter( keycardRecord => keycardRecord.roomNumber === roomNumber).shift() as KeycardRecord
        let guestName = keycardRecord.guestName
        return guestName
    }

    getTotalGuestsNameInHotel(){
        let bookedRoomsNumber = this.bookingRecords.map(record => record.roomNumber)
        let totalGuestsNameInHotel = bookedRoomsNumber.map(roomNumber => this.getGuestNameInRoom(roomNumber))
        return totalGuestsNameInHotel
    }

    getGuestsNameByAge(sign: string, age: number): string[] {
        if (sign === '>'){
            let bookingRecord = this.bookingRecords.filter( bookingRecord => bookingRecord.guestAge > age)
            let guestsName = bookingRecord.map(bookingRecord => bookingRecord.guestName)
            return guestsName
        }
        else if (sign === '<'){
            let bookingRecord = this.bookingRecords.filter( bookingRecord => bookingRecord.guestAge < age)
            let guestsName = bookingRecord.map(bookingRecord => bookingRecord.guestName)
            return guestsName
        }
        else if (sign === '='){
            let bookingRecord = this.bookingRecords.filter( bookingRecord => bookingRecord.guestAge == age)
            let guestsName = bookingRecord.map(bookingRecord => bookingRecord.guestName)
            return guestsName
        }
        return []
    }

    getRoomNumberByFloor(floorNumber: number): string[] {
        let rooms = this.hotel.rooms.filter(room => room.floorNumber == floorNumber)
        let roomsNumber = rooms.map(room => room.id)
        return roomsNumber
    }

    getGuestsNameByFloor(floorNumber: number): string[] {
        let roomsNumber = this.getRoomNumberByFloor(floorNumber)
        roomsNumber = roomsNumber.filter(roomNumber => this.isAvailableRoom(roomNumber) == false)
        let guestsName = roomsNumber.map(roomNumber => this.getGuestNameInRoom(roomNumber))
        return guestsName
    }
}
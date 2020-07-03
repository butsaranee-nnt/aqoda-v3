import { Hotel } from "./Hotel";
import { GuestData } from "./GuestData";
import { HotelManager, BookingStatus } from "./HotelManager";
import { BookingRecord } from "./BookingRecord";

const fs = require('fs')

class Command {
    name: string
    params: any

    constructor(name: string, params: any) {
      this.name = name
      this.params = params
    }
  }
  
  function main() {
    const filename: string = 'input.txt'
    const commands: Command[] = getCommandsFromFileName(filename)
    let hotel: Hotel
    let guestData: GuestData
    let hotelManager: HotelManager

    commands.forEach(command => {
      switch (command.name) {
        case 'create_hotel':
          const [numberOfFloors, numberOfRoomsPerFloor] = command.params

          hotel = new Hotel(numberOfFloors, numberOfRoomsPerFloor)
          hotelManager = new HotelManager(hotel)
  
          console.log(
            `Hotel created with ${numberOfFloors} floor(s), ${numberOfRoomsPerFloor} room(s) per floor.`
          )
          return
        
        case 'book':
          const [roomNumber, guestName, guestAge] = command.params

          guestData = new GuestData(guestName, guestAge)\
        
          let bookingStatus = hotelManager.book(roomNumber.toString(), guestData)

          if (bookingStatus.isSuccess) {
            let keycard = hotelManager.checkIn(bookingStatus.bookingRecord)
            console.log(hotelManager.keycardRecords,"------------------------")
            console.log(hotelManager.bookingRecords,"********************")
            console.log(`Room ${roomNumber} is booked by ${bookingStatus.bookingRecord.guestName} with keycard number ${keycard.id}.`)
          }
          else {
            console.log(`Cannot book room ${roomNumber} for ${guestData.name}, The room is currently booked by ${bookingStatus.bookingRecord.guestName}.`)
          }

        default:
          return
      }
    })
  }
  
  function getCommandsFromFileName(fileName: string) {
    const file = fs.readFileSync(fileName, 'utf-8')
    // let commandName: string
    // let params: any

    return file
      .split('\n')
      .map((line: string) => line.split(' '))
      .map(
        ([commandName, ...params]: string[]): Command =>
          new Command(
            commandName,
            params.map(param => {
              const parsedParam = parseInt(param, 10)
  
              return Number.isNaN(parsedParam) ? param : parsedParam
            })
          )
      )
  }
  
  main()
  
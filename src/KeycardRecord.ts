export class KeycardRecord {
    keycardId: string
    guestName: string
    roomNumber: string
    
    constructor(keycardId: string, guestName: string, roomNumber: string) {
        this.keycardId = keycardId
        this.guestName = guestName
        this.roomNumber = roomNumber
    }
}

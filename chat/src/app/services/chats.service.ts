import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { message } from '../models/message';
import { firestore } from "firebase";

export interface chat {
  id: string,
  name: string,
  description : string,
  img: string
}

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  constructor(private db : AngularFirestore) { }

  getChatRooms(){
    return this.db.collection('ChatRooms')
      .snapshotChanges()
      .pipe(
        map(
          chatRooms => {
            return chatRooms.map(
              chatRoom => {
                let data = chatRoom.payload.doc.data() as chat
                data.id = chatRoom.payload.doc.id
                return data 
              }
            )
          }
        )
      )
  }
  
  getChatRoom( chat_id : string){
    return this.db.collection('ChatRooms').doc(chat_id).valueChanges()
  }

  async sendMessageToRoom( message: message, chat_id:string ){
    return await this.db.collection('ChatRooms').doc(chat_id).update({
      messages: firestore.FieldValue.arrayUnion(message)
    })
  }
}

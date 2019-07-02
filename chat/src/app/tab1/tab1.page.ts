import { Component, OnInit } from '@angular/core';
import { ChatsService } from "../services/chats.service";
import { ModalController } from "@ionic/angular";
import { ChatComponent } from "../components/chat/chat.component";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  
  private chatRooms : any = []

  constructor(private chatService: ChatsService, private modal: ModalController) {

  }
  ngOnInit(){
    this.chatService.getChatRooms().subscribe( chats =>{
      this.chatRooms = chats // controla la duplicidad que se crea en la base de datos al momento de actualizar un campo por ej:descripción
    })
  }

  openChat(chat){ 
    this.modal.create({
      component: ChatComponent,
      componentProps: {
        chat: chat
      }
    }).then( (modal) =>{
      modal.present() //inicializa el modal que contiene la conversación
    })
  }
  
}

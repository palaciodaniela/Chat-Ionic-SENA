import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { message } from "../../models/message";
import { ChatsService } from "../../services/chats.service";
import { chat } from "../../services/chats.service";
import { UsersService } from "../../services/users.service";
import { user } from "../../models/users";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  private chat: chat//chat
  //private messages = []
  private msg: string //message
  private room: any //chat
  private userInfo: user
  
  @ViewChild('scrollMe') private scrollDiv : any ;

  constructor(
    private navParams: NavParams,
    private modal:ModalController,
    private chatService: ChatsService,
    private userService: UsersService,
    private _el: ElementRef
    ) { }

  ngOnInit() {
    this.chat = this.navParams.get('chat')
    console.log(this.chat)

    this.chatService.getChatRoom(this.chat.id).subscribe( room =>{
      console.log(room)
      this.room = room
    })
    this.userService.getAuthenticatedUserInfo().then(res => {
      res.subscribe(
        resUser => {
          this.userInfo = resUser as user
        }
      )
    }).catch(err => {
      console.log(err)
    })
  }

  closeChat(){
    this.modal.dismiss()
  }// metodo de boton volver

  scrollBottom(){
    //this.scrollDiv.nativeElement.scrollBottom
    this.scrollDiv.scrollToBottom(500);
  } // Solo funciona al enviar un mensaje

  sendMessage(){
    if (this.msg){
      const messageDict : message = {
        content: this.msg,
        date: new Date,
        type: 'text',
        user: this.userInfo
      }// Metodo para enviar mensajes en el modal
      //this.messages.push(this.msg)
      this.chatService.sendMessageToRoom(messageDict, this.chat.id).then(
        res =>{ // Los mensajes se envian a través del servicio
          this.scrollBottom()
        }
      )
      this.msg = '' // Limpia el campo de texto despuess de que envia el mensaje
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebSocketService }from '../../services/web-socket.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  socket;
  userChat={
    user:"",
    text:"",
    tiporol:""
  }
  Messages;
  eventName="send-message";
  token="";
  constructor( private activated:ActivatedRoute,private webservice:WebSocketService,private router: Router,private usuario: UserService,) { }

  ngOnInit(): void {
    this.token=this.usuario.getUserLogged();
    console.log(this.token);
    if(this.token==""){
      this.router.navigate( [ ''] );
    }else{
    const id=this.activated.snapshot.params.id;
    let amper = "&&";
    let arrayDeCadenas = id.split(amper)
    this.userChat.user=arrayDeCadenas[0];
    this.userChat.tiporol=arrayDeCadenas[1];
    this.webservice.listen("text-event").subscribe((data)=>{
      this.Messages=data;
    
    })
  }}
  message(){
    if(this.userChat.text.trim()!=""){
      this.webservice.emit(this.eventName,this.userChat);
      this.userChat.text="";
    }
  }

  logOut(){
    this.usuario.logOut();
    this.router.navigate(['']);
  }

}

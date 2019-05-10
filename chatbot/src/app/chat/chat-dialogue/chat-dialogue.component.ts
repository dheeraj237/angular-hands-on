import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from '../chat.service';
import { environment } from '../../../environments/environment';
import { lexInput } from 'src/app/lexInput';

// import { Observable } from 'rxjs/Observable';
import { scan } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat-dialogue',
  templateUrl: './chat-dialogue.component.html',
  styleUrls: ['./chat-dialogue.component.scss']
})
export class ChatDialogueComponent implements OnInit {

  // public lexInput: new lexInput();
  // this.lexInput.msg = 'hello';
  messages: Observable<Message[]>;
  formValue: string;

  constructor(private chat: ChatService) { }

  ngOnInit() {
    // let msg: lexInput;
    // msg.msg = 'hello';
    // msg.userId = '234567kjhgfds';
    // msg.sessionAttributes = {};
    // this.chat.converse(msg);

    this.messages = this.chat.conversation.asObservable()
      .pipe(
        scan((acc, val) => acc.concat(val))
      )
    // this.sendMessage();
  }

  sendMessage() {
    // let message: lexInput;
    // message.msg = 'hello';
    // message.userId = 'user';
    // message.sessionAttributes = {};
    this.chat.converse(this.formValue);
    this.formValue = '';
  }

}

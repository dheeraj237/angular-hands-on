import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { LexRuntime, CognitoIdentityCredentials } from 'aws-sdk';

import { lexParams } from '../lexParams'
import { lexInput } from '../lexInput'

import { Observable, BehaviorSubject } from 'rxjs';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class Message {
  constructor(public content: string, public sentBy: string, public timestamp: number) { }
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  readonly lexClient = new LexRuntime({
    region: environment.lex.region,
    accessKeyId: environment.lex.accessKeyId,
    secretAccessKey: environment.lex.secretAccessKey
  });

  public msg: Message;

  conversation = new BehaviorSubject<Message[]>([]);

  constructor() { }

  // postText(params) {
  //   this.lexClient.postText(params, (err, data) => {
  //     console.log(err, data);
  //   });
  // }

  update(msg: Message) {
    this.conversation.next([msg]);
  }

  converse(msg: any) {
    const userMsg = new Message(msg, 'bot', (new Date().getTime()));
    let lexMsg = new lexParams();
    lexMsg.botAlias = environment.lex.botAlias;
    lexMsg.botName = environment.lex.botName;
    lexMsg.inputText = msg;
    lexMsg.userId = 'user345678';
    lexMsg.sessionAttributes = {};

    this.update(userMsg);


    return this.lexClient.postText(lexMsg, (err, data) => {
      if (err)
        throw err;
      const speech = data.message;
      const userMsg = new Message(speech, 'user', (new Date().getTime()))
      this.update(userMsg);

      console.log(err, data)
    })
  }


}

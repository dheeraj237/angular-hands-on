import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { LexRuntime, CognitoIdentityCredentials } from 'aws-sdk';

import { lexParams } from '../lexParams'
import { lexInput } from '../lexInput'

import { Globals } from '../globals'

import { Observable, BehaviorSubject } from 'rxjs';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class Message {
  constructor(public content: string, public sentBy: string, public timestamp: number, public resCard: any, public slotToElicit: string) { }
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

  constructor(private globals: Globals) { }

  update(msg: Message) {
    this.conversation.next([msg]);
  }

  converse(msg: any, seesionAtribb: any, showMsg: boolean = true): Promise<any> {
    return new Promise((resolve, reject) => {
      const userMsg = new Message(msg, 'bot', (new Date().getTime()), null, null);
      let lexMsg = new lexParams();
      lexMsg.botAlias = environment.lex.botAlias;
      lexMsg.botName = environment.lex.botName;
      lexMsg.inputText = msg;
      lexMsg.userId = 'user345678';
      lexMsg.sessionAttributes = seesionAtribb;

      if (showMsg) {
        this.update(userMsg);
      }

      this.lexClient.postText(lexMsg, (err, data) => {
        if (err)
          reject(err);

        const speech = data.message;
        const userMsg = new Message(speech, 'user', (new Date().getTime()), (data.responseCard ? data.responseCard : null), (data.slotToElicit ? data.slotToElicit : null))
        this.update(userMsg);
        resolve(data);
      });
    });

  }
}

/** Messages component
 *  5/17/2021
 * 
 *  - sends message from message server whenever hero has been fetched from hero service
 */

import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  //public bc it will be binded into the template [angular ONLY binds to public component properties]
  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
  }

}

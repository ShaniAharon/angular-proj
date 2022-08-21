import { Component, OnInit } from '@angular/core';
import { UserMsgService } from 'src/app/services/user-msg.service';

@Component({
  selector: 'user-msg',
  templateUrl: './user-msg.component.html',
  styleUrls: ['./user-msg.component.scss'],
})
export class UserMsgComponent {
  constructor(public userMsgService: UserMsgService) {}
}

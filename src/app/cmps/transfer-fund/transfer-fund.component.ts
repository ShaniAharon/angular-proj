import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Contact } from 'src/app/models/contact.model';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'transferfund',
  templateUrl: './transfer-fund.component.html',
  styleUrls: ['./transfer-fund.component.scss'],
})
export class TransferfundComponent implements OnInit {
  amount: number;
  user: UserModel;
  userSubscriber: Subscription;

  @Input() contact: Contact;

  constructor(private UserService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userSubscriber = this.UserService.user$.subscribe(
      (user) => (this.user = user)
    );
  }

  ngOnDestroy() {
    this.userSubscriber.unsubscribe();
  }

  onTransferCoins(): void {
    if (this.amount > this.user.coins) {
      console.log("you can't do it");
      return;
    } else {
      this.UserService.addMove(this.contact, this.amount);
    }
    this.router.navigate(['contacts/', this.contact._id]);
  }
}

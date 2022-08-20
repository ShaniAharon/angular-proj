import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { BitcoinService } from 'src/app/services/bitcoin.service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  user: UserModel;
  userSubscription: Subscription;

  BTC$: Observable<Object> | Promise<number>;

  constructor(
    private userService: UserService,
    private bitcoinService: BitcoinService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.userService.user$.subscribe(
      (user) => (this.user = user)
    );
    // gets observable object , async pipe do subscribe and unsubscribe for us
    //must do subscribe to get the value
    this.BTC$ = this.bitcoinService.getRate(this.user.coins);
  }
}

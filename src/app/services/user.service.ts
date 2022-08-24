import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { UserModel } from '../models/user.model';
import { MoveModel } from 'src/app/models/move.model';

import { UtilsService } from '../services/utilsservice/utils.service';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private KEY = 'user';
  private _user: UserModel;
  private _user$ = new BehaviorSubject<UserModel>(
    this.UtilsService.load(this.KEY) || null
  );
  public user$ = this._user$.asObservable();

  constructor(private UtilsService: UtilsService) {}

  public signup(name: string): void {
    let user = this.UtilsService.load(this.KEY);
    if (!user) {
      let newUser = new UserModel();
      newUser.name = name;
      this.UtilsService.store(this.KEY, newUser);
      this._user = newUser;
    }
    this._user$.next(this._user);
  }

  public getUser() {
    return this.user$;
  }

  public addMove(contact: Contact, amount: number): void {
    if (!amount) return;
    let newMove = new MoveModel();
    newMove.toId = this.UtilsService.setId();
    newMove.to = contact.name;
    newMove.at = Date.now();
    newMove.amount = amount;
    const editedUser = { ...this._user$.value };
    editedUser.coins -= amount;
    editedUser.moves.unshift(newMove);
    this.UtilsService.store(this.KEY, editedUser);
    this._user$.next(editedUser);
  }

  public isAuthenticated(): boolean {
    const user = this._user$.value;
    // return (user) ? true : false;
    return !!user;
  }

  public logoutUser() {
    this._user$.next(null);
    this.UtilsService.remove(this.KEY);
  }
}

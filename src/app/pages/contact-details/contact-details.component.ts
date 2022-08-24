import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit, OnDestroy {
  @Input() contactId: string;
  contact: Contact;
  subscription: Subscription;
  userSubscriber: Subscription;
  user: UserModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private UserService: UserService
  ) {}

  async ngOnInit(): Promise<void> {
    //using the resolver data on the route , use the resolver service we created
    this.subscription = this.route.data.subscribe((data) => {
      this.contact = data['contact'];
    });

    this.userSubscriber = this.UserService.user$.subscribe(
      (user) => (this.user = user)
    );

    //without the resolver
    //  this.subscription = this.route.params.subscribe(async params => {
    //    //test firstValueFrom instead of toPromise
    //    const pet = await firstValueFrom(this.petService.getById(params['id']), {defaultValue: undefined})
    //    this.pet = pet;
    //  })

    // merge Pipes exmp or Divert it
    // this.route.params.pipe(mergeMap((params) => this.petService.getById(params.id)))
    //   .subscribe(pet => {
    //     this.pet = pet
    //   })
  }

  onBack() {
    this.router.navigateByUrl('contacts');
  }

  get getDate() {
    return new Date();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.userSubscriber.unsubscribe();
  }
}

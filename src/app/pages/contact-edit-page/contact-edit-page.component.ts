import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'contact-edit-page',
  templateUrl: './contact-edit-page.component.html',
  styleUrls: ['./contact-edit-page.component.scss']
})
export class ContactEditPageComponent implements OnInit {

  contact: Contact

  constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {
    //with resolver
   this.route.data.subscribe(({contact})=> {
     this.contact = contact?._id ? contact : this.contactService.getEmptyContact() as Contact
   })

    //no resolver way
    // this.route.params.subscribe(async({id})=> {
    //   this.pet = id ? await firstValueFrom(this.petService.getById(id), {defaultValue: undefined}) : this.petService.getEmptyPet() as Pet
    // })
  }

  async onSaveContact() {
    console.log('this.contact',this.contact);
    
     //check if need to return in contactService add and update -> return of(contact) soo it wiil work
    await firstValueFrom(this.contactService.saveContact(this.contact), {defaultValue:null})
    this.router.navigateByUrl('contacts')
  }

}

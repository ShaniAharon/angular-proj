import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Contact } from '../models/contact.model';
import { ContactService } from './contact.service';

@Injectable({
  providedIn: 'root'
})
export class ContactResolverService implements Resolve<Promise<Contact>>{

  constructor(private contactService: ContactService) { }

  async resolve(route: ActivatedRouteSnapshot){
    const id = route.params['id']
    const contact = await firstValueFrom(this.contactService.getContactById(id), {defaultValue:null})
    return contact
  }
}

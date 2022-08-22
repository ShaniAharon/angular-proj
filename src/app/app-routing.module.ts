import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';
import { ContactEditPageComponent } from './pages/contact-edit-page/contact-edit-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SignupComponent } from './pages/signup/signup.component';
import { StatisticPageComponent } from './pages/statistic-page/statistic-page.component';
import { ContactResolverService } from './services/contact-resolver.service';

//A page for edit and add
const routes: Routes = [
  {
    path: 'contacts',
    component: ContactPageComponent,
    canActivate: [AuthGuard], // Only if the user login we can route here
  },
  {
    path: 'contacts/edit',
    component: ContactEditPageComponent,
    resolve: { contact: ContactResolverService },
  },
  {
    path: 'contacts/:id',
    component: ContactDetailsComponent,
    resolve: { contact: ContactResolverService },
  },
  {
    path: 'contacts/edit/:id',
    component: ContactEditPageComponent,
    resolve: { contact: ContactResolverService },
  },
  { path: 'signup', component: SignupComponent },
  {
    path: 'statistic',
    component: StatisticPageComponent,
    canActivate: [AuthGuard],
  },
  { path: '', component: HomePageComponent, canActivate: [AuthGuard] },
];

//With children routes
// const routes: Routes = [
//   {path: 'contacts', component:ContactPageComponent, children: [
//     {path: 'edit/:id', component: ContactEditPageComponent, resolve: {contact: ContactResolverService}},
//     {path: 'edit', component: ContactEditPageComponent, resolve: {contact: ContactResolverService}}
//   ]},
//   {path:'contacts/:id', component: ContactDetailsComponent, resolve: {contact: ContactResolverService}},
//   {path: 'statistic', component:StatisticPageComponent},
//   {path: '', component:HomePageComponent},
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

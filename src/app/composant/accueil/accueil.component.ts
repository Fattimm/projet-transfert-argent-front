import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ProfileComponent } from '../profile/profile.component';
import { SearchComponent } from '../search/search.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { TransactionsComponent } from '../transactions/transactions.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [
    HeaderComponent,
    ProfileComponent,
    SearchComponent,
    DashboardComponent,
    TransactionsComponent,
    FooterComponent
  ],
  templateUrl: './accueil.component.html',
})
export class AccueilComponent {}

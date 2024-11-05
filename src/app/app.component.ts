import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Contact } from './models/contact.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedContact: Contact | null = null; // Déclaration de selectedContact

  constructor(private router: Router) {}

  // Méthode pour naviguer vers la page de connexion
  login() {
    this.router.navigate(['/accueil']); // Navigation vers la page d'accueil après la connexion
  }

  // Méthode pour afficher la page des paramètres
  showSettingsPage() {
    this.router.navigate(['/parametres']);
  }

  // Méthode pour afficher la page de transfert d'argent
  showMoneyTransferPage() {
    this.router.navigate(['/transfert']);
  }

  // Méthode pour retourner à l'accueil (Dashboard)
  showDashboard() {
    this.router.navigate(['/accueil']);
  }

  showSendMoney() {
    // this.router.navigate(['/sendmoney']);
    this.router.navigate(['/sendmoney'], { state: { contact: this.selectedContact } });

  }
  
  transfert() {
    this.router.navigate(['/transfert']);
   
  }

}

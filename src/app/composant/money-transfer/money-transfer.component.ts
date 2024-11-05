import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-money-transfer',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './money-transfer.component.html',
  styleUrls: ['./money-transfer.component.css']
})
export class MoneyTransferComponent implements OnInit {

  favorites: Contact[] = [];

  constructor(private router: Router, private contactService: ContactService) {}

  ngOnInit(): void {
    // Récupérer l'ID de l'utilisateur depuis le localStorage
    const userId = localStorage.getItem('userId'); // Récupérer l'ID de l'utilisateur
    if (userId) {
      this.contactService.getUserContacts(Number(userId)).subscribe(
        contacts => {
          this.favorites = contacts; // Assignez les contacts récupérés au tableau favorites
        },
        error => {
          console.error('Erreur lors de la récupération des contacts', error);
        }
      );
    } else {
      console.error('Aucun ID d\'utilisateur trouvé dans le localStorage');
      // Gérer le cas où l'ID de l'utilisateur n'est pas disponible
    }
  }

  goToHome(): void {
    this.router.navigate(['/accueil']); // Route d'accueil
  }

  // Nouvelle méthode pour naviguer vers la page de transfert d'argent
  sendMoneyToContact(contact: Contact) {
    this.router.navigate(['/sendmoney'], {
      state: { contact: contact } // Passer le contact sélectionné
    });
  }
}

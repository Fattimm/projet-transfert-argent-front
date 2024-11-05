import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '../../models/contact.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-send-money',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './send-money.component.html',
  styleUrls: ['./send-money.component.css']
})
export class SendMoneyComponent implements OnInit {
  contact: Contact | null = null; // Pour stocker le contact sélectionné
  amountSent: string = '';
  amountReceived: string = '';
  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  constructor(private router: Router, private userService: UserService) {}

  goToHome(): void {
    // Retourne à la page précédente
    this.router.navigate(['/transfert']); // Navigation vers la page parente
  }

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.contact = navigation.extras.state['contact']; // Récupérer le contact depuis l'état
      console.log(this.contact); // Vérifiez si le contact est affiché correctement dans la console
      // Remplir les champs avec les informations du contact
      if (this.contact) {
        this.amountSent = ''; // Vous pouvez initialiser ici si nécessaire
        this.amountReceived = ''; // Vous pouvez initialiser ici si nécessaire
      }
    }
  }


  onAmountInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.amountSent = input.value; // Mettre à jour amountSent
    this.calculateReceivedAmount(); // Calculer le montant reçu
  }

  sendMoney() {
    const senderId = parseInt(localStorage.getItem('userId') || '0', 10); // Récupérer l'ID de l'utilisateur
    const receiverId = this.contact?.id ?? 0;
    const amount = parseFloat(this.amountSent);

    if (receiverId && amount > 0) {
      this.userService.transferMoney(senderId, receiverId, amount).subscribe({
        next: () => {
          alert('Transfert réussi');
          this.router.navigate(['/transfert']); // Redirige après le transfert
        },
        error: (error: any) => {
          console.error('Erreur de transfert', error);
        }
      });
    } else {
      console.error('Informations de transfert invalides');
    }
  }

  addNumber(num: number) {
    if (this.amountSent.length < 10) {
      this.amountSent += num.toString();
      this.calculateReceivedAmount();
    }
  }
  deleteLastDigit() {
    if (this.amountSent.length > 0) {
        this.amountSent = this.amountSent.slice(0, -1); // Supprime le dernier caractère
        this.calculateReceivedAmount(); // Met à jour le montant reçu
    }
  }


  calculateReceivedAmount() {
    const feePercentage = 0.01; // 1%
    const maxFee = 5000; // 5.000F
    const amount = parseFloat(this.amountSent);
    
    if (!isNaN(amount) && amount > 0) {
      const fee = Math.min(amount * feePercentage, maxFee);
      this.amountReceived = (amount - fee).toFixed(2); // Montant reçu après frais
    } else {
      this.amountReceived = '';
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  walletBalance: number = 0; // Solde du wallet
  walletLimit: number = 0; // Plafond du wallet
  showWallet: boolean = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getWallet().subscribe({
      next: (data) => {
        // Supposons que les données de wallet contiennent le solde et le plafond
        this.walletBalance = data.data.user.wallet.solde; // Ajustez en fonction de la structure de vos données
        this.walletLimit = data.data.user.wallet.plafond; // Ajustez en fonction de la structure de vos données
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données utilisateur:', err);
      }
    });
  }

  toggleWallet(): void {
    this.showWallet = !this.showWallet; // Basculer l'état d'affichage
  }
}

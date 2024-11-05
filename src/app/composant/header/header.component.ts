import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})
export class HeaderComponent implements OnInit, OnDestroy  {
  constructor(private router: Router, private userService: UserService) {}


  // Méthode de validation du code
  parametre() {
    this.router.navigate(['/parametres']);
   
  }

  InfoUser: string = ''; 
  currentTime: string = ''; // Propriété pour stocker l'heure actuelle
  private intervalId: any; // Variable pour stocker l'ID de l'intervalle

  ngOnInit(): void {
    this.userService.getInfoUser().subscribe({
      next: (data) => {
        this.InfoUser = data.data.user.nom + ' ' + data.data.user.prenom;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données utilisateur:', err);
      }
    });

    // Appeler la fonction pour initialiser l'heure
    this.updateCurrentTime();
    // Mettre à jour l'heure toutes les minutes
    this.intervalId = setInterval(() => this.updateCurrentTime(), 60000);
  }

  ngOnDestroy(): void {
    // Nettoyer l'intervalle lorsque le composant est détruit
    clearInterval(this.intervalId);
  }

  updateCurrentTime(): void {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }
}

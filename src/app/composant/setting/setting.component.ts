import { Component } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent {
 
  constructor(private router: Router) {}

  goToHome(): void {
    // Retourne à la page précédente
    this.router.navigate(['/accueil']); // Navigation vers la page parente
  }

}

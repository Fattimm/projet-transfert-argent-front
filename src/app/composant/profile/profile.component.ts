import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  InfoUser: string = ''; 

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getInfoUser().subscribe({
      next: (data) => {
        this.InfoUser = data.data.user.nom +' '+ data.data.user.prenom;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données utilisateur:', err);
      }
    });
  }

  
}

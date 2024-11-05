import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import * as Yup from 'yup';
import loginValidation from '../../../validation/loginValidation';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, RouterModule],
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
})
export class ConnexionComponent {

  constructor(private authService: AuthService, private router: Router) { }

  telephone: string = '77 000 00 00';
  password: string = '';
  loading: boolean = false;
  errorMessage: string | null = null;

  async login() {
    this.loading = true;
    this.errorMessage = null;

    try {
      await loginValidation.validate({ telephone: this.telephone, password: this.password });

      this.authService.login(this.telephone, this.password).subscribe({
        next: (response) => {
          if (response.status === 200) {
            // Naviguer vers la page de vérification
            this.router.navigate(['/verification']);
          }
          this.loading = false;
        },
        error: () => {
          this.errorMessage = 'Numéro ou mot de passe incorrect'; // Message d'erreur générique
          this.loading = false;
        }
      });
    } catch (validationError: any) {
      this.errorMessage = validationError.errors[0];
      this.loading = false;
    }
  }
}

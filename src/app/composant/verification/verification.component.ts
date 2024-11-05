import { Component, Output, EventEmitter } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css'],
})
export class VerificationComponent {
  password: string = ''; // Variable pour stocker le code
  codeVerification: string = ''; // Propriété pour stocker le code de vérification
  errorMessage: string | null = null;


  constructor(private authService: AuthService, private router: Router) {
    this.codeVerification = this.authService.getVerificationCode() || '';
    this.password = this.codeVerification; // Remplir automatiquement le champ avec le code
  }

  verify() {
    console.log('Vérification en cours...');
    const codeVerification = this.password;

    // Appeler la méthode de vérification
    this.authService.verifyCode(codeVerification).subscribe({
      next: (response) => {
        if (response.status === 200) {
          localStorage.setItem('token', response.data.token); // Stocker le token dans le localStorage
          this.router.navigate(['/accueil']); // Rediriger vers la page d'accueil
          this.password = ''; // Réinitialiser le champ de saisie
        }
      },
      error: () => {
        this.errorMessage = 'Code de vérification incorrect.'; // Afficher un message d'erreur
      }
    });
  }


  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, null];

  addNumber(num: string | number) {
    if (this.password.length < 6) {
      this.password += num.toString();
    }
  }

  deleteNumber() {
    if (this.password.length > 0) {
      this.password = this.password.slice(0, -1);
    }
  }

  onPasswordInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.value.length > 6) {
      input.value = input.value.slice(0, 4);
    }
  }

  getLetters(num: number): string {
    const letterMap: { [key: number]: string } = {
      2: 'ABC',
      3: 'DEF',
      4: 'GHI',
      5: 'JKL',
      6: 'MNO',
      7: 'PQRS',
      8: 'TUV',
      9: 'WXYZ'
    };
    return letterMap[num] || '';
  }
}

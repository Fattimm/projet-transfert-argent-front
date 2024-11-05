// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.VITE_API_URL; // Utilisez l'URL d'environnement
  private verificationCode: string | null = null;

  constructor(private http: HttpClient) { }

  // Méthode de connexion
  login(telephone: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { telephone, password }).pipe(
      tap((response: any) => {
        if (response.status === 200) {
          // Stocker le code de vérification et d'autres informations dans le localStorage
          localStorage.setItem('userId', response.data.id.toString());
          localStorage.setItem('telephone', response.data.telephone);
          localStorage.setItem('verificationCode', response.data.codeVerification);
        }
      })
    );
  }

  verifyCode(code: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/verifytoken`, { code_verification: code });
  }
    
  setVerificationCode(code: string) {
    this.verificationCode = code;
  }

  getVerificationCode(): string {
    return localStorage.getItem('verificationCode') || '';
  }
  

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}

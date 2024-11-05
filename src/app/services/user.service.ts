import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private apiUrl = environment.VITE_API_URL; // Utilisez l'URL d'environnement
  constructor(private http: HttpClient) { }

  private verificationCode: string | null = null;

  getUserData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/client/accueil`);
  }

  getWallet(): Observable<any> {
    return this.http.get(`${this.apiUrl}/client/accueil`);
  }

  getInfoUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/client/accueil`);
  }

  // Effectuer un transfert d'argent
  transferMoney(senderId: number, receiverId: number, amount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/transfert`, {
      senderId,
      receiverId,
      amount
    });
  }

}

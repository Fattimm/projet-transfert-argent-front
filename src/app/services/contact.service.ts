import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contact } from '../models/contact.model'; // Importer l'interface

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = environment.VITE_API_URL;

  constructor(private http: HttpClient) {}

  sendContact(): Observable<any> {
    return this.http.get(`${this.apiUrl}/contact`);
  }

  getUserContacts(userId: number): Observable<Contact[]> {
    return this.http.get<{ status: string; message: string; data: Contact[] }>(`${this.apiUrl}/client/contacts`).pipe(
      map(response => {
        if (response.status === 'success') {
          return response.data
            .filter(contact => contact.user_id === userId)
            .map(contact => ({
              id: contact.id,
              nom: contact.nom,
              telephone: contact.telephone,
              user_id: contact.user_id,
              createdAt: contact.createdAt,
              updatedAt: contact.updatedAt
            }));
        } else {
          return [];
        }
      })
    );
  }
}

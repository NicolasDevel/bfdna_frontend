import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuggestServices {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5156/';

  getSuggestions(q: string): Observable<Pokemon[]> {
    const httpParams = new HttpParams().set('q', q);
    return this.http.get<Pokemon[]>(`${this.apiUrl}suggestions`, { params: httpParams });
  }
}

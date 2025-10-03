import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SuggestServices {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getSuggestions(q: string): Observable<Pokemon[]> {
    const httpParams = new HttpParams().set('q', q);
    return this.http.get<Pokemon[]>(`${this.apiUrl}suggestions`, { params: httpParams });
  }
}

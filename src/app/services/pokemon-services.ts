import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pokemon, PokemonIndexQueryParamas } from '../interfaces/pokemon';
import { Observable } from 'rxjs';
import { Paginate } from '../interfaces/paginate';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonServices {

  private http = inject(HttpClient)
  private apiUrl = environment.apiUrl;


  getPokemons(params : PokemonIndexQueryParamas): Observable<Paginate<Pokemon>> {
    let httpParams = new HttpParams();

    httpParams = httpParams.set('page', params.page.toString()).
      set('pageSize', params.pageSize.toString());

    if (params?.ability) {
      httpParams = httpParams.set('ability', params.ability.toString());
    }

    if (params?.type) {
      httpParams = httpParams.set('type', params.type.toString());
    }

    return this.http.get<Paginate<Pokemon>>(`${this.apiUrl}pokemons`, { params: httpParams });
  }

  getPokemonById(id: string) {
    return this.http.get<Pokemon>(`${this.apiUrl}pokemons/${id}`);
  }
}

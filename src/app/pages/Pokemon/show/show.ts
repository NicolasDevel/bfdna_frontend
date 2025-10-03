import { Component, inject, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatChipsModule, MatChipListbox } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Pokemon } from '../../../interfaces/pokemon';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonServices } from '../../../services/pokemon-services';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-show',
  standalone: true,
  imports: [
    CommonModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './show.html',
  styleUrls: ['./show.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Show {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private pokemonService = inject(PokemonServices);

  pokemon = signal<Pokemon | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) this.loadPokemon(id);
    });
  }

  loadPokemon(id: string) {
    this.loading.set(true);
    this.error.set(null);

    this.pokemonService.getPokemonById(id).subscribe({
      next: (p) => {
        this.pokemon.set(p);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('No se pudo cargar el Pokémon');
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  goBack() {
    this.router.navigate(['/']); 
  }
}

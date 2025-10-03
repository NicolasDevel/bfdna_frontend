import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { PokemonServices } from '../../../services/pokemon-services';
import { Pokemon } from '../../../interfaces/pokemon';
import { Paginate } from '../../../interfaces/paginate';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-index',
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './index.html',
  styleUrl: './index.css'
})
export class Index {
  pokemons = signal<Pokemon[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  pageSize = 20;
  currentPage = signal(1);
  totalCount = 0;
  
  typeFilter = signal<string>(''); 
  abilityFilter = signal<string>(''); 

  displayedColumns = ['id','name', 'type', 'ability'];
  private pokemonService = inject(PokemonServices);

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons() {
    this.loading.set(true);
    this.error.set(null);

    this.pokemonService.getPokemons({
      page: this.currentPage(),
      pageSize: this.pageSize,
      type: this.typeFilter() || undefined,
      ability: this.abilityFilter() || undefined
    }).subscribe({
      next: (response: Paginate<Pokemon>) => {
        this.pokemons.set(response.items);
        this.totalCount = response.totalCount;
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar los pokémons');
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage.set(event.pageIndex + 1);
    this.loadPokemons();
  }

  onFilterChange() {
    this.currentPage.set(1);
    this.loadPokemons();
  }

  onResetFilters() {
  this.typeFilter.set('');
  this.abilityFilter.set('');
  this.currentPage.set(1);
  this.loadPokemons();
}
}
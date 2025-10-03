import { Component, inject, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Pokemon } from '../../interfaces/pokemon';
import { SuggestServices } from '../../services/suggest-services';

@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatOptionModule
  ],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css'
})
export class HeaderComponent {

  @ViewChild(MatAutocompleteTrigger) autocompleteTrigger!: MatAutocompleteTrigger;
  private suggestService = inject(SuggestServices);
  private router = inject(Router);

  searchTerm = '';
  suggestions: Pokemon[] = [];

  private searchSubject = new Subject<string>();

  constructor() {
    this.searchSubject.pipe(
      debounceTime(500),      
      distinctUntilChanged()
    ).subscribe(term => this.loadSuggestions(term));
  }

  onSearchChange() {
    if (this.searchTerm.length >= 3) {
      this.searchSubject.next(this.searchTerm);
    } else {
      this.suggestions = [];
    }
  }

  loadSuggestions(term: string) {
    this.suggestService.getSuggestions(term).subscribe({
      next: res => {
        this.suggestions = res;
        setTimeout(() => {
          if (this.autocompleteTrigger) {
            this.autocompleteTrigger.openPanel();
          }
        });
      },
      error: err => console.error(err)
    });
  }

  onSelectPokemon(pokemon: Pokemon) {
    console.log(pokemon)
    this.router.navigate(['/pokemon', pokemon.id]);
    this.searchTerm = '';
    this.suggestions = [];
  }
}

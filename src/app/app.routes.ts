import { Routes } from '@angular/router';
import { Index as PokemonIndex} from './pages/Pokemon/index/index';
import { Show as ShowPokemon} from './pages/Pokemon/show/show';

export const routes: Routes = [
    {
        path: '',
        component: PokemonIndex
    },
    {
        path: 'pokemon/:id',
        component: ShowPokemon
    }
];

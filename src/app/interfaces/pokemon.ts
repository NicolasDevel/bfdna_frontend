export interface Pokemon {
    id:          number;
    name:        string;
    types:       string[];
    abilities:   string[];
    imageUrl:    string;
    lastUpdated: Date;
    popularity:  number;
}

export interface PokemonIndexQueryParamas {
    page:       number;
    pageSize:   number;
    ability?:   string;
    type?:      string;
}
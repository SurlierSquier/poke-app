import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { pokemonTypes } from '../../data/type-color';
import { type RootState } from '../store';

interface PokemonData {
    name: string;
    url: string;
}

type PokemonType = typeof pokemonTypes[number];

interface PokemonState {
    pokemonCache: Record<number, PokemonData[]>; 
    currentPage: number;
    loading: boolean;
    loadingMore: boolean;
    totalCount: number;
    favorites: string[];
    showFavorite: boolean;
    selectedTypes: PokemonType[];
    currentLimit: number;
    allPokemons: PokemonData[];
}

export const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState: {
        pokemonCache: {},
        currentPage: 0,
        loading: false,
        loadingMore: false,
        totalCount: 0,
        favorites: [],
        selectedTypes: [],
        showFavorite: false,
        currentLimit: 21,
        allPokemons: [],
    } as PokemonState,
    
    reducers: {
        startLoadingPokemon: (state) => {
            state.loading = true;
        },
        startLoadingMore: (state) => {
            state.loadingMore = true;
        },
        setPokemon: (state, action: PayloadAction<{ results: PokemonData[]; count: number }>) => {
            const { results, count } = action.payload;

            state.pokemonCache[state.currentPage] = results || [];
            state.totalCount = count || 0;
            state.loading = false;
            state.allPokemons = [...state.allPokemons, ...results];
            
        },
        setPokemonByType: (state, action: PayloadAction<{ results: PokemonData[]; count: number }>) => {
            const { results, count } = action.payload;

            state.pokemonCache = {}; 
            state.currentPage = 0;
            state.pokemonCache[0] = results || [];
            state.totalCount = count || 0;
            state.loading = false;
            state.allPokemons = results || [];
        },
        appendPokemons: (state, action: PayloadAction<{ results: PokemonData[]; count: number }>) => {
            const { results, count } = action.payload;
            
            if (results && results.length > 0) {
                state.allPokemons = [...state.allPokemons, ...results];
                state.currentPage += 1;
                state.pokemonCache[state.currentPage] = results;
                state.totalCount = count || state.totalCount;
            }
            state.loadingMore = false;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        incrementPage: (state) => {
            state.currentPage += 1;
        },
        decrementPage: (state) => {
            if (state.currentPage > 0) {
                state.currentPage -= 1;
            }
        },
        toggleFavorite: (state, action: PayloadAction<string>) => {
            const pokemonName = action.payload;
            const index = state.favorites.indexOf(pokemonName);
            if (index !== -1) {
                state.favorites.splice(index, 1);
            } else {
                state.favorites.push(pokemonName);
            }
        },
        setPokemonTypes: (state, action: PayloadAction<PokemonType[]>) => {
            state.selectedTypes = action.payload;
            state.pokemonCache = {};
            state.currentPage = 0;
            state.allPokemons = [];
        },
        clearCache: (state) => {
            state.pokemonCache = {};
            state.currentPage = 0;
            state.allPokemons = [];
        },
        toggleFavoriteButton: (state) => {
            state.showFavorite = !state.showFavorite;
        },
        loadMorePokemons: (state) => {
            state.currentLimit += 21;
        }
    }
});

export const { 
    startLoadingPokemon, 
    startLoadingMore,
    setPokemon, 
    setPokemonByType,
    appendPokemons,
    setPage, 
    incrementPage, 
    decrementPage, 
    toggleFavorite, 
    toggleFavoriteButton, 
    setPokemonTypes, 
    clearCache, 
    loadMorePokemons } = pokemonSlice.actions;

const selectPokemonCache = (state: RootState) => state.pokemon.pokemonCache;
const selectCurrentPageNumber = (state: RootState) => state.pokemon.currentPage;

export const selectCurrentPagePokemons = createSelector(
    [selectPokemonCache, selectCurrentPageNumber],
    (pokemonCache, currentPage) => pokemonCache[currentPage] || []
);

export const selectAllCachedPokemons = createSelector(
    [selectPokemonCache],
    (pokemonCache) => {
        const allPokemons: PokemonData[] = [];
        Object.values(pokemonCache).forEach(pagePokemons => {
            allPokemons.push(...pagePokemons);
        });
        return allPokemons;
    }
);

export const selectIsPageLoaded = (state: { pokemon: PokemonState }, page: number) => {
    return Boolean(state.pokemon.pokemonCache[page]);
};

export const selectCurrentPage = (state: { pokemon: PokemonState }) => {
    return state.pokemon.currentPage;
};

export const selectLoading = (state: { pokemon: PokemonState }) => {
    return state.pokemon.loading;
};

export const selectLoadingMore = (state: { pokemon: PokemonState }) => {
    return state.pokemon.loadingMore;
};

export const selectAllPokemons = (state: { pokemon: PokemonState }) => {
    return state.pokemon.allPokemons;
};

export const selectIsFavorite = (state: { pokemon: PokemonState }, pokemonName: string) => {
    return state.pokemon.favorites.includes(pokemonName);
};

export const selectFavorites = (state: { pokemon: PokemonState }) => {
    return state.pokemon.favorites;
};

export const selectPokemonTypes = (state: { pokemon: PokemonState }) => {
    return state.pokemon.selectedTypes;
};

export const selectShowFavorite = (state: { pokemon: PokemonState }) => {
    return state.pokemon.showFavorite;
};

export const selectCurrentLimit = (state: { pokemon: PokemonState }) => {
    return state.pokemon.currentLimit;
};


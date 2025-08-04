import type { Dispatch } from "@reduxjs/toolkit";
import { pokemonApi } from "../../api";
import type { RootState } from '../store';
import { appendPokemons, startLoadingMore } from "./pokemonSlice";

export const loadMorePokemon = () => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        const state = getState();
        const currentPage = state.pokemon.currentPage;
        const currentLimit = 21; 
        
        dispatch(startLoadingMore());

        try {
            const offset = (currentPage + 1) * currentLimit;
            const { data } = await pokemonApi.get(`pokemon?limit=${currentLimit}&offset=${offset}`);
            dispatch(appendPokemons(data));
        } catch (error) {
            console.error('Error loading more pokemon:', error);
            dispatch(appendPokemons({ results: [], count: 0 }));
        }
    }
}

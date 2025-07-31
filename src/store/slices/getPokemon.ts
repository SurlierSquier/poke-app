import { pokemonApi } from "../../api";
import { setPokemon, startLoadingPokemon, selectIsPageLoaded } from "./pokemonSlice";
import type { Dispatch } from "@reduxjs/toolkit";
import type { RootState } from '../store';

export const getPokemon = (page: number, currentLimit: number) => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        const state = getState();
        
        if (selectIsPageLoaded(state, page)) {
            return;
        }

        dispatch(startLoadingPokemon());

        try {
            const { data } = await pokemonApi.get(`pokemon?limit=${currentLimit}&offset=${page * currentLimit}`);
            dispatch(setPokemon(data));
        } catch (error) {
            console.error('Error fetching pokemon:', error);
        }
    }
}
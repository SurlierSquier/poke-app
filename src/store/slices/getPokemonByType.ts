
import { pokemonApi } from "../../api";
import { setPokemon, startLoadingPokemon } from "./pokemonSlice";
import type { Dispatch } from "@reduxjs/toolkit";

export const getPokemonByType = (type: string) => {

    return async (dispatch: Dispatch) => {
        dispatch(startLoadingPokemon());

        try {
            const { data } = await pokemonApi.get(`type/${type}`);
            const pokemonList = data.pokemon.map((p: { pokemon: { name: string; url: string } }) => ({
                name: p.pokemon.name,
                url: p.pokemon.url
            }));
            dispatch(setPokemon({ results: pokemonList, count: pokemonList.length }));
        } catch (error) {
            console.error('Error fetching pokemon by type:', error);
        }
    }
}

export const getPokemonByTypes = (types: string[]) => {
    return async (dispatch: Dispatch) => {

        dispatch(startLoadingPokemon());

        try {
            const pokemonPromises = types.map(type => 
                pokemonApi.get(`type/${type}`)
            );
            
            const responses = await Promise.all(pokemonPromises);
            
            const allPokemon = new Map();
            
            responses.forEach(response => {
                response.data.pokemon.forEach((p: { pokemon: { name: string; url: string } }) => {
                    allPokemon.set(p.pokemon.name, {
                        name: p.pokemon.name,
                        url: p.pokemon.url
                    });
                });
            });
            
            const uniquePokemonList = Array.from(allPokemon.values());
            dispatch(setPokemon({ results: uniquePokemonList, count: uniquePokemonList.length }));
        } catch (error) {
            console.error('Error fetching pokemon by types:', error);
        }
    }
}
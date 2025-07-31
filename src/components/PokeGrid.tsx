import { useEffect } from 'react';
import { Grid, Typography, CircularProgress, Box } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { PokeCard } from "./PokeCard";
import { 
    getPokemon, 
    getPokemonByTypes,
    selectCurrentPagePokemons, 
    selectAllCachedPokemons,
    selectCurrentPage, 
    selectLoading,
    selectPokemonTypes,
    selectShowFavorite,
    selectFavorites,
    selectCurrentLimit
} from '../store';
import type { AppDispatch } from '../store';
import { LoadMoreButton } from './LoadMoreButton';
import { NextPageButton } from './NextPageButton';
import { PreviousPageButton } from './PreviousPageButton';


export const PokeGrid = () => {
    const dispatch = useDispatch<AppDispatch>();
    const pokemonList = useSelector(selectCurrentPagePokemons);
    const allCachedPokemons = useSelector(selectAllCachedPokemons);
    const currentPage = useSelector(selectCurrentPage);
    const currentLimit = useSelector(selectCurrentLimit);
    const loading = useSelector(selectLoading);
    const selectedTypes = useSelector(selectPokemonTypes);
    const showFavorite = useSelector(selectShowFavorite);
    const favorites = useSelector(selectFavorites);

    useEffect(() => {
        if (selectedTypes.length > 0) {
            const typeNames = selectedTypes.map(type => type.type);
            dispatch(getPokemonByTypes(typeNames));
        } else {
            
            dispatch(getPokemon(currentPage, currentLimit));
        }
    }, [dispatch, currentPage, currentLimit, selectedTypes]);


    const showFavorites = () => {
        return allCachedPokemons.filter(pokemon => favorites.includes(pokemon.name));
    }

    const pokemonsToShow = showFavorite 
        ? showFavorites()
        : pokemonList;

    if (loading) {
        return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress />
            <Typography variant="h6" sx={{ ml: 2 }}>
            Cargando Pokémon...
            </Typography>
        </Box>
        );
    }


    return (
        
        <Grid container spacing={3} 
            sx={{ 
                    marginInline: { xs: '20px', sm: '40px', md: '80px' },
                }}
            >
                {showFavorite && pokemonsToShow.length === 0 ? (
                    <Grid size={12}>
                        <Box 
                            display="flex" 
                            justifyContent="center" 
                            alignItems="center" 
                            height="50vh"
                            width="100%"
                        >
                            <Typography variant="h6" color="text.secondary">
                                No hay favoritos guardados
                            </Typography>
                        </Box>
                    </Grid>
                ) : (
                    pokemonsToShow.map((pokemon: { name: string; url: string }) => (
                        <Grid size={{ xs: 12, md: 6, xl: 4 }} key={pokemon.name}>
                            <PokeCard pokemon={pokemon} />
                        </Grid>
                    ))
                )}

            <Box 
                sx={{ 
                    display: 'flex', 
                    flexDirection: 'row', 
                    justifyContent: 'space-between' 
                    }} 
                height= "80px"
                width={"100%"}>
                

                <PreviousPageButton 
                    hasSelectedTypes={selectedTypes.length > 0}
                    visible={selectedTypes.length === 0}
                />

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center' }}>
                    <Typography 
                        variant="body1" 
                        sx={{ 
                            mx: 2,
                            display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingX: 4,
                        paddingY: 2,
                        backgroundColor: '#e6e3e3',
                        borderRadius: '8px',
                        width: 'fit-content',
                    }}
                    >
                        {showFavorite ? 'Favs' : selectedTypes.length > 0 ? 'Filtrado' : currentPage + 1}
                    </Typography>
                    <LoadMoreButton />
                </Box>

                <NextPageButton 
                    hasSelectedTypes={selectedTypes.length > 0}
                    visible={ selectedTypes.length === 0}
                />

            </Box>
        </Grid>
        
    );
}

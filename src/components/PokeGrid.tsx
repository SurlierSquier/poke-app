import { Box, Grid, Typography } from "@mui/material";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../store';
import {
    getPokemon,
    getPokemonByTypes,
    selectAllPokemons,
    selectFavorites,
    selectLoading,
    selectLoadingMore,
    selectPokemonTypes,
    selectShowFavorite
} from '../store';
import { LoadMoreButton } from './LoadMoreButton';
import { PokeCard } from "./PokeCard";
import { SkeletonCard } from "./SkeletonCard";
// import { NextPageButton } from './NextPageButton';
// import { PreviousPageButton } from './PreviousPageButton';


export const PokeGrid = () => {
    const dispatch = useDispatch<AppDispatch>();
    const allPokemons = useSelector(selectAllPokemons);
    const loading = useSelector(selectLoading);
    const loadingMore = useSelector(selectLoadingMore);
    const selectedTypes = useSelector(selectPokemonTypes);
    const showFavorite = useSelector(selectShowFavorite);
    const favorites = useSelector(selectFavorites);

    useEffect(() => {
        if (selectedTypes.length > 0) {
            const typeNames = selectedTypes.map(type => type.type);
            dispatch(getPokemonByTypes(typeNames));
        } else {
            if (allPokemons.length === 0) {
                dispatch(getPokemon(0, 21));
            }
        }
    }, [dispatch, selectedTypes, allPokemons.length]);


    const showFavorites = () => {
        return allPokemons.filter(pokemon => favorites.includes(pokemon.name));
    }

    const pokemonsToShow = showFavorite 
        ? showFavorites()
        : allPokemons;

    if (loading) {
        return (
            <Grid container spacing={3} 
                sx={{ 
                    marginInline: { xs: '20px', sm: '40px', md: '80px' },
                }}
            >
                {Array.from({ length: 12 }).map((_, index) => (
                    <Grid size={{ xs: 12, md: 6, xl: 4 }} key={`skeleton-${index}`}>
                        <SkeletonCard />
                    </Grid>
                ))}
            </Grid>
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
                    <>
                        {pokemonsToShow.map((pokemon: { name: string; url: string }) => (
                            <Grid size={{ xs: 12, md: 6, xl: 4 }} key={pokemon.name}>
                                <PokeCard pokemon={pokemon} />
                            </Grid>
                        ))}
                        
                        {loadingMore && (
                            Array.from({ length: 6 }).map((_, index) => (
                                <Grid size={{ xs: 12, md: 6, xl: 4 }} key={`skeleton-loading-more-${index}`}>
                                    <SkeletonCard />
                                </Grid>
                            ))
                        )}
                    </>
                )}

            <Box 
                sx={{ 
                    display: 'flex', 
                    flexDirection: 'row', 
                    justifyContent: 'center' 
                    }} 
                height= "80px"
                width={"100%"}>
                

                {/* <PreviousPageButton 
                    hasSelectedTypes={selectedTypes.length > 0}
                    visible={selectedTypes.length === 0}
                /> */}

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center' }}>
                    {/* <Typography 
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
                    </Typography> */}
                    {selectedTypes.length === 0 && !showFavorite && (
                        <LoadMoreButton />
                    )}
                </Box>

                {/* <NextPageButton 
                    hasSelectedTypes={selectedTypes.length > 0}
                    visible={ selectedTypes.length === 0}
                /> */}

            </Box>
        </Grid>
        
    );
}

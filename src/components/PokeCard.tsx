import { Box, Card, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { pokemonApi } from '../api';

import { pokemonTypes } from '../data/type-color';

import { Star, StarOutline } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { selectIsFavorite, toggleFavorite } from '../store';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface PokemonData {
    name: string;
    url: string;
}

interface PokemonDetails {
    id: number;
    name: string;
    sprites: {
        other?: {
            showdown?: {
                front_default?: string;
                back_default?: string;
                front_shiny?: string;
                back_shiny?: string;
            };
        };
        front_default?: string;
    };
    types: Array<{
        type: {
            name: string;
            sprites?: {
                "generation-vii"?: {
                    "legends-arceus"?: {
                        "name_icon"?: string;
                    };
                };
            };
        };
    }>;
    height: number;
    weight: number;
}

interface PokeCardProps {
    pokemon: PokemonData;
}



export const PokeCard = ({ pokemon }: PokeCardProps) => {
    const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(null);
    const [loading, setLoading] = useState(true);
    
    const dispatch = useDispatch();
    const isFavorite = useSelector((state: RootState) => selectIsFavorite(state, pokemon.name));


    const [ currentSprite, setCurrentSprite ] = useState<SpriteKey>('front_default');


    useEffect(() => {
        const fetchPokemonDetails = async () => {
            try {
                setLoading(true);
                const response = await pokemonApi.get(pokemon.url);
                setPokemonDetails(response.data);
            } catch (error) {
                console.error('Error fetching pokemon details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemonDetails();
    }, [pokemon.url]);

    const getTypeIcon = (typeName: string): string => {
        return `/icons/${typeName}.svg`;
    };

    if (loading) {
        return (
            <Card sx={{ height: 280, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography>Loading...</Typography>
            </Card>
        );
    }

    if (!pokemonDetails) {
        return (
            <Card sx={{ height: 280, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography>No data available</Typography>
            </Card>
        );
    }

    type SpriteKey = 'front_default' | 'back_default' | 'front_shiny' | 'back_shiny';
    const orientation: SpriteKey[] = ['front_default', 'back_default', 'front_shiny', 'back_shiny'];


    const getSprite = (currentSprite: SpriteKey) => {
        const showdownSprites = pokemonDetails.sprites.other?.showdown;
        if (showdownSprites && showdownSprites[currentSprite]) {
            return showdownSprites[currentSprite];
        }
        
        if (currentSprite === 'front_default' && pokemonDetails.sprites.front_default) {
            return pokemonDetails.sprites.front_default;
        }
        
        return pokemonDetails.sprites.front_default || '';
    };

    const changeSprite = (direction: 'next' | 'prev') => {
        const currentIndex = orientation.indexOf(currentSprite);
        let newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

        if (newIndex < 0) {
            newIndex = orientation.length - 1;
        } else if (newIndex >= orientation.length) {
            newIndex = 0;
        }

        setCurrentSprite(orientation[newIndex]);
    };

    const getTypeColor = (typeName: string): string => {
        const typeData = pokemonTypes.find(t => t.type === typeName);
        return typeData ? typeData.color : '#A8A77A'; 
    };

    const getBackgroundStyle = () => {

        if (pokemonDetails.types.length === 1) {
            const color = getTypeColor(pokemonDetails.types[0].type.name);
            return { backgroundColor: color };
        } else {
            const color1 = getTypeColor(pokemonDetails.types[0].type.name);
            const color2 = getTypeColor(pokemonDetails.types[1].type.name);
            return { 
                background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)` 
            };
        }
    };

    return (
        <Card sx={{ 
            height: 'auto', 
            display: 'flex', 
            flexDirection: 'column', 
            borderRadius: '16px',
            ...getBackgroundStyle(),
            color: 'white',
            '& .MuiCardHeader-title': { color: 'white' },
            '& .MuiCardHeader-subheader': { color: 'rgba(255, 255, 255, 0.8)' },
            '& .MuiTypography-root': { color: 'white' },
            position: 'relative',
            minWidth: 200,
        }}>
            <CardHeader
                title={pokemonDetails.name}
                subheader={`#${pokemonDetails.id.toString().padStart(4, '0')}`}
                slotProps={{ 
                    header: { 
                        variant: 'h6', 
                        sx: { textTransform: 'capitalize' }
                    },
                    subheader: { 
                        variant: 'body2', 
                        color: 'text.secondary' 
                    }
                }}
                sx={{ textAlign: 'center', pb: 0 }}
            />

            <IconButton
                sx={{ position: 'absolute', top: 100, left: 8}}
                onClick={() => {
                    changeSprite('prev');
                }}
            >
                <ArrowBackIosIcon 
                    sx={{ color: 'white' }}
                />
            </IconButton>

            <CardMedia
                component="img"
                image= {getSprite(currentSprite)}
                alt={pokemonDetails.name}
                sx={{ 
                    width: 120, 
                    height: 120, 
                    mx: 'auto',
                    objectFit: 'contain'
                }}
            />
            
            <IconButton
                sx={{ position: 'absolute', top: 100, right: 8}}
                onClick={() => {
                    changeSprite('next');
                }}
            >
                <ArrowForwardIosIcon 
                    sx={{ color: 'white' }}
                />
            </IconButton>

            <CardContent sx={{ textAlign: 'center', pt: 1, flex: 1}}>
                    <Box >
                    {pokemonDetails.types.map((type, index) => (
                        <Box
                            key={index}
                            sx={{ 
                                backgroundColor: 'rgba(255, 255, 255, 0.2)', 
                                padding: '4px 8px', 
                                borderRadius: '12px', 
                                margin: '2px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textTransform: 'capitalize',
                                color: 'white',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                minWidth: '60px'
                            }}
                        >
                            <img 
                                src={getTypeIcon(type.type.name)}
                                alt={type.type.name}
                                style={{ 
                                    width: '16px', 
                                    height: '16px',
                                    marginRight: '4px'
                                }}
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                }}
                            />
                            <Typography variant="caption" sx={{ fontSize: '12px' }}>
                                {type.type.name}
                            </Typography>
                        </Box>
                    ))}
                    <Box sx={{ mt: 1}}>
                    {pokemonDetails.height && (
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                            Height: {pokemonDetails.height / 10} m
                        </Typography>
                    )
                    }
                    {pokemonDetails.weight && (
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                            Weight: {pokemonDetails.weight / 10} kg
                        </Typography>
                    )}
                    </Box>
                </Box>
            </CardContent>
            <Box sx={{
                position: 'absolute',
                top: 12,
                right: 16,
                zIndex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <a onClick={() => dispatch(toggleFavorite(pokemon.name))} style={{ cursor: 'pointer'}}>
                    {isFavorite ? <Star sx={{ color: 'gold' }}/> : <StarOutline sx={{ color: 'white' }} />}
                </a>
            </Box>
        </Card>
    );
}

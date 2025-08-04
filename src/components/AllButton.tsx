import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectShowFavorite, toggleFavoriteButton } from '../store/slices/pokemonSlice';

export const AllButton = () => {
      const dispatch = useDispatch();
      const showFavorite = useSelector(selectShowFavorite);

      const toggleFavorite = () => {
          dispatch( toggleFavoriteButton() );
      }

  return (  
      <Button
          variant={!showFavorite ? "contained" : "outlined"}
          onClick={!showFavorite ?  () => {} : toggleFavorite}
          sx={{
                backgroundColor: !showFavorite ? 'lightgreen' : 'lightgray',
                color: 'black',
                ...(showFavorite && {
                    '&:hover': {
                        backgroundColor: showFavorite ? 'lightgreen' : 'lightgray',
                    }
                }),
              }}
          >
              Mostrar Todos
          </Button>
      );
};

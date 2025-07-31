import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavoriteButton, selectShowFavorite } from '../store';

export const FavButton = () => {
      const dispatch = useDispatch();
      const showFavorite = useSelector(selectShowFavorite);

      const toggleFavorite = () => {
          dispatch( toggleFavoriteButton() );
      }

  return (
      <Button
          variant={showFavorite ? "contained" : "outlined"}
          onClick={showFavorite ?  () => {} : toggleFavorite}
          sx={{
                backgroundColor: showFavorite ? 'lightgreen' : 'lightgray',
                color: 'black',
                ...(!showFavorite && {
                      '&:hover': {
                          backgroundColor: !showFavorite ? 'lightgreen' : 'lightgray',
                          color: 'black',
                      }
                }),
              }}
          >
            Favoritos
          </Button>
      )
}

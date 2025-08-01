import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../store";
import { loadMorePokemon, selectLoadingMore } from "../store";

export const LoadMoreButton = () => {
    const dispatch = useDispatch<AppDispatch>();
    const loadingMore = useSelector(selectLoadingMore);
    
    const handleLoadMore = () => {
        dispatch(loadMorePokemon());
    }
  return (
    <Button 
        variant="contained"
        color="primary"
        onClick={handleLoadMore}
        disabled={loadingMore}
        sx={{
            marginTop: '12px',
            width: '100%',
            height: '50px',
            fontSize: '16px',
            fontWeight: 'bold',
            textTransform: 'none',
            backgroundColor: 'lightgreen',
            color: 'black',
            '&:hover': {
                backgroundColor: 'lightgray',
                color: 'black',
            },
            '&:disabled': {
                backgroundColor: 'lightgray',
                color: 'gray',
            },
        }}>
      {loadingMore ? 'Cargando...' : 'Load More'}
    </Button>
  )
}

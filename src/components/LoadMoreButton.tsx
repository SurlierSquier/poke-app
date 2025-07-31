import { Button } from "@mui/material"
import { useDispatch  } from "react-redux";
import { loadMorePokemons  } from "../store";

export const LoadMoreButton = () => {
    const dispatch = useDispatch();
    
    const handleLoadMore = () => {
        dispatch(loadMorePokemons());
    }
  return (
    <Button 
        variant="contained"
        color="primary"
        onClick={handleLoadMore}
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
        }}>
      Load More
    </Button>
  )
}

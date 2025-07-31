import { Button } from '@mui/material';
import { incrementPage, selectLoading } from '../store';
import { useDispatch, useSelector } from 'react-redux';

interface NextPageButtonProps {
    visible?: boolean;
    hasSelectedTypes?: boolean;
    showFavorite?: boolean;
}

export const NextPageButton = ({ 
    visible = true, 
    hasSelectedTypes = false, 
    showFavorite = false 
}: NextPageButtonProps) => {
    const dispatch = useDispatch();
    const loading = useSelector(selectLoading);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!visible) {
        return null;
    }

    return (
        <Button
            disabled={loading || hasSelectedTypes || showFavorite}
            onClick={(event) => {
                event.preventDefault();
                dispatch(incrementPage());
                scrollToTop();
            }}
            variant="contained"
            sx={{
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
            }}
        >
            Siguiente
        </Button>
    );
}

import { Button } from '@mui/material';
import { decrementPage, selectLoading } from '../store';
import { useDispatch, useSelector } from 'react-redux';

interface PreviousPageButtonProps {
    visible?: boolean;
    hasSelectedTypes?: boolean;
}

export const PreviousPageButton = ({ 
    visible = true, 
    hasSelectedTypes = false, 
}: PreviousPageButtonProps) => {

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
            disabled={loading  || hasSelectedTypes}
            onClick={(event) => {
                event.preventDefault();
                dispatch(decrementPage());
                scrollToTop();
            }}
            variant='contained'
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
            Anterior
        </Button>
    );
}
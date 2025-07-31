import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { pokemonTypes } from '../data/type-color';
import { type SelectChangeEvent } from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { setPokemonTypes, selectPokemonTypes } from '../store/slices/pokemonSlice';
import { useScrollTrigger } from '@mui/material';

export const TypeFilter = () => {
  const trigger = useScrollTrigger();

  const ITEM_HEIGHT = 32;
  const ITEM_PADDING_TOP = 8;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP,
        width: 250,
        opacity: trigger ? 0 : 1, 
        transition: 'opacity 0.3s ease-in-out',
      },
    },
  };

  const dispatch = useDispatch();
  const selectedTypes = useSelector(selectPokemonTypes);

  const handleChange = (event: SelectChangeEvent<typeof pokemonTypes>) => {
    const {
      target: { value },
    } = event;
    const uniqueTypes = Array.isArray(value) ? value : [];
    dispatch(setPokemonTypes(uniqueTypes));
  };


  return (
    <div style={{ 
      width: '100%', 
    }}>
      <FormControl 
      sx={{
        width: {
          xs: '100%',
          md: 300
        }
      }}>
        <InputLabel id="demo-multiple-checkbox-label">Tipos</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedTypes}
          onChange={handleChange}
          //inputProps={{MenuProps: {disableScrollLock: true}}}
          input={<OutlinedInput label="Tipos" />}
          renderValue={(selected) => selected.map((x) => x.type).join(', ')}
          MenuProps={MenuProps}
        >
          {pokemonTypes.map((pokemonType) => (
            <MenuItem
              key={pokemonType.type} 
              value={pokemonType.type}
            >
              <Checkbox
                checked={selectedTypes.some((item) => item.type === pokemonType.type)}
              />
              <ListItemText primary={pokemonType.type} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
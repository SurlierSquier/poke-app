import { useScrollTrigger } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { pokemonTypes } from '../data/type-color';
import { selectPokemonTypes, setPokemonTypes } from '../store/slices/pokemonSlice';

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

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    
    const selectedTypeNames = Array.isArray(value) ? value : [];
    const selectedTypeObjects = selectedTypeNames.map(typeName => 
      pokemonTypes.find(pt => pt.type === typeName)
    ).filter((type): type is typeof pokemonTypes[number] => type !== undefined);
    
    dispatch(setPokemonTypes(selectedTypeObjects));
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
          value={selectedTypes.map(type => type.type)}
          onChange={handleChange}
          //inputProps={{MenuProps: {disableScrollLock: true}}}
          input={<OutlinedInput label="Tipos" />}
          renderValue={(selected) => selected.join(', ')}
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
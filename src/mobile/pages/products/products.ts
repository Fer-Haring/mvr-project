import { Slider as BaseSlider, sliderClasses } from '@mui/base/Slider';
import { Autocomplete, Paper, Select, TextField } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

export const StockWrapper = styled(motion.ul)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(19.75rem, 100%), 1fr))',
  gridGap: theme.spacing(4),
  width: '100%',
  listStyle: 'none',
  padding: 0,
  margin: 0,
  '& > li': {
    width: '100%',
  },
}));

export const Slider = styled(BaseSlider)(
  ({ theme }) => `
  color: ${theme.palette.primary.main};
  height: 4px;
  width: 100%;
  padding: 16px 0;
  display: inline-flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  touch-action: none;
  -webkit-tap-highlight-color: transparent;

  & .${sliderClasses.rail} {
    display: block;
    position: absolute;
    width: 100%;
    height: 4px;
    border-radius: 6px;
    background-color: currentColor;
    opacity: 0.3;
  }

  & .${sliderClasses.track} {
    display: block;
    position: absolute;
    height: 4px;
    border-radius: 6px;
    background-color: currentColor;
  }

  & .${sliderClasses.thumb} {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    margin-left: -6px;
    width: 15px;
    height: 15px;
    box-sizing: border-box;
    border-radius: 50%;
    outline: 0;
    background-color: ${theme.palette.primary.main};
    transition-property: box-shadow, transform;
    transition-timing-function: ease;
    transition-duration: 120ms;
    transform-origin: center;

    &:hover {
      box-shadow: 0 0 0 6px ${theme.palette.primary.main};
    }

    &.${sliderClasses.focusVisible} {
      box-shadow: 0 0 0 8px ${alpha(theme.palette.primary.main, 0.5)};
      outline: none;
    }

    &.${sliderClasses.active} {
      box-shadow: 0 0 0 8px ${alpha(theme.palette.primary.main, 0.5)};
      outline: none;
      transform: scale(1.2);
    }
  }
`
);

export const CustomAutoComplete = styled(Autocomplete)(({ theme }) => ({
  height: 'auto',
  borderRadius: theme.spacing(0.5),
  width: 'auto',
  border: 'none',
  '& label': {
    fontSize: 16,
    color: theme.palette.grey[800],
  },
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.grey[200],
  },
  '& .MuiSvgIcon-root': {
    color: theme.palette.grey[700],
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderRadius: theme.spacing(0.5),
    borderColor: theme.palette.grey[700],
  },
  '& .MuiSelect-input': {
    height: 'auto',
    paddingBlock: 0,
    borderRadius: theme.spacing(0.5),
    border: 'none',
  },
  '& .MuiSelect-select': {
    height: 'auto',
    paddingBlock: 0,
    borderRadius: theme.spacing(0.5),
    border: 'none',
  },
  '& .MuiAutocomplete-inputRoot': {
    height: 'auto',
    paddingBlock: 0,
    borderRadius: theme.spacing(0.5),
    border: 'none',
  },
  '& .MuiOutlinedInput-input': {
    color: theme.palette.grey[800],
  },
}));

export const CustomSelect = styled(Select)(({ theme }) => ({
  height: theme.spacing(5),
  minHeight: theme.spacing(1),
  borderRadius: theme.spacing(0.5),
  width: 'auto',
  border: 'none',
  backgroundColor: theme.palette.grey[200],
  '.MuiSelect-select': {
    height: 'auto',
    borderRadius: theme.spacing(0.5),
    width: 180,
    backgroundColor: 'transparent',
    
    '&:focus-within': {
      borderRadius: theme.spacing(0.5),
      borderColor: theme.palette.grey[800],
    },
  },
  '& label.MuiInputLabel-root': {
    fontSize: 16,
    color: theme.palette.grey[800],
  },
  '& .MuiSvgIcon-root': {
    color: theme.palette.grey[800],
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderRadius: theme.spacing(0.5),
    borderColor: theme.palette.grey[800],
  },
  '& .MuiOutlinedInput-root': {
    '& input': {
      color: theme.palette.grey[800],
    },
  },
  '& .MuiMenuItem-root': {
    color: theme.palette.grey[800],
  },
  '& .MuiSelect-select.MuiSelect-select': {
    color: theme.palette.grey[800],
  },
}));

export const CustomInputSearch = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    height: theme.spacing(5),
    borderRadius: theme.spacing(0.5),
    width: 'auto',
    backgroundColor: theme.palette.grey[200],
    '&:focus-within': {
      borderRadius: theme.spacing(0.5),
      borderColor: theme.palette.grey[800],
    },
  },
  '& label.MuiInputLabel-root': {
    fontSize: 16,
    color: theme.palette.grey[800],
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderRadius: theme.spacing(0.5),
    borderColor: theme.palette.grey[800],
  },
  '& .MuiOutlinedInput-input': {
    padding: '10px 14px',
    color: theme.palette.grey[800],
    userSelect: 'text',
  },
}));

export const FiltersHolder = styled(Paper)(({ theme }) => ({
  width: '100%',
  maxWidth: '320px',
  height: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  position: 'sticky',
  top: theme.spacing(0.1),
  gap: theme.spacing(4),
  padding: theme.spacing(2),
  paddingTop: theme.spacing(4),
  backgroundColor: alpha(theme.palette.common.white, 1),
}));

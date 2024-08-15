import { Slider as BaseSlider, sliderClasses } from '@mui/base/Slider';
import { Autocomplete, Button, Paper, Select, TextField } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

export const StockWrapper = styled(motion.ul)<{
  isMobile: boolean;
}>(({ theme, isMobile }) => ({
  display: isMobile ? 'flex' : 'grid',
  gridTemplateColumns: !isMobile ? 'repeat(auto-fit, minmax(min(15.75rem, 100%), 1fr))' : 'none',
  gridGap: theme.spacing(4),
  flexDirection: isMobile ? 'column' : 'row',
  width: '100%',
  listStyle: 'none',
  padding: 0,
  margin: 0,
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

export const FiltersHolder = styled(Paper)<{ isMobile: boolean }>(({ theme, isMobile }) => ({
  width: '100%',
  height: 'auto',
  display: 'flex',
  flexDirection: isMobile ? 'column' : 'row',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'sticky',
  gap: theme.spacing(2),
  paddingTop: isMobile ? theme.spacing(2) : theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
  paddingRight: theme.spacing(2),
  paddingLeft: theme.spacing(2),
  backgroundColor: alpha(theme.palette.common.white, 0.7),
  marginBottom: theme.spacing(2),
}));

// Main category button

export const CategoryButtonWrapper = styled(motion.ul)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(13.75rem, 100%), 1fr))',
  gridGap: theme.spacing(4),
  width: '100%',
  listStyle: 'none',
  padding: theme.spacing(5),
  margin: 0,
}));

export const CategoryButton = styled(Button)(({ theme }) => ({
  width: '100%',
  maxWidth: '350px',
  fontSize: '16px',
  fontWeight: 600,
  color: theme.palette.common.white,
  cursor: 'pointer',
  textAlign: 'center',
  border: 'none',
  backgroundSize: ' 300% 100%',
  borderRadius: '50px',
  textWrap: 'nowrap',
  transition: 'all .4s ease-in-out',

  '&:hover': {
    backgroundPosition: '100% 0',
    transition: 'all .4s ease-in-out',
  },

  '&:hover:focus': {
    outline: 'none',
  },

  '&.bn26': {
    backgroundImage: 'linear-gradient(to right, #25aae1, #4481eb, #04befe, #3f86ed)',
    boxShadow: '0 4px 15px 0 rgba(65, 132, 234, 0.75)',
  },
}));

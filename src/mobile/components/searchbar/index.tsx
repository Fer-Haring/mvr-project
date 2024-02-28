import React, { FunctionComponent } from 'react';

import { useIntl } from 'react-intl';

import { useIsMobile } from '@webapp/hooks/is-mobile';

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { SxProps, Theme, useTheme } from '@mui/material/styles';

import InputField from '../form/input';

interface SearchBarProps {
  className?: string;
  width?: number;
  searchValue?: string;
  onSearchValueChange?: (value: string) => void;
  sx?: SxProps<Theme>;
  timeout?: number;
  nameId?: string;
}

const SearchBar: FunctionComponent<SearchBarProps> = ({
  className,
  width,
  searchValue,
  onSearchValueChange,
  sx,
  timeout,
  nameId
}) => {
  const { formatMessage } = useIntl();
  const theme = useTheme();
  const isMobile = useIsMobile();

  const [searchFieldTouched, setSearchFieldTouched] = React.useState<boolean>(false);
  const [searchfieldWidth, setSearchfieldWidth] = React.useState<string | number>(width || '400px');
  const [inputValue, setInputValue] = React.useState(searchValue);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (isMobile) {
      setSearchfieldWidth('100%');
    } else if (width) {
      setSearchfieldWidth(searchFieldTouched ? width * 1.25 : width);
    } else {
      setSearchfieldWidth(searchFieldTouched ? '460px' : '400px');
    }
  }, [searchFieldTouched, isMobile, width]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (timeout) {
      timeoutRef.current = setTimeout(() => {
        onSearchValueChange && onSearchValueChange(e.target.value);
      }, timeout);
    } else {
      onSearchValueChange && onSearchValueChange(e.target.value);
    }
  };

  React.useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onSearchValueChange && onSearchValueChange(inputValue!);
    }, timeout || 500);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [inputValue, onSearchValueChange, timeout]);

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <InputField
      className={className || ''}
      label={nameId ? formatMessage({ id: nameId }) : ''}
      placeholder={nameId ? formatMessage({ id: nameId }) : ''}
      size="small"
      value={inputValue}
      onChange={handleChange}
      noDefaultHelperText
      InputProps={{
        startAdornment: <SearchRoundedIcon fontSize="small" />,
      }}
      onFocus={() => setSearchFieldTouched(true)}
      onBlur={() => setSearchFieldTouched(false)}
      onKeyDown={(ev) => {
        if (ev.key === 'Enter') {
          onSearchValueChange && onSearchValueChange(searchValue || '');
        }
      }}
      sx={{
        flexShrink: {
          md: 1,
          lg: 0,
        },
        width: {
          md: '100%',
          lg: searchfieldWidth,
        },
        mt: {
          xs: 1,
          md: 0,
        },
        transition: theme.transitions.create(['width'], {
          duration: theme.transitions.duration.standard,
          easing: theme.transitions.easing.easeInOut,
        }),
        ...sx,
      }}
      aria-label="Search Input"
    />
  );
};

export default SearchBar;

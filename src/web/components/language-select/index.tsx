import React, { useContext } from 'react';

import { useIntl } from 'react-intl';

import { AllowedLanguages, translationsContext } from '@webapp/translations';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { SxProps, Theme } from '@mui/material/styles';

/**
 * LanguageSelectProps is an interface that defines the props for the LanguageSelect component.
 */
interface LanguageSelectProps {
  /**
   * Additional CSS classes.
   */
  className?: string;
  /**
   * Custom styling using MUI's SxProps.
   */
  sx?: SxProps<Theme>;
}

/**
 * LanguageSelect is a component that allows users to change the application's language.
 *
 * @param {LanguageSelectProps} props - The props for the component.
 * @returns {React.ReactElement} A LanguageSelect component.
 */
const LanguageSelect: React.FC<LanguageSelectProps> = ({ className, sx }) => {
  const { formatMessage } = useIntl();
  const context = useContext(translationsContext)!;

  const handleLanguageChange = (lang: AllowedLanguages) => {
    context.changeLanguage(lang);
  };

  const languageLinks: { lang: AllowedLanguages; label: string }[] = [
    { lang: 'en', label: formatMessage({ id: 'LANGUAGE_SWITCHER.ENGLISH' }) },
    { lang: 'es', label: formatMessage({ id: 'LANGUAGE_SWITCHER.SPANISH' }) },
    { lang: 'it', label: formatMessage({ id: 'LANGUAGE_SWITCHER.ITALIAN' }) },
  ];

  return (
    <Box
      className={className || ''}
      sx={{
        minWidth: 180,
        ...sx,
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="language-slector-select-label">
          {formatMessage({ id: 'LANGUAGE_SWITCHER.SELECT.LABEL' })}
        </InputLabel>
        <Select
          labelId="language-slector-select-label"
          id="language-slector-select"
          value={context.currentLanguage}
          label={formatMessage({ id: 'LANGUAGE_SWITCHER.SELECT.LABEL' })}
          onChange={(event: SelectChangeEvent) => handleLanguageChange(event.target.value as AllowedLanguages)}
        >
          {languageLinks.map((item) => (
            <MenuItem key={item.lang} value={item.lang}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default LanguageSelect;

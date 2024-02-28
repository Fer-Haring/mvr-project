import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SxProps, Theme, alpha, darken, styled } from '@mui/material/styles';
import { easing } from '@webapp/mobile/components/framer';
import { AllowedLanguages, translationsContext } from '@webapp/translations';
import { motion, useReducedMotion } from 'framer-motion';
import React, { useContext } from 'react';
import { useIntl } from 'react-intl';

/**
 * Styles for the LanguageSelector component.
 */
const Wrapper = styled('ul')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1.5),
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: 0,
  margin: 0,
  listStyle: 'none',
  li: {
    position: 'relative',
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  '& .tab-bg': {
    '--tab-padding': theme.spacing(1.5),
    backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.main}, ${darken(
      theme.palette.primary.main,
      0.25
    )})`,
    width: 'calc(100% + var(--tab-padding))',
    height: 'calc(100% + var(--tab-padding) / 4)',
    position: 'absolute',
    top: 'calc(0% - (var(--tab-padding) / 8))',
    left: 'calc(0% - (var(--tab-padding) / 2))',
    borderRadius: theme.shape.borderRadius,
    zIndex: 0,
    border: `1px solid ${alpha(theme.palette.primary.dark, 0.2)}`,
    boxShadow: `0 1px 1px 0 ${alpha(theme.palette.common.white, 0.5)} inset, 0 24px 48px 0 ${alpha(
      theme.palette.common.white,
      0.06
    )} inset, 0 0 24px ${alpha(theme.palette.common.black, 0.2)}`,
  },
}));

/**
 * Styles for language selector buttons.
 */
const Selector = styled(motion.button)(({ theme }) => ({
  appearance: 'none',
  width: theme.spacing(3),
  height: theme.spacing(3),
  background: 'transparent',
  padding: 0,
  border: 0,
  borderRadius: theme.shape.borderRadius / 2,
  color: theme.palette.text.primary,
  fontWeight: 600,
  cursor: 'pointer',
  position: 'relative',
  aspectRatio: '1/1',
  transition: theme.transitions.create('color', {
    duration: theme.transitions.duration.shortest,
    easing: theme.transitions.easing.easeInOut,
  }),
  zIndex: 1,
  '&:hover': {
    color: theme.palette.primary.main,
  },
  '&[data-highlight="true"]': {
    color: theme.palette.primary.contrastText,
  },
}));

/**
 * LanguageSelectorProps is an interface that defines the props for the LanguageSelector component.
 */
interface LanguageSelectorProps {
  className?: string;
  sx?: SxProps<Theme>;
}

/**
 * LanguageSelector is a component that allows users to change the application's language.
 *
 * @param {LanguageSelectorProps} props - The props for the component.
 * @returns {React.ReactElement} A LanguageSelector component.
 */
const LanguageSelector: React.FC<LanguageSelectorProps> = ({ className, sx }) => {
  const shouldReduceMotion = useReducedMotion(); // Check for reduced motion preference
  const { formatMessage } = useIntl();
  const context = useContext(translationsContext)!;

  const handleLanguageChange = (lang: AllowedLanguages) => {
    context.changeLanguage(lang);
  };

  const languageLinks: { lang: AllowedLanguages; label: string }[] = [
    { lang: 'en', label: formatMessage({ id: 'LANGUAGE_SWITCHER.ENGLISH.SHORT' }) },
    { lang: 'es', label: formatMessage({ id: 'LANGUAGE_SWITCHER.SPANISH.SHORT' }) },
  ];

  return (
    <Box className={className || ''} sx={sx}>
      <Typography sx={{ display: 'none' }} className="sr-only">
        {formatMessage({ id: 'LANGUAGE_SWITCHER.SELECT.LABEL' })}
      </Typography>
      <Wrapper>
        {languageLinks.map((item) => (
          <li key={item.lang}>
            <Selector
              type="button"
              onClick={() => handleLanguageChange(item.lang)}
              lang={item.lang}
              aria-label={formatMessage({ id: 'LANGUAGE_SWITCHER.LINK.ARIA' }, { lang: item.lang })}
              data-highlight={item.lang === context.currentLanguage}
              whileHover={context.currentLanguage !== item.lang ? (shouldReduceMotion ? {} : { scale: 1.1 }) : {}}
              whileTap={context.currentLanguage !== item.lang ? (shouldReduceMotion ? {} : { scale: 0.9 }) : {}}
              transition={shouldReduceMotion ? {} : { type: 'spring', stiffness: 300 }}
            >
              {item.label}
            </Selector>
            {context.currentLanguage === item.lang ? (
              <motion.div
                className="tab-bg"
                layoutId="tab-bg"
                transition={{
                  layout: shouldReduceMotion
                    ? {}
                    : {
                        type: 'spring',
                        stiffness: 80,
                        damping: 20,
                        mass: 1,
                      },
                  scale: shouldReduceMotion
                    ? {}
                    : {
                        duration: 0.2,
                        ...easing,
                      },
                }}
                initial={{ scaleX: 0.5, scaleY: 1.5 }}
                animate={{ scaleX: 1, scaleY: 1 }}
                exit={{ scaleX: 0.5, scaleY: 1.5 }}
              />
            ) : null}
          </li>
        ))}
      </Wrapper>
    </Box>
  );
};

export default LanguageSelector;

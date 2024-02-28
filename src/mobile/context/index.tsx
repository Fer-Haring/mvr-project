import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import { PaletteMode } from '@mui/material';

/**
 * Defines the structure of the context for managing color mode across the application.
 */
interface ColorModeContextType {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

/**
 * Creates a context for color mode with an undefined initial value.
 */
const ColorModeContext = createContext<ColorModeContextType | undefined>(undefined);

/**
 * Props definition for the ColorModeProvider component.
 * @interface
 */
interface ColorModeProviderProps {
  children: ReactNode;
}

/**
 * Provides a context provider for color mode, allowing descendants to toggle between light and dark modes.
 * @param {ColorModeProviderProps} props - The props for this component, including children to render within the provider.
 * @returns A context provider that wraps its children, enabling them to access and modify the color mode.
 */
const ColorModeProvider: React.FC<ColorModeProviderProps> = ({ children }) => {
  /**
   * Retrieves the initial color mode from localStorage or system preference.
   * @returns {PaletteMode} The initial color mode.
   */
  const getInitialMode = (): PaletteMode => {
    const savedMode = localStorage.getItem('colorMode') as PaletteMode;
    if (savedMode) {
      return savedMode;
    } else {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
  };

  const [mode, setMode] = useState<PaletteMode>(getInitialMode);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    /**
     * Handles changes to the system color scheme preference.
     * @param {MediaQueryListEvent} event - The event triggered by a change in the media query.
     */
    const handleChange = (event: MediaQueryListEvent) => {
      const savedMode = localStorage.getItem('colorMode');
      if (!savedMode) {
        setMode(event.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  /**
   * Toggles the current color mode between light and dark, and saves the preference.
   */
  const toggleColorMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('colorMode', newMode);
  };

  return <ColorModeContext.Provider value={{ mode, toggleColorMode }}>{children}</ColorModeContext.Provider>;
};

/**
 * Custom hook to use the color mode context.
 * @returns {ColorModeContextType} The current context value for color mode.
 * @throws {Error} If the hook is used outside of a ColorModeProvider.
 */
const useColorMode = () => {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error('useColorMode must be used within a ColorModeProvider');
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { ColorModeProvider, useColorMode };

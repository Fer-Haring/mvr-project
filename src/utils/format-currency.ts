import { useIntl } from 'react-intl';

export const formatARSCurrency = (value: number, stripeDivide?: boolean): string => {
  const { locale } = useIntl();
  return Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  }).format(stripeDivide ? (value || 0) / 100 : value);
};


export const formatUSDCurrency = (value: number, stripeDivide?: boolean): string => {
  const { locale } = useIntl();
  return Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(stripeDivide ? (value || 0) / 100 : value);
};

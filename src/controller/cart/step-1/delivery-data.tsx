import { Stack, styled, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputField from '@webapp/components/form/input';
import { User } from '@webapp/sdk/types/user-types';
import React from 'react';
import { useIntl } from 'react-intl';

import ZoneDeliverButtons from './botones-zona-entrega';

interface DeliveryDataProps {
  user: User;
  address: string;
  setAddress: (address: string) => void;
  city: string;
  setCity: (city: string) => void;
  setIsAddressValid: (isValid: boolean) => void;
  setIsCityValid: (isValid: boolean) => void;
  setIsZoneDeliveryValid: (isValid: boolean) => void;
  isValidField: (value: string | undefined) => boolean;
}

const DeliveryData: React.FunctionComponent<DeliveryDataProps> = ({
  user,
  address,
  setAddress,
  city,
  setCity,
  setIsAddressValid,
  setIsCityValid,
  setIsZoneDeliveryValid,
  isValidField,
}) => {
  const { formatMessage } = useIntl();
  const theme = useTheme();
  return (
    <Stack
      spacing={2}
      sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
    >
      <ZoneDeliverButtons userData={user} onValidChange={setIsZoneDeliveryValid} />
      <Box sx={{ width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center', pr: 5 }}>
        <Typography
          variant="h4"
          fontWeight={600}
          textAlign="center"
          fontSize={'1.6vw'}
          sx={{ mb: 1, color: theme.palette.grey[900] }}
        >
          {formatMessage({ id: 'CART.PAYMENT.ADRESS.TITLE' })}
        </Typography>
        <Typography
          variant="h4"
          fontWeight={600}
          textAlign="center"
          fontSize={'1.2vw'}
          sx={{ mb: 4, color: theme.palette.grey[500] }}
        >
          {formatMessage({ id: 'CART.PAYMENT.ADDRESS.DESCRIPTION.WARNING' })}
        </Typography>
        <CustomInputField
          name="address"
          label={formatMessage({ id: 'COMMON.ADRESS' })}
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
            setIsAddressValid(isValidField(e.target.value));
          }}
          type="text"
          fullWidth
          size="small"
          aria-label={formatMessage({ id: 'COMMON.ADRESS' })}
          autoComplete="address"
          hidden
          aria-hidden="true"
          sx={{ width: '100%' }}
        />
        <CustomInputField
          name="city"
          label={formatMessage({ id: 'COMMON.CITY' })}
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            setIsCityValid(isValidField(e.target.value));
          }}
          type="text"
          fullWidth
          size="small"
          aria-label={formatMessage({ id: 'COMMON.CITY' })}
          autoComplete="city"
          hidden
          aria-hidden="true"
          sx={{ width: '100%' }}
        />
      </Box>
    </Stack>
  );
};

export default DeliveryData;

const CustomInputField = styled(InputField)(({ theme }) => ({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    borderColor: theme.palette.grey[700],
    backgroundColor: theme.palette.grey[200],
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.grey[500],
  },
  '& input': {
    color: theme.palette.grey[800],
    fontWeight: 'bold',
    paddingRight: '0px',
  },
}));

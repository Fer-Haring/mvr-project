import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@webapp/components/button';
import { updateUserInDb } from '@webapp/sdk/firebase/user';
import { User } from '@webapp/sdk/types/user-types';
import { useMessageStore } from '@webapp/store/admin/message-store';
import { useUserData } from '@webapp/store/users/user-data';
import { useUserId } from '@webapp/store/users/user-id';
import React, { FunctionComponent, useState } from 'react';
import { useIntl } from 'react-intl';


interface ZoneDeliverButtonsProps {
  className?: string;
  userData: User;
  onValidChange?: (isValid: boolean) => void;
}

const ZoneDeliverButtons: FunctionComponent<ZoneDeliverButtonsProps> = ({ userData, onValidChange }) => {
  const { formatMessage } = useIntl();
  const theme = useTheme();
  const { userId } = useUserId();
  const { setUser } = useUserData();
  const [deliveryType, setDeliveryType] = useState(userData.deliver_zone);
  const { setDeliverValue } = useMessageStore();

  const handleLBEZones = () => {
    setDeliveryType('LBE');
    handleOnChange('LBE');
  };

  const handleOZZones = () => {
    setDeliveryType('OZ');
    handleOnChange('OZ');
  };

  const handleOnChange = (selectedDelivery: string) => {
    if (onValidChange) {
      onValidChange(true);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: ignoredUserId, ...restOfUserData } = userData;
    updateUserInDb({ userId, ...restOfUserData, deliverZone: selectedDelivery });
    setUser({ ...userData, deliver_zone: selectedDelivery });
    if (selectedDelivery === 'LBE') {
      setDeliverValue(2500);
    }
    if (selectedDelivery === 'OZ') {
      setDeliverValue(3500);
    }
  };

  React.useEffect(() => {
    if (onValidChange) {
      onValidChange(!!userData.deliver_zone);
    }
  }, []);

  return (
    <Stack gap={2} sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4 }}>
      <Typography
        variant="h4"
        fontWeight={600}
        textAlign="center"
        fontSize={24}
        sx={{ mb: 0, color: theme.palette.grey[900] }}
      >
        {formatMessage({ id: 'CART.PAYMENT.DELIVER.ZONE.SELECTOR' })}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          gap: 2,
          mb: 3,
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Button
          onClick={handleLBEZones}
          onSelect={() => handleOnChange('LBE')}
          sx={{
            width: '100%',
            maxWidth: '236px',
            height: '48px',
            backgroundColor: deliveryType === 'LBE' ? theme.palette.primary.main : theme.palette.grey[200],
            border: deliveryType === 'LBE' ? 'none' : `1px solid ${theme.palette.divider}`,
            '&:hover': {
              backgroundColor: deliveryType === 'LBE' ? theme.palette.primary.main : theme.palette.grey[300],
              border: deliveryType === 'LBE' ? 'none' : `1px solid ${theme.palette.divider}`,
            },
          }}
          aria-label={formatMessage({ id: 'CART.PAYMENT.DELIVER.ZONE.1' })}
        >
          {formatMessage({ id: 'CART.PAYMENT.DELIVER.ZONE.1' })}
        </Button>
        <Button
          onClick={handleOZZones}
          onSelect={() => handleOnChange('OZ')}
          sx={{
            width: '100%',
            maxWidth: '236px',
            height: '48px',
            backgroundColor: deliveryType === 'OZ' ? theme.palette.primary.main : theme.palette.grey[200],
            border: deliveryType === 'OZ' ? 'none' : `1px solid ${theme.palette.divider}`,
            '&:hover': {
              backgroundColor: deliveryType === 'OZ' ? theme.palette.primary.main : theme.palette.grey[300],
              border: deliveryType === 'OZ' ? 'none' : `1px solid ${theme.palette.divider}`,
            },
          }}
          aria-label={formatMessage({ id: 'CART.PAYMENT.DELIVER.ZONE.2' })}
        >
          {formatMessage({ id: 'CART.PAYMENT.DELIVER.ZONE.2' })}
        </Button>
      </Box>
    </Stack>
  );
};

export default ZoneDeliverButtons;
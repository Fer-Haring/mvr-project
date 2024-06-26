import { Divider, styled, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@webapp/components/button';
import InputField from '@webapp/components/form/input';
import { useUpdateUser } from '@webapp/sdk/mutations/auth/user-update-mutation';
import { UpdateUserPayload, User } from '@webapp/sdk/types/user-types';
import { useUserData } from '@webapp/store/users/user-data';
import { FunctionComponent, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

interface UserInfoPersonalProps {
  className?: string;
  userData: User;
}

const UserInfoPersonal: FunctionComponent<UserInfoPersonalProps> = ({ className, userData }) => {
  const { formatMessage } = useIntl();
  const theme = useTheme();
  const { setUser } = useUserData();
  const [name, setName] = useState(userData?.name);
  const [lastName, setLastName] = useState(userData?.last_name);
  const [email, setEmail] = useState(userData?.email);
  const [phone, setPhone] = useState(userData?.phone);
  const [address, setAddress] = useState(userData?.address);
  const [city, setCity] = useState(userData?.city);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const { mutate } = useUpdateUser(userData?.id);

  useEffect(() => {
    const hasChanged =
      name !== userData?.name ||
      lastName !== userData?.last_name ||
      email !== userData?.email ||
      phone !== userData?.phone ||
      address !== userData?.address ||
      city !== userData?.city;
    setShowSaveButton(hasChanged);
  }, [name, lastName, email, phone, address, city, userData]);

  const handleSaveChanges = () => {
    const updatedFields: Partial<UpdateUserPayload> = {
      username: userData?.username,
      email: userData?.email,
      password: userData?.password,
      address: address || "",
      admin: userData?.admin,
      city: city || "",
      completed_orders: userData?.completed_orders,
      cart_items: userData?.cart_items,
      deliver_zone: userData?.deliver_zone,
      delivery_type: userData?.delivery_type,
      last_name: lastName || "",
      name: name || "",
      payment_method: userData?.payment_method,
      phone: phone || "",
      preferred_currency: userData?.preferred_currency,
      profile_picture: userData?.profile_picture,
    };

    mutate({ payload: updatedFields as UpdateUserPayload });
    setUser({ ...userData, ...updatedFields });
  };


  return (
    <Box className={className || ''}>
      <Typography variant="h4" fontWeight={600} fontSize={28} sx={{ mb: 0, color: theme.palette.grey[900] }}>
        {formatMessage({ id: 'PROFILE.USER_INFO.PANEL' })}
      </Typography>
      <Divider sx={{ mb: 4 }} />
      <Stack gap={4} sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', width: '100%', gap: 2, justifyContent: 'space-between', mt: 4 }}>
          <CustomInputField
            name="name"
            label={formatMessage({ id: 'COMMON.FIRST_NAME' })}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            size="small"
            aria-label={formatMessage({ id: 'COMMON.FIRST_NAME' })}
          />
          <CustomInputField
            name="lastName"
            label={formatMessage({ id: 'COMMON.LAST_NAME' })}
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            autoComplete="lastName"
            size="small"
            aria-label={formatMessage({ id: 'COMMON.LAST_NAME' })}
            sx={{ width: '100%' }}
          />
        </Box>
        <CustomInputField
          name="email"
          label={formatMessage({ id: 'COMMON.EMAIL' })}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          fullWidth
          disabled
          size="small"
          aria-label={formatMessage({ id: 'COMMON.EMAIL' })}
          autoComplete="email"
          sx={{ width: '100%' }}
        />
        <CustomInputField
          name="phone"
          label={formatMessage({ id: 'COMMON.PHONE.NUMBER' })}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          type="phone"
          fullWidth
          size="small"
          aria-label={formatMessage({ id: 'COMMON.PHONE.NUMBER' })}
          autoComplete="phone"
          sx={{ width: '100%' }}
        />
        <CustomInputField
          name="address"
          label={formatMessage({ id: 'COMMON.ADRESS' })}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          type="text"
          fullWidth
          size="small"
          aria-label={formatMessage({ id: 'COMMON.ADRESS' })}
          autoComplete="address"
          sx={{ width: '100%' }}
        />
        <CustomInputField
          name="city"
          label={formatMessage({ id: 'COMMON.CITY' })}
          value={city}
          onChange={(e) => setCity(e.target.value)}
          type="text"
          fullWidth
          size="small"
          aria-label={formatMessage({ id: 'COMMON.CITY' })}
          autoComplete="city"
          sx={{ width: '100%' }}
        />
        {showSaveButton && (
          <Button
            onClick={handleSaveChanges}
            sx={{ mr: 0, ml: 'auto', display: 'flex' }}
            aria-label={formatMessage({ id: 'PROFILE.SECURITY.SAVE' })}
          >
            {formatMessage({ id: 'PROFILE.SECURITY.SAVE' })}
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default UserInfoPersonal;

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

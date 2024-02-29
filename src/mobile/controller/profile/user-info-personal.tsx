import { Divider, styled, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@webapp/mobile/components/button';
import InputField from '@webapp/mobile/components/form/input';
import { updateUserInDb } from '@webapp/sdk/firebase/user';
import { User } from '@webapp/sdk/users-types';
import { useUserData } from '@webapp/store/users/user-data';
import { useUserId } from '@webapp/store/users/user-id';
import { FunctionComponent, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

interface UserInfoPersonalProps {
  className?: string;
  userData: User;
}

const UserInfoPersonal: FunctionComponent<UserInfoPersonalProps> = ({ className, userData }) => {
  const { formatMessage } = useIntl();
  const theme = useTheme();
  const { userId } = useUserId();
  const { setUser } = useUserData();
  const [name, setName] = useState(userData.name);
  const [lastName, setLastName] = useState(userData.lastName);
  const [email, setEmail] = useState(userData.email);
  const [phone, setPhone] = useState(userData.phone);
  const [address, setAdress] = useState(userData.address);
  const [city, setCity] = useState(userData.city);
  const [showSaveButton, setShowSaveButton] = useState(false);

  useEffect(() => {
    const hasChanged =
      name !== userData.name ||
      lastName !== userData.lastName ||
      email !== userData.email ||
      phone !== userData.phone ||
      address !== userData.address ||
      city !== userData.city;
    setShowSaveButton(hasChanged);
  }, [name, lastName, email, phone, address, city, userData]);

  const handleSaveChanges = () => {
    const updatedFields: Partial<User> = {};

    if (name !== userData.name) updatedFields.name = name;
    if (lastName !== userData.lastName) updatedFields.lastName = lastName;
    if (phone !== userData.phone) updatedFields.phone = phone;
    if (address !== userData.address) updatedFields.address = address;
    if (city !== userData.city) updatedFields.city = city;

    if (Object.keys(updatedFields).length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { userId: ignoredUserId, ...restOfUserData } = userData;
      updateUserInDb({ userId: userId, ...restOfUserData, ...updatedFields });
      setUser({ ...userData, ...updatedFields });
    }
  };

  const isSomeInputChange = false;

  return (
    <Box className={className || ''}>
      <Typography variant="h4" fontWeight={600} fontSize={28} sx={{ mb: 0, color: theme.palette.grey[900] }}>
        {formatMessage({ id: 'PROFILE.USER_INFO.PANEL' })}
      </Typography>
      <Divider sx={{ mb: 4 }} />
      <Stack gap={2} sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', width: '100%', gap: 2, justifyContent: 'space-between', mt: 4 }}>
          <CustomInputField
            name="name"
            label={formatMessage({ id: 'COMMON.FIRST_NAME' })}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            hidden
            size="small"
            aria-hidden="true"
            aria-label={formatMessage({ id: 'COMMON.FIRST_NAME' })}
          />
          <CustomInputField
            name="lastName"
            label={formatMessage({ id: 'COMMON.LAST_NAME' })}
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            autoComplete="lastName"
            hidden
            size="small"
            aria-hidden="true"
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
          hidden
          aria-hidden="true"
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
          hidden
          aria-hidden="true"
          sx={{ width: '100%' }}
        />
        <CustomInputField
          name="address"
          label={formatMessage({ id: 'COMMON.ADRESS' })}
          value={address}
          onChange={(e) => setAdress(e.target.value)}
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
          onChange={(e) => setCity(e.target.value)}
          type="text"
          fullWidth
          size="small"
          aria-label={formatMessage({ id: 'COMMON.CITY' })}
          autoComplete="city"
          hidden
          aria-hidden="true"
          sx={{ width: '100%' }}
        />
        {showSaveButton && (
          <Button
            onClick={handleSaveChanges}
            loading={isSomeInputChange}
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

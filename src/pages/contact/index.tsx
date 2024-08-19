// import { Icon } from '@iconify/react';
import { Box, Divider } from '@mui/material';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, styled, useTheme } from '@mui/material/styles';
import newLogo from '@webapp/assets/images/new_logo.png';
import ContentWrapper from '@webapp/components/content-wrapper';
import ContactInfo from '@webapp/controller/contact/contact-info';
import { useIsMobile } from '@webapp/hooks/is-mobile';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import MailForm from './mail-form';

export const ContactPage: FunctionComponent = () => {
  const theme = useTheme();
  const { formatMessage } = useIntl();
  const isMobile = useIsMobile();

  return (
    <ContentWrapper>
      <StyledPaper>
        <Typography
          variant="h1"
          gutterBottom
          sx={{
            fontFamily: 'WordMean',
            textAlign: 'center',
            color: theme.palette.grey[800],
            p: 4,
            fontSize: isMobile ? '6vw' : 40,
          }}
        >
          {formatMessage({ id: 'CONTACT.PAGE.WHERE.WE.ARE' })}
        </Typography>
        <Stack
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
            height: 'auto',
            gap: 6,
            mb: 6,
          }}
        >
          <img
            src={newLogo}
            alt="New Logo"
            style={{
              width: '80vw',
              maxWidth: '300px',
              height: 'auto',
              borderRadius: '50%',
            }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 5,
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              mb: isMobile ? 6 : 0,
            }}
          >
            <ContactInfo
              icon="mdi:cellphone"
              title={formatMessage({ id: 'CONTACT.PAGE.PHONE.NUMBER' })}
              subtitle={formatMessage({ id: 'CONTACT.PAGE.ATTENTION.HRS' })}
              url="https://wa.me/2213997379"
            />
            <ContactInfo
              icon="mdi:alternate-email"
              title={formatMessage({ id: 'CONTACT.PAGE.EMAIL' })}
              subtitle={formatMessage({ id: 'CONTACT.PAGE.SAND.DOUBTS' })}
            />
            <ContactInfo
              icon="mdi:facebook"
              title={formatMessage({ id: 'CONTACT.PAGE.FACEBOOK' })}
              subtitle={formatMessage({ id: 'CONTACT.PAGE.VISIT.FACEBOOK' })}
              url="https://www.facebook.com/MedicineVapeRoom"
            />
            <ContactInfo
              icon="mdi:instagram"
              title={formatMessage({ id: 'CONTACT.PAGE.INSTAGRAM' })}
              subtitle={formatMessage({ id: 'CONTACT.PAGE.VISIT' })}
              url="https://www.instagram.com/medicine.vape.room/"
            />
          </Box>
        </Stack>
      </StyledPaper>
    </ContentWrapper>
  );
};

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: alpha(theme.palette.common.white, 0.6),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: '100%',
  width: '90vw',
  margin: 'auto',
}));

const StyledDivider = styled(Divider)({
  flexGrow: 1,
  margin: '10px 10px',
  marginTop: '60px',
});

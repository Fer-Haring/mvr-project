// import { Icon } from '@iconify/react';
import { Box, Divider } from '@mui/material';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, styled, useTheme } from '@mui/material/styles';
import mapImage from '@webapp/assets/images/map.png';
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
        <img
          src={mapImage}
          alt="Map"
          style={{
            width: '85vw',
            height: 'auto',
            borderRadius: '10px',
            boxShadow: theme.shadows[2],
          }}
        />
        <StyledDivider orientation="horizontal" flexItem />
        <Stack spacing={2} sx={{ mt: 0, width: '100%' }}>
          <Typography
            variant="h1"
            gutterBottom
            sx={{
              fontFamily: 'WordMean',
              textAlign: 'center',
              color: theme.palette.grey[800],
              fontSize: isMobile ? '6vw' : 40,
            }}
          >
            {formatMessage({ id: 'CONTACT.PAGE.TITLE' })}
          </Typography>

          <Stack
            direction={isMobile ? 'column' : 'row'}
            gap={2}
            width={'100%'}
            justifyContent={'space-evenly'}
            alignItems={'flex-start'}
            p={3}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                mb: isMobile ? 8 : 0,
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
                icon="mdi:instagram"
                title={formatMessage({ id: 'CONTACT.PAGE.INSTAGRAM' })}
                subtitle={formatMessage({ id: 'CONTACT.PAGE.VISIT' })}
                url="https://www.instagram.com/medicine.vape.room/"
              />
            </Box>

            <MailForm />
          </Stack>
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
  // overflow: 'hidden',
  // [theme.breakpoints.down('sm')]: {
  //   width: '95vw',
  //   padding: theme.spacing(1),
  // },
  // [theme.breakpoints.up('md')]: {
  //   width: '80vw',
  // },
  // [theme.breakpoints.up('lg')]: {
  //   width: '60vw',
  // },
}));

const StyledDivider = styled(Divider)({
  flexGrow: 1,
  margin: '10px 10px',
  marginTop: '60px',
});

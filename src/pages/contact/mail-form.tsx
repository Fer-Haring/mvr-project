import { ValidationError, useForm } from '@formspree/react';
import { Box, Button, TextField, TextareaAutosize, styled } from '@mui/material';
import SnackbarUtils from '@webapp/components/snackbar';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

interface FormData {
  nombre: string;
  email: string;
  titulo: string;
  mensaje: string;
}

const MailForm: FunctionComponent = () => {
  const [state, handleSubmit] = useForm('myyrjddd');
  const { formatMessage } = useIntl();
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    titulo: '',
    mensaje: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (state.succeeded) {
      SnackbarUtils.success(formatMessage({ id: 'CONTACT.PAGE.FORM.SUCCESS' }));
    }
    setFormData({
      nombre: '',
      email: '',
      titulo: '',
      mensaje: '',
    });
  }, [state.succeeded, formatMessage]);

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%',
        maxWidth: '500px',
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <CustomInputSearch
        label={formatMessage({ id: 'CONTACT.PAGE.FORM.NAME' })}
        variant="outlined"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
      />
      <CustomInputSearch
        label={formatMessage({ id: 'CONTACT.PAGE.FORM.EMAIL' })}
        variant="outlined"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <ValidationError prefix="Email" field="email" errors={state.errors} />
      <CustomInputSearch
        label={formatMessage({ id: 'CONTACT.PAGE.FORM.SUBJECT' })}
        variant="outlined"
        name="titulo"
        value={formData.titulo}
        onChange={handleChange}
      />
      <TextareaAutosize
        minRows={3}
        maxRows={6}
        style={{ padding: '10px' }}
        placeholder="Mensaje"
        name="mensaje"
        value={formData.mensaje}
        onChange={handleChange}
      />
      <ValidationError prefix="Message" field="message" errors={state.errors} />
      <Button type="submit" variant="contained" sx={{ alignSelf: 'center', width: 'fit-content' }}>
        {formatMessage({ id: 'CONTACT.PAGE.FORM.SUBMIT' })}
      </Button>
    </Box>
  );
};

export default MailForm;

export const CustomInputSearch = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    borderRadius: theme.spacing(0.5),
    width: 'auto',
    backgroundColor: theme.palette.grey[200],
    '&:focus-within': {
      borderRadius: theme.spacing(0.5),
      borderColor: theme.palette.grey[800],
    },
    // Ajustar el padding aquí para centrar el texto
    padding: theme.spacing(1),
  },
  '& label.MuiInputLabel-root': {
    fontSize: 16,
    color: theme.palette.grey[800],
    // Ajustar la transformación para reposicionar el label cuando está flotando
    '&.Mui-focused': {
      transform: 'translate(14px, -6px) scale(0.75)',
    },
    transform: 'translate(14px, 20px) scale(1)',
    '&.MuiInputLabel-shrink': {
      transform: 'translate(14px, -6px) scale(0.75)',
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderRadius: theme.spacing(0.5),
    borderColor: theme.palette.grey[800],
  },
  '& .MuiOutlinedInput-input': {
    padding: '10px 14px',
    color: theme.palette.grey[800],
    userSelect: 'text',
    // Ajustar el height aquí podría no ser necesario si el padding es adecuado
  },
  // Ajustar la posición del label cuando no está flotando
  '& .MuiInputLabel-outlined': {
    transform: 'translate(14px, 20px) scale(1)',
  },
}));

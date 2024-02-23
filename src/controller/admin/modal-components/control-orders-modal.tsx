import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { default as MuiModal, ModalProps as MuiModalProps } from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
import Button, { ButtonColors } from '@webapp/components/button';
import { FunctionComponent } from 'react';

interface AddProductModalProps extends Partial<MuiModalProps> {
  className?: string;
  open: boolean;
  customContent?: React.ReactNode;
  title: string;
  subtitle?: string;
  text?: React.ReactNode;
  hasCloseButton?: boolean;
  primaryButtonText?: string;
  primaryButtonColor?: ButtonColors;
  primaryButtonDisabled?: boolean;
  primaryButtonOnClick?: () => void;
  secondaryButtonText?: string;
  secondaryButtonColor?: ButtonColors;
  secondaryButtonDisabled?: boolean;
  secondaryButtonOnClick?: () => void;
  handleClose?: () => void;
}

const StyledMuiModal = styled(MuiModal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '& .modal-wrapper': {
    backgroundColor: alpha(theme.palette.grey[300], 0.9),
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    width: 'min(75vw, 720px)',
  },
}));

const AddProductModal: FunctionComponent<AddProductModalProps> = ({
  className,
  open,
  customContent,
  title,
  subtitle,
  text,
  hasCloseButton,
  primaryButtonText,
  primaryButtonColor,
  primaryButtonDisabled,
  primaryButtonOnClick,
  secondaryButtonText,
  secondaryButtonColor,
  secondaryButtonDisabled,
  secondaryButtonOnClick,
  handleClose,
  ...props
}) => {


  
  return (
    <StyledMuiModal
      className={className || ''}
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      {...props}
    >
      <Box className="modal-wrapper">
        <Stack
          direction="column"
          gap={{
            xs: 2,
            md: 4,
          }}
          role="dialog" // Add a role attribute to indicate that this is a dialog
          aria-modal="true" // Indicate that this is a modal dialog
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1}>
            <Stack direction="column" gap={subtitle ? 1 : 0}>
              <Typography variant="h3" fontWeight={600}>
                {title}
              </Typography>
              {subtitle && (
                <Typography variant="h5" fontWeight={500}>
                  {subtitle}
                </Typography>
              )}
            </Stack>
            {hasCloseButton && (
              <IconButton onClick={handleClose} sx={{ width: 40, height: 40 }}>
                <CloseRoundedIcon />
              </IconButton>
            )}
          </Stack>
          {text ? <Typography variant="body1">{text}</Typography> : null}
          {customContent}
          <Stack
            direction={{
              xs: 'column',
              md: 'row',
            }}
            spacing={2}
            alignItems="center"
            justifyContent="flex-end"
          >
            {secondaryButtonText && (
              <Button
                sx={{
                  flexShrink: 0,
                }}
                size="small"
                onClick={secondaryButtonOnClick}
                variant="text"
                hasBorder
                color={secondaryButtonColor}
                disabled={secondaryButtonDisabled}
              >
                {secondaryButtonText}
              </Button>
            )}
            {primaryButtonText && (
              <Button
                sx={{
                  flexShrink: 0,
                }}
                size="small"
                onClick={primaryButtonOnClick}
                variant="contained"
                color={primaryButtonColor}
                disabled={primaryButtonDisabled}
              >
                {primaryButtonText}
              </Button>
            )}
          </Stack>
        </Stack>
      </Box>
    </StyledMuiModal>
  );
};

export default AddProductModal;

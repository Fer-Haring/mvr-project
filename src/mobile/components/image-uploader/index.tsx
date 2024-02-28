import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SxProps, Theme, alpha, styled } from '@mui/material/styles';
import { easing } from '@webapp/mobile/components/framer';
import { motion } from 'framer-motion';
import React, { FunctionComponent, useCallback, useState } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { useIntl } from 'react-intl';

const Wrapper = styled(Box)(({ theme }) => ({
  minWidth: '245px',
  position: 'relative',
  // backgroundColor: theme.palette.background.default,
  // borderRadius: theme.shape.borderRadius,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  height: '100%',
  minHeight: '400px',
  padding: theme.spacing(3),
  [theme.breakpoints.between('xs', 'sm')]: {
    minHeight: '200px',
  },
  transition: theme.transitions.create(['border'], {
    duration: theme.transitions.duration.short,
    easing: theme.transitions.easing.easeInOut,
  }),

  '&.disabled': {
    cursor: 'not-allowed',
    pointerEvents: 'none',
    borderColor: alpha(theme.palette.grey[300], 0.5),
    '& > *': {
      opacity: 0.5,
    },
    '& .upload-image-icon': {
      opacity: 0.5,
    },
    '& .upload-image-img': {
      opacity: 1,
      img: {
        opacity: 1,
      },
    },
  },

  '&.active, &:hover': {
    '&:not(.disabled)': {
      borderColor: theme.palette.primary.dark,
    },
  },

  '&.error': {
    borderColor: theme.palette.error.main,
  },

  '& .upload-image-img': {
    backgroundColor: theme.palette.grey[300],
    width: '100%',
    height: theme.spacing(40),
    '& img': {
      objectFit: 'cover',
    },
    [theme.breakpoints.between('xs', 'sm')]: {
      height: theme.spacing(25),
    },
  },

  '& .upload-image-icon': {
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: theme.palette.grey[300],
    width: theme.spacing(12),
    height: theme.spacing(12),
  },

  '& .delete-image-icon': {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    cursor: 'pointer',
    color: theme.palette.text.secondary,
    transition: theme.transitions.create(['color'], {
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.easeInOut,
    }),
    '&:hover': {
      color: theme.palette.error.main,
    },
  },
}));

interface ImageUploaderProps {
  className?: string;
  defaultImageUrl?: string;
  sx?: SxProps<Theme>;
  disabled?: boolean;
  onImageChange?: (imageFile: File | undefined) => void;
  onImageDelete: () => void;
  admin?: boolean;
}

const ImageUploader: FunctionComponent<ImageUploaderProps> = ({
  className,
  defaultImageUrl,
  sx,
  disabled,
  onImageChange,
  onImageDelete,
  admin,
}) => {
  const intl = useIntl();

  const IDLE_STATUS = 'COMMON.IMAGE_UPLOAD.STATUS.IDLE';
  const LOADING_STATUS = 'COMMON.IMAGE_UPLOAD.STATUS.LOADING';
  const ERROR_STATUS = 'COMMON.IMAGE_UPLOAD.STATUS.ERROR';
  const DONE_STATUS = 'COMMON.IMAGE_UPLOAD.STATUS.DONE';

  type StatusType =
    | 'COMMON.IMAGE_UPLOAD.STATUS.IDLE'
    | 'COMMON.IMAGE_UPLOAD.STATUS.LOADING'
    | 'COMMON.IMAGE_UPLOAD.STATUS.ERROR'
    | 'COMMON.IMAGE_UPLOAD.STATUS.DONE';

  const [status, setStatus] = useState<StatusType>(IDLE_STATUS);
  const [imageUrl, setImageUrl] = useState<string | undefined>(defaultImageUrl);

  const options: DropzoneOptions = {
    accept: { 'image/jpeg': [], 'image/png': [], 'image/gif': [] },
    maxFiles: 1,
    // maxSize: 4194304,
    multiple: false,
    onDragEnter: undefined,
    onDragLeave: undefined,
    onDragOver: undefined,
  };

  const onDrop = useCallback(
    (acceptedFiles: Blob[]) => {
      if (disabled) {
        return;
      }

      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onabort = () => {
        setStatus(ERROR_STATUS);
      };
      reader.onerror = () => {
        setStatus(ERROR_STATUS);
      };
      reader.onprogress = () => {
        setStatus(LOADING_STATUS);
      };
      reader.onload = () => {
        setStatus(DONE_STATUS);
        setImageUrl(reader.result as string);
        onImageChange && onImageChange(file as File);
      };

      setStatus(LOADING_STATUS);
      reader.readAsDataURL(file);
    },
    [disabled, onImageChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, ...options });

  const getTitle = () => {
    switch (status) {
      case IDLE_STATUS:
        return 'COMMON.IMAGE_UPLOAD.TITLE';
      case LOADING_STATUS:
        return 'COMMON.IMAGE_UPLOAD.UPLOADING.TITLE';
      case ERROR_STATUS:
        return 'COMMON.IMAGE_UPLOAD.ERROR.TITLE';
      case DONE_STATUS:
        return ' ';
      default:
        return 'COMMON.IMAGE_UPLOAD.TITLE';
    }
  };

  // const showSubtitle = () => {
  //   if (status === LOADING_STATUS) {
  //     return (
  //       <Typography variant="caption" lineHeight="12px">
  //         {intl.formatMessage({ id: 'COMMON.IMAGE_UPLOAD.UPLOADING.SUBTITLE' })}
  //       </Typography>
  //     );
  //   } else if (status === DONE_STATUS) {
  //     return;
  //   } else {
  //     return (
  //       <Typography variant="caption" lineHeight="12px">
  //         {intl.formatMessage({ id: 'COMMON.IMAGE_UPLOAD.SUBTITLE' })}
  //       </Typography>
  //     );
  //   }
  // };

  const handleDeleteImage = (ev: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (disabled) {
      return;
    }
    ev.stopPropagation();
    setStatus(IDLE_STATUS);
    setImageUrl(undefined);
    onImageChange && onImageChange(undefined);
    onImageDelete();
  };

  const ImageVariants = {
    initial: { opacity: 0, scale: 1 },
    animate: { opacity: 1, scale: [1, 1.025, 1.1, 1], transition: { ...easing, duration: 3 } },
  };

  React.useEffect(() => {
    if (defaultImageUrl) {
      setImageUrl(defaultImageUrl);
    }
  }, [defaultImageUrl]);

  return (
    <motion.div
      className={className || ''}
      whileHover={disabled ? {} : { scale: 1.025 }}
      transition={disabled ? {} : { ...easing }}
    >
      <Wrapper
        className={`${isDragActive || status === DONE_STATUS ? 'active' : ''} ${
          status === ERROR_STATUS ? 'error' : ''
        } ${disabled ? 'disabled' : ''}`}
        sx={{ ...sx }}
        data-disabled={disabled}
        {...getRootProps()}
        tabIndex={0} // Add tabIndex to make it focusable
        role="button" // Add role="button" to indicate it's an interactive element
        aria-label={intl.formatMessage({ id: getTitle() })} // Add an aria-label for accessibility
      >
        <input {...getInputProps()} type="file" disabled={disabled} />
        {imageUrl ? (
          <motion.div variants={ImageVariants} initial="initial" animate={imageUrl ? 'animate' : 'initial'}>
            <Avatar
              variant="square"
              className="upload-image-img"
              src={imageUrl}
              alt="Image"
              sx={{
                borderRadius: 2,
              }}
            />
          </motion.div>
        ) : (
          <motion.div variants={ImageVariants} initial="initial" animate={!imageUrl ? 'animate' : 'initial'}>
            <div className="upload-image-icon">
              <FileUploadRoundedIcon />
            </div>
          </motion.div>
        )}
        <Stack sx={{ mt: 2, textAlign: 'center' }} spacing={0.5}>
          {admin && (
            <Typography variant="caption" fontWeight={700} lineHeight="12px">
              {intl.formatMessage({ id: getTitle() })}
            </Typography>
          )}
        </Stack>
        {status === LOADING_STATUS && (
          <LinearProgress sx={{ mt: 2, width: '100%', borderRadius: 4 }} variant="determinate" value={0} />
        )}
        {status === DONE_STATUS && !disabled ? (
          <DeleteForeverRoundedIcon
            className="delete-image-icon"
            onClick={(ev) => handleDeleteImage(ev)}
            tabIndex={0} // Add tabIndex to make it focusable
            role="button" // Add role="button" to indicate it's an interactive element
            aria-label="Delete Image" // Add an aria-label for accessibility
          />
        ) : null}
      </Wrapper>
    </motion.div>
  );
};

export default ImageUploader;

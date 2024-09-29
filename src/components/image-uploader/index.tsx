import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SxProps, Theme, alpha, styled } from '@mui/material/styles';
import { easing } from '@webapp/components/framer';
import { useIsMobile } from '@webapp/hooks/is-mobile';
import { motion } from 'framer-motion';
import React, { FunctionComponent, useCallback, useState } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { useIntl } from 'react-intl';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const Wrapper = styled(Box)<{ isMobile: boolean }>(({ theme, isMobile }) => ({
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
  // minHeight: '400px',
  padding: theme.spacing(2),
  // [theme.breakpoints.between('xs', 'sm')]: {
  //   minHeight: '200px',
  // },
  transition: theme.transitions.create(['border'], {
    duration: theme.transitions.duration.short,
    easing: theme.transitions.easing.easeInOut,
  }),

  '&.disabled': {
    cursor: 'not-allowed',
    borderColor: alpha(theme.palette.grey[300], 0.5),
    '& .upload-image-icon': {
      opacity: 0.5,
      pointerEvents: 'none',
    },
    '& .delete-image-icon': {
      display: 'none',
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
    height: 'auto',
    '& img': {
      objectFit: 'cover',
      width: '100%',
      height: '300px',
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
  defaultImageUrls?: string[];
  sx?: SxProps<Theme>;
  disabled?: boolean;
  onImageChange?: (imageFile: File | undefined) => void;
  onImagesChange?: (imageFiles: File[] | undefined) => void;
  onImageDelete: () => void;
  onImagesDelete?: () => void;
  admin?: boolean;
  multiple?: boolean;
}

const ImageUploader: FunctionComponent<ImageUploaderProps> = ({
  className,
  defaultImageUrl,
  sx,
  disabled,
  onImageChange,
  onImageDelete,
  admin,
  defaultImageUrls,
  multiple,
  onImagesChange,
}) => {
  const intl = useIntl();
  const isMobile = useIsMobile();

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
  const [imageUrls, setImageUrls] = useState<string[]>(
    defaultImageUrls ?? (defaultImageUrl !== undefined ? [defaultImageUrl] : [])
  );

  const options: DropzoneOptions = {
    accept: { 'image/jpeg': [], 'image/png': [], 'image/gif': [], 'image/webp': [] },
    maxFiles: multiple ? 20 : 1,
    multiple: multiple,
    // maxSize: 4194304,
    onDragEnter: undefined,
    onDragLeave: undefined,
    onDragOver: undefined,
  };

  const onDrop = useCallback(
    (acceptedFiles: Blob[]) => {
      if (disabled) {
        return;
      }
      setStatus(LOADING_STATUS);
      const promises = acceptedFiles.map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onabort = () => reject(new Error('File reading was aborted'));
          reader.onerror = () => reject(new Error('File reading has failed'));
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      });
      Promise.all(promises)
        .then((results) => {
          setStatus(DONE_STATUS);
          setImageUrls(results);
          if (multiple) {
            onImagesChange && onImagesChange(acceptedFiles as File[]);
          } else {
            onImageChange && onImageChange(acceptedFiles[0] as File);
          }
        })
        .catch(() => {
          setStatus(ERROR_STATUS);
        });
    },
    [disabled, multiple, onImageChange, onImagesChange]
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

  const handleDeleteImage = (ev: React.MouseEvent<SVGSVGElement, MouseEvent>, index?: number) => {
    if (disabled) {
      return;
    }
    ev.stopPropagation();
    if (multiple) {
      const newImageUrls = [...imageUrls];
      newImageUrls.splice(index!, 1);
      setImageUrls(newImageUrls);
      onImagesChange && onImagesChange(undefined);
      if (newImageUrls.length === 0) {
        setStatus(IDLE_STATUS);
      }
    } else {
      setStatus(IDLE_STATUS);
      setImageUrls([]);
      onImageChange && onImageChange(undefined);
      onImageDelete();
    }
  };

  const ImageVariants = {
    initial: { opacity: 0, scale: 1 },
    animate: { opacity: 1, scale: [1, 1.025, 1.1, 1], transition: { ...easing, duration: 3 } },
  };

  React.useEffect(() => {
    if (defaultImageUrls && defaultImageUrls.length > 0) {
      setImageUrls(defaultImageUrls);
    } else if (defaultImageUrl !== undefined) {
      setImageUrls([defaultImageUrl]);
    } else {
      setImageUrls([]);
    }
  }, [defaultImageUrls, defaultImageUrl]);

  return (
    <motion.div
      className={className ?? ''}
      whileHover={disabled ? {} : { scale: 1.025 }}
      transition={disabled ? {} : { ...easing }}
    >
      <Wrapper
        isMobile={isMobile}
        className={`${isDragActive || status === DONE_STATUS ? 'active' : ''} ${
          status === ERROR_STATUS ? 'error' : ''
        } ${disabled ? 'disabled' : ''}`}
        sx={{ ...sx }}
        data-disabled={disabled}
        {...(disabled ? {} : getRootProps())}
        tabIndex={0} // Add tabIndex to make it focusable
        role="button" // Add role="button" to indicate it's an interactive element
        aria-label={intl.formatMessage({ id: getTitle() })} // Add an aria-label for accessibility
      >
        <input {...getInputProps()} type="file" disabled={disabled} />
        {imageUrls && imageUrls.length > 0 ? (
          multiple ? (
            <Swiper
              slidesPerView={isMobile ? 1.3 : 1.25}
              centeredSlides={true}
              spaceBetween={isMobile ? 20 : 50}
              pagination={{ clickable: true }}
              style={{ width: '100%', height: '100%' }}
              modules={[Pagination]}
            >
              {imageUrls.map((url, index) => (
                <SwiperSlide key={index}>
                  <motion.div variants={ImageVariants} initial="initial" animate={'animate'}>
                    <div style={{ position: 'relative' }}>
                      <Avatar
                        variant="square"
                        className="upload-image-img"
                        src={url}
                        alt={`Image ${index + 1}`}
                        sx={{ borderRadius: 2 }}
                      />
                      {!disabled && (
                        <DeleteForeverRoundedIcon
                          className="delete-image-icon"
                          onClick={(ev) => handleDeleteImage(ev, index)}
                          tabIndex={0}
                          role="button"
                          aria-label="Delete Image"
                        />
                      )}
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <motion.div variants={ImageVariants} initial="initial" animate={'animate'}>
              <div style={{ position: 'relative' }}>
                <Avatar
                  variant="square"
                  className="upload-image-img"
                  src={imageUrls[0]}
                  alt="Image"
                  sx={{ borderRadius: 2 }}
                />
                {!disabled && (
                  <DeleteForeverRoundedIcon
                    className="delete-image-icon"
                    onClick={(ev) => handleDeleteImage(ev)}
                    tabIndex={0}
                    role="button"
                    aria-label="Delete Image"
                  />
                )}
              </div>
            </motion.div>
          )
        ) : (
          <motion.div variants={ImageVariants} initial="initial" animate={'animate'}>
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

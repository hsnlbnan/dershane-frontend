import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Card,
  Tooltip,
  Avatar,
  CardMedia,
  Button,
  IconButton
} from '@mui/material';

import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import { useGetAllClassQuery } from 'src/features/api/class';
import { useRouter } from 'next/router';

const ProfileCover = ({ user }) => {
  const { data: allClasses } = useGetAllClassQuery();

  const router = useRouter();

  const handleGoBack = () => {
    router.push('/dashboards/tasks');
  };

  return (
    <>
      <Box display="flex" mb={3}>
        <Tooltip arrow placement="top" title="Go back">
          <IconButton
            color="primary"
            sx={{ p: 2, mr: 2 }}
            onClick={handleGoBack}
          >
            <ArrowBackTwoToneIcon />
          </IconButton>
        </Tooltip>
        <Box>
          <Typography variant="h3" component="h3" gutterBottom>
            Öğrenci Adı: <strong>{user?.name} </strong>
          </Typography>
          <Typography variant="subtitle2">
            Sınıfı:{' '}
            <strong>
              {
                allClasses?.data.find((item) => item?._id === user?.class_id)
                  ?.name
              }
            </strong>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

ProfileCover.propTypes = {
  // @ts-ignore
  user: PropTypes.object.isRequired
};

export default ProfileCover;

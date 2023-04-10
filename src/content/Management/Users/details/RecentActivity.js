import {
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  Avatar,
  useTheme,
  styled
} from '@mui/material';

import ShoppingBagTwoToneIcon from '@mui/icons-material/ShoppingBagTwoTone';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';

const AvatarPrimary = styled(Avatar)(
  ({ theme }) => `
      background: ${theme.colors.primary.lighter};
      color: ${theme.colors.primary.main};
      width: ${theme.spacing(7)};
      height: ${theme.spacing(7)};
`
);

function RecentActivity() {
  const theme = useTheme();

  return (
    <Card mt={3}>
      <CardHeader title="Toplam Cari" />
      <Divider />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Box px={2} py={4} display="flex" alignItems="flex-start">
          <AvatarPrimary>
            <ShoppingBagTwoToneIcon />
          </AvatarPrimary>
          <Box pl={2} flex={1}>
            <Typography variant="h3">Toplam Tutar</Typography>

            <Box pt={2} display="flex">
              <Box pr={8}>
                <Typography variant="h2">12.000 ₺</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Divider />
        <Box px={2} py={4} display="flex" alignItems="flex-start">
          <AvatarPrimary>
            <FavoriteTwoToneIcon />
          </AvatarPrimary>
          <Box pl={2} flex={1}>
            <Typography variant="h3">Ödenen Tutar</Typography>

            <Box pt={2} display="flex">
              <Box pr={8}>
                <Typography variant="h2">4000 ₺</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Divider />
        <Box px={2} py={4} display="flex" alignItems="flex-start">
          <AvatarPrimary>
            <StarTwoToneIcon />
          </AvatarPrimary>
          <Box pl={2} flex={1}>
            <Box pt={2} display="flex">
              <Box pr={8}>
                <Typography
                  gutterBottom
                  variant="caption"
                  sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                >
                  Kalan Tutar
                </Typography>
                <Typography variant="h2">8000₺</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

export default RecentActivity;

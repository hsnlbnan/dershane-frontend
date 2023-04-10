import {
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  Avatar,
  Grid,
  Button,
  TableContainer,
  TableRow,
  TableCell,
  Table,
  TableHead,
  Chip,
  TableBody,
  useTheme
} from '@mui/material';
import { format, parseISO } from 'date-fns';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import {
  useDoPaymentByPaymentIdMutation,
  useGetInstallementByStudentIdQuery,
  useUndoPaymentByPaymentIdMutation
} from 'src/features/api/student';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import ShoppingBagTwoToneIcon from '@mui/icons-material/ShoppingBagTwoTone';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import styled from '@emotion/styled';

const AvatarPrimary = styled(Avatar)(
  ({ theme }) => `
      background: ${theme.colors.primary.lighter};
      color: ${theme.colors.primary.main};
      width: ${theme.spacing(7)};
      height: ${theme.spacing(7)};
`
);

function Feed({ user, id }) {
  console.log('USER >', user);

  const theme = useTheme();

  const { data: installementData, isSuccess: installementSuccess } =
    useGetInstallementByStudentIdQuery(
      id,

      {
        skip: !id
      }
    );

  const [doPayment, { isLoading: paymentLoading, isSuccess: paymentSuccess }] =
    useDoPaymentByPaymentIdMutation();
  const [
    undoPayment,
    { isLoading: undoPaymentLoading, isSuccess: undoPaymentSuccess }
  ] = useUndoPaymentByPaymentIdMutation();

  const handlePayment = (id) => {
    doPayment(id);
  };

  const handleUndoPayment = (id) => {
    undoPayment(id);
  };

  useEffect(() => {
    if (paymentSuccess) {
      toast.success('Ödeme Başarılı');
    }
  }, [paymentSuccess]);
  useEffect(() => {
    if (undoPaymentSuccess) {
      toast.success('Ödeme Başarılıyla Geri Alındı');
    }
  }, [undoPaymentSuccess]);

  return (
    <>
      <Card
        sx={{
          mb: 3
        }}
      >
        <CardHeader title="Ödeme Tablosu" />
        <Divider />
        <Box p={2}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Taksit Sayısı</TableCell>
                  <TableCell>Ödeme Tarihi</TableCell>
                  <TableCell>Ödeme Miktarı</TableCell>
                  <TableCell>Ödeme Durumu</TableCell>
                  <TableCell>Aksiyon</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {installementSuccess &&
                  installementData?.data.map((installement) => (
                    <TableRow hover key={installement._id}>
                      <TableCell>{installement?.installment_number}</TableCell>
                      <TableCell>
                        {installement?.installment_date &&
                          format(
                            parseISO(installement?.installment_date),
                            'dd/MM/yyyy'
                          )}
                      </TableCell>
                      <TableCell>{installement?.installment_amount}</TableCell>
                      <TableCell>
                        {installement?.payment_status === 'odendi'
                          ? 'Ödendi'
                          : 'Bekleniyor'}
                      </TableCell>

                      <TableCell>
                        {installement?.payment_status === 'odendi' ? (
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            startIcon={<AddTwoToneIcon />}
                            onClick={() => handleUndoPayment(installement._id)}
                          >
                            Ödeme İptal
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            startIcon={<AddTwoToneIcon />}
                            onClick={() => handlePayment(installement._id)}
                          >
                            Ödeme Yap
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Card>

      <Card
        sx={{
          mb: 3
        }}
      >
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
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(12)}` }}
              >
                Toplam Tutar
              </Typography>

              <Box pt={2} display="flex">
                <Box pr={8}>
                  <Typography variant="h2">
                    {installementData?.data.reduce(
                      (total, item) => total + item.installment_amount,
                      0
                    )}{' '}
                    ₺
                  </Typography>
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
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(12)}` }}
              >
                Ödenen Tutar
              </Typography>

              <Box pt={2} display="flex">
                <Box pr={8}>
                  <Typography variant="h2">
                    {installementData?.data.reduce(
                      (total, item) =>
                        item.payment_status === 'odendi'
                          ? total + item.installment_amount
                          : total,
                      0
                    )}{' '}
                    ₺
                  </Typography>
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
              <Box display="flex">
                <Box pr={8}>
                  <Typography
                    gutterBottom
                    variant="caption"
                    sx={{ fontSize: `${theme.typography.pxToRem(12)}` }}
                  >
                    Kalan Tutar
                  </Typography>
                  <Typography variant="h2">
                    {installementData?.data.reduce(
                      (total, item) =>
                        item.payment_status === 'bekleniyor'
                          ? total + item.installment_amount
                          : total,
                      0
                    )}{' '}
                    ₺
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Card>

      <Card
        sx={{
          mb: 3
        }}
      >
        <CardHeader title="Öğrenci Bilgileri" />
        <Divider />
        <Box p={2}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell> Adı - Soyadı</TableCell>
                  <TableCell> Kimlik Numarası</TableCell>
                  <TableCell> Telefonu</TableCell>
                  <TableCell> Adresi</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow hover key={user?.name}>
                  <TableCell>{user?.name}</TableCell>
                  <TableCell>{user?.identity_number}</TableCell>
                  <TableCell>{user?.phone_number}</TableCell>
                  <TableCell>{user?.address}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Card>

      <Card
        sx={{
          mb: 3
        }}
      >
        <CardHeader title="Veli Bilgileri" />
        <Divider />
        <Box p={2}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Veli Adı - Soyadı</TableCell>
                  <TableCell>Veli Kimlik Numarası</TableCell>
                  <TableCell>Veli Telefonu</TableCell>
                  <TableCell>Veli Adresi</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow hover key={user?.guardian_name}>
                  <TableCell>{user?.guardian_name}</TableCell>
                  <TableCell>{user?.guardian_identity_number}</TableCell>
                  <TableCell>{user?.guardian_phone_number}</TableCell>
                  <TableCell>{user?.guardian_address}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Card>
    </>
  );
}

export default Feed;

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useGetAllClassQuery } from 'src/features/api/class';
import {
  useCreateStudentMutation,
  useUpdateStudentMutation
} from 'src/features/api/student';
import 'dayjs/locale/tr';
import { LocalizationProvider, DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import trLocale from 'date-fns/locale/tr'; // Turkish locale
import { toast } from 'react-hot-toast';

const AddStudentModal = ({ open, setOpen, isEdit, student }) => {
  const [form, setForm] = useState({
    name: '',
    class_id: '',
    phone_number: '',
    identity_number: '',
    address: '',
    guardian_name: '',
    guardian_phone_number: '',
    guardian_identity_number: '',
    guardian_address: '',
    price: '',
    payment: '',
    debt: '',
    payment_date: '',
    payment_type: '',
    installments: ''
  });

  useEffect(() => {
    if (isEdit) {
      setForm({
        name: student.name,
        class_id: student.class_id,
        phone_number: student.phone_number,
        identity_number: student.identity_number,
        address: student.address,
        guardian_name: student.guardian_name,
        guardian_phone_number: student.guardian_phone_number,
        guardian_identity_number: student.guardian_identity_number,
        guardian_address: student.guardian_address,
        price: student.price,
        payment: student.payment,
        debt: student.debt,
        payment_date: student.payment_date,
        payment_type: student.payment_type,
        installments: student.installments
      });
    }
  }, [isEdit, student]);

  const {
    data: allClass,
    error: allClassError,
    isLoading: allClassLoading
  } = useGetAllClassQuery();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [
    createStudent,
    { isLoading: createStudentLoading, isSuccess: createStudentIsSuccess }
  ] = useCreateStudentMutation();
  const [
    updateStudent,
    { isLoading: updateStudentLoading, isSuccess: updateStudentIsSuccess }
  ] = useUpdateStudentMutation();

  const handleAddStudent = () => {
    if (isEdit) {
      updateStudent({ id: student._id, data: form });
      setOpen(false);
      return;
    } else {
      createStudent(form);
      setOpen(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (createStudentIsSuccess) {
      toast.success('Öğrenci başarıyla eklendi');
    }
  }, [createStudentIsSuccess]);

  useEffect(() => {
    if (updateStudentIsSuccess) {
      toast.success('Öğrenci başarıyla güncellendi');
    }
  }, [updateStudentIsSuccess]);

  return (
    <Dialog open={open}>
      <DialogTitle>Öğrenci Ekle</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Ad Soyad"
              type="text"
              fullWidth
              variant="outlined"
              value={form.name}
              onChange={handleChange}
              name="name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              //   labelId="class_id"
              label="Sınıf"
              variant="outlined"
              value={form.class_id}
              onChange={handleChange}
              fullWidth
              inputProps={{
                name: 'class_id',
                id: 'class_id'
              }}
            >
              <MenuItem value="">
                <em>Seçiniz</em>
              </MenuItem>
              {allClass?.data?.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              id="phone_number"
              label="Telefon Numarası"
              type="text"
              fullWidth
              variant="outlined"
              value={form.phone_number}
              onChange={handleChange}
              name="phone_number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              id="identity_number"
              label="TC Kimlik Numarası"
              type="text"
              fullWidth
              variant="outlined"
              value={form.identity_number}
              onChange={handleChange}
              name="identity_number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              id="address"
              label="Adres"
              type="text"
              fullWidth
              variant="outlined"
              value={form.address}
              onChange={handleChange}
              name="address"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              id="guardian_name"
              label="Veli Ad Soyad"
              type="text"
              fullWidth
              variant="outlined"
              value={form.guardian_name}
              onChange={handleChange}
              name="guardian_name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              id="guardian_phone_number"
              label="Veli Telefon Numarası"
              type="text"
              fullWidth
              variant="outlined"
              value={form.guardian_phone_number}
              onChange={handleChange}
              name="guardian_phone_number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              id="guardian_identity_number"
              label="Veli TC Kimlik Numarası"
              type="text"
              fullWidth
              variant="outlined"
              value={form.guardian_identity_number}
              onChange={handleChange}
              name="guardian_identity_number"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              id="price"
              label="Ücret"
              type="text"
              fullWidth
              variant="outlined"
              value={form.price}
              onChange={handleChange}
              name="price"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              id="payment"
              label="Alınan Peşinat"
              type="text"
              fullWidth
              variant="outlined"
              value={form.payment}
              onChange={handleChange}
              name="payment"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              locale={trLocale}
            >
              <DatePicker
                margin="dense"
                id="payment_date"
                label="Ödeme Tarihi"
                type="text"
                fullWidth
                variant="outlined"
                value={form.payment_date}
                onChange={(date) => setForm({ ...form, payment_date: date })}
                name="payment_date"
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Select
              margin="dense"
              id="payment_type"
              label="Ödeme Türü"
              type="text"
              fullWidth
              variant="outlined"
              value={form.payment_type}
              onChange={handleChange}
              name="payment_type"
            >
              <MenuItem value="">
                <em>Seçiniz</em>
              </MenuItem>
              <MenuItem value="Nakit">Nakit</MenuItem>
              <MenuItem value="Kredi Kartı">Kredi Kartı</MenuItem>
              <MenuItem value="Havale">Havale</MenuItem>
              <MenuItem value="EFT">EFT</MenuItem>
              <MenuItem value="Senet">Senet</MenuItem>
              <MenuItem value="Çek">Çek</MenuItem>
              <MenuItem value="Diğer">Diğer</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              id="installments"
              label="Taksit Sayısı"
              type="text"
              fullWidth
              variant="outlined"
              value={form.installments}
              onChange={handleChange}
              name="installments"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          İptal
        </Button>

        <Button onClick={handleAddStudent} color="primary">
          Ekle
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { AddStudentModal };

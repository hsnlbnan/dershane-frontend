import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../../src/features/api/auth';
import { setUser } from '../../src/features/slices/auth';

export const LoginPage = () => {
  const [form, setForm] = useState({
    email: 'hsnlbnan@gmail.com',
    password: '2124785'
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const [showPassword, setShowPassword] = useState(false);

  const [doLogin, { data, loading, error, isSuccess }] = useLoginMutation();

  const handleLogin = () => {
    doLogin(form);
  };

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        setUser({
          token: data.data.token,
          user: data.data.user
        })
      );
    }
  }, [isSuccess]);

  const { access_token } = useSelector((state) => state.authslice);

  useEffect(() => {
    if (access_token) {
      router.push('/dashboards/tasks');
    }
  }, [access_token]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh'
      }}
    >
      <Box
        component="div"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <TextField
          id="outlined-basic"
          label="E-Posta Adresiniz"
          variant="outlined"
          name="email"
          value={form.email}
          onChange={handleOnChange}
        />

        <TextField
          id="outlined-basic"
          label="Şifreniz"
          variant="outlined"
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={form.password}
          onChange={handleOnChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <Button variant="contained" onClick={handleLogin}>
          Giriş Yap
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;

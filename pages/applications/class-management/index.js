import { useEffect, useState } from 'react';

import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';

import {
  useCreateClassMutation,
  useGetAllClassQuery,
  useDeleteClassMutation,
  useUpdateClassMutation,
  useGetClassMutation
} from 'src/features/api/class';
import {
  Box,
  styled,
  Divider,
  Drawer,
  IconButton,
  useTheme,
  Button,
  Dialog,
  TextField,
  Typography,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Snackbar
} from '@mui/material';
import { toast } from 'react-hot-toast';

const RootWrapper = styled(Box)(
  ({ theme }) => `
       height: calc(100vh - ${theme.header.height});
       display: flex;
         flex-direction: column;
`
);

const ViewHeader = styled(Box)(
  ({ theme }) => `
        height: 100px;
        background: ${theme.colors.alpha.white[100]};
        border-bottom: ${theme.colors.alpha.black[10]} solid 1px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: ${theme.spacing(2)};
        width: 100%;
    `
);

const ViewContent = styled(Box)(
  ({ theme }) => `
        height: calc(100% - 100px);
        background: ${theme.colors.alpha.white[100]};
        display: flex;
        flex-direction: column;
        width: 100%;
    `
);

function ApplicationsMessenger() {
  const [classModal, setClassModal] = useState(false);

  const [classInfo, setClassInfo] = useState({
    name: '',
    code: '',
    description: ''
  });

  const handleClassInfo = (e) => {
    setClassInfo({
      ...classInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleClick = () => {
    setClassModal(true);
  };

  const [
    createClass,
    { data: createClassData, isSuccess: createClassSuccess }
  ] = useCreateClassMutation();

  useEffect(() => {
    if (createClassSuccess) {
      setClassModal(false);
      toast.success('Sınıf başarıyla oluşturuldu');
    }
  }, [createClassSuccess]);

  const [updateClass, { data: updateClassData, isSuccess: updateIsSuccess }] =
    useUpdateClassMutation();
  const [
    getClassById,
    { data: getByClassData, isSuccess: getByClassDataIsSuccess }
  ] = useGetClassMutation();

  const handleSubmit = () => {
    isEdit
      ? updateClass({
          id: id,
          ...classInfo
        })
      : createClass(classInfo);
  };

  useEffect(() => {
    if (getByClassDataIsSuccess) {
      setClassInfo(getByClassData.data);
    }
  }, [getByClassDataIsSuccess]);

  useEffect(() => {
    if (updateIsSuccess) {
      setClassModal(false);
      toast.success('Sınıf başarıyla güncellendi');
      setIsEdit(false);
    }
  }, [updateIsSuccess]);

  const {
    data: classData,
    isLoading: classIsLoading,
    error: classError,
    isSuccess: classIsSuccess
  } = useGetAllClassQuery();

  const [removeAction, { data: removeData, isSuccess: removeSuccess }] =
    useDeleteClassMutation();

  const handleRemove = (id) => {
    window.confirm('Sınıfı silmek istediğinize emin misiniz?') &&
      removeAction({
        id: id
      });
  };

  useEffect(() => {
    if (removeSuccess) {
      toast.success('Sınıf başarıyla silindi');
    }
  }, [removeSuccess]);

  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState(null);

  const openEditModal = (id) => {
    setIsEdit(true);
    setId(id);
    setClassModal(true);
    getClassById({
      id: id
    });
  };

  return (
    <>
      <Head>
        <title>Messenger - Applications</title>
      </Head>
      <RootWrapper className="Mui-FixedWrapper">
        <ViewHeader>
          <Button variant="contained" color="primary" onClick={handleClick}>
            Sınıf Ekle
          </Button>
        </ViewHeader>
        <ViewContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sınıf Adı</TableCell>
                <TableCell>Sınıf Kodu</TableCell>
                <TableCell>Sınıf Açıklaması</TableCell>
                <TableCell
                  //right
                  align="right"
                >
                  Eylemler
                </TableCell>
              </TableRow>
            </TableHead>
            {classIsSuccess && (
              <TableBody>
                {classData?.data.map((item) => (
                  <TableRow key={item.id}>
                    {console.log(item)}
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.code}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        display: 'flex',
                        gap: 3
                      }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => openEditModal(item._id)}
                      >
                        Düzenle
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleRemove(item._id)}
                      >
                        Sil
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </ViewContent>
        <Dialog
          open={classModal}
          onClose={() => setClassModal(false)}
          maxWidth="md"
          fullWidth
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="h5">Sınıf Ekle</Typography>
          </Box>
          <Divider />
          <Box sx={{ p: 2 }}>
            <TextField
              fullWidth
              label="Sınıf Adı"
              name="name"
              required
              size="medium"
              variant="outlined"
              value={classInfo.name}
              onChange={handleClassInfo}
            />
          </Box>
          <Box sx={{ p: 2 }}>
            <TextField
              fullWidth
              label="Sınıf Kodu"
              name="code"
              required
              size="medium"
              variant="outlined"
              value={classInfo.code}
              onChange={handleClassInfo}
            />
          </Box>
          <Box sx={{ p: 2 }}>
            <TextField
              fullWidth
              label="Sınıf Açıklaması"
              name="description"
              required
              size="medium"
              variant="outlined"
              value={classInfo.description}
              onChange={handleClassInfo}
            />
          </Box>
          <Box sx={{ p: 2 }}>
            <Button
              color="primary"
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              onClick={handleSubmit}
            >
              {isEdit ? 'Düzenle' : 'Ekle'}
            </Button>
          </Box>
        </Dialog>
      </RootWrapper>
    </>
  );
}

ApplicationsMessenger.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ApplicationsMessenger;

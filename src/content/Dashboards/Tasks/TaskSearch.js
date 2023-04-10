import { useRef, useState } from 'react';
import {
  Button,
  Card,
  Grid,
  Box,
  FormControl,
  CardActions,
  Typography,
  Avatar,
  Divider,
  Rating,
  OutlinedInput,
  Chip,
  Tooltip,
  AvatarGroup,
  Pagination,
  InputAdornment,
  Menu,
  MenuItem,
  styled,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  IconButton
} from '@mui/material';
import {
  useDeleteStudentMutation,
  useGetAllStudentsQuery
} from 'src/features/api/student';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { format, parseISO } from 'date-fns';
import { useGetAllClassQuery } from 'src/features/api/class';
import { ViewArrayTwoTone, Visibility } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { AddStudentModal } from 'src/components/Modal/AddStudent';

function TaskSearch() {
  const {
    data: studentData,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetAllStudentsQuery();

  const {
    data: allClass,
    error: allClassError,
    isLoading: allClassLoading
  } = useGetAllClassQuery();

  const [deleteStudent, { isLoading: deleteStudentLoading }] =
    useDeleteStudentMutation();

  const handleDelete = (id) => {
    window.confirm('Öğrenciyi silmek istediğinize emin misiniz?') &&
      deleteStudent(id);
  };

  const [handleAddStudentModal, setHandleAddStudentModal] = useState(false);

  const [isEdit, setIsEdit] = useState(false);
  const [student, setStudent] = useState(null);
  const handleOpenAddStudentModal = () => {
    setHandleAddStudentModal(true);
    setIsEdit(true);
  };

  const router = useRouter();

  const handleShowStudent = (id) => {
    router.push(`/students/${id}`);
  };

  return (
    <>
      <Box
        py={3}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Adı Soyadı</TableCell>
                <TableCell>Sınıfı</TableCell>
                <TableCell>Veli Adı</TableCell>
                <TableCell>Ödeme Tarihi</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studentData?.data.map((student) => (
                <TableRow key={student._id} hover>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>
                    {
                      allClass?.data.find(
                        (item) => item._id === student.class_id
                      )?.name
                    }
                  </TableCell>
                  <TableCell>{student?.guardian_name}</TableCell>
                  <TableCell>
                    {/* 2023-03-24T17:33:50.000Z format the data */}
                    {student?.payment_date
                      ? format(parseISO(student?.payment_date), 'dd/MM/yyyy')
                      : 'Ödeme Tarihi Yok'}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip placement="top" title="Öğrenciyi Görüntüle" arrow>
                      <IconButton
                        color="inherit"
                        size="small"
                        onClick={() => handleShowStudent(student._id)}
                      >
                        <Visibility fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip placement="top" title="Öğrenciyi Sil" arrow>
                      <IconButton
                        color="inherit"
                        size="small"
                        onClick={() => handleDelete(student._id)}
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip placement="top" title="Düzenle" arrow>
                      <IconButton
                        color="inherit"
                        size="small"
                        onClick={() => {
                          handleOpenAddStudentModal();
                          setStudent(student);
                        }}
                      >
                        <ViewArrayTwoTone fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <AddStudentModal
        open={handleAddStudentModal}
        setOpen={setHandleAddStudentModal}
        isEdit={isEdit}
        student={student}
      />
    </>
  );
}

export default TaskSearch;

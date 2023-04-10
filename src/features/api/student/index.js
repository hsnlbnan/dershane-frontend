import apiMiddleware from '../middleware';

export const StudentApi = apiMiddleware.injectEndpoints({
  endpoints: (build) => ({
    createStudent: build.mutation({
      query: (body) => ({
        url: '/student/add-student',
        method: 'POST',
        body: body
      }),
      invalidatesTags: ['Student']
    }),

    updateStudent: build.mutation({
      query: ({ id, data }) => ({
        url: `/student/update-student/${id}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Student']
    }),

    getAllStudents: build.query({
      query: () => ({
        url: '/student/get-all-students',
        method: 'GET'
      }),
      providesTags: ['Student']
    }),
    getStudentById: build.query({
      query: (id) => ({
        url: `/student/get-student-by-id/${id}`
      }),
      providesTags: ['Student']
    }),

    deleteStudent: build.mutation({
      query: (id) => ({
        url: `/student/delete-student/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Student']
    }),

    getInstallementByStudentId: build.query({
      query: (id) => ({
        url: `/student/get-student-installament-by-id/${id}`
      }),
      providesTags: ['Student']
    }),

    doPaymentByPaymentId: build.mutation({
      query: (id) => ({
        url: `/student/doPaymentByInstallmentId/${id}`,
        method: 'PUT'
      }),
      invalidatesTags: ['Student']
    }),
    undoPaymentByPaymentId: build.mutation({
      query: (id) => ({
        url: `/student/undoPaymentByInstallmentId/${id}`,
        method: 'PUT'
      }),
      invalidatesTags: ['Student']
    })
  })
});

export const {
  useCreateStudentMutation,
  useUpdateStudentMutation,
  useGetAllStudentsQuery,
  useDeleteStudentMutation,
  useGetStudentByIdQuery,

  useGetInstallementByStudentIdQuery,
  useDoPaymentByPaymentIdMutation,
  useUndoPaymentByPaymentIdMutation
} = StudentApi;

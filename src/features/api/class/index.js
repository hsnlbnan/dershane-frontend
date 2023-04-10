import apiMiddleware from '../middleware';

export const classApi = apiMiddleware.injectEndpoints({
  endpoints: (build) => ({
    createClass: build.mutation({
      query: (body) => ({
        url: 'admin/create-class',
        method: 'POST',
        body: body
      }),
      invalidatesTags: ['Class']
    }),
    getClass: build.mutation({
      query: (data) => ({
        url: `admin/get-class-by-id`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Class']
    }),
    getAllClass: build.query({
      query: () => ({
        url: 'admin/get-classes',
        method: 'GET'
      }),
      providesTags: ['Class']
    }),
    updateClass: build.mutation({
      query: (body) => ({
        url: 'admin/update-class',
        method: 'POST',
        body: body
      }),
      invalidatesTags: ['Class']
    }),
    deleteClass: build.mutation({
      query: (data) => ({
        url: `admin/delete-class`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Class']
    })
  })
});

export const {
  useCreateClassMutation,
  useGetClassMutation,
  useGetAllClassQuery,
  useUpdateClassMutation,
  useDeleteClassMutation
} = classApi;

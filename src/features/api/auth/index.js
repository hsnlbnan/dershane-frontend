import apiMiddleware from '../middleware';

export const AuthApi = apiMiddleware.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => ({
        url: 'admin/admin-login',
        method: 'POST',
        body: body
      })
    }),

    logout: build.mutation({
      query: () => ({
        url: 'admin/admin-logout',
        method: 'POST'
      })
    })
  })
});

export const { useLoginMutation, useLogoutMutation } = AuthApi;

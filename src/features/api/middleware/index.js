import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setAccessToken, setLogoutState } from '../../../features/slices/auth';

const baseQuery = fetchBaseQuery({
  baseUrl: `http://localhost:8080/api/v1/`,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = getState().authslice.access_token;

    if (accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`);
      headers.set('Accept', 'application/json');
    } else {
      headers.set('Accept', 'application/json');
    }

    return headers;
  }
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  return result;
};

const apiMiddleware = createApi({
  baseQuery: baseQueryWithReauth,
  reducerPath: 'api',
  tagTypes: ['Auth', 'Class', 'Student', 'Payment'],

  endpoints: () => ({})
});

export default apiMiddleware;

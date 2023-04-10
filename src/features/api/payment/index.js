import apiMiddleware from '../middleware';

export const PaymentApi = apiMiddleware.injectEndpoints({
  endpoints: (build) => ({
    reportPayment: build.query({
      query: () => ({
        url: '/reports/report',
        method: 'GET'
      }),
      providesTags: ['Payment']
    }),
    upcomingPayments: build.query({
      query: () => ({
        url: '/reports//upcoming',
        method: 'GET'
      }),
      providesTags: ['Payment']
    })
  })
});

export const { useReportPaymentQuery, useUpcomingPaymentsQuery } = PaymentApi;

import { useEffect, useRef, useState } from 'react';
import {
  Button,
  Box,
  Menu,
  alpha,
  MenuItem,
  Typography,
  styled,
  useTheme
} from '@mui/material';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import { Chart } from 'src/components/Chart';
import { useReportPaymentQuery } from 'src/features/api/payment';

const DotPrimaryLight = styled('span')(
  ({ theme }) => `
    border-radius: 22px;
    background: ${theme.colors.primary.lighter};
    width: ${theme.spacing(1.5)};
    height: ${theme.spacing(1.5)};
    display: inline-block;
    margin-right: ${theme.spacing(0.5)};
`
);

const DotPrimary = styled('span')(
  ({ theme }) => `
    border-radius: 22px;
    background: ${theme.colors.primary.main};
    width: ${theme.spacing(1.5)};
    height: ${theme.spacing(1.5)};
    display: inline-block;
    margin-right: ${theme.spacing(0.5)};
`
);

function TasksAnalytics() {
  const theme = useTheme();

  const chartOptions = {
    chart: {
      background: 'transparent',
      type: 'bar',
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 6,
        columnWidth: '35%'
      }
    },
    colors: [theme.colors.primary.main, alpha(theme.colors.primary.main, 0.5)],
    dataLabels: {
      enabled: false
    },
    fill: {
      opacity: 1
    },
    theme: {
      mode: theme.palette.mode
    },
    stroke: {
      show: true,
      width: 3,
      colors: ['transparent']
    },
    legend: {
      show: true
    },
    labels: [
      'Oca',
      'Şub',
      'Mar',
      'Nis',
      'May',
      'Haz',
      'Tem',
      'Ağu',
      'Eyl',
      'Eki',
      'Kas',
      'Ara'
    ],
    grid: {
      strokeDashArray: 5,
      borderColor: theme.palette.divider
    },
    xaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        style: {
          colors: theme.palette.text.secondary
        }
      }
    },
    yaxis: {
      tickAmount: 6,
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        style: {
          colors: theme.palette.text.secondary
        }
      }
    },
    tooltip: {
      x: {
        show: false
      },
      marker: {
        show: false
      },
      y: {
        formatter: function (val) {
          return val + '  ' + '₺';
        }
      },
      theme: 'dark'
    }
  };
  const [chartData, setChartData] = useState([]);

  const { data: paymentData, isSuccess: paymentDataSuccess } =
    useReportPaymentQuery();

  useEffect(() => {
    if (paymentDataSuccess) {
      setChartData([
        {
          name: 'Beklenen',
          data: paymentData[0].data
        },
        {
          name: 'Ödenen',
          data: paymentData[1].data
        }
      ]);
    }
  }, [paymentDataSuccess]);

  const periods = [
    {
      value: 'today',
      text: 'Bugün'
    },
    {
      value: 'yesterday',
      text: 'Dün'
    },
    {
      value: 'last_month',
      text: 'Geçen Ay'
    },
    {
      value: 'last_year',
      text: 'Geçen Yıl'
    }
  ];

  const actionRef1 = useRef(null);
  const [openPeriod, setOpenMenuPeriod] = useState(false);
  const [period, setPeriod] = useState(periods[3].text);

  return (
    <Box>
      <Box
        mb={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h4">Toplam Ödeme Bilgisi</Typography>

        <Menu
          disableScrollLock
          anchorEl={actionRef1.current}
          onClose={() => setOpenMenuPeriod(false)}
          open={openPeriod}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          {periods.map((_period) => (
            <MenuItem
              key={_period.value}
              onClick={() => {
                setPeriod(_period.text);
                setOpenMenuPeriod(false);
              }}
            >
              {_period.text}
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Box display="flex" alignItems="center" pb={2}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: 'flex',
            alignItems: 'center',
            mr: 2
          }}
        >
          <DotPrimary />
          Ödenmesi Beklenen
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <DotPrimaryLight />
          Ödenen
        </Typography>
      </Box>
      <Chart
        options={chartOptions}
        series={chartData}
        type="bar"
        height={270}
      />
    </Box>
  );
}

export default TasksAnalytics;

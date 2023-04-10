import {
  Box,
  Grid,
  Typography,
  Avatar,
  Badge,
  Tooltip,
  useTheme,
  LinearProgress,
  styled
} from '@mui/material';
import { formatDistance, subDays, subMinutes, subHours } from 'date-fns';
import Text from 'src/components/Text';
import { useUpcomingPaymentsQuery } from 'src/features/api/payment';

const DotLegend = styled('span')(
  ({ theme }) => `
    border-radius: 22px;
    width: ${theme.spacing(1.5)};
    height: ${theme.spacing(1.5)};
    display: inline-block;
    margin-right: ${theme.spacing(0.5)};
    border: ${theme.colors.alpha.white[100]} solid 2px;
`
);

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    width: ${theme.spacing(7)};
    height: ${theme.spacing(7)};
`
);

const LinearProgressWrapper = styled(LinearProgress)(
  ({ theme }) => `
        flex-grow: 1;
        height: 10px;
        
        &.MuiLinearProgress-root {
          background-color: ${theme.colors.alpha.black[10]};
        }
        
        .MuiLinearProgress-bar {
          border-radius: ${theme.general.borderRadiusXl};
        }
`
);

function TeamOverview() {
  const theme = useTheme();

  const { data } = useUpcomingPaymentsQuery();

  console.log(data);

  return (
    <Grid container spacing={4}>
      {data?.data?.map((item) => (
        <Grid item xs={12} md={4}>
          <Box>
            <Box display="flex" alignItems="center" pb={3}>
              <Badge
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                overlap="circular"
                badgeContent={
                  <Tooltip
                    arrow
                    placement="top"
                    title={
                      'Offline since ' +
                      formatDistance(subDays(new Date(), 14), new Date(), {
                        addSuffix: true
                      })
                    }
                  >
                    <DotLegend
                      style={{ background: `${theme.colors.error.main}` }}
                    />
                  </Tooltip>
                }
              >
                <AvatarWrapper
                  alt="Remy Sharp"
                  src="/static/images/avatars/80.jpg"
                />
              </Badge>
              <Box
                sx={{
                  ml: 1.5
                }}
              >
                <Typography variant="h4" noWrap gutterBottom>
                  {item.student_name}
                </Typography>
                <Typography variant="subtitle2" noWrap>
                  {item.class_name} -{' '}
                  {new Date(item.installment_date).toLocaleDateString('tr', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </Typography>
              </Box>
            </Box>

            <Typography variant="subtitle2" gutterBottom>
              <Text color="black">{item.total_installment}</Text> taksitten{' '}
              <Text color="black">{item.installment_number}</Text> taksit
              ödendi.
            </Typography>
            <LinearProgressWrapper
              value={65}
              color="primary"
              variant="determinate"
            />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

export default TeamOverview;

import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

function Overview() {
  const router = useRouter();
  const { access_token } = useSelector((state) => state.authslice);

  if (!access_token) {
    router.push('/login');
  } else {
    router.push('/dashboards/tasks');
  }

  return <div></div>;
}

export default Overview;

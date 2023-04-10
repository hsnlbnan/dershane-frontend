import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import Footer from 'src/components/Footer';

import { Grid, Container } from '@mui/material';

import ProfileCover from 'src/content/Management/Users/details/ProfileCover';
import RecentActivity from 'src/content/Management/Users/details/RecentActivity';
import Feed from 'src/content/Management/Users/details/Feed';
import PopularTags from 'src/content/Management/Users/details/PopularTags';
import MyCards from 'src/content/Management/Users/details/MyCards';
import Addresses from 'src/content/Management/Users/details/Addresses';
import { useRouter } from 'next/router';
import { useGetStudentByIdQuery } from 'src/features/api/student';
function ManagementUserProfile() {
  // get id by slug
  const { id } = useRouter().query;

  const { data: studentInfo, isLoading: studentInfoIsLoading } =
    useGetStudentByIdQuery(id, {
      skip: !id
    });

  console.log('studentInfo =>', studentInfo);

  return (
    <>
      <Head>
        <title>{studentInfo?.data?.name}</title>
      </Head>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={12}>
            <ProfileCover user={studentInfo?.data} />
          </Grid>
          <Grid item xs={12} md={12}>
            <Feed user={studentInfo?.data} id={id} />
          </Grid>
          {/* <Grid item xs={12} md={12}>
            <RecentActivity />
          </Grid> */}
          {/* <Grid item xs={12} md={12}>
            <MyCards />
          </Grid>
          <Grid item xs={12} md={5}>
            <Addresses />
          </Grid> */}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

ManagementUserProfile.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ManagementUserProfile;

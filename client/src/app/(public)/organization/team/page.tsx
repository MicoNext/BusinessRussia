import Link from 'next/link';
import { Grid } from '@/components/ui/Grid/Grid';
import { Card } from '@/components/ui/Card/Card';
import { Headline } from '@/components/ui/Headline';
import ssgApiService from '@/shared/api/ssg.api.service';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const revalidate = 1690;

async function getAllParticipants() {
  try {
    const participants = await ssgApiService.getParticipants(1, 10000);
    return participants;
  } catch (error) {
    console.error('Failed to fetch participants:', error);
    return [];
  }
}

export async function generateMetadata() {
  return {
    title: 'Лица регионального отделения',
    description: 'Команда и участники регионального отделения «Деловой России»',
    openGraph: {
      title: 'Лица регионального отделения',
      description: 'Команда и участники регионального отделения «Деловой России»',
    },
  };
}

export default async function TeamPage() {
  const [participants, companyInfo] = await Promise.all([
    getAllParticipants(),
    ssgApiService.getCompanyInfo()
  ]);

  return (
    <>
      <Header companyInfo={companyInfo} />
      <section className="px-4 md:px-8 lg:px-12 py-6">
        <div className="container mx-auto">
          <Breadcrumbs className="mb-6" />
          <main>
            <Headline
              title={'Лица регионального отделения'}
              order={1}
              classNames={{ container: 'mb-6' }}
            />
            <div className='space-y-8'>
              {participants.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Нет данных для отображения</p>
                </div>
              ) : (
                <Grid
                  cols={1}
                  gap={8}
                  classNames={{ root: 'md:grid-cols-2 lg:grid-cols-3' }}
                >
                  {participants.map(item => (
                    <Grid.Col key={item._id}>
                      <Card
                        link={`/organization/team/${item._id}`}
                        image={item.media?.imagesUrl?.[0]}
                        title={item.name}
                        subtitle={`${item.organization ? item.organization + ": " : ""}${item.jobTitle || ''}`}
                      />
                    </Grid.Col>
                  ))}
                </Grid>
              )}
            </div>
          </main>
        </div>
      </section>
      <Footer companyInfo={companyInfo} />
    </>
  );
}
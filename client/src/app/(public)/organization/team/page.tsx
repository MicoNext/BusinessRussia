import Link from 'next/link';
import { Grid } from '@/components/ui/Grid/Grid';
import { Card } from '@/components/ui/Card/Card';
import { Headline } from '@/components/ui/Headline';
import { IParticipant } from '../../../../../../package/types/models/participant';

async function getAllParticipants(): Promise<IParticipant[]> {
  const res = await fetch(`http://localhost:6969/api/participant?page=1&limit=10000`, {
    next: { revalidate: 3600 }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch participants');
  }
  
  const response = await res.json();
  return response.data; 
}

export const revalidate = 3600;

export default async function TeamPage() {
  const participants = await getAllParticipants();

  return (
    <main>
      <Headline
        title={'Лица регионального отделения'}
        order={1}
        classNames={{ container: 'mb-6' }}
      />
      <div className='space-y-8'>
        <Grid
          cols={1}
          gap={8}
          classNames={{ root: 'md:grid-cols-2 lg:grid-cols-3' }}
        >
          {participants.map(item => (
            <Grid.Col key={item._id}>
              <Card
                link={`/organization/team/${item._id}`}
                image={item.media.imagesUrl[0]}
                title={item.name}
                subtitle={`${item.organization ? item.organization + ": " : ""}` + item.jobTitle}
              />
            </Grid.Col>
          ))}
        </Grid>
      </div>
    </main>
  );
}
import Link from 'next/link';
import { ENTITIES, type EntitySlug } from '@/shared/constants/entities';
import { Grid } from '@/components/ui/Grid';
import { Card } from '@/components/ui/Card';
import { notFound } from 'next/navigation';
import { TParams, TSearchParams } from './types';
import { Headline } from '@/components/ui/Headline';
import axios from 'axios';
import { IEvent } from '../../../../../package/types/models/events';
import { INews } from '../../../../../package/types/models/news';
import { IProject } from '../../../../../package/types/models/projects';
import { ICommittee } from '../../../../../package/types/models/committee';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:6969',
});

const PAGE_SIZE = 9;

async function getNews(): Promise<INews[]>  {
  try {
    const response = await api.get('/api/news');
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

async function getEvents(): Promise<IEvent[]> {
  try {
    const response = await api.get('/api/event');
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

async function getProjects(): Promise<IProject[]>  {
  try {
    const response = await api.get('/api/project');
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

async function getCommittees(): Promise<ICommittee[]>  {
  try {
    const response = await api.get('/api/committee');
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching committees:', error);
    return [];
  }
}

function formatEventDateRange(startDate: Date, endDate?: Date): string {
  const locale = 'ru-RU';
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : undefined;
  const startFmt = start.toLocaleDateString(locale, {
    day: '2-digit',
    month: 'long',
  });
  if (!end) return startFmt;
  const sameMonth =
    start.getMonth() === end.getMonth() &&
    start.getFullYear() === end.getFullYear();
  const endFmt = end.toLocaleDateString(locale, {
    day: '2-digit',
    month: sameMonth ? undefined : 'long',
  });
  return `${startFmt} - ${endFmt}`;
}

async function getData(entity: EntitySlug) {
  try {
    switch (entity) {
      case 'news': {
        const news = await getNews();
        return news.map(n => ({
          id: n._id,
          title: n.title,
          subtitle: n.category,
          time: n.createdAt,
          image: n.media?.imagesUrl?.[0],
          href: `/news/${n._id}`, // Используем _id вместо slug
        }));
      }
      case 'events': {
        const events = await getEvents();
        return events.map(e => ({
          id: e._id,
          title: e.title,
          subtitle: formatEventDateRange(e.startDate, e.endDate),
          time: undefined as string | Date | undefined,
          image: undefined as string | undefined,
          href: e.url || `/events/${e._id}`, // Используем _id вместо slug
        }));
      }
      case 'projects': {
        const projects = await getProjects();
        return projects.map(p => ({
          id: p._id,
          title: p.title,
          subtitle: p.category,
          time: p.createdAt,
          image: p.media?.imagesUrl?.[0],
          href: p.url?.startsWith('http') ? p.url : `/projects/${p._id}`, // Используем _id вместо slug
        }));
      }
      case 'committees': {
        const committees = await getCommittees();
        return committees.map(c => ({
          id: c._id,
          title: c.title,
          time: c.createdAt,
          image: c.media?.imagesUrl?.[0],
          href: `/committees/${c._id}`, // Используем _id вместо slug
        }));
      }
      default:
        return [];
    }
  } catch (error) {
    console.error(`Error fetching ${entity} data:`, error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<TParams>;
}) {
  const { entity } = await params;
  
  if (!ENTITIES[entity]) {
    return {
      title: 'Страница не найдена',
    };
  }

  return {
    title: ENTITIES[entity].title,
    description: `Список ${ENTITIES[entity].title.toLowerCase()}`,
    openGraph: {
      title: ENTITIES[entity].title,
      description: `Список ${ENTITIES[entity].title.toLowerCase()}`,
    },
  };
}

export default async function EntityListPage({
  params,
  searchParams,
}: {
  params: Promise<TParams>;
  searchParams: Promise<TSearchParams>;
}) {
  const { entity } = await params;
  const { page } = await searchParams;
  
  if (!ENTITIES[entity]) notFound();

  const currentPage = Math.max(1, Number(page ?? 1));
  const all = await getData(entity);
  const total = all.length;
  const start = (currentPage - 1) * PAGE_SIZE;
  const items = all.slice(start, start + PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <main>
      <div className='space-y-8'>
        <Headline
          title={ENTITIES[entity].title}
          order={2}
          classNames={{ container: 'mb-6' }}
        />

        {items.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Нет данных для отображения</p>
          </div>
        ) : (
          <>
            <Grid
              cols={1}
              gap={8}
              classNames={{ root: 'md:grid-cols-2 lg:grid-cols-3' }}
            >
              {items.map(item => (
                <Grid.Col key={item.id}>
                  <Card
                    link={item.href}
                    image={item.image}
                    subtitle={item && 'subtitle' in item ? item.subtitle : null}
                    title={item.title}
                    time={item.time}
                  />
                </Grid.Col>
              ))}
            </Grid>

            {totalPages > 1 && (
              <div className='flex items-center justify-center gap-2'>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <Link
                    key={p}
                    href={`/${entity}?page=${p}`}
                    className={
                      'px-3 py-1.5 rounded border text-sm ' +
                      (p === currentPage
                        ? 'border-gray-900 text-gray-900'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300')
                    }
                  >
                    {p}
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { SectionBar } from '@/components/ui/SectionBar/SectionBar';
import { Headline } from '@/components/ui/Headline';
import { HtmlContent } from '@/components/ui/HtmlContent';
import { type EntitySlug } from '@/shared/constants/entities';
import { Button } from '@/components/ui/buttons/Button';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:6969',
});

type TParams = { entity: EntitySlug; _id: string }; // Изменено с slug на id

// API функции для получения данных по ID
async function getNewsItem(id: string) {
  try {
    const response = await api.get(`/api/news/${id}`);
    console.log(response.data)
    return response.data.data || null;
  } catch (error) {
    console.error('Error fetching news item:', error);
    return null;
  }
}

async function getEventItem(id: string) {
  try {
    const response = await api.get(`/api/event/${id}`);
    return response.data.data || null;
  } catch (error) {
    console.error('Error fetching event item:', error);
    return null;
  }
}

async function getProjectItem(id: string) {
  try {
    const response = await api.get(`/api/project/${id}`);
    return response.data.data || null;
  } catch (error) {
    console.error('Error fetching project item:', error);
    return null;
  }
}

async function getCommitteeItem(id: string) {
  try {
    const response = await api.get(`/api/committee/${id}`);
    return response.data.data || null;
  } catch (error) {
    console.error('Error fetching committee item:', error);
    return null;
  }
}

// Функция для получения конкретного элемента по ID
async function getEntityItem(entity: EntitySlug, id: string) {
  try {
    switch (entity) {
      case 'news':
        return await getNewsItem(id);
      case 'events':
        return await getEventItem(id);
      case 'projects':
        return await getProjectItem(id);
      case 'committees':
        return await getCommitteeItem(id);
      default:
        return null;
    }
  } catch (error) {
    console.error(`Error fetching ${entity} item:`, error);
    return null;
  }
}

// Генерация метаданных для SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<TParams>;
}) {
  const { entity, id } = await params; 
  console.log(entity)// Изменено с slug на id
  const item = await getEntityItem("events", id);

  if (!item) {
    return {
      title: 'Страница не найдена',
      description: 'Запрашиваемая страница не существует',
    };
  }

  return {
    title: item.title || 'Детальная страница',
    description: item.description || item.excerpt || `Детальная информация о ${item.title}`,
    openGraph: {
      title: item.title,
      description: item.description || item.excerpt,
      images: item.image ? [item.image] : [],
    },
  };
}

export default async function EntityDetailsPage({
  params,
}: {
  params: Promise<TParams>;
}) {
  const { entity, _id } = await params; // Изменено с slug на id
  const item = await getEntityItem(entity, _id);
  
  if (!item) {
    return (
      <section className='flex-1'>
        <div className='container mx-auto space-y-6'>
          <SectionBar
            leftSection={
              <Headline
                title="Страница не найдена"
                description="Запрашиваемая страница не существует или была удалена"
              />
            }
          />
          <div>
            <Link href={`/${entity}`}>
              <Button
                variant='ghost'
                leftSection={<ArrowLeft size={16} />}
              >
                Назад к списку
              </Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const title: string = item.title;
  const html: string | undefined = item.html || item.content || item.description;
  // Раскомментируйте если нужны теги
  // const tags: string[] = item?.tags && Array.isArray(item?.tags) ? item.tags : [];

  return (
    <section className='flex-1'>
      <div className='container mx-auto space-y-6'>
        <SectionBar
          leftSection={
            <Headline
              title={title}
              // description={
              //   tags.length > 0 && (
              //     <div className="flex flex-wrap gap-2">
              //       {tags.map((tag, index) => (
              //         <Badge key={`${index}-${tag}`}>#{tag}</Badge>
              //       ))}
              //     </div>
              //   )
              // }
              classNames={{
                container: 'space-y-3',
                description: 'flex flex-wrap gap-2',
              }}
            />
          }
        />

        {html ? <HtmlContent html={html} /> : null}

        <div>
          <Link href={`/${entity}`}>
            <Button
              variant='ghost'
              leftSection={<ArrowLeft size={16} />}
            >
              Назад к списку
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
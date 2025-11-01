import { Headline } from '@/components/ui/Headline';
import { Сontactus } from '@/components/Сontactus'
import { HtmlContent } from '@/components/ui/HtmlContent';
import ssgApiService from '@/shared/api/ssg.api.service';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const revalidate = 1690;

async function getCompanyInfo() {
  try {
    const companyInfo = await ssgApiService.getCompanyInfo();
    return companyInfo;
  } catch (error) {
    console.error('Failed to fetch company info:', error);
    return {
      about: {
        html: '<p>Информация временно недоступна</p>'
      }
    };
  }
}

export async function generateMetadata() {
  const companyInfo = await getCompanyInfo();

  return {
    title: 'О «Деловой России»',
    description: companyInfo.about?.html
      ? companyInfo.about.html.replace(/<[^>]*>/g, '').substring(0, 160)
      : 'Информация об организации «Деловая Россия»',
    openGraph: {
      title: 'О «Деловой России»',
      description: companyInfo.about?.html
        ? companyInfo.about.html.replace(/<[^>]*>/g, '').substring(0, 160)
        : 'Информация об организации «Деловая Россия»',
    },
  };
}

export default async function AboutPage() {
  const companyInfo = await getCompanyInfo();
  const aboutHtml = companyInfo.about?.html || '';

  return (
    <>
      <Header companyInfo={companyInfo} />
      <section className='flex-1 overflow-hidden'>
        <div className='container mx-auto px-4 md:px-8 lg:px-12 py-6'>
          <Breadcrumbs className="mb-6" />
          <article className='flex flex-col gap-4 md:gap-6 leading-relaxed'>
            <Headline
              title={'О «Деловой России»'}
              order={1}
              classNames={{ container: 'mb-6' }}
            />
            <HtmlContent html={aboutHtml} />
          </article>
        </div>
      <Сontactus companyInfo={companyInfo} />
      </section>
      <Footer companyInfo={companyInfo} />
    </>
  );
}
import { SectionBar } from '@/components/ui/SectionBar/SectionBar';
import { Headline } from '@/components/ui/Headline/Headline';
import { Сontactus } from '@/components/Сontactus'
import { Breadcrumbs } from '@/components/Breadcrumbs';
import ssgApiService from '@/shared/api/ssg.api.service';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ClientMap from './_components/ClientMap';

export const revalidate = 1690;

interface CompanyInfo {
  address?: string;
  phone?: string;
  email?: string;
}

async function getCompanyInfo(): Promise<CompanyInfo> {
  try {
    const companyInfo = await ssgApiService.getCompanyInfo();
    return {
      address: companyInfo.address,
      phone: companyInfo.phone,
      email: companyInfo.email,
    };
  } catch (error) {
    console.error('Failed to fetch company info:', error);
    return {};
  }
}

export async function generateMetadata() {
  return {
    title: 'Контакты',
    description: 'Контактная информация и адрес',
    openGraph: {
      title: 'Контакты',
      description: 'Контактная информация и адрес',
    },
  };
}

export default async function ContactsPage() {
  const companyInfo = await ssgApiService.getCompanyInfo();
  const contactInfo = await getCompanyInfo();
  
  const { address, phone, email } = contactInfo;

  return (
    <>
      <Header companyInfo={companyInfo} />
      <section className='text-gray-900 flex flex-col gap-8 md:gap-14 lg:gap-16 xl:gap-20 flex-1 relative overflow-hidden'>
        <div className='container mx-auto px-4 md:px-8 lg:px-12 py-6'>
          <Breadcrumbs className='mb-4' />
          <SectionBar
            leftSection={
              <Headline
                title='Контакты'
                order={2}
              />
            }
          />
          <div className='mt-6 flex flex-col lg:flex-row gap-6'>
            <div className='w-full lg:w-1/2 space-y-4'>
              {address && (
                <div>
                  <div className='text-sm text-gray-500'>Адрес</div>
                  <div className='text-base'>{address}</div>
                </div>
              )}
              {phone && (
                <div>
                  <div className='text-sm text-gray-500'>Телефон</div>
                  <a
                    className='text-base hover:underline'
                    href={`tel:${phone}`}
                  >
                    {phone}
                  </a>
                </div>
              )}
              {email && (
                <div>
                  <div className='text-sm text-gray-500'>Email</div>
                  <a
                    className='text-base hover:underline'
                    href={`mailto:${email}`}
                  >
                    {email}
                  </a>
                </div>
              )}
            </div>
            <div className='w-full lg:w-1/2'>
              <ClientMap />
            </div>
          </div>
        </div>
      <Сontactus companyInfo={companyInfo} />
      </section>
      <Footer companyInfo={companyInfo} />
    </>
  );
}
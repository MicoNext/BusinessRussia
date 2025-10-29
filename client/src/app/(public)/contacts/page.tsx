'use client';

import { SectionBar } from '@/components/ui/SectionBar/SectionBar';
import { Headline } from '@/components/ui/Headline/Headline';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const YMapWidget = dynamic(
  () => import('@/components/YMap').then(m => m.YMapWidget),
  { ssr: false }
);

interface CompanyInfo {
  address?: string;
  phone?: string;
  email?: string;
}

async function getCompanyInfo(): Promise<CompanyInfo> {
  const res = await fetch(`http://localhost:6969/api/company-info`, { cache: 'force-cache' });
  if (!res.ok) return {};
  const response = await res.json();
  return response.data || {};
}

export default function Page() {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({});

  useEffect(() => {
    getCompanyInfo().then(setCompanyInfo);
  }, []);

  const { address, phone, email } = companyInfo;

  return (
    <section className='px-4 md:px-8 lg:px-12 py-6'>
      <div className='container mx-auto'>
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
          <div className='w-full lg:w-1/2 h-64 lg:h-96'>
            <YMapWidget />
          </div>
        </div>
      </div>
    </section>
  );
}

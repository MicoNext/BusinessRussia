import { Headline } from '@/components/ui/Headline';
import { ICompanyInfo } from '../../../../../../package/types/models/companyInfo';
import { HtmlContent } from '@/components/ui/HtmlContent';

async function getCompanyInfo(): Promise<ICompanyInfo> {
  const res = await fetch(`http://localhost:6969/api/company-info`, {
    next: { revalidate: 3600 }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch company info');
  }
  
  const response = await res.json();
  return response.data; 
}

export const revalidate = 3600;

export default async function AboutPage() {
  const { about } = await getCompanyInfo();

  return (
    <article className='flex flex-col gap-4 md:gap-6 leading-relaxed'>
      <Headline
        title={'О «Деловой России»'}
        order={1}
        classNames={{ container: 'mb-6' }}
      />
      <HtmlContent html={about.html || ""} />
    </article>
  );
}
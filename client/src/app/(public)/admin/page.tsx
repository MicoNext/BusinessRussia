import { SectionBar } from '@/components/ui/SectionBar/SectionBar';
import { Headline } from '@/components/ui/Headline/Headline';
import { companyInfoMock } from '@/shared/data/companyInfo.mock';
import { YMapWidget } from '@/components/YMap';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export default function Page() {
	const { address, phone, email, workingHours } = companyInfoMock;
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
					<div className='flex-1 space-y-4'>
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
						{workingHours && (
							<div>
								<div className='text-sm text-gray-500'>Режим работы</div>
								<div
									className='text-base'
									dangerouslySetInnerHTML={{ __html: workingHours }}
								/>
							</div>
						)}
					</div>
					<div className='flex-1 min-h-[360px]'>
						<YMapWidget />
					</div>
				</div>
			</div>
		</section>
	);
}

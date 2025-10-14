import Image from 'next/image';
import Link from 'next/link';
import { Grid } from '@/components/ui/Grid';
import type { INews } from '@/../../package/types/models/news';
import { Card } from '@/components/ui/Card';
import { SectionBar } from '@/components/ui/SectionBar/SectionBar';
import { Headline } from '@/components/ui/Headline';
import { Button } from '@/components/ui/buttons';
import { MailCheck } from 'lucide-react';

export default function NewsGrid({ items }: { items: INews[] }) {
	return (
		<section
			className='container mx-auto flex flex-col gap-8'
			aria-label='Новости'
		>
			<SectionBar
				leftSection={<Headline title='Новости' />}
				rightSection={
					<Button
						variant='ghost'
						leftSection={
							<MailCheck
								width={18}
								height={18}
							/>
						}
						className='gap-1 hover:bg-brand-primary/10'
					>
						Подписаться на рассылку
					</Button>
				}
			/>
			<Grid
				cols={3}
				gap={8}
			>
				{items.map(item => (
					<Grid.Col key={item._id}>
						<Card
							link={item.slug}
							image={item.media.imagesUrl[0]}
							subtitle={item.category}
							title={item.header.title}
							time={item.createdAt}
						/>
					</Grid.Col>
				))}
			</Grid>
		</section>
	);
}

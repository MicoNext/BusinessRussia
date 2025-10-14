import { Grid } from '@/components/ui/Grid';
import type { INews } from '@/../../package/types/models/news';
import { Card } from '@/components/ui/Card';
import clsx from 'clsx';

export function NewsGrid({ items }: { items: INews[] }) {
	return (
		<Grid
			cols={1}
			gap={8}
			classNames={{
				root: 'md:grid-cols-2 lg:grid-cols-3',
			}}
		>
			{items.map((item, index) => (
				<Grid.Col
					key={item._id}
					className={clsx(
						index === 0 || index === items.length - 1
							? 'md:col-span-2'
							: 'col-span-1'
					)}
				>
					<Card
						link={item.slug}
						image={item.media.imagesUrl[0]}
						subtitle={item.category}
						title={item.header.title}
						time={item.createdAt}
						classNames={{
							container: clsx(
								index === 0 || index === items.length - 1
									? 'md:flex-row'
									: 'md:flex-col'
							),
							textbox:
								index === 0 || index === items.length - 1
									? 'p-4 md:p-8 lg:p-12'
									: 'p-4 md:p-8',
							image:
								index === 0 || index === items.length - 1
									? 'relative md:w-1/2 md:min-h-[180px]'
									: '',
						}}
					/>
				</Grid.Col>
			))}
		</Grid>
	);
}

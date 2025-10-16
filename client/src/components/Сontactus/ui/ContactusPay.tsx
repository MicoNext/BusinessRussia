import { Button } from '@/components/ui/buttons';
import { Headline } from '@/components/ui/Headline';
import clsx from 'clsx';

export function ContactusPay() {
	return (
		<>
			<Headline
				variant='light'
				title='Оплатить взнос'
				description='Выбрать систему оплаты'
				order={4}
				classNames={{
					container: 'flex flex-col gap-2',
					subtitle: 'text-white/80',
					title: 'text-white/90',
					description: 'text-white/80',
				}}
			/>
			<div className='flex-1 flex flex-wrap justify-between gap-4'>
				<CardBase
					head={
						<h4 className='text-lg font-medium leading-snug line-clamp-2'>
							Заголовок 1
						</h4>
					}
					content={
						<div className='flex gap-2 align-center justify-between'>
							<p className='align-center'>Оплата 1</p>
							<Button variant='accent'>Перейти к оплате</Button>
						</div>
					}
					classNames={{
						root: 'flex-1 bg-white/10 border border-white/10 rounded-2xl p-4 max-h-[160px] md:h-full',
						container: 'flex-1 flex flex-col gap-2 justify-between',
					}}
				/>
				<CardBase
					head={
						<h4 className='text-lg font-medium leading-snug line-clamp-2'>
							Заголовок 2
						</h4>
					}
					content={
						<div className='flex gap-2 justify-between'>
							<p>Оплата 2</p>
							<Button variant='accent'>Перейти к оплате</Button>
						</div>
					}
					classNames={{
						root: 'flex-1 flex bg-white/10 border border-white/10 rounded-2xl p-4 max-h-[160px] md:h-full',
						container: 'flex-1 flex flex-col gap-2 justify-between ',
					}}
				/>
			</div>
		</>
	);
}

interface CardBaseProps {
	head: React.ReactNode;
	content: React.ReactNode;
	classNames?: {
		root?: string;
		container?: string;
		head?: string;
		content?: string;
	};
}

function CardBase({ head, content, classNames }: CardBaseProps) {
	return (
		<div className={clsx('flex flex-col gap-2', classNames?.root)}>
			<article className={clsx('flex flex-col gap-2', classNames?.container)}>
				<div className={classNames?.head}>{head}</div>
				<div className={classNames?.content}>{content}</div>
			</article>
		</div>
	);
}

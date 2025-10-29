import Link from 'next/link';

export default function Logo() {
	return (
		<div className='logo-wrapper min-w-20 md:min-w-28 lg:min-w-[174px]'>
			<Link href='/'>
				<img
					width={190}
					src='/logo-full.svg'
					alt='Деловая Россия. Региональное отделение по Карачаево-Черкесской Республике'
				/>
			</Link>
		</div>
	);
}

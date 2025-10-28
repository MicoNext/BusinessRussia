import { ScrollTop } from '@/components/ScrollTop';

function layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className='min-h-screen flex flex-col justify-between'>
			{children}
			<ScrollTop />
		</div>
	);
}

export default layout;

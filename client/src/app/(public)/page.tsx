import type { ISliderMain } from '@/../../package/types/models/sliderMain';

interface IProps {
	sliderMain: ISliderMain[];
}

const props: IProps = {
	sliderMain: [
		{
			_id: '213',
			createdAt: new Date(),
			tags: [],
			title: 'dfasd',
			type: 'img',
			url: 'sd',
			sourse: {
				buttonName: 'dsad',
				url: 'sadasd',
			},
		},
	],
};

export default function HomePage() {
	return (
		<main className='min-h-screen text-gray-900 relative overflow-hidden container mx-auto px-4'>
			<h1>hello is HomePage</h1>
			<h2>{props.sliderMain[0]._id}</h2>
		</main>
	);
}

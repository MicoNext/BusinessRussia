import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SectionBar } from '@/components/ui/SectionBar/SectionBar';
import { Headline } from '@/components/ui/Headline';
import { HtmlContent } from '@/components/ui/HtmlContent';
import { participantsMock } from '@/shared/data/participant.mock';
import { MemberCard } from './_components/MemberCard';

type TParams = { slug: string };

function findParticipantBySlug(slug: string) {
	return participantsMock.find(
		p => p.name.toLowerCase().replace(/\s+/g, '-') === decodeURIComponent(slug)
	);
}

export default async function MemberPage({
	params,
}: {
	params: Promise<TParams>;
}) {
	const { slug } = await params;
	const participant = findParticipantBySlug(slug);
	if (!participant) return null;

	const title = participant.name;
	const html = participant.html;
	const image = participant.media.imagesUrl?.[0];

	return (
		<section className='flex-1'>
			<div className='container mx-auto flex flex-col lg:flex-row gap-12'>
				<div className='flex flex-col gap-4 static top-auto lg:sticky lg:top-32 lg:self-start '>
					<SectionBar
						leftSection={
							<Headline
								title={title}
								classNames={{ container: 'space-y-3' }}
							/>
						}
					/>

					<MemberCard
						image={image}
						info={{ jobTitle: participant.jobTitle }}
					/>
				</div>

				{html ? <HtmlContent html={html} /> : null}
			</div>
		</section>
	);
}

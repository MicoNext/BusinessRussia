import { Button } from '@/components/ui/buttons';
import { ContactModal } from '@/components/ContactModal';

function JoinButton({ className }: { className?: string }) {
	return (
		<ContactModal
			trigger={
				<Button
					variant='primary'
					size='md'
					className={className}
				>
					Вступить
				</Button>
			}
		/>
	);
}

export default JoinButton;

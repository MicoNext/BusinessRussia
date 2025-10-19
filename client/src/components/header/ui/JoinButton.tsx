import { Button } from '@/components/ui/buttons';
import { ContactModal } from '@/components/ContactModal';

function JoinButton() {
	return (
		<ContactModal
			trigger={
				<Button
					variant='primary'
					size='md'
				>
					Вступить
				</Button>
			}
		/>
	);
}

export default JoinButton;

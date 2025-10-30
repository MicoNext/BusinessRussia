import { Button } from '@/components/ui/buttons';
import { ContactModal } from '@/components/ContactModal';

function JoinButton({ className }: { className?: string }) {
	return (
		<ContactModal
			trigger={
				<Button
					variant='primary'
					size='md'
					className={`
						w-full 
						sm:w-auto 
						min-h-[44px] 
						px-4 
						py-3 
						text-base 
						sm:text-sm 
						font-medium 
						rounded-lg 
						transition-all 
						duration-200 
						hover:scale-105 
						active:scale-95
						${className || ''}
					`.trim()}
				>
					Вступить
				</Button>
			}
		/>
	);
}

export default JoinButton;
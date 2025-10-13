import { Button } from '@/components/ui/buttons';
import { Search } from 'lucide-react';

function SearchButton() {
	return (
		<Button
			variant='outline'
			size='md'
			aria-label='Показать поиск'
			className='w-full max-w-96 sm:gap-2 '
			leftSection={
				<Search
					width={18}
					height={18}
				/>
			}
		>
			<span className='hidden sm:inline'>Поиск</span>
		</Button>
	);
}

export default SearchButton;

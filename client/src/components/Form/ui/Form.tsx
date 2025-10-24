import { Button } from '@/components/ui/buttons';
import {
	TextInput,
	PhoneNumberInput,
	Switch,
	TextareaInput,
} from '@/components/ui/inputs';
import { formTokens } from '../base';
import clsx from 'clsx';
import { Headline } from '@/components/ui/Headline';

interface IFormProps {
	id: string;
	subject?: string;
	header?: React.ReactNode;
	footer?: React.ReactNode;
	variant?: 'light' | 'dark';
	button?: React.ReactNode;
}

export function Form({
	id,
	subject = 'Вступить',
	variant = 'light',
	header = (
		<Headline
			title='Вступить'
			order={4}
			variant={variant === 'light' ? 'dark' : 'light'}
		/>
	),
	button = (
		<Button
			variant='primary'
			size='lg'
			fullWidth
			type='submit'
			className='justify-center'
		>
			Сохранить
		</Button>
	),
}: IFormProps) {
	return (
		<form
			className={clsx(
				formTokens.variants[variant].container,
				'flex flex-col gap-12'
			)}
		>
			<input
				type='hidden'
				name='subject'
				value={subject}
			/>
			<div className='flex flex-col gap-4 md:gap-6'>
				<div className='flex gap-2 justify-between items-center'>{header}</div>
				<section className='flex flex-col gap-3'>
					<TextInput
						id={`${id}_name`}
						name='name'
						label='Имя'
						required
						placeholder='Иван Иванов'
						variant={variant === 'light' ? 'dark' : 'light'}
					/>
					<PhoneNumberInput
						id={`${id}_phone`}
						name='phone'
						label='Телефон'
						required
						placeholder='+7 (999) 999-99-99'
						variant={variant === 'light' ? 'dark' : 'light'}
					/>
					<TextInput
						id={`${id}_email`}
						name='email'
						label='E-mail'
						placeholder='example@mail.com'
						variant={variant === 'light' ? 'dark' : 'light'}
					/>
					<TextareaInput
						id={`${id}_message`}
						name='message'
						label='Сообщение'
						placeholder='Ваше сообщение'
						variant={variant === 'light' ? 'dark' : 'light'}
					/>
					<p
						className={clsx(
							formTokens.variants[variant].description,
							'text-xs'
						)}
					>
						<span className='text-brand-accent'>*</span> — Обязательные поля
					</p>
				</section>
			</div>
			<div className='flex flex-col gap-3'>
				<section className='flex gap-2'>
					<Switch
						id={`${id}_consent`}
						name='consent'
						required
						label={
							<>
								Я согласен на обработку{' '}
								<a
									href='/include/licenses_detail.php'
									target='_blank'
									className={clsx(
										formTokens.variants[variant].consent,
										'underline'
									)}
								>
									персональных данных
								</a>
							</>
						}
						variant={variant === 'light' ? 'dark' : 'light'}
					/>
				</section>
				<footer>{button}</footer>
			</div>
		</form>
	);
}

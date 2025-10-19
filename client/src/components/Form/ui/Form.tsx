import { Button } from '@/components/ui/buttons';
import { Headline, IHeadlineProps } from '@/components/ui/Headline';
import { TextInput, PhoneNumberInput, Switch } from '@/components/ui/inputs';
import { formTokens } from '../base';
import clsx from 'clsx';

interface IFormProps {
	header?: React.ReactNode;
	footer?: React.ReactNode;
	variant?: 'light' | 'dark';
	headline?: IHeadlineProps;
	button?: React.ReactNode;
}

export function Form({
	variant = 'light',
	headline = {
		title: 'Вступить',
		variant: 'light',
		order: 4,
	},
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
			<div className='flex flex-col gap-4 md:gap-6'>
				<header>
					<Headline
						{...headline}
						variant={variant === 'light' ? 'dark' : 'light'}
					/>
				</header>
				<section className='flex flex-col gap-3'>
					<TextInput
						id='contactus_name'
						name='name'
						label='Имя'
						required
						placeholder='Иван Иванов'
						variant={variant === 'light' ? 'dark' : 'light'}
					/>
					<PhoneNumberInput
						id='contactus_phone'
						name='phone'
						label='Телефон'
						required
						placeholder='+7 (999) 999-99-99'
						variant={variant === 'light' ? 'dark' : 'light'}
					/>
					<TextInput
						id='contactus_email'
						name='email'
						label='E-mail'
						placeholder='example@mail.com'
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
						id='contactus_consent'
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

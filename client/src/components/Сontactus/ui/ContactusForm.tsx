import React from 'react';
import { Button } from '@/components/ui/buttons';
import { TextInput, PhoneNumberInput, Switch } from '@/components/ui/inputs';
import { Headline } from '@/components/ui/Headline';

export function ContactusForm() {
	return (
		<form className='flex flex-col gap-12'>
			<div className='flex flex-col gap-4 md:gap-6'>
				<header>
					<Headline
						title='Вступить'
						variant='light'
						order={4}
					/>
				</header>
				<section className='flex flex-col gap-3'>
					<TextInput
						id='contactus_name'
						name='name'
						label='Имя'
						required
						placeholder='Иван Иванов'
						variant='light'
					/>
					<PhoneNumberInput
						id='contactus_phone'
						name='phone'
						label='Телефон'
						required
						placeholder='+7 (999) 999-99-99'
						variant='light'
					/>
					<TextInput
						id='contactus_email'
						name='email'
						label='E-mail'
						placeholder='example@mail.com'
						variant='light'
					/>
					<p className='text-xs text-gray-500'>
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
									className=' text-white/80 underline'
								>
									персональных данных
								</a>
							</>
						}
						variant='light'
					/>
				</section>
				<footer>
					<Button
						variant='accent'
						size='lg'
						fullWidth
						type='submit'
						className='justify-center'
					>
						Сохранить
					</Button>
				</footer>
			</div>
		</form>
	);
}

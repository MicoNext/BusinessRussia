import { ICompanyInfo } from '../../../../package/types/models/companyInfo';
import { SocialMedia } from '../SocialMedia';
import { SOCIAL_MEDIA } from '@/shared/constants/socialMedia';

type PropsType = {
	companyInfo: ICompanyInfo
}

const currentYear = new Date().getFullYear();

export default function Footer() {
	return (
		<footer className='bg-brand-gray text-white/90 px-4 md:px-8 lg:px-12 py-10'>
			<section className='flex flex-col gap-4 container mx-auto'>
				<div className='flex flex-wrap gap-4 md:gap-24'>
					<div className='flex-1 flex flex-col justify-between gap-4 max-w-[340px]'>
						<p className='text-sm text-white/80'>
							Оплата происходит через ПАО СБЕРБАНК с использованием банковских
							карт следующих платежных систем: МИР, Visa, Mastercard.
						</p>
						<div className='flex flex-col gap-4'>
							<address className='not-italic'>

							<div>
								<a
									href={`mailto:test@email.ru`}
									className='text-sm hover:underline'
								>
									test@email.ru
								</a>
							</div>
									<div className='text-sm'>Тут будет адресс</div>
							</address>
							{SOCIAL_MEDIA && (
								<SocialMedia
									items={SOCIAL_MEDIA}
									className='text-[#08041a]'
								/>
							)}
						</div>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-16'>
						<nav>
							<h3 className='text-sm font-semibold mb-3'>Компания</h3>
							<ul className='space-y-1.5 text-sm'>
								<li>
									<a
										href='/organization/about/'
										className='hover:underline'
									>
										О «Деловой России»
									</a>
								</li>
								<li>
									<a
										href='/organization/team/'
										className='hover:underline'
									>
										Лица РО
									</a>
								</li>

								<li>
									<a
										href='/services/'
										className='hover:underline'
									>
										Возможности
									</a>
								</li>
								<li>
									<a
										href='/committees/'
										className='hover:underline'
									>
										Комитеты
									</a>
								</li>
								<li>
									<a
										href='/clubs/'
										className='hover:underline'
									>
										Клубы
									</a>
								</li>
								<li>
									<a
										href='/boards/'
										className='hover:underline'
									>
										Советы и рабочие группы
									</a>
								</li>
								<li>
									<a
										href='/organization/partners/'
										className='hover:underline'
									>
										Партнеры
									</a>
								</li>
								<li>
									<a
										href='/organization/docs/'
										className='hover:underline'
									>
										Документы
									</a>
								</li>
								<li>
									<a
										href='/organization/requisites/'
										className='hover:underline'
									>
										Реквизиты
									</a>
								</li>
							</ul>
						</nav>
						<nav>
							<h3 className='text-sm font-semibold mb-3'>Навигация</h3>
							<ul className='space-y-1.5 text-sm'>
								<li>
									<a
										href='/projects/'
										className='hover:underline'
									>
										Проекты
									</a>
								</li>
								<li>
									<a
										href='/news/'
										className='hover:underline'
									>
										Новости
									</a>
								</li>
								<li>
									<a
										href='/events/'
										className='hover:underline'
									>
										Мероприятия
									</a>
								</li>
								<li>
									<a
										href='/committees/'
										className='hover:underline'
									>
										Комитеты
									</a>
								</li>
								<li>
									<a
										href='/boards/'
										className='hover:underline'
									>
										Советы и рабочие группы
									</a>
								</li>
								<li>
									<a
										href='/contacts/'
										className='hover:underline'
									>
										Контакты
									</a>
								</li>
							</ul>
						</nav>
						<nav>
							<h3 className='text-sm font-semibold mb-3'>Другое</h3>
							<ul className='space-y-1.5 text-sm'>
								<li>
									<a
										href='/contacts/'
										className='hover:underline'
									>
										Контакты
									</a>
								</li>
							</ul>
						</nav>
					</div>
				</div>
			</section>

			<section>
				<div className='container mx-auto py-10 flex items-center justify-between text-xs text-white/60'>
					<span>© {currentYear} Деловая Россия — Карачаево-Черкессия</span>
					<span>Все права защищены</span>
				</div>
			</section>
		</footer>
	);
}

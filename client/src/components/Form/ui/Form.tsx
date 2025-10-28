'use client'
import { Button } from '@/components/ui/buttons'
import {
	TextInput,
	PhoneNumberInput,
	Switch,
	TextareaInput,
} from '@/components/ui/inputs'
import { formTokens } from '../base'
import clsx from 'clsx'
import { Headline } from '@/components/ui/Headline'
import React, { useState, useCallback } from 'react'
import adminApiService from '@/shared/api/admin.api.service'

interface IFormProps {
	id: string
	subject?: string
	header?: React.ReactNode
	footer?: React.ReactNode
	variant?: 'light' | 'dark'
	button?: React.ReactNode
	onSuccess?: () => void
	onError?: (error: string) => void
}

interface FormData {
	name: string
	phone: string
	email: string
	message: string
	consent: boolean
}

interface FormErrors {
	name: string
	phone: string
	email: string
	consent: string
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
	button,
	onSuccess,
	onError,
}: IFormProps) {
	const [loading, setLoading] = useState(false)
	const [formData, setFormData] = useState<FormData>({
		name: '',
		phone: '',
		email: '',
		message: '',
		consent: false
	})
	const [fieldErrors, setFieldErrors] = useState<FormErrors>({
		name: '',
		phone: '',
		email: '',
		consent: ''
	})
	const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({})
	const [showAllErrors, setShowAllErrors] = useState(false)

	const validateField = useCallback((name: keyof FormErrors, value: string | boolean): string => {
		if (name === 'name') {
			if (!value || (typeof value === 'string' && value.trim().length < 2)) {
				return 'Имя должно содержать минимум 2 символа'
			}
		}

		if (name === 'phone') {
			if (!value || (typeof value === 'string' && !value.trim())) {
				return 'Телефон обязателен для заполнения'
			}
			if (typeof value === 'string') {
				const digitCount = (value.match(/\d/g) || []).length
				if (digitCount < 10) {
					return 'Номер телефона должен содержать минимум 11 цифр'
				}
			}
		}

		if (name === 'email' && value && typeof value === 'string') {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
			if (value.trim() && !emailRegex.test(value)) {
				return 'Введите корректный email адрес'
			}
		}

		if (name === 'consent' && !value) {
			return 'Необходимо согласие на обработку персональных данных'
		}

		return ''
	}, [])

	const validateAllFields = useCallback((): { errors: FormErrors; hasErrors: boolean } => {
		const errors: FormErrors = {
			name: validateField('name', formData.name),
			phone: validateField('phone', formData.phone),
			email: validateField('email', formData.email),
			consent: validateField('consent', formData.consent)
		}

		const hasErrors = Object.values(errors).some(error => error !== '')
		return { errors, hasErrors }
	}, [formData, validateField])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		// Показываем все ошибки при отправке
		setShowAllErrors(true)
		const { errors, hasErrors } = validateAllFields()
		setFieldErrors(errors)

		if (hasErrors) {
			onError?.('Пожалуйста, исправьте ошибки в форме')
			return
		}

		try {
			setLoading(true)

			const leadData = {
				name: formData.name.trim(),
				phone: formData.phone.trim(),
				email: formData.email.trim() || undefined,
				comment: formData.message.trim() || undefined,
				createdAt: new Date()
			}

			const result = await adminApiService.callApiBody({
				path: '/api/lead',
				method: 'post',
				body: { data: leadData }
			})

			if (result?.data) {
				setFormData({
					name: '',
					phone: '',
					email: '',
					message: '',
					consent: false
				})
				setFieldErrors({
					name: '',
					phone: '',
					email: '',
					consent: ''
				})
				setTouchedFields({})
				setShowAllErrors(false)
				onSuccess?.()
			} else {
				throw new Error('Ошибка при создании заявки')
			}

		} catch (error) {
			console.error('Ошибка отправки формы:', error)
			onError?.('Произошла ошибка при отправке формы. Попробуйте еще раз.')
		} finally {
			setLoading(false)
		}
	}

	const handleInputChange = (field: keyof FormData) => (value: string | boolean) => {
		setFormData(prev => ({
			...prev,
			[field]: value
		}))

		// Помечаем поле как "тронутое"
		setTouchedFields(prev => ({
			...prev,
			[field]: true
		}))

		// Валидируем поле в реальном времени только если оно было тронуто или показываются все ошибки
		if (touchedFields[field] || showAllErrors) {
			const error = validateField(field as keyof FormErrors, value)
			setFieldErrors(prev => ({
				...prev,
				[field]: error
			}))
		}
	}

	// Создаем отдельные обработчики blur для каждого поля
	const createBlurHandler = (field: keyof FormData) => () => {
		setTouchedFields(prev => ({ ...prev, [field]: true }))
		
		// Валидируем поле при blur
		const error = validateField(field as keyof FormErrors, formData[field])
		setFieldErrors(prev => ({
			...prev,
			[field]: error
		}))
	}

	// Функция для проверки, нужно ли показывать ошибку
	const shouldShowError = (field: keyof FormErrors): boolean => {
		return (touchedFields[field] || showAllErrors) && !!fieldErrors[field]
	}

	// Получаем классы для инпутов с ошибками
	const getInputClasses = (field: keyof FormErrors, additionalClasses: string = '') => {
		const hasError = shouldShowError(field)
		const baseClasses = variant === 'light' ? 'border-gray-300' : 'border-gray-600'
		const errorClasses = 'border-red-500 focus:border-red-500 focus:ring-red-500'
		
		return clsx(
			baseClasses,
			hasError && errorClasses,
			additionalClasses
		)
	}

	// Получаем классы для свитча с ошибками
	const getSwitchClasses = (field: keyof FormErrors) => {
		const hasError = shouldShowError(field)
		return hasError ? 'text-red-500' : ''
	}

	// Проверка валидности формы для кнопки
	const isFormValid = formData.name.trim().length >= 2 &&
		formData.phone.trim().length > 0 &&
		(formData.phone.match(/\d/g) || []).length >= 10 &&
		formData.consent

	// Рендер кнопки с индикацией загрузки
	const renderButton = () => {
		const buttonContent = loading ? (
			<>
				<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
				Отправка...
			</>
		) : (
			'Отправить заявку'
		)

		if (button) {
			return button
		}

		return (
			<Button
				variant='primary'
				size='lg'
				fullWidth
				type='submit'
				className='justify-center'
				disabled={loading || !isFormValid}
			>
				{buttonContent}
			</Button>
		)
	}

	// Высота для сообщений об ошибках (фиксированная, чтобы избежать прыжков)
	const errorMessageHeight = '1.25rem' // 20px

	return (
		<form
			className={clsx(
				formTokens.variants[variant].container,
				'flex flex-col gap-12'
			)}
			onSubmit={handleSubmit}
		>
			<input
				type='hidden'
				name='subject'
				value={subject}
			/>

			<div className='flex flex-col gap-4 md:gap-6'>
				<div className='flex gap-2 justify-between items-center'>{header}</div>

				<section className='flex flex-col gap-3'>
					{/* Имя */}
					<div className="min-h-[5.5rem]"> {/* Фиксированная высота для поля с ошибкой */}
						<TextInput
							id={`${id}_name`}
							name='name'
							label='Имя'
							required
							placeholder='Иван Иванов'
							variant={variant === 'light' ? 'dark' : 'light'}
							value={formData.name}
							onChange={(e) => handleInputChange('name')(e.target.value)}
							onBlur={createBlurHandler('name')}
							disabled={loading}
							className={getInputClasses('name')}
						/>
						<div 
							className="transition-all duration-200 ease-in-out overflow-hidden"
							style={{ 
								height: shouldShowError('name') ? errorMessageHeight : '0.5rem',
								opacity: shouldShowError('name') ? 1 : 0
							}}
						>
							{shouldShowError('name') && (
								<p className="text-red-500 text-xs mt-1">{fieldErrors.name}</p>
							)}
						</div>
					</div>

					{/* Телефон */}
					<div className="min-h-[5.5rem]">
						<PhoneNumberInput
							id={`${id}_phone`}
							name='phone'
							label='Телефон'
							required
							placeholder='+7 (999) 999-99-99'
							variant={variant === 'light' ? 'dark' : 'light'}
							value={formData.phone}
							onChange={(e) => handleInputChange('phone')(e.target.value)}
							onBlur={createBlurHandler('phone')}
							disabled={loading}
							className={getInputClasses('phone')}
						/>
						<div 
							className="transition-all duration-200 ease-in-out overflow-hidden"
							style={{ 
								height: shouldShowError('phone') ? errorMessageHeight : '0.5rem',
								opacity: shouldShowError('phone') ? 1 : 0
							}}
						>
							{shouldShowError('phone') && (
								<p className="text-red-500 text-xs mt-1">{fieldErrors.phone}</p>
							)}
						</div>
					</div>

					{/* Email */}
					<div className="min-h-[5.5rem]">
						<TextInput
							id={`${id}_email`}
							name='email'
							label='E-mail'
							placeholder='example@mail.com'
							variant={variant === 'light' ? 'dark' : 'light'}
							value={formData.email}
							onChange={(e) => handleInputChange('email')(e.target.value)}
							onBlur={createBlurHandler('email')}
							disabled={loading}
							className={getInputClasses('email')}
						/>
						<div 
							className="transition-all duration-200 ease-in-out overflow-hidden"
							style={{ 
								height: shouldShowError('email') ? errorMessageHeight : '0.5rem',
								opacity: shouldShowError('email') ? 1 : 0
							}}
						>
							{shouldShowError('email') && (
								<p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>
							)}
						</div>
					</div>

					{/* Сообщение */}
					<div>
						<TextareaInput
							id={`${id}_message`}
							name='message'
							label='Сообщение'
							placeholder='Ваше сообщение'
							variant={variant === 'light' ? 'dark' : 'light'}
							value={formData.message}
							onChange={(e) => handleInputChange('message')(e.target.value)}
							onBlur={createBlurHandler('message')}
							disabled={loading}
						/>
					</div>
				</section>
			</div>

			<div className='flex flex-col gap-3'>
				<section className="min-h-[3.5rem]">
					<div className='flex gap-2'>
						<Switch
							id={`${id}_consent`}
							name='consent'
							required
							checked={formData.consent}
							onChange={(e) => handleInputChange('consent')(e.target.checked)}
							onBlur={createBlurHandler('consent')}
							label={
								<span className={getSwitchClasses('consent')}>
								  	<i style={{ color: "red" }}>*</i> Я согласен на обработку{' '}
									<a
										href='/privacy-policy'
										target='_blank'
										className={clsx(
											formTokens.variants[variant].consent,
											'underline'
										)}
									>
										персональных данных
									</a>
								</span>
							}
							variant={variant === 'light' ? 'dark' : 'light'}
							disabled={loading}
						/>
					</div>
					<div 
						className="transition-all duration-200 ease-in-out overflow-hidden"
						style={{ 
							height: shouldShowError('consent') ? errorMessageHeight : '0.5rem',
							opacity: shouldShowError('consent') ? 1 : 0
						}}
					>
						{shouldShowError('consent') && (
							<p className="text-red-500 text-xs mt-1">{fieldErrors.consent}</p>
						)}
					</div>
				</section>

				<footer>
					{renderButton()}
				</footer>
			</div>
		</form>
	)
}
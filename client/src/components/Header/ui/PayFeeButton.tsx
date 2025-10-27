import { LinkButton } from '@/components/ui/buttons';

function PayFeeButton({ className }: { className?: string }) {
	return (
		<LinkButton
			href='#pay'
			variant='accent'
			size='md'
			className={className}
		>
			Оплатить взнос
		</LinkButton>
	);
}

export default PayFeeButton;

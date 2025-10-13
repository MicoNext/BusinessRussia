import { LinkButton } from '@/components/ui/buttons';

function PayFeeButton() {
	return (
		<LinkButton
			href='#pay'
			variant='accent'
			size='md'
		>
			Оплатить взнос
		</LinkButton>
	);
}

export default PayFeeButton;

'use client';

import Modal from '@/components/ui/Modal';
import { YMapWidget } from './YMapWidget';

interface YMapModalProps {
	apiKey: string;
	trigger: React.ReactNode;
	center?: [number, number];
	zoom?: number;
	width?: string | number;
	height?: string | number;
}

export function YMapModal({
	apiKey,
	trigger,
	center,
	zoom,
	width,
	height,
}: YMapModalProps) {
	return (
		<Modal initialOpen={false}>
			<Modal.Trigger asChild>{trigger}</Modal.Trigger>
			<Modal.Portal>
				<Modal.Content className='w-full max-w-3xl p-0'>
					<YMapWidget
						apiKey={apiKey}
						center={center}
						zoom={zoom}
						width={width ?? '100%'}
						height={height ?? 420}
					/>
				</Modal.Content>
			</Modal.Portal>
		</Modal>
	);
}

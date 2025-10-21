'use client';

import clsx from 'clsx';
import type { CSSProperties, ReactNode } from 'react';
import { useYMapReactify } from '@/components/YMap/lib/hooks';

interface YMapProps {
	apiKey: string;
	lang?: 'ru_RU' | 'en_US';
	center?: [number, number];
	zoom?: number;
	width?: string | number;
	height?: string | number;
	className?: string;
	children?: ReactNode; // optional markers/controls as render-prop alternative
}

export function YMapWidget({
	apiKey,
	lang = 'ru_RU',
	center = [37.618423, 55.751244],
	zoom = 10,
	width = '100%',
	height = 360,
	className,
	children,
}: YMapProps) {
	const { components, error } = useYMapReactify(apiKey, lang);
	if (error) return null;
	if (!components) return null;

	const {
		YMap,
		YMapDefaultSchemeLayer,
		YMapDefaultFeaturesLayer,
		YMapControls,
		YMapZoomControl,
	} = components;

	const style: CSSProperties = {
		width: typeof width === 'number' ? `${width}px` : width,
		height: typeof height === 'number' ? `${height}px` : height,
	};

	return (
		<div
			className={clsx('relative', className)}
			style={style}
		>
			<YMap
				location={{ center, zoom }}
				mode='vector'
			>
				<YMapDefaultSchemeLayer />
				<YMapDefaultFeaturesLayer />
				<YMapControls position='right'>
					<YMapZoomControl />
				</YMapControls>
				{children}
			</YMap>
		</div>
	);
}

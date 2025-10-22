'use client';

import clsx from 'clsx';
import type { CSSProperties, ReactNode } from 'react';
import { useYMapReactify } from '@/components/YMap/lib/hooks';
import { Marker } from '@/components/YMap/ui/Marker';
import { companyInfoMock } from '@/shared/data/companyInfo.mock';

const MAP_API_KEY = '7dd76431-0f47-4a79-9a5a-3f42c319bacb';

interface YMapProps {
	width?: string | number;
	height?: string | number;
	className?: string;
}

export function YMapWidget({
	width = '100%',
	height = 360,
	className,
}: YMapProps) {
	const { components, error } = useYMapReactify(MAP_API_KEY, 'ru_RU');
	const { map } = companyInfoMock;
	if (!map) return null;

	if (error) return null;
	if (!components) return null;

	const {
		YMap,
		YMapDefaultSchemeLayer,
		YMapDefaultFeaturesLayer,
		YMapControls,
		YMapZoomControl,
		YMapMarker,
	} = components!;

	const style: CSSProperties = {
		width: typeof width === 'number' ? `${width}px` : width,
		height: typeof height === 'number' ? `${height}px` : height,
	};

	const normalizedCenter: [number, number] = [map.center[1], map.center[0]];

	return (
		<div
			className={clsx('relative', className)}
			style={style}
		>
			<YMap
				location={{ center: normalizedCenter, zoom: map.zoom }}
				mode='vector'
			>
				<YMapDefaultSchemeLayer />
				<YMapDefaultFeaturesLayer />
				{YMapControls && YMapZoomControl ? (
					<YMapControls position='right'>
						<YMapZoomControl />
					</YMapControls>
				) : null}

				{YMapMarker ? (
					<YMapMarker
						coordinates={[map?.center?.[1] ?? 0, map?.center?.[0] ?? 0]}
					>
						<div className='-translate-x-1/2 -translate-y-full'>
							<Marker color={'#dc2626'} />
						</div>
					</YMapMarker>
				) : null}
			</YMap>
		</div>
	);
}

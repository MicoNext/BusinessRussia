'use client';

import { FC } from 'react';
import {
	YMap,
	YMapDefaultSchemeLayer,
	YMapDefaultFeaturesLayer,
	YMapComponentsProvider,
	YMapMarker,
} from 'ymap3-components';
import { Marker } from '@/components/YMap/ui/Marker';
import { getMapOptions } from '@/components/YMap/lib/helpers';
import { IMapOptionsReturn } from '@/shared/types/ymap';
import config from '@/shared/config/config';

interface YMapWidgetProps {}

export const YMapWidget: FC<YMapWidgetProps> = ({}) => {
	const mapOptions = config.ymap;
	if (!mapOptions) return;

	const formattedMapOptions: IMapOptionsReturn | false =
		getMapOptions(mapOptions);

	if (!formattedMapOptions) return;

	return (
		<YMapComponentsProvider apiKey={mapOptions.ymapApiKey}>
			<YMap location={formattedMapOptions.mapOptions}>
				<YMapDefaultSchemeLayer />
				<YMapDefaultFeaturesLayer />
				<YMapMarker coordinates={formattedMapOptions.coordinates}>
					<Marker color='#2b7de0' />
				</YMapMarker>
			</YMap>
		</YMapComponentsProvider>
	);
};

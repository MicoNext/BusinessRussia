'use client';

import { useEffect, useState } from 'react';
import { loadYMaps3 } from '@/components/YMap/api';
import React from 'react';
import ReactDOM from 'react-dom';

type Reactified = {
	YMap: React.ComponentType<unknown>;
	YMapDefaultSchemeLayer: React.ComponentType<unknown>;
	YMapDefaultFeaturesLayer: React.ComponentType<unknown>;
	YMapControls: React.ComponentType<unknown>;
	YMapZoomControl: React.ComponentType<unknown>;
	YMapMarker: React.ComponentType<unknown>;
};

export function useYMapReactify(
	apiKey: string,
	lang: 'ru_RU' | 'en_US' = 'ru_RU'
) {
	const [components, setComponents] = useState<Reactified | null>(null);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		let mounted = true;
		(async () => {
			try {
				await loadYMaps3({ apiKey, lang });
				const [ymaps3React] = await Promise.all([
					window.ymaps3.import('@yandex/ymaps3-reactify'),
					window.ymaps3.ready,
				]);
				const reactify = ymaps3React.reactify.bindTo(React, ReactDOM);
				// Core map components
				const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer } =
					reactify.module(window.ymaps3);

				// Controls module (zoom control, etc.)
				const controlsModule = await window.ymaps3.import(
					'@yandex/ymaps3-controls@0.0.1'
				);
				const { YMapControls, YMapZoomControl } =
					reactify.module(controlsModule);

				// Markers module
				const markersModule = await window.ymaps3.import(
					'@yandex/ymaps3-markers@0.0.1'
				);
				const { YMapMarker } = reactify.module(markersModule);
				if (mounted) {
					setComponents({
						YMap,
						YMapDefaultSchemeLayer,
						YMapDefaultFeaturesLayer,
						YMapControls,
						YMapZoomControl,
						YMapMarker,
					});
				}
			} catch (e: any) {
				if (mounted) setError(e);
			}
		})();
		return () => {
			mounted = false;
		};
	}, [apiKey, lang]);

	return { components, error } as const;
}

'use client';

import { useEffect, useState } from 'react';
import { loadYMaps3 } from '@/components/YMap/api';
import React from 'react';
import ReactDOM from 'react-dom';

type Reactified = {
	YMap: React.ComponentType<any>;
	YMapDefaultSchemeLayer: React.ComponentType<any>;
	YMapDefaultFeaturesLayer: React.ComponentType<any>;
	YMapControls?: React.ComponentType<any>;
	YMapZoomControl?: React.ComponentType<any>;
	YMapMarker?: React.ComponentType<any>;
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
				const core = reactify.module(window.ymaps3);
				const {
					YMap,
					YMapDefaultSchemeLayer,
					YMapDefaultFeaturesLayer,
					YMapControls: CoreYMapControls,
				} = core as any;

				let YMapControls = CoreYMapControls as
					| React.ComponentType<unknown>
					| undefined;
				let YMapZoomControl: React.ComponentType<unknown> | undefined;
				let YMapMarker: React.ComponentType<unknown> | undefined;

				try {
					const controlsModule = await window.ymaps3.import(
						'@yandex/ymaps3-controls'
					);
					const reactifiedControls = reactify.module(controlsModule) as any;
					YMapControls = reactifiedControls.YMapControls ?? YMapControls;
					YMapZoomControl =
						reactifiedControls.YMapZoomControl ?? YMapZoomControl;
				} catch {}

				try {
					const markersModule = await window.ymaps3.import(
						'@yandex/ymaps3-markers'
					);
					const reactifiedMarkers = reactify.module(markersModule) as any;
					YMapMarker = reactifiedMarkers.YMapMarker ?? YMapMarker;
				} catch {}

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

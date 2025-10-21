'use client';

import { useEffect, useState } from 'react';
import { loadYMaps3 } from '@/components/YMap/api';

type Reactified = {
	YMap: any;
	YMapDefaultSchemeLayer: any;
	YMapDefaultFeaturesLayer: any;
	YMapControls: any;
	YMapZoomControl: any;
	YMapMarker: any;
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
				const ymaps3 = await loadYMaps3({ apiKey, lang });
				// @ts-ignore
				const reactify = await ymaps3.import('@yandex/ymaps3-reactify');
				// eslint-disable-next-line @typescript-eslint/no-var-requires
				const { default: ReactDOM } = await import('react-dom');
				const {
					YMap,
					YMapDefaultSchemeLayer,
					YMapDefaultFeaturesLayer,
					YMapControls,
					YMapZoomControl,
					YMapMarker,
				} = reactify.reactify(require('react'), ReactDOM);
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

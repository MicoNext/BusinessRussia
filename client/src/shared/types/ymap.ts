import { LngLat, YMapLocationRequest } from '@yandex/ymaps3-types';

export interface IMapOptions {
	ymapApiKey: string;
	centerCoordinates: string;
	zoomDefault: number;
	duration?: number;
	easing?: string;
}

export interface IMapOptionsReturn {
	mapOptions: YMapLocationRequest;
	coordinates: LngLat;
}

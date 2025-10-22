import { IMapOptions, IMapOptionsReturn } from '@/shared/types/ymap';

export const getMapOptions = (
	mapOptions: IMapOptions
): IMapOptionsReturn | false => {
	if (!mapOptions) return false;

	if (!mapOptions.centerCoordinates) return false;

	const coordinates = mapOptions.centerCoordinates
		.split(',')
		.map(Number)
		.reverse();

	if (coordinates.length !== 2) return false;

	if (isNaN(coordinates[0]) || isNaN(coordinates[1])) return false;

	return {
		mapOptions: {
			center: [coordinates[0], coordinates[1]],
			zoom: mapOptions.zoomDefault || 15,
			duration: 200,
			easing: 'ease-in-out',
		},
		coordinates: [coordinates[0], coordinates[1]],
	};
};

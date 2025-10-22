let ymapsPromise: Promise<typeof window.ymaps3> | null = null;

type LoadParams = {
	apiKey: string;
	lang?: 'ru_RU' | 'en_US';
};

export function loadYMaps3({ apiKey, lang = 'ru_RU' }: LoadParams) {
	if (typeof window === 'undefined')
		return Promise.reject(new Error('No window'));
	if (window.ymaps3) return Promise.resolve(window.ymaps3);
	if (ymapsPromise) return ymapsPromise;

	ymapsPromise = new Promise((resolve, reject) => {
		const script = document.createElement('script');
		script.src = `https://api-maps.yandex.ru/v3/?apikey=${encodeURIComponent(
			apiKey
		)}&lang=${lang}`;
		script.async = true;
		script.onload = () => {
			if (window.ymaps3) {
				resolve(window.ymaps3);
			} else {
				reject(new Error('ymaps3 is not available after script load'));
			}
		};
		script.onerror = () => reject(new Error('Failed to load Yandex Maps'));
		document.head.appendChild(script);
	});

	return ymapsPromise;
}

declare global {
	interface Window {
		ymaps3: any;
	}
}

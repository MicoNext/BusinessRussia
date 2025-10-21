// Lazy one-time loader for Yandex Maps v3 script
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
		script.onload = async () => {
			try {
				// @ts-ignore
				await ymaps3.ready;
				// @ts-ignore
				resolve(ymaps3);
			} catch (e) {
				reject(e);
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

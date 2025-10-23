export interface ICompanyInfo {
	address?: string;
	phone?: string;
	email?: string;
	socialMedia?: ISocialMedia[];
	workingHours?: string; // html content
	map?: {
		ymapApiKey: string;
		centerCoordinates: string;
		zoomDefault: number;
	};
	logo?: {
		imageUrl: string;
		alt: string;
	};
}

interface ISocialMedia {
	iconName: 'vk' | 'telegram' | 'youtube' | 'rutube' | 'whatsapp';
	href: string;
	title?: string;
}

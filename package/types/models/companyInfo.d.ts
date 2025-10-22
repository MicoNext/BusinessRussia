export interface ICompanyInfo {
	address?: string;
	phone?: string;
	email?: string;
	socialMedia?: ISocialMedia[];
	workingHours?: string; // html content
	map?: {
		center: [number, number];
		zoom: number;
		address?: string;
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

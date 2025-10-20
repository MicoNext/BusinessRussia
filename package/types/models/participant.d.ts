export interface IParticipant {
    _id: string
    createdAt: Date
    name: string
    jobTitle: string
    organization?: string
	media: {
		imagesUrl: string[];
		videoUrl: string[];
	};
    html: string
    role: "manager" | "boardMember" | "invited"
}

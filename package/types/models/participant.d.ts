export interface IParticipant {
    _id: string
    createdAt: Date
    name: string
    jobTitle: string
    organization?: string
    imgUrl: string
    html: string
    role: "manager" | "boardMember" | "invited"
}

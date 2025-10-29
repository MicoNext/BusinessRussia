import { ICommittee } from "../../../../package/types/models/committee"
import { ICompanyInfo } from "../../../../package/types/models/companyInfo"
import { IEvent } from "../../../../package/types/models/events"
import { INews } from "../../../../package/types/models/news"
import { IProject } from "../../../../package/types/models/projects"
import { ISliderMain } from "../../../../package/types/models/sliderMain"
import config from "../config/config"

class SSGApiService {
    public async getCompanyInfo(): Promise<ICompanyInfo> {
        const res = await fetch(`${config.ServerUrl}/api/company-info`, { cache: 'force-cache' })
        if (!res.ok) return { about: {} }
        const response = await res.json()
        return response.data || { about: {} }
    }

    public async getSliderMain(): Promise<ISliderMain[]> {
        const res = await fetch(`${config.ServerUrl}/api/slider-main`, { cache: 'force-cache' })
        if (!res.ok) return []
        const response = await res.json()
        return response.data || []
    }

    public async getNews(page: number, limit: number, id?:string): Promise<INews[]> {
        const res = await fetch(`${config.ServerUrl}/api/news${id ? `/${id}` : ""}?page=${page}&limit=${limit}?page=1&limit=6`, { cache: 'force-cache' })
        if (!res.ok) return []
        const response = await res.json()
        return response.data || []
    }

    public async getProjects(page: number, limit: number, id?: string): Promise<IProject[]> {
        const res = await fetch(`${config.ServerUrl}/api/project${id ? `/${id}` : ""}?page=${page}&limit=${limit}?page=1&limit=4`, { cache: 'force-cache' })
        if (!res.ok) return []
        const response = await res.json()
        return response.data || []
    }

    public async getEvents(page: number, limit: number, id?: string): Promise<IEvent[]> {
        const res = await fetch(`${config.ServerUrl}/api/event${id ? `/${id}` : ""}?page=${page}&limit=${limit}?page=1&limit=6`, { cache: 'force-cache' })
        if (!res.ok) return []
        const response = await res.json()
        return response.data || []
    }

    public async getCommittees(page: number, limit: number, id?: string): Promise<ICommittee[]> {
        const res = await fetch(`${config.ServerUrl}/api/committee${id ? `/${id}` : ""}?page=${page}&limit=${limit}`, { cache: 'force-cache' });
        if (!res.ok) return [];
        const response = await res.json();
        return response.data || [];
    }

    public async getParticipants(page: number, limit: number, id?: string) {
  const res = await fetch(`${config.ServerUrl}/api/participant${id ? `/${id}` : ""}?page=${page}&limit=${limit}`, { cache: 'force-cache' })
  if (!res.ok) return null
  const response = await res.json()
  return response.data || null
}
}

export default new SSGApiService()

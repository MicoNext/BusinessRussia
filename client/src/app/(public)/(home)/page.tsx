import { IEvent } from '../../../../../package/types/models/events'
import { INews } from '../../../../../package/types/models/news'
import { IProject } from '../../../../../package/types/models/projects'
import { ISliderMain } from '../../../../../package/types/models/sliderMain'
import { EventsSection } from './_sections/EventsSection'
import HeroSection from './_sections/HeroSection'
import { NewsSection } from './_sections/NewsSection'
import { ProjectsSection } from './_sections/ProjectsSection'
import { Сontactus } from '@/components/Сontactus'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ICompanyInfo } from '../../../../../package/types/models/companyInfo'
import config from '@/shared/config/config'

async function getCompanyInfo(): Promise<ICompanyInfo> {
  const res = await fetch(`${config.ServerUrl}/api/company-info`, { cache: 'force-cache' })
  if (!res.ok) return { about: {} }
  const response = await res.json()
  return response.data || { about: {} }
}

async function getSliderMain(): Promise<ISliderMain[]> {
  const res = await fetch(`${config.ServerUrl}/api/slider-main`, { cache: 'force-cache' })
  if (!res.ok) return []
  const response = await res.json()
  return response.data || []
}

async function getNews(): Promise<INews[]> {
  const res = await fetch(`${config.ServerUrl}/api/news?page=1&limit=6`, { cache: 'force-cache' })
  if (!res.ok) return []
  const response = await res.json()
  return response.data || []
}

async function getProjects(): Promise<IProject[]> {
  const res = await fetch(`${config.ServerUrl}/api/project?page=1&limit=4`, { cache: 'force-cache' })
  if (!res.ok) return []
  const response = await res.json()
  return response.data || []
}

async function getEvents(): Promise<IEvent[]> {
  const res = await fetch(`${config.ServerUrl}/api/event?page=1&limit=6`, { cache: 'force-cache' })
  if (!res.ok) return []
  const response = await res.json()
  return response.data || []
}

export default async function HomePage() {
  const [companyInfo, sliderMain, news, projects, events] = await Promise.all([
    getCompanyInfo(),
    getSliderMain(),
    getNews(),
    getProjects(),
    getEvents(),
  ])

  return <>
    <Header companyInfo={companyInfo} />
    <main className='text-gray-900 flex flex-col gap-8 md:gap-14 lg:gap-16 xl:gap-20 flex-1 relative overflow-hidden'>
      <HeroSection sliderMain={sliderMain} />
      <NewsSection news={news} />
      <ProjectsSection projects={projects} />
      <EventsSection events={events} />
      <Сontactus companyInfo={companyInfo} />
    </main>
    <Footer companyInfo={companyInfo} />
  </>
}
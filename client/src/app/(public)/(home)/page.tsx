import { IEvent } from '../../../../../package/types/models/events';
import { INews } from '../../../../../package/types/models/news';
import { IProject } from '../../../../../package/types/models/projects';
import { ISliderMain } from '../../../../../package/types/models/sliderMain';
import { EventsSection } from './_sections/EventsSection';
import HeroSection from './_sections/HeroSection';
import { NewsSection } from './_sections/NewsSection';
import { ProjectsSection } from './_sections/ProjectsSection';
import { Сontactus } from '@/components/Сontactus';
import axios from 'axios';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ICompanyInfo } from '../../../../../package/types/models/companyInfo';
import { MaxIcon } from '@/components/ui/socialIcons';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:6969',
});

async function getCompanyInfo(): Promise<ICompanyInfo> {
  try {
    const response = await api.get('/api/company-info');
    return response.data.data || [];
  } catch (error) {
    return { about: {} }
  }
}

async function getSliderMain(): Promise<ISliderMain[]> {
  try {
    const response = await api.get('/api/slider-main');
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching slider main:', error);
    return [];
  }
}

async function getNews(): Promise<INews[]> {
  try {
    const response = await api.get('/api/news?page=1&limit=6');
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

async function getProjects(): Promise<IProject[]> {
  try {
    const response = await api.get('/api/project?page=1&limit=4');
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

async function getEvents(): Promise<IEvent[]> {
  try {
    const response = await api.get('/api/event?page=1&limit=6');
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

export default async function HomePage() {
  try {
    const [companyInfo, sliderMain, news, projects, events] = await Promise.all([
      getCompanyInfo(),
      getSliderMain(),
      getNews(),
      getProjects(),
      getEvents(),
    ]);

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
  } catch (error) {
    return <>
      <Header companyInfo={{ about: {} }} />
      <main className='text-gray-900 flex flex-col gap-8 md:gap-14 lg:gap-16 xl:gap-20 flex-1 relative overflow-hidden'>
        <HeroSection sliderMain={[]} />
        <NewsSection news={[]} />
        <ProjectsSection projects={[]} />
        <EventsSection events={[]} />
        <Сontactus companyInfo={ { about: {} } } />
      </main>
      <Footer companyInfo={{ about: {} }} />
    </>
  }
}
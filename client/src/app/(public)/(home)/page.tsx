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

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:6969',
});

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
    const response = await api.get('/api/news');
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

async function getProjects(): Promise<IProject[]> {
  try {
    const response = await api.get('/api/project');
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

async function getEvents(): Promise<IEvent[]> {
  try {
    const response = await api.get('/api/event');
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

export default async function HomePage() {
  try {
    const [sliderMain, news, projects, events] = await Promise.all([
      getSliderMain(),
      getNews(),
      getProjects(),
      getEvents(),
    ]);

    return <>
      <main className='text-gray-900 flex flex-col gap-8 md:gap-14 lg:gap-16 xl:gap-20 flex-1 relative overflow-hidden'>
        <HeroSection sliderMain={sliderMain} />
        <NewsSection news={news} />
        <ProjectsSection projects={projects} />
        <EventsSection events={events} />
        <Сontactus />
      </main>
    </>
  } catch (error) {
    return <>
      <main className='text-gray-900 flex flex-col gap-8 md:gap-14 lg:gap-16 xl:gap-20 flex-1 relative overflow-hidden'>
        <HeroSection sliderMain={[]} />
        <NewsSection news={[]} />
        <ProjectsSection projects={[]} />
        <EventsSection events={[]} />
        <Сontactus />		
      </main>
    </>
  }
}
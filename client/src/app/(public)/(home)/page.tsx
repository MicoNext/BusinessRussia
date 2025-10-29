import { EventsSection } from './_sections/EventsSection'
import HeroSection from './_sections/HeroSection'
import { NewsSection } from './_sections/NewsSection'
import { ProjectsSection } from './_sections/ProjectsSection'
import { Сontactus } from '@/components/Сontactus'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ssgApiService from '@/shared/api/ssg.api.service'

export default async function HomePage() {
  const [companyInfo, sliderMain, news, projects, events] = await Promise.all([
    ssgApiService.getCompanyInfo(),
    ssgApiService.getSliderMain(),
    ssgApiService.getNews(1, 6),
    ssgApiService.getProjects(1, 4),
    ssgApiService.getEvents(1, 6),
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

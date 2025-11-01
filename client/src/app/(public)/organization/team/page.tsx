import { Grid } from '@/components/ui/Grid/Grid'
import { Card } from '@/components/ui/Card/Card'
import { Headline } from '@/components/ui/Headline'
import ssgApiService from '@/shared/api/ssg.api.service'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const revalidate = 1690

async function getAllParticipants() {
  try {
    const participants = await ssgApiService.getParticipants(1, 10000)
    return participants
  } catch (error) {
    console.error('Failed to fetch participants:', error)
    return []
  }
}

export async function generateMetadata() {
  return {
    title: 'Лица регионального отделения',
    description: 'Команда и участники регионального отделения «Деловой России»',
    openGraph: {
      title: 'Лица регионального отделения',
      description: 'Команда и участники регионального отделения «Деловой России»',
    },
  }
}

const getRoleLabel = (role: string) => {
  switch (role) {
    case 'manager':
      return 'Руководитель'
    case 'boardMember':
      return 'Член совета'
    case 'invited':
      return 'Приглашенный'
    default:
      return 'Участник'
  }
}

export default async function TeamPage() {
  const [participants, companyInfo] = await Promise.all([
    getAllParticipants(),
    ssgApiService.getCompanyInfo()
  ])

  return (
    <>
      <Header companyInfo={companyInfo} />
      <section className='flex-1 px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6'>
        <div className='container mx-auto max-w-7xl'>
          <section className="px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
            <div className="container mx-auto">
              <Breadcrumbs className="mb-4 sm:mb-6" />
              <main>
                <Headline
                  title={'Лица регионального отделения'}
                  order={1}
                  classNames={{ 
                    container: 'mb-4 sm:mb-6',
                    title: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl'
                  }}
                />
                <div className='space-y-3 sm:space-y-4 md:space-y-6'>
                  {participants.length === 0 ? (
                    <div className="text-center py-8 sm:py-12">
                      <p className="text-gray-500 text-sm sm:text-base">Нет данных для отображения</p>
                    </div>
                  ) : (
                    <Grid
                      cols={1}
                      classNames={{ 
                        root: 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6'
                      }}
                    >
                      {participants.map(item => {
                        const roleLabel = getRoleLabel(item.role)
                        
                        const subtitleParts = []
                        
                        if (item.jobTitle) {
                          subtitleParts.push(item.jobTitle)
                        }
                        
                        if (item.organization) {
                          subtitleParts.push(item.organization)
                        }
                        
                        subtitleParts.push(roleLabel)
                        
                        const subtitle = subtitleParts.join(' • ')

                        return (
                          <Grid.Col key={item._id} className="w-full">
                            <div className="block sm:hidden w-full">
                              <Card
                                link={`/organization/team/${item._id}`}
                                image={item.media?.imagesUrl?.[0]}
                                title={item.name}
                                subtitle={subtitle}
                                direction="row"
                                classNames={{
                                  container: 'border-gray-200 bg-white hover:shadow-lg',
                                  image: 'w-1/3 min-h-[140px]',
                                  title: 'text-base font-semibold !text-gray-900',
                                  subtitle: '!text-xs !text-gray-600 !font-normal leading-relaxed line-clamp-3',
                                  textbox: '!p-4 !gap-3 justify-center'
                                }}
                              />
                            </div>
                            <div className="hidden sm:block w-full h-full">
                              <Card
                                link={`/organization/team/${item._id}`}
                                image={item.media?.imagesUrl?.[0]}
                                title={item.name}
                                subtitle={subtitle}
                                time={item.createdAt}
                                classNames={{
                                  container: 'border-gray-200 bg-white hover:shadow-lg',
                                  image: 'aspect-[4/3]',
                                  title: '!text-lg !font-bold !text-gray-900 hover:!text-brand-primary',
                                  subtitle: '!text-sm !text-gray-700 !font-normal leading-relaxed line-clamp-3',
                                  textbox: '!p-5 !gap-4'
                                }}
                              />
                            </div>
                          </Grid.Col>
                        )
                      })}
                    </Grid>
                  )}
                </div>
              </main>
            </div>
          </section>
        </div>
      </section>
      <Footer companyInfo={companyInfo} />
    </>
  )
}
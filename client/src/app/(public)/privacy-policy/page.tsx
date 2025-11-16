export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="prose prose-lg max-w-none">
            <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
              Согласие на обработку персональных данных
            </h1>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                1. Общие положения
              </h2>
              <p className="mb-4">
                Настоящее согласие на обработку персональных данных (далее – Согласие) предоставляется 
                Карачаево-Черкесскому республиканскому отделению Общероссийской общественной организации 
                «Деловая Россия» (ОГРН 1160900050288, ИНН 0917030013) и действует в соответствии с 
                Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных».
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                2. Состав персональных данных
              </h2>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Фамилия, имя, отчество</li>
                <li>Контактный телефон</li>
                <li>Адрес электронной почты</li>
                <li>Прочая информация, предоставляемая Пользователем</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                3. Цели обработки персональных данных
              </h2>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Обработка входящих запросов и заявок</li>
                <li>Предоставление информации о деятельности организации</li>
                <li>Информирование о мероприятиях и событиях</li>
                <li>Обратная связь с пользователями сайта</li>
                <li>Проведение маркетинговых исследований</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                4. Способы обработки
              </h2>
              <p className="mb-4">
                Обработка персональных данных осуществляется с использованием средств автоматизации 
                и без использования таких средств, включая сбор, запись, систематизацию, накопление, 
                хранение, уточнение, извлечение, использование, передачу, обезличивание, блокирование, 
                удаление, уничтожение персональных данных.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                5. Срок действия согласия
              </h2>
              <p className="mb-4">
                Согласие действует с момента его предоставления и до момента отзыва в письменной форме. 
                Обработка персональных данных прекращается при достижении целей обработки или в случае 
                отзыва субъектом персональных данных своего согласия.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                6. Права субъекта персональных данных
              </h2>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>На доступ к своим персональным данным</li>
                <li>На уточнение, блокирование или уничтожение данных</li>
                <li>На отзыв настоящего согласия</li>
                <li>На обжалование действий или бездействия оператора</li>
                <li>На получение информации regarding обработки персональных данных</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                7. Контактная информация
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="mb-2"><strong>Карачаево-Черкесское республиканское отделение Общероссийской общественной организации «Деловая Россия»</strong></p>
                <p className="mb-2">Юридический адрес: 369000, Карачаево-Черкесская Республика, г. Черкесск, ул. 1-я Подгорная, зд. 26</p>
                <p className="mb-2">ИНН: 0917030013</p>
                <p className="mb-2">ОГРН: 1160900050288</p>
                <p className="mb-2">Email: deloros09@mail.ru</p>
                <p>Сайт: deloros09.ru</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                8. Заключительные положения
              </h2>
              <p className="mb-4">
                Настоящим я подтверждаю, что ознакомлен(а) с положениями Федерального закона 
                от 27.07.2006 № 152-ФЗ «О персональных данных», права и обязанности в области 
                защиты персональных данных мне разъяснены.
              </p>
              <p>
                Предоставляя свои персональные данные, я подтверждаю, что действую свободно, 
                своей волей и в своем интересе.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

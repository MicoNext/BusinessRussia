export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                1. Общие положения
              </h2>
              <p className="mb-4">
                Настоящее согласие на обработку персональных данных (далее – Согласие) предоставляется 
                Обществу с ограниченной ответственностью «deloros09.ru» (ОГРН, ИНН, юридический адрес) 
                и действует в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных».
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
                <li>Предоставление информации о товарах и услугах</li>
                <li>Заключение и исполнение договоров</li>
                <li>Информирование о новых предложениях и акциях</li>
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
                Обработка персональных данных прекращается при достижении целей обработки.
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
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                7. Контактная информация
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="mb-2"><strong>ООО «deloros09.ru»</strong></p>
                <p className="mb-2">Юридический адрес: [адрес]</p>
                <p className="mb-2">ИНН: [ИНН]</p>
                <p className="mb-2">ОГРН: [ОГРН]</p>
                <p className="mb-2">Телефон: [телефон]</p>
                <p>Email: [email]</p>
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
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
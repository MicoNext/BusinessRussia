export default `
              h-full min-h-[350px] w-full focus:outline-none
              [&_.ProseMirror]:outline-none
              [&_.ProseMirror]:min-h-[350px]
              [&_.ProseMirror]:h-full
              [&_.ProseMirror]:w-full
              
              /* Стили для параграфов */
              [&_.ProseMirror_p]:my-3
              [&_.ProseMirror_p]:text-gray-700
              
              /* Списки */
              [&_.ProseMirror_ul]:my-3
              [&_.ProseMirror_ul]:list-disc
              [&_.ProseMirror_ul]:pl-6
              [&_.ProseMirror_ul]:space-y-2
              [&_.ProseMirror_ol]:my-3
              [&_.ProseMirror_ol]:list-decimal
              [&_.ProseMirror_ol]:pl-6
              [&_.ProseMirror_ol]:space-y-2
              [&_.ProseMirror_li]:my-1
              [&_.ProseMirror_li]:text-gray-700
              
              /* Текстовое форматирование */
              [&_.ProseMirror_strong]:font-bold
              [&_.ProseMirror_strong]:text-gray-900
              [&_.ProseMirror_em]:italic
              [&_.ProseMirror_u]:underline
              
              /* Выравнивание */
              [&_.ProseMirror_[data-text-align="left"]]:text-left
              [&_.ProseMirror_[data-text-align="center"]]:text-center
              [&_.ProseMirror_[data-text-align="right"]]:text-right
              
              [&_.ProseMirror_.is-editable:focus]:outline-none
            `
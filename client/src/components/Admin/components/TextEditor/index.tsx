'use client'
import { useState } from 'react'
import TextEditorInput from '@/components/Admin/components/TextEditor/TextEditorInput'
import cotnentStyle from '@/components/ui/ContentStyles/content.style'

interface IProps {
  html: string 
  onSave: (html: string) => void
}

export default function TextEditor({ html, onSave  }: IProps ) {
  const [savedContent, setSavedContent] = useState(html)

  const handleSave = (html: string) => {
    setSavedContent(html)
    onSave(html)
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-lg">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Редактор контента</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div>
            <TextEditorInput
              initialContent={html || "<p>Начните редактировать ваш контент здесь...</p>"}
              onSave={handleSave}
              editable={true}
            />
          </div>
          
          <div className="space-y-6">
            {savedContent && (
              <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Предпросмотр контента
                </h3>
                <div 
                  className={cotnentStyle}
                  dangerouslySetInnerHTML={{ __html: savedContent }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
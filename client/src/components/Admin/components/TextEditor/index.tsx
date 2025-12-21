'use client'
import { TextEditor } from '@/components/Admin/components/TextEditor/TextEditorInput'

interface IProps {
  html: string 
  onSave: (html: string) => void
}

export default function TextEditorWrapper({ html, onSave }: IProps) {
  const handleSave = (html: string) => {
    onSave(html)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 min-h-[500px]">
        <TextEditor
          initialContent={html || ""}
          onSave={handleSave}
          editable={true}
          className="h-full"
        />
      </div>
    </div>
  )
}
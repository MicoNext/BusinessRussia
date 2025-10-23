'use client'

import React, { useState, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { 
  Save, 
  Eye, 
  Trash2, 
  Edit3, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  List, 
  ListOrdered,
  CheckCircle,
  AlertCircle,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Pilcrow,
  Code,
  Quote
} from 'lucide-react'

interface TextEditorProps {
  initialContent?: string
  onSave?: (content: string) => void | Promise<void>
  editable?: boolean
  className?: string
}

const TextEditor: React.FC<TextEditorProps> = ({
  initialContent = '',
  onSave,
  editable = true,
  className = ''
}) => {
  const [isEditing, setIsEditing] = useState(editable)
  const [isMounted, setIsMounted] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: initialContent,
    editable: isEditing,
    immediatelyRender: false,
  })

  const handleSave = async () => {
    if (!editor || !onSave) return

    setSaveStatus('saving')
    
    try {
      const html = editor.getHTML()
      const text = editor.getText()
      
      console.log('=== СОХРАНЕНИЕ РЕДАКТОРА ===')
      console.log('HTML:', html)
      console.log('Текст:', text)
      console.log('========================')
      
      await onSave(html)
      
      setSaveStatus('success')
      
      setTimeout(() => {
        setSaveStatus('idle')
      }, 2000)
      
    } catch (error) {
      console.error('Ошибка при сохранении:', error)
      setSaveStatus('error')
      
      setTimeout(() => {
        setSaveStatus('idle')
      }, 3000)
    }
  }

  const handleClear = () => {
    if (editor) {
      editor.commands.clearContent()
    }
  }

  useEffect(() => {
    if (editor && initialContent && isMounted) {
      editor.commands.setContent(initialContent)
    }
  }, [editor, initialContent, isMounted])

  const getSaveButtonText = () => {
    switch (saveStatus) {
      case 'saving':
        return (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Сохранение...
          </>
        )
      case 'success':
        return (
          <>
            <CheckCircle className="w-4 h-4" />
            Сохранено!
          </>
        )
      case 'error':
        return (
          <>
            <AlertCircle className="w-4 h-4" />
            Ошибка
          </>
        )
      default:
        return (
          <>
            <Save className="w-4 h-4" />
            Сохранить
          </>
        )
    }
  }

  const getSaveButtonClass = () => {
    const baseClass = "px-6 py-3 border border-transparent rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all duration-200 flex items-center gap-2"
    
    switch (saveStatus) {
      case 'saving':
        return `${baseClass} bg-[#2b7de0] opacity-80 cursor-not-allowed`
      case 'success':
        return `${baseClass} bg-green-600 hover:bg-green-700 transform hover:-translate-y-0.5 hover:shadow-lg`
      case 'error':
        return `${baseClass} bg-red-600 hover:bg-red-700 transform hover:-translate-y-0.5 hover:shadow-lg`
      default:
        return `${baseClass} bg-[#2b7de0] hover:bg-[#1e5fb0] transform hover:-translate-y-0.5 hover:shadow-lg`
    }
  }

  if (!isMounted) {
    return (
      <div className={`min-h-[500px] bg-white rounded-2xl border border-gray-200 shadow-lg ${className}`}>
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 rounded-t-2xl">
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 12 }).map((_, index) => (
              <button
                key={index}
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-xl text-gray-600 bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                disabled
              >
                ●
              </button>
            ))}
          </div>
        </div>
        <div className="p-6 flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-[#2b7de0] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-gray-600">Загрузка редактора...</p>
          </div>
        </div>
        <div className="border-t border-gray-200 bg-gray-50 px-6 py-4 rounded-b-2xl flex justify-between items-center">
          <button type="button" className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 bg-white disabled:opacity-50" disabled>
            <Eye className="w-4 h-4 inline mr-2" />
            Предпросмотр
          </button>
          <div className="flex gap-3">
            <button type="button" className="px-6 py-3 border border-red-500 rounded-xl text-red-600 bg-white disabled:opacity-50" disabled>
              <Trash2 className="w-4 h-4 inline mr-2" />
              Очистить
            </button>
            <button type="button" className="px-6 py-3 border border-transparent rounded-xl text-white bg-[#2b7de0] disabled:opacity-50" disabled>
              <Save className="w-4 h-4 inline mr-2" />
              Сохранить
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!editor) {
    return (
      <div className={`min-h-[500px] bg-white rounded-2xl border border-gray-200 shadow-lg ${className}`}>
        <div className="p-6 flex items-center justify-center h-96">
          <div className="text-center text-red-600">
            <AlertCircle className="w-12 h-12 mx-auto mb-3" />
            <p>Ошибка загрузки редактора</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-2xl border border-gray-200 shadow-lg ${className}`}>
      {isEditing && (
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 rounded-t-2xl">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`px-4 py-2 border rounded-xl transition-all ${
                editor.isActive('bold')
                  ? 'border-[#2b7de0] bg-[#2b7de0] text-white'
                  : 'border-gray-300 text-gray-600 bg-white hover:bg-gray-50'
              }`}
              title="Жирный"
            >
              <Bold className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`px-4 py-2 border rounded-xl transition-all ${
                editor.isActive('italic')
                  ? 'border-[#2b7de0] bg-[#2b7de0] text-white'
                  : 'border-gray-300 text-gray-600 bg-white hover:bg-gray-50'
              }`}
              title="Курсив"
            >
              <Italic className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`px-4 py-2 border rounded-xl transition-all ${
                editor.isActive('underline')
                  ? 'border-[#2b7de0] bg-[#2b7de0] text-white'
                  : 'border-gray-300 text-gray-600 bg-white hover:bg-gray-50'
              }`}
              title="Подчеркнутый"
            >
              <UnderlineIcon className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={`px-4 py-2 border rounded-xl transition-all ${
                editor.isActive('strike')
                  ? 'border-[#2b7de0] bg-[#2b7de0] text-white'
                  : 'border-gray-300 text-gray-600 bg-white hover:bg-gray-50'
              }`}
              title="Зачеркнутый"
            >
              <Strikethrough className="w-4 h-4" />
            </button>

            <button
              onClick={() => editor.chain().focus().toggleCode().run()}
              className={`px-4 py-2 border rounded-xl transition-all ${
                editor.isActive('code')
                  ? 'border-[#2b7de0] bg-[#2b7de0] text-white'
                  : 'border-gray-300 text-gray-600 bg-white hover:bg-gray-50'
              }`}
              title="Код"
            >
              <Code className="w-4 h-4" />
            </button>

            <button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={`px-4 py-2 border rounded-xl transition-all ${
                editor.isActive('blockquote')
                  ? 'border-[#2b7de0] bg-[#2b7de0] text-white'
                  : 'border-gray-300 text-gray-600 bg-white hover:bg-gray-50'
              }`}
              title="Цитата"
            >
              <Quote className="w-4 h-4" />
            </button>
            
            <div className="w-px bg-gray-300 h-8 my-auto"></div>
            
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={`px-4 py-2 border rounded-xl transition-all ${
                editor.isActive('heading', { level: 1 })
                  ? 'border-[#2b7de0] bg-[#2b7de0] text-white'
                  : 'border-gray-300 text-gray-600 bg-white hover:bg-gray-50'
              }`}
              title="Заголовок 1"
            >
              <Heading1 className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={`px-4 py-2 border rounded-xl transition-all ${
                editor.isActive('heading', { level: 2 })
                  ? 'border-[#2b7de0] bg-[#2b7de0] text-white'
                  : 'border-gray-300 text-gray-600 bg-white hover:bg-gray-50'
              }`}
              title="Заголовок 2"
            >
              <Heading2 className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => editor.chain().focus().setParagraph().run()}
              className={`px-4 py-2 border rounded-xl transition-all ${
                editor.isActive('paragraph')
                  ? 'border-[#2b7de0] bg-[#2b7de0] text-white'
                  : 'border-gray-300 text-gray-600 bg-white hover:bg-gray-50'
              }`}
              title="Абзац"
            >
              <Pilcrow className="w-4 h-4" />
            </button>
            
            <div className="w-px bg-gray-300 h-8 my-auto"></div>
            
            <button
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              className={`px-4 py-2 border rounded-xl transition-all ${
                editor.isActive({ textAlign: 'left' })
                  ? 'border-[#2b7de0] bg-[#2b7de0] text-white'
                  : 'border-gray-300 text-gray-600 bg-white hover:bg-gray-50'
              }`}
              title="По левому краю"
            >
              <AlignLeft className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              className={`px-4 py-2 border rounded-xl transition-all ${
                editor.isActive({ textAlign: 'center' })
                  ? 'border-[#2b7de0] bg-[#2b7de0] text-white'
                  : 'border-gray-300 text-gray-600 bg-white hover:bg-gray-50'
              }`}
              title="По центру"
            >
              <AlignCenter className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              className={`px-4 py-2 border rounded-xl transition-all ${
                editor.isActive({ textAlign: 'right' })
                  ? 'border-[#2b7de0] bg-[#2b7de0] text-white'
                  : 'border-gray-300 text-gray-600 bg-white hover:bg-gray-50'
              }`}
              title="По правому краю"
            >
              <AlignRight className="w-4 h-4" />
            </button>
            
            <div className="w-px bg-gray-300 h-8 my-auto"></div>
            
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`px-4 py-2 border rounded-xl transition-all ${
                editor.isActive('bulletList')
                  ? 'border-[#2b7de0] bg-[#2b7de0] text-white'
                  : 'border-gray-300 text-gray-600 bg-white hover:bg-gray-50'
              }`}
              title="Маркированный список"
            >
              <List className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`px-4 py-2 border rounded-xl transition-all ${
                editor.isActive('orderedList')
                  ? 'border-[#2b7de0] bg-[#2b7de0] text-white'
                  : 'border-gray-300 text-gray-600 bg-white hover:bg-gray-50'
              }`}
              title="Нумерованный список"
            >
              <ListOrdered className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className={`min-h-[400px] ${isEditing ? 'bg-white' : 'bg-gray-50'} transition-colors`}>
        <div className="p-6 h-full">
          <EditorContent 
            editor={editor} 
            className={`h-full min-h-[350px] w-full focus:outline-none prose max-w-none
              [&_.ProseMirror]:outline-none
              [&_.ProseMirror]:min-h-[350px]
              [&_.ProseMirror]:h-full
              [&_.ProseMirror]:w-full
              [&_.ProseMirror_h1]:text-3xl
              [&_.ProseMirror_h1]:font-bold
              [&_.ProseMirror_h1]:my-4
              [&_.ProseMirror_h1]:text-gray-900
              [&_.ProseMirror_h2]:text-2xl
              [&_.ProseMirror_h2]:font-semibold
              [&_.ProseMirror_h2]:my-3
              [&_.ProseMirror_h2]:text-gray-900
              [&_.ProseMirror_p]:my-3
              [&_.ProseMirror_p]:text-gray-700
              [&_.ProseMirror_ul]:my-3
              [&_.ProseMirror_ul]:pl-6
              [&_.ProseMirror_ol]:my-3
              [&_.ProseMirror_ol]:pl-6
              [&_.ProseMirror_li]:my-1
              [&_.ProseMirror_strong]:font-bold
              [&_.ProseMirror_em]:italic
              [&_.ProseMirror_u]:underline
              [&_.ProseMirror_s]:line-through
              [&_.ProseMirror_code]:bg-gray-100
              [&_.ProseMirror_code]:text-red-600
              [&_.ProseMirror_code]:px-1
              [&_.ProseMirror_code]:rounded
              [&_.ProseMirror_code]:text-sm
              [&_.ProseMirror_blockquote]:border-l-4
              [&_.ProseMirror_blockquote]:border-[#2b7de0]
              [&_.ProseMirror_blockquote]:pl-4
              [&_.ProseMirror_blockquote]:my-4
              [&_.ProseMirror_blockquote]:text-gray-600
              [&_.ProseMirror_blockquote]:italic
              [&_.ProseMirror_[data-text-align="left"]]:text-left
              [&_.ProseMirror_[data-text-align="center"]]:text-center
              [&_.ProseMirror_[data-text-align="right"]]:text-right
              [&_.ProseMirror_.is-editable:focus]:outline-none
              ${
                isEditing 
                  ? '[&_.ProseMirror]:bg-white' 
                  : '[&_.ProseMirror]:text-gray-700 [&_.ProseMirror]:bg-gray-50'
              }`}
          />
        </div>
      </div>

      <div className="border-t border-gray-200 bg-gray-50 px-6 py-4 rounded-b-2xl">
        <div className="flex justify-between items-center">
          {editable && (
            <>
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#2b7de0] focus:border-[#2b7de0] transition-all flex items-center gap-2"
              >
                {isEditing ? (
                  <>
                    <Eye className="w-4 h-4" />
                    Предпросмотр
                  </>
                ) : (
                  <>
                    <Edit3 className="w-4 h-4" />
                    Редактировать
                  </>
                )}
              </button>
              
              {isEditing && (
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleClear}
                    className="px-6 py-3 border border-red-500 rounded-xl text-red-600 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Очистить
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={saveStatus === 'saving'}
                    className={getSaveButtonClass()}
                  >
                    {getSaveButtonText()}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default TextEditor
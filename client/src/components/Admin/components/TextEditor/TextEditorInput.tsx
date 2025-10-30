'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  List, 
  ListOrdered,
  Bold,
  Italic,
  Underline as UnderlineIcon
} from 'lucide-react'
import cotnentStyle from '@/components/ui/ContentStyles/content.style'

interface TextEditorProps {
  initialContent?: string
  onSave: (content: string) => void | Promise<void>
  editable?: boolean
  className?: string
  autoSaveDelay?: number
}

const TextEditor: React.FC<TextEditorProps> = ({
  initialContent = '',
  onSave,
  editable = true,
  className = '',
  autoSaveDelay = 1000
}) => {
  const [isMounted, setIsMounted] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleSave = useCallback(async (content: string) => {
    if (!onSave) return
    
    setSaveStatus('saving')
    try {
      await onSave(content)
      setSaveStatus('success')
      setTimeout(() => setSaveStatus('idle'), 2000)
    } catch (error) {
      console.error('Ошибка при сохранении:', error)
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 3000)
    }
  }, [onSave])

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        code: false,
        codeBlock: false,
        strike: false,
        blockquote: false,
        heading: false,
        bulletList: {
          HTMLAttributes: {
            class: 'bullet-list',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'ordered-list',
          },
        },
      }),
      Underline,
      TextAlign.configure({
        types: ['paragraph'],
      }),
    ],
    content: initialContent,
    editable: editable,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }

      saveTimeoutRef.current = setTimeout(() => {
        const html = editor.getHTML()
        handleSave(html)
      }, autoSaveDelay)
    },
  })

  useEffect(() => {
    if (editor && initialContent && isMounted) {
      const currentContent = editor.getHTML()
      if (currentContent !== initialContent) {
        editor.commands.setContent(initialContent)
      }
    }
  }, [editor, initialContent, isMounted])

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [])

  if (!isMounted) {
    return (
      <div className={`min-h-[200px] bg-white rounded-2xl border border-gray-200 shadow-lg ${className}`}>
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 rounded-t-2xl">
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 6 }).map((_, index) => (
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
        <div className="p-6 flex items-center justify-center h-32">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-[#2b7de0] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-gray-600">Загрузка редактора...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!editor) {
    return (
      <div className={`min-h-[200px] bg-white rounded-2xl border border-gray-200 shadow-lg ${className}`}>
        <div className="p-6 flex items-center justify-center h-32">
          <div className="text-center text-red-600">
            <p>Ошибка загрузки редактора</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex flex-col h-full bg-white rounded-2xl border border-gray-200 shadow-lg ${className}`}>
      {editable && (
        <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 rounded-t-2xl sticky top-0 z-10">
          <div className="flex flex-wrap gap-2 items-center">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`px-3 py-2 border rounded-xl transition-all ${
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
              className={`px-3 py-2 border rounded-xl transition-all ${
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
              className={`px-3 py-2 border rounded-xl transition-all ${
                editor.isActive('underline')
                  ? 'border-[#2b7de0] bg-[#2b7de0] text-white'
                  : 'border-gray-300 text-gray-600 bg-white hover:bg-gray-50'
              }`}
              title="Подчеркнутый"
            >
              <UnderlineIcon className="w-4 h-4" />
            </button>
            
            <div className="w-px bg-gray-300 h-6"></div>
            
            <button
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              className={`px-3 py-2 border rounded-xl transition-all ${
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
              className={`px-3 py-2 border rounded-xl transition-all ${
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
              className={`px-3 py-2 border rounded-xl transition-all ${
                editor.isActive({ textAlign: 'right' })
                  ? 'border-[#2b7de0] bg-[#2b7de0] text-white'
                  : 'border-gray-300 text-gray-600 bg-white hover:bg-gray-50'
              }`}
              title="По правому краю"
            >
              <AlignRight className="w-4 h-4" />
            </button>
            
            <div className="w-px bg-gray-300 h-6"></div>
            
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`px-3 py-2 border rounded-xl transition-all ${
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
              className={`px-3 py-2 border rounded-xl transition-all ${
                editor.isActive('orderedList')
                  ? 'border-[#2b7de0] bg-[#2b7de0] text-white'
                  : 'border-gray-300 text-gray-600 bg-white hover:bg-gray-50'
              }`}
              title="Нумерованный список"
            >
              <ListOrdered className="w-4 h-4" />
            </button>

            {saveStatus !== 'idle' && (
              <div className="ml-2 flex items-center gap-2 text-sm">
                {saveStatus === 'saving' && (
                  <>
                    <div className="w-3 h-3 border-2 border-[#2b7de0] border-t-transparent rounded-full animate-spin" />
                    <span className="text-gray-600">Сохранение...</span>
                  </>
                )}
                {saveStatus === 'success' && (
                  <span className="text-green-600">✓ Сохранено</span>
                )}
                {saveStatus === 'error' && (
                  <span className="text-red-600">✗ Ошибка</span>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <div className={`flex-1 min-h-[300px] ${editable ? 'bg-white' : 'bg-gray-50'} transition-colors rounded-b-2xl overflow-auto`}>
        <div className="p-4 md:p-6 h-full">
          <EditorContent 
            editor={editor} 
            className={`${cotnentStyle} h-full`}
          />
        </div>
      </div>
    </div>
  )
}

export default TextEditor
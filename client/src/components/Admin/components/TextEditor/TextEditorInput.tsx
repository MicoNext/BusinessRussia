'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import { 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  List, 
  ListOrdered,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Link as LinkIcon,
  Link2Off,
  ExternalLink,
  Eye,
  EyeOff
} from 'lucide-react'
import cotnentStyle from '@/components/ui/ContentStyles/content.style'

interface TextEditorProps {
  initialContent?: string
  onSave: (content: string) => void | Promise<void>
  editable?: boolean
  className?: string
  autoSaveDelay?: number
  showLinkControls?: boolean
}

const TextEditor: React.FC<TextEditorProps> = ({
  initialContent = '',
  onSave,
  editable = true,
  className = '',
  autoSaveDelay = 1000,
  showLinkControls = true
}) => {
  const [isMounted, setIsMounted] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')
  const [showLinkPopup, setShowLinkPopup] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [linkText, setLinkText] = useState('')
  const [openInNewTab, setOpenInNewTab] = useState(true)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const linkPopupRef = useRef<HTMLDivElement>(null)

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
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'html-link',
          rel: 'noopener noreferrer nofollow',
          target: '_blank',
        },
        validate: href => /^https?:\/\//.test(href),
      }),
    ],
    content: initialContent,
    editable: editable && !isPreviewMode,
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

  const handleAddLink = () => {
    if (!editor) return

    if (editor.isActive('link')) {
      const attrs = editor.getAttributes('link')
      setLinkUrl(attrs.href || '')
      setOpenInNewTab(attrs.target === '_blank')
      
      const { from, to } = editor.state.selection
      const selectedText = editor.state.doc.textBetween(from, to, '')
      setLinkText(selectedText)
    } else {
      const { from, to } = editor.state.selection
      const selectedText = editor.state.doc.textBetween(from, to, '')
      
      setLinkText(selectedText)
      setLinkUrl('')
      setOpenInNewTab(true)
    }
    
    setShowLinkPopup(true)
  }

  const applyLink = () => {
    if (!editor) return

    if (linkUrl.trim()) {
      editor.chain().focus().unsetLink().run()
      
      if (editor.state.selection.empty) {
        editor
          .chain()
          .focus()
          .insertContent({
            type: 'text',
            text: linkText || linkUrl,
            marks: [
              {
                type: 'link',
                attrs: {
                  href: linkUrl,
                  target: openInNewTab ? '_blank' : '_self',
                  class: 'html-link',
                }
              }
            ]
          })
          .run()
      } else {
        editor
          .chain()
          .focus()
          .setLink({ 
            href: linkUrl,
            target: openInNewTab ? '_blank' : '_self',
            class: 'html-link',
          })
          .run()
      }
      
      setShowLinkPopup(false)
      setLinkUrl('')
      setLinkText('')
    }
  }

  const removeLink = () => {
    if (!editor) return
    
    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .unsetLink()
      .run()
    
    setShowLinkPopup(false)
  }

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (linkPopupRef.current && !linkPopupRef.current.contains(event.target as Node)) {
        setShowLinkPopup(false)
      }
    }

    if (showLinkPopup) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [showLinkPopup])

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
            {Array.from({ length: 8 }).map((_, index) => (
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
        <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 rounded-t-2xl sticky top-0 z-20">
          <div className="flex flex-wrap gap-2 items-center">
            <div className="flex flex-wrap gap-2">
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
              
              {showLinkControls && (
                <>
                  <button
                    onClick={handleAddLink}
                    className={`px-3 py-2 border rounded-xl transition-all ${
                      editor.isActive('link')
                        ? 'border-[#2b7de0] bg-[#2b7de0] text-white'
                        : 'border-gray-300 text-gray-600 bg-white hover:bg-gray-50'
                    }`}
                    title="Добавить/изменить ссылку"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={removeLink}
                    disabled={!editor.isActive('link')}
                    className={`px-3 py-2 border rounded-xl transition-all ${
                      editor.isActive('link')
                        ? 'border-red-500 bg-red-50 text-red-600 hover:bg-red-100'
                        : 'border-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed'
                    }`}
                    title="Удалить ссылку"
                  >
                    <Link2Off className="w-4 h-4" />
                  </button>
                </>
              )}
              
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
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={togglePreviewMode}
                className={`px-3 py-2 border rounded-xl transition-all ${
                  isPreviewMode
                    ? 'border-purple-500 bg-purple-50 text-purple-600'
                    : 'border-gray-300 text-gray-600 bg-white hover:bg-gray-50'
                }`}
                title={isPreviewMode ? "Выйти из режима просмотра" : "Режим просмотра"}
              >
                {isPreviewMode ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>

              {saveStatus !== 'idle' && (
                <div className="flex items-center gap-2 text-sm">
                  {saveStatus === 'saving' && (
                    <>
                      <div className="w-3 h-3 border-2 border-[#2b7de0] border-t-transparent rounded-full animate-spin" />
                      <span className="text-gray-600 hidden sm:inline">Сохранение...</span>
                    </>
                  )}
                  {saveStatus === 'success' && (
                    <span className="text-green-600 hidden sm:inline">✓ Сохранено</span>
                  )}
                  {saveStatus === 'error' && (
                    <span className="text-red-600 hidden sm:inline">✗ Ошибка</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showLinkPopup && (
        <div 
          ref={linkPopupRef}
          className="absolute top-16 left-1/2 transform -translate-x-1/2 z-50 bg-white rounded-xl border border-gray-300 shadow-xl p-4 w-80"
        >
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL ссылки *
              </label>
              <input
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                autoFocus
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Текст ссылки
              </label>
              <input
                type="text"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                placeholder="Текст ссылки (опционально)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Оставьте пустым, чтобы использовать URL как текст
              </p>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="new-tab"
                checked={openInNewTab}
                onChange={(e) => setOpenInNewTab(e.target.checked)}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <label htmlFor="new-tab" className="ml-2 text-sm text-gray-700">
                Открывать в новой вкладке
              </label>
              <ExternalLink className="w-4 h-4 ml-1 text-gray-400" />
            </div>
            
            <div className="flex gap-2 pt-2">
              <button
                onClick={applyLink}
                disabled={!linkUrl.trim()}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editor.isActive('link') ? 'Обновить' : 'Добавить'}
              </button>
              <button
                onClick={() => setShowLinkPopup(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={`flex-1 min-h-[300px] ${
        editable && !isPreviewMode ? 'bg-white' : 'bg-gray-50'
      } transition-colors rounded-b-2xl overflow-auto`}>
        <div className="p-4 md:p-6 h-full">
          <EditorContent 
            editor={editor} 
            className={`${cotnentStyle} h-full prose max-w-none ${
              isPreviewMode ? 'pointer-events-none' : ''
            }`}
          />
        </div>
      </div>
    </div>
  )
}

export default TextEditor

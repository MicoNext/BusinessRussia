'use client'
import React, { useEffect, useRef } from 'react'
import './html-content.css'

interface HtmlContentProps {
  html: string;
  className?: string;
}

export const HtmlContent: React.FC<HtmlContentProps> = ({ html, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      // 1. Добавляем классы ко всем ссылкам
      const links = containerRef.current.querySelectorAll('a')
      links.forEach(link => {
        // Добавляем несколько классов для надежности
        link.classList.add('html-link', 'link', 'hyperlink')
        
        // Убедимся, что есть стили
        if (!link.hasAttribute('style')) {
          link.setAttribute('style', 'color: #0066cc; text-decoration: underline;')
        }
        
        if (!link.hasAttribute('target')) {
          link.setAttribute('target', '_blank')
        }
        if (!link.hasAttribute('rel')) {
          link.setAttribute('rel', 'noopener noreferrer nofollow')
        }
      })

      // 2. Лог для отладки
      if (links.length > 0) {
        console.log('Найдено ссылок:', links.length)
        console.log('Классы первой ссылки:', links[0].className)
        console.log('Стили первой ссылки:', links[0].getAttribute('style'))
      }

      // 3. Обрабатываем стили выравнивания
      const elementsWithAlign = containerRef.current.querySelectorAll('[data-text-align]')
      elementsWithAlign.forEach(el => {
        const align = el.getAttribute('data-text-align')
        if (align) {
          el.setAttribute('style', `text-align: ${align}`)
        }
      })
    }
  }, [html])

  // Если HTML пустой, показываем плейсхолдер
  if (!html || html.trim() === '') {
    return (
      <div className={`html-content ${className}`}>
        <p className="text-gray-400 italic">Текст отсутствует</p>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`html-content ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
import { ReactNode } from 'react'

/**
 * 텍스트에서 검색어를 하이라이트하는 유틸리티 함수
 * @param text - 하이라이트할 텍스트
 * @param highlight - 검색어
 * @returns 하이라이트된 ReactNode
 */
export const highlightText = (text: string, highlight: string): ReactNode => {
  if (!text) return null
  if (!highlight.trim()) {
    return <span>{text}</span>
  }
  const regex = new RegExp(`(${highlight})`, "gi")
  const parts = text.split(regex)
  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>
      )}
    </span>
  )
}


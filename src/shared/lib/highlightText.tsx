import { ReactNode } from "react"

/**
 * 텍스트에서 검색어를 하이라이트 처리합니다.
 * @param text 원본 텍스트
 * @param query 검색어
 * @returns 하이라이트 처리된 React 노드
 */
export const highlightText = (text: string | undefined, query: string): ReactNode => {
  if (!text) return null
  if (!query?.trim()) {
    return text
  }
  const regex = new RegExp(`(${query})`, "gi")
  const parts = text.split(regex)
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={`highlight-${i}`} className="bg-yellow-200">
            {part}
          </mark>
        ) : (
          <span key={`text-${i}`}>{part}</span>
        ),
      )}
    </>
  )
}

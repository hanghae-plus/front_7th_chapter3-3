/**
 * 날짜 포맷팅 유틸리티 함수
 */

/**
 * 날짜를 지정된 형식으로 포맷팅
 * @param date - 포맷팅할 날짜 (Date 객체 또는 문자열)
 * @param format - 포맷 형식 (기본값: 'YYYY-MM-DD')
 * @returns 포맷팅된 날짜 문자열
 */
export const formatDate = (date: Date | string, format: string = 'YYYY-MM-DD'): string => {
  const d = typeof date === 'string' ? new Date(date) : date
  
  if (isNaN(d.getTime())) {
    return ''
  }

  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  const seconds = String(d.getSeconds()).padStart(2, '0')

  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}

/**
 * 날짜를 상대 시간으로 표시 (예: "2시간 전", "3일 전")
 * @param date - 날짜 (Date 객체 또는 문자열)
 * @returns 상대 시간 문자열
 */
export const formatRelativeTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)

  if (diffSec < 60) {
    return '방금 전'
  } else if (diffMin < 60) {
    return `${diffMin}분 전`
  } else if (diffHour < 24) {
    return `${diffHour}시간 전`
  } else if (diffDay < 7) {
    return `${diffDay}일 전`
  } else {
    return formatDate(d, 'YYYY-MM-DD')
  }
}

/**
 * 날짜를 한국어 형식으로 포맷팅 (예: "2024년 1월 1일")
 * @param date - 날짜 (Date 객체 또는 문자열)
 * @returns 한국어 형식의 날짜 문자열
 */
export const formatDateKorean = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date
  
  if (isNaN(d.getTime())) {
    return ''
  }

  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()

  return `${year}년 ${month}월 ${day}일`
}


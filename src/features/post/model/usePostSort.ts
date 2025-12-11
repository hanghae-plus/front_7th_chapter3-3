import { useState } from 'react'
import type { Post } from '../../../entities/post'

export type SortBy = 'none' | 'id' | 'title' | 'reactions'
export type SortOrder = 'asc' | 'desc'

/**
 * 게시물 정렬 기능
 * 정렬 상태 관리 및 정렬 실행 로직을 제공합니다.
 */
export const usePostSort = () => {
  const [sortBy, setSortBy] = useState<SortBy>('none')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')

  const handleSortByChange = (value: SortBy) => {
    setSortBy(value)
  }

  const handleSortOrderChange = (value: SortOrder) => {
    setSortOrder(value)
  }

  const resetSort = () => {
    setSortBy('none')
    setSortOrder('asc')
  }

  /**
   * 게시물 목록을 정렬합니다.
   */
  const sortPosts = (posts: Post[]): Post[] => {
    if (sortBy === "none") return posts

    const sorted = [...posts].sort((a, b) => {
      let comparison = 0
      switch (sortBy) {
        case "id": {
          comparison = a.id - b.id
          break
        }
        case "title": {
          comparison = a.title.localeCompare(b.title)
          break
        }
        case "reactions": {
          const aReactions = (a.reactions?.likes || 0) - (a.reactions?.dislikes || 0)
          const bReactions = (b.reactions?.likes || 0) - (b.reactions?.dislikes || 0)
          comparison = aReactions - bReactions
          break
        }
      }
      return sortOrder === "asc" ? comparison : -comparison
    })

    return sorted
  }

  return {
    sortBy,
    sortOrder,
    setSortBy: handleSortByChange,
    setSortOrder: handleSortOrderChange,
    resetSort,
    sortPosts,
  }
}

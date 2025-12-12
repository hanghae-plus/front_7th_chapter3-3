import { TPost } from "@/entities/posts/model/types"
import { useState } from "react"

export const usePostDetail = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<TPost | null>(null)
  
  const openPostDetail = (post: TPost) => {
    setSelectedPost(post)
    setIsOpen(true)
  }
  const closePostDetail = () => {
    setSelectedPost(null)
    setIsOpen(false)
  }

  return { isOpen, setIsOpen, selectedPost, setSelectedPost, openPostDetail, closePostDetail }
}

import { useState, useEffect } from "react"
import { fetchTags } from "../api/fetch-tags"
import { Tag } from "../model/tag"

export const useTags = () => {
  const [tags, setTags] = useState<Tag[]>([])

  useEffect(() => {
    fetchTags().then((data) => setTags(data))
  }, [])

  return tags
}

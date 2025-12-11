export interface Tag {
  id?: string | number
  name: string
}

export interface TagsResponse {
  tags: Tag[] | string[]
}


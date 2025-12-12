import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, Button, Input, Textarea } from '@/shared/ui'
import { useUpdatePost } from '@/entities/post/api/queries'
import { Post } from '@/entities/post/model/types'

interface PostUpdateDialogProps {
  post: Post | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const PostUpdateDialog = ({ post, open, onOpenChange }: PostUpdateDialogProps) => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const updatePost = useUpdatePost()

  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setBody(post.body)
    }
  }, [post])

  const handleSubmit = () => {
    if (!post) return

    updatePost.mutate(
      { id: post.id, title, body },
      {
        onSuccess: () => {
          onOpenChange(false)
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Textarea rows={15} placeholder="내용" value={body} onChange={(e) => setBody(e.target.value)} />
          <Button onClick={handleSubmit} disabled={updatePost.isPending}>
            게시물 업데이트
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

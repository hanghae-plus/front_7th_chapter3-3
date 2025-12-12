import { useState } from "react"
import type { Post, PostApiRequest } from "@/entities/post/types"
import { createPost } from "@/entities/post/api/mutations"
import { validatePost } from "@/entities/post/lib/validatePost"

type UsePostCreateOptions = {
    defaultUserId: number
    onSuccess: (post: Post) => void
}

export function usePostCreate(options?: UsePostCreateOptions) {
    const { defaultUserId = 1, onSuccess } = options || {}

    const [form, setForm] = useState<PostApiRequest>({
        title: "",
        body: "",
        userId: defaultUserId,
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const setField =
        <K extends keyof PostApiRequest>(key: K) =>
            (value: PostApiRequest[K]) => {
                setForm((prev) => ({
                    ...prev,
                    [key]: value,
                }))
            }

    const resetForm = () => {
        setForm({
            title: "",
            body: "",
            userId: defaultUserId,
        })
        setError(null)
    }

    const handleSubmit = async () => {
        const result = validatePost(form)
        if (!result.ok) {
            switch (result.reason) {
                case "TITLE_REQUIRED":
                    setError("제목을 입력해주세요.")
                    break
                case "TITLE_TOO_LONG":
                    setError("제목은 100자 이하여야 합니다.")
                    break
                case "BODY_REQUIRED":
                    setError("내용을 입력해주세요.")
                    break
            }
            return
        }

        setIsSubmitting(true)
        setError(null)

        try {
            const created = await createPost(form)
            onSuccess?.(created)
            resetForm()
        } catch (e) {
            setError(e instanceof Error ? e.message : "게시물 생성 중 오류가 발생했습니다.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return {
        form,
        isSubmitting,
        error,
        setField,
        resetForm,
        handleSubmit,
    }
}

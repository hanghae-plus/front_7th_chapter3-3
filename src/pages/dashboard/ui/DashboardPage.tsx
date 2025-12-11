import { Card, CardHeader, CardTitle, CardContent } from "@/shared/ui"
import { FileText, Users, MessageSquare } from "lucide-react"

// FSD 계층에 따라 import
import { usePostListQuery } from "@/features/post-list/model/usePostListQuery.ts"
import { useUserStats } from "@/entities/user/model/useUser" // 파일명 확인 필요 (useCurrentUser.ts라면 수정)
import { PostTable } from "@/widgets/PostManager/ui/PostTable"

export const DashboardPage = () => {
  // 1. 데이터 가져오기
  const { data: postsData, isLoading: postsLoading } = usePostListQuery()
  const { count: userCount } = useUserStats() // user 모듈의 Hook

  // 2. 통계 계산 (Derived State)
  const totalPosts = postsData?.total || 0
  const totalUsers = userCount || 0
  const totalLikes = postsData?.posts?.reduce((acc: number, post: any) => acc + (post.reactions?.likes || 0), 0) || 0

  return (
    <div className="flex flex-col gap-6 p-8">
      <h1 className="text-3xl font-bold tracking-tight">대시보드</h1>

      {/* 📈 통계 카드 섹션 */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatsCard
          title="총 게시글"
          value={totalPosts}
          icon={<FileText className="h-6 w-6 text-blue-600" />}
          subText="+12% from last month"
        />
        <StatsCard
          title="총 사용자"
          value={totalUsers}
          icon={<Users className="h-6 w-6 text-green-600" />}
          subText="+4 new users today"
        />
        <StatsCard
          title="총 좋아요"
          value={totalLikes}
          icon={<MessageSquare className="h-6 w-6 text-red-600" />}
          subText="High engagement"
        />
      </div>

      {/* 📋 최근 게시글 섹션 */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>최근 게시글</CardTitle>
        </CardHeader>
        <CardContent>
          {postsLoading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <div className="overflow-hidden">
              <PostTable posts={postsData?.posts.slice(0, 10) || []} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// (페이지 내부용 컴포넌트)
const StatsCard = ({ title, value, icon, subText }: any) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{subText}</p>
    </CardContent>
  </Card>
)

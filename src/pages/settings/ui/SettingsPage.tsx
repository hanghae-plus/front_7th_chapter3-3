import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent, Input, Button } from "@/shared/ui"
import { useCurrentUser } from "@/entities/user/model/useCurrentUser"

export const SettingsPage = () => {
  const { user, loading, updateProfile } = useCurrentUser()
  const [isEditing, setIsEditing] = useState(false)

  // 폼 상태
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
  })

  // 유저 데이터가 로드되면 폼 초기화
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
      })
    }
  }, [user])

  const handleSave = () => {
    updateProfile(formData)
    setIsEditing(false)
  }

  if (loading) return <div className="p-8 text-center">사용자 정보를 불러오는 중...</div>

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">환경 설정</h1>

      <div className="grid gap-6">
        {/* 👤 프로필 설정 섹션 */}
        <Card>
          <CardHeader>
            <CardTitle>내 프로필 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <img
                src={user?.image || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-24 h-24 rounded-full border-2 border-gray-200"
              />
              <div className="space-y-1">
                <h3 className="text-lg font-semibold">{user?.username}</h3>
                <p className="text-sm text-gray-500">{user?.email}</p>
                <Button variant="outline" size="sm" className="mt-2">
                  사진 변경
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">사용자명</label>
                <Input
                  value={isEditing ? formData.username : user?.username || ""}
                  disabled={!isEditing}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">이름 (First Name)</label>
                <Input
                  value={isEditing ? formData.firstName : user?.firstName || ""}
                  disabled={!isEditing}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">성 (Last Name)</label>
                <Input
                  value={isEditing ? formData.lastName : user?.lastName || ""}
                  disabled={!isEditing}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">이메일</label>
                <Input
                  value={isEditing ? formData.email : user?.email || ""}
                  disabled={!isEditing}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">전화번호</label>
                <Input
                  value={isEditing ? formData.phone : user?.phone || ""}
                  disabled={!isEditing}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              {isEditing ? (
                <>
                  <Button variant="ghost" onClick={() => setIsEditing(false)}>
                    취소
                  </Button>
                  <Button onClick={handleSave}>저장하기</Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)}>수정 모드 진입</Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

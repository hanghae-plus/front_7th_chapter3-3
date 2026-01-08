# Notion MCP 도구 에러 리포트

## 🔴 발생한 에러

```
MCP error -32602: MCP error -32602: Invalid arguments for tool notion-update-page: [
  {
    "code": "invalid_type",
    "expected": "object",
    "received": "string",
    "path": ["data"],
    "message": "Expected object, received string"
  },
  ...
]
```

**핵심 문제:** `data` 파라미터가 객체(object)를 기대하는데 문자열(string)로 전달되고 있음

---

## 📋 사용한 도구

**도구 이름:** `mcp_Notion_notion-update-page`

**도구 스키마 (예상):**
```json
{
  "name": "notion-update-page",
  "parameters": {
    "data": {
      "type": "object",
      "required": true,
      "properties": {
        "page_id": {
          "type": "string",
          "description": "The ID of the page to update, with or without dashes."
        },
        "command": {
          "type": "string",
          "enum": ["update_properties", "replace_content", "replace_content_range", "insert_content_after"]
        },
        // command에 따라 다른 필드들:
        // - replace_content의 경우: "new_str" (string)
        // - update_properties의 경우: "properties" (object)
        // - replace_content_range의 경우: "selection_with_ellipsis" (string), "new_str" (string)
        // - insert_content_after의 경우: "selection_with_ellipsis" (string), "new_str" (string)
      }
    }
  }
}
```

---

## 🔍 시도했던 파라미터 형식들

### 시도 1: Python Dictionary 형식
```python
mcp_Notion_notion-update-page(
  data={
    'page_id': '2c6916818483800eb23fdecd904f4348',
    'command': 'replace_content',
    'new_str': '# FSD 아키텍처 개요\n\n...'
  }
)
```
**결과:** ❌ 실패 - `data`가 문자열로 인식됨

### 시도 2: 간단한 형식
```python
mcp_Notion_notion-update-page(
  data={
    'page_id': '2691681848380344348',
    'command': 'update_properties'
  }
)
```
**결과:** ❌ 실패 - 동일한 에러

### 시도 3: JSON 문자열로 변환 시도
```python
data = {
    'page_id': '2c6916818483800eb23fdecd904f4348',
    'command': 'replace_content',
    'new_str': content  # 파일 전체 내용 (약 8000자)
}
# JSON으로 변환 후 전달 시도
```
**결과:** ❌ 실패 - 여전히 문자열로 인식

---

## 📝 대상 페이지 정보

**페이지 URL:** https://www.notion.so/2c6916818483800eb23fdecd904f4348

**페이지 ID (하이픈 포함):** `2c691681-8483-800e-b23f-decd904f4348`

**페이지 ID (하이픈 제거):** `2c6916818483800eb23fdecd904f4348`

**페이지 상태:**
- 빈 페이지 ("새 페이지")
- 부모 페이지: "자기 개발" (ID: `1cb89dd2fd714917845c3410716b55d7`)
- 현재 내용: 비어있음 (`<empty-block/>`)

---

## 📄 업데이트하려는 내용

**파일:** `mockdowns/NOTION/01-FSD-아키텍처-개요.md`

**내용 길이:** 약 339줄, 약 8,000 문자

**형식:** Markdown

**주요 내용:**
- FSD 아키텍처 개요
- 레이어 구조 설명
- 코드 예시 포함
- TypeScript 코드 블록 포함

---

## 🔧 MCP 서버 설정

**설정 파일:** `C:\Users\rnsdl\.cursor\mcp.json`

**현재 Notion 설정:**
```json
"Notion": {
  "url": "https://mcp.notion.com/mcp",
  "headers": {}
}
```

**문제점:**
- API 토큰이 설정되어 있지 않음 (`headers`가 비어있음)
- 환경 변수 설정 없음

---

## 🤔 가능한 원인들

### 1. 파라미터 직렬화 문제
- Cursor가 Python dictionary를 JSON으로 변환하는 과정에서 문제 발생
- `data` 파라미터가 문자열로 직렬화되고 있을 가능성

### 2. MCP 도구 정의 문제
- 도구 스키마가 실제 구현과 다를 수 있음
- `data` 파라미터가 중첩 객체를 지원하지 않을 수 있음

### 3. API 토큰 문제
- Notion API 토큰이 없어서 인증 실패 후 파라미터 검증 단계에서 문제 발생 가능
- 하지만 에러 메시지는 파라미터 형식 문제를 지시

### 4. MCP 서버 버전/호환성 문제
- Notion MCP 서버 버전과 Cursor의 호환성 문제
- 도구 시그니처가 변경되었을 가능성

---

## 🔍 추가로 확인이 필요한 사항

1. **MCP 도구 정의 확인**
   - 실제 `notion-update-page` 도구의 정확한 파라미터 스키마
   - 다른 성공 사례의 파라미터 형식

2. **Notion MCP 공식 문서**
   - Notion MCP 서버의 정확한 사용법
   - 파라미터 전달 방식

3. **Cursor MCP 통합 문서**
   - Cursor에서 MCP 도구를 호출하는 정확한 방법
   - 파라미터 직렬화 규칙

4. **다른 MCP 도구와의 비교**
   - 같은 프로젝트의 다른 MCP 도구들(예: `notion-create-pages`)이 작동하는지
   - 작동한다면 어떤 형식으로 파라미터를 전달하는지

---

## 🧪 테스트해볼 수 있는 방법

### 테스트 1: 다른 도구로 페이지 생성
```python
mcp_Notion_notion-create-pages(
  parent={"page_id": "2c6916818483800eb23fdecd904f4348"},
  pages=[{
    "properties": {"title": "FSD 아키텍처 개요"},
    "content": "# FSD 아키텍처 개요\n\n..."
  }]
)
```

### 테스트 2: Properties만 업데이트
```python
mcp_Notion_notion-update-page(
  data={
    "page_id": "2c6916818483800eb23fdecd904f4348",
    "command": "update_properties",
    "properties": {
      "title": "FSD 아키텍처 개요"
    }
  }
)
```

### 테스트 3: 작은 내용으로 테스트
```python
mcp_Notion_notion-update-page(
  data={
    "page_id": "2c6916818483800eb23fdecd904f4348",
    "command": "replace_content",
    "new_str": "# 테스트\n간단한 테스트입니다."
  }
)
```

---

## 📚 참고할 만한 리소스

1. **Notion API 공식 문서**
   - https://developers.notion.com/reference

2. **MCP (Model Context Protocol) 문서**
   - https://modelcontextprotocol.io/

3. **Notion MCP 서버 리포지토리** (있다면)
   - GitHub에서 검색 필요

4. **Cursor MCP 문서**
   - Cursor 공식 문서 또는 커뮤니티 포럼

---

## 🎯 다음 단계 제안

1. ✅ 에러 메시지와 파라미터 형식을 외부에서 검색
2. 🔍 Notion MCP 서버의 정확한 도구 스키마 확인
3. 🧪 위의 테스트 방법들로 단계별 검증
4. 💬 Cursor 커뮤니티나 Notion MCP 관련 포럼에서 비슷한 문제 찾기

---

**에러 발생 시간:** 2025-01-XX (현재)
**도구:** `mcp_Notion_notion-update-page`
**핵심 에러:** `Expected object, received string` for `data` parameter



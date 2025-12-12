# DummyJSON API Reference

Base URL: `https://dummyjson.com` (proxied to `/api` in development)

## Posts API

### Get Posts (Paginated)
```
GET /posts?limit={limit}&skip={skip}
```

**Response:**
```json
{
  "posts": [
    {
      "id": 1,
      "title": "Post title",
      "body": "Post body content...",
      "userId": 1,
      "tags": ["history", "american"],
      "reactions": { "likes": 192, "dislikes": 25 },
      "views": 305
    }
  ],
  "total": 251,
  "skip": 0,
  "limit": 10
}
```

### Search Posts
```
GET /posts/search?q={query}
```

### Get Posts by Tag
```
GET /posts/tag/{tagName}
```

### Get All Tags
```
GET /posts/tags
```

**Response:**
```json
["history", "crime", "mystery", "love", ...]
```

### Create Post
```
POST /posts/add
Content-Type: application/json

{
  "title": "New Post",
  "body": "Content here",
  "userId": 1
}
```

### Update Post
```
PUT /posts/{id}
Content-Type: application/json

{
  "title": "Updated title",
  "body": "Updated content"
}
```

### Delete Post
```
DELETE /posts/{id}
```

---

## Comments API

### Get Comments by Post
```
GET /comments/post/{postId}
```

**Response:**
```json
{
  "comments": [
    {
      "id": 1,
      "body": "Comment text",
      "postId": 1,
      "likes": 5,
      "user": {
        "id": 1,
        "username": "johndoe",
        "fullName": "John Doe"
      }
    }
  ],
  "total": 3,
  "skip": 0,
  "limit": 30
}
```

### Create Comment
```
POST /comments/add
Content-Type: application/json

{
  "body": "Comment text",
  "postId": 1,
  "userId": 1
}
```

### Update Comment
```
PUT /comments/{id}
Content-Type: application/json

{
  "body": "Updated comment"
}
```

### Delete Comment
```
DELETE /comments/{id}
```

### Like Comment
```
PATCH /comments/{id}
Content-Type: application/json

{
  "likes": 1
}
```

---

## Users API

### Get All Users
```
GET /users?limit=0&select=username,image
```

### Get User by ID
```
GET /users/{id}
```

**Response:**
```json
{
  "id": 1,
  "username": "emilys",
  "email": "emily.johnson@x.dummyjson.com",
  "firstName": "Emily",
  "lastName": "Johnson",
  "image": "https://dummyjson.com/icon/emilys/128",
  "phone": "+81 965-431-3024",
  "address": {
    "address": "626 Main Street",
    "city": "Phoenix",
    "state": "Mississippi"
  },
  "company": {
    "name": "Dooley, Kozey and Cronin",
    "title": "Sales Manager",
    "department": "Marketing"
  }
}
```

---

## API Client Usage

```typescript
import { apiClient } from '@/shared/api'

// GET with params
const posts = await apiClient.get<PostsResponse>('/posts', {
  params: { limit: 10, skip: 0 }
})

// POST
const newPost = await apiClient.post<Post>('/posts/add', {
  title: 'New Post',
  body: 'Content',
  userId: 1
})

// PUT
const updated = await apiClient.put<Post>('/posts/1', {
  title: 'Updated'
})

// DELETE
await apiClient.delete('/posts/1')

// PATCH
const liked = await apiClient.patch<Comment>('/comments/1', {
  likes: 1
})
```

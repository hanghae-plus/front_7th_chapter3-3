# 3-9 TanStack Query와 선언적 프로그래밍

## 함수형 프로그래밍과 선언적 프로그래밍

함수형 프로그래밍의 핵심은 상태 변화를 최소화하고 선언적으로 프로그래밍하는 것입니다.

```tsx
const numbers = [1, 2, 3, 4, 5]

// 명령형 프로그래밍 (How - 어떻게 처리할지 명령)
let doubledNumbers = []
for (let i = 0; i < numbers.length; i++) {
  doubledNumbers.push(numbers[i] * 2)
}

// 선언형 프로그래밍 (What - 무엇을 원하는지 선언)
const doubledNumbers = numbers.map((num) => num * 2)
```

복잡한 코드도 선언적으로 개발하면 더 쉬워집니다.

```tsx
const users = [
  { id: 1, name: "John", age: 25 },
  { id: 2, name: "Jane", age: 32 },
  { id: 3, name: "Bob", age: 28 },
]

// 명령형 프로그래밍
let adultUserNames = []
for (let i = 0; i < users.length; i++) {
  if (users[i].age >= 30) {
    adultUserNames.push(users[i].name.toUpperCase())
  }
}

// 선언형 프로그래밍
const adultUserNames = users.filter((user) => user.age >= 30).map((user) => user.name.toUpperCase())
```

let보다는 const를 사용하라는 것은 위와 같은 방법을 떠올리도록 유도하는 장치입니다.

### 비동기 데이터의 관리

그러나 비동기 코드를 다뤄야 할 경우 **기존의 방식으로 선언적으로 작성하는 것은 한계**가 있고, 결국 여러가지 상태를 동반해야합니다.

코드는 항상 지연되어 발생하여 **로딩이 존재하고 에러가 존재하기에 부수적인 데이터들을 관리**해야만 합니다.

```tsx
// 명령형 프로그래밍 (상태 변화 중심)
let users = []
let isLoading = true
let error = null

async function fetchUsers() {
  try {
    const response = await api.get("/users")
    users = response.data
    isLoading = false
  } catch (e) {
    error = e
    isLoading = false
  }
}
```

현대 프론트엔드의 **대부분의 기능들이 api**를 통해서 만들어지는데 api는 비동기처리다 보니 위와 같은 문제점이 드러납니다. 그래서 이를 관리하기 위해서 당시 상태관리인 Redux나 Context 등으로 비동기 데이터 상태 관리를 시도하게 됩니다.

```tsx
// Redux를 사용한 전통적인 방식
const initialState = {
  users: [],
  isLoading: false,
  error: null
};

// 많은 보일러플레이트 코드 필요
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

// 컴포넌트에서의 사용
function UserList() {
  const dispatch = useDispatch();
  **const { users, isLoading, error } = useSelector(state => state.users);**

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // 로딩, 에러, 데이터 표시 로직...
}
```

하지만 이러한 방식은 금세 한계점을 보였습니다. 로딩 상태, 에러 처리, 캐싱, 데이터 동기화 등을 직접 구현하면 많은 보일러플레이트 코드가 필요하였고 모든 api마다 이렇게 작성을 하는 것은 비효율적이었습니다.

---

## TanStack Query와 서버상태관리

상태관리 개념으로 비동기를 다루고 그 방식으로 api를 다룰 것이 아니라, 가장 많이 사용되는 것이 api 처리인만큼 api 처리를 위해 전용적인 관리도구가 필요하다 생각하여 서버상태관리라는 개념이 등장하였습니다.

서버의 상태는 언제나 비동기적인 상황이고, 로딩과 에러가 필요하고, 캐싱과 리페칭이 필요하였습니다. 낙관적 업데이트나 백그라운드 업데이트등 전용 상황들도 등장했습니다.

1. 서버 상태와 클라이언트 상태의 명확한 구분

```jsx
// 서버 데이터 관리
const { data, isLoading } = useQuery({
  queryKey: ["todos"],
  queryFn: fetchTodos,
})

// 클라이언트 상태 관리
const [filter, setFilter] = useState("all")
```

1. 선언적인 데이터 관리

- 복잡한 데이터 패칭 로직을 간단한 훅으로 추상화
- 자동 캐싱과 백그라운드 업데이트 제공

1. 강력한 캐싱 시스템

```jsx
// 캐시 키를 통한 데이터 관리
const { data, isLoading } = useQuery({
  queryKey: ["todo", id],
  queryFn: () => fetchTodoById(id),
})
```

1. 자동화된 상태 관리

- 로딩, 에러, 성공 상태를 자동으로 처리
- 낙관적 업데이트(Optimistic Updates) 지원

1. 데이터 동기화

- 자동 리패칭(백그라운드 갱신)
- 윈도우 포커스 시 자동 갱신
- 네트워크 재연결 시 자동 갱신

1. 성능 최적화

```jsx
// 병렬 쿼리 실행
const [userQuery, todosQuery] = useQueries({
  queries: [
    { queryKey: ["user"], queryFn: fetchUser },
    { queryKey: ["todos"], queryFn: fetchTodos },
  ],
})
```

1. DevTools 지원

- 데이터 상태와 캐시를 실시간으로 모니터링
- 디버깅 용이성 제공

영향과 의의:

1. 서버 상태 관리 패러다임의 변화

- 기존의 전역 상태 관리에서 서버 상태 특화 관리로의 전환
- 선언적이고 직관적인 API 설계의 영향

1. 개발 생산성 향상

- 반복적인 데이터 fetching 로직 감소
- 상태 관리 복잡성 감소

1. 프론트엔드 아키텍처의 진화

- 서버 상태와 클라이언트 상태의 분리
- REST/GraphQL 등 다양한 API 형태 지원

1. 프레임워크 중립적 발전

- React를 넘어 Vue, Svelte 등으로 확장
- 웹 개발 생태계 전반에 영향

TanStack Query는 현대 웹 애플리케이션에서 서버 상태 관리의 복잡성을 크게 줄이고, 개발자가 비즈니스 로직에 더 집중할 수 있게 해주는 중요한 도구가 되었습니다.

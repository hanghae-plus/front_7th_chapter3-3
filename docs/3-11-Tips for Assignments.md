# 3-11. 과제를 위한 팁

## 과제를 위한 팁

### 1. 컴포넌트 분리를 하기 위해서 상태관리는 Context외에도 다양하게 사용할 수 있습니다.

jotai, zustand 등도 함께 고려해보세요.

현재 가장 주목받고 있는 상태관리는 zustand입니다. Redux의 한계에서 새로운 상태관리 대안을 고민하는 과정에서 Redux와 가장 유사하면서 세련되어진 zustand가 많이 사용되었습니다. zustand가 익숙한 사람들은 zustand로 도전을 해보세요.

**상태관리 자체가 아직 익숙지 않은 사람들에게는 zustand보다는 jotai를 사용해서 입문해보기를 권합니다. (과제도요)** jotai는 recoil과 같은 atom형 전역상태관리이며 zustand를 만든 동일한 개발자에 의해 먼저 제안된 상태관리 라이브러리 입니다. 기존의 useState와 사용하는 문법과 표현을 거의 그대로 사용할 수 있도록 만들었기에 자연스럽게 넘어가기에 좋습니다. zustand는 처음부터 zustand스럽게 만들어야 되는게 있어요.

ex)

```ts
const [posts, setPosts] = useState([])
const [selectedPost, setSelectedPost] = useState(null)

const postsAtom = atom([])

const usePost = () => {
  const [posts, setPosts] = useAtom(postsAtom);

  const addPost = (post) => setPosts((posts) => xx.addPost(posts, post))

  return {
    posts,
    setPosts,
    addPost
  }
}

function Component1() {
  const {posts, setPosts} = usePost()
  const [selectedPost, setSelectedPost] = useState(null)
}

function Component2() {
  const {posts, setPosts} = usePost()
  const [selectedPost, setSelectedPost] = useState(null)
}

// pure
const addPost = posts => [...post, post]
const post = usePost()

function handlerAddpost(e) {
  e.value

  const post = {
    title: e.value
  }

  if (validate) {
  setPosts(posts => [posts, ...post])
  post.addPost(post)
  }
}

...
// features/post/model

import { atom, useAtom } from "jotai"

const postsAtom = atom([])
const selectedPostAtom = atom(null)

export const usePost = () => {
  const [posts, setPosts] = useAtom(postsAtom)
  const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom)

  // @TODO: addPost
  // @TODO: removePost
  // @TODO: searchPost

  return new (class {
    posts = posts
    setPosts = setPosts
    selectedPost = selectedPost
    setSelectedPost = setSelectedPost
  })()
}
```

### 2. FSD 경계에 대해서 고민이 된다면?

ps. 어디까지나 저의 주관적 해석입니다. 달라질 수 있습니다. 일관성이 중요하니까 나중에 아니다 싶어도 폴더이동이 제일 쉬운 리팩토링입니다. 일단 쪼개놓으면 정돈이야 쉽죠?

```plaintext
// pure
entitiy + ui = readonly component
entitiy + api = fetch, axios
entitiy + model = type + computational function(=pure function) 2-2

// React Layer
features + ui = component + 1 handler
features + api = Tanstack(=useQuery, useMutation), API Store
features + model = useCustomHook

// UI 말고 Component들
widgets + ui = component without handler!
widgets + api = widgets 전용 api ex) main banner, features
widgets + model = 잘 안쓰임

// 그 Page!
pages + ui = Page!
pages + api = page 전용 api ex) main banner, features
pages + model = Route


관련된것은 가까이 두어야 합니다.

처음부터 나누려고 하지말고, 그냥 Page에서 시작하고
api면 api폴더에
ui면 ui폴더에
model이면 model폴더에
만들어두시다가
내려가야 될때가 오면 그때 내려보내세요.

// 가이드입니다. 일관성 있는 나만의 핵심 Rule을 만들어보세요 :)
```

### 3. 의존, 그리고 책임과 범위 - 어떤 Props는 받아야 하고 어떤 Props는 받지 말까?

어떤 Props는 외부로 부터 받아야 하고 어떤 기능은 컴포넌트에게 책임을 가져야 하는지 잘 생각해보세요.

단일책임원칙에서 책임을 이해하는 것은 중요합니다.

외부로 부터 import하거나 props를 받는 것은 위임이고
내가 처리하는 것은 나의 책임입니다.

이를 이해하면 단방향 의존성과 단일책임을 가지는 멋진 경계를 만들 수 있습니다.

---

# [부록] Teo’s FSD Convention Guidelines

## 1. Standard Roles in Each Slice

```ts
slice/
  ├── ui/      // Visual components
  ├── model/   // Business logic, types, state
  ├── api/     // Data fetching
  ├── lib/     // Utils, helpers
  └── config/  // Constants, configurations

```

## 2. Layer-Specific Conventions

### Entity Layer

```tsx
entities/product/
  ui/     // Read-only presentational components
  api/    // axios, fetch Basic CRUD operations
  model/  // Pure business logic + types
  lib/    // Entity-specific utilities ex) removeItem,
  config/ // Entity configurations ex) MAX_POST_LENGTH

```

**Rules:**

- All functions must be pure (same input = same output)
- No side effects
- No state management
- No external dependencies
- No API calls within functions
- Focused on data transformation with own scheme
- Reusable across different features
- Testable with pure unit tests
- `ui`: Pure presentational components
- `model`: Contains pure functions, business logic, and type definitions

**Key Point: pure!**

**Example:**

```ts
// ✅ Good
// entities/product/model/validation.ts
export const isValidProduct = (product: Product): boolean => {
  return product.price > 0 && product.stock >= 0
}

// ❌ Bad
// Impure function with side effects
export const updateProductPrice = (product: Product, newPrice: number) => {
  product.price = newPrice // Mutation!
  api.updateProduct(product) // Side effect!
}
```

---

### Features Layer

**Components to Include:**

1. Main action component
2. All related form inputs
3. All supporting UI elements

**Rules**

1. **One feature = One primary user action**
   - Include **one primary user action**
   - Include all supporting UI elements
   - All related form inputs belong together
2. **Hook-Based Logic**
   - Business logic lives in hooks
   - Each hook has single responsibility
3. **Props Guidelines**
   - Accept only domain data
   - No event handler props
   - No UI configuration props

### Examples

### ✅ Good Example

**Primary user action + Domain Props + hooks**

```ts
// features/addToCart/ui/AddToCartButton.tsx
export const AddToCartButton = ({ product }: { product: Product }) => {
  const { addToCart, isLoading } = useAddToCart();

  function handleAddToCart(product:Product) {
    addToCart(product)
  }

  return (
    <Button
      onClick={() => handleAddToCart(product)}
      disabled={isLoading}
    >
      Add to Cart
    </Button>
  );
}

// features/addToCart/model/useAddToCart.ts
export const useAddToCart = () => {
  const { mutate, isLoading } = useAddToCartMutation();

  const handleAddToCart = (productId: string) => {
    mutate(productId);
  };

  return { handleAddToCart, isLoading };
};

```

All related form inputs + All supporting UI elements

```ts
// ✅ Good Example 2: Action with Input State
// features/addComment/ui/AddCommentForm.tsx
export const AddCommentForm = ({ productId }: { productId: string }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    api.addComment(productId, comment);
    setComment("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <TextArea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
      />
      <Button type="submit">
        Add Comment
      </Button>
    </Form>
  );
}
```

### ❌ Bad Examples

**Props with Event Handlers**

```tsx
// ❌ Bad Example 1: Too Many Responsibilities
// features/product/ui/ProductActions.tsx
export const ProductActions = ({
  product,
  onAddToCart, // ❌ Receiving handlers as props
  onWishlist, // ❌ Should handle internally
  theme, // ❌ UI config props
  className, // ❌ Style props
}) => {
  return (
    <div className={className}>
      <Button onClick={() => onAddToCart(product)} theme={theme}>
        Add to Cart
      </Button>

      <Button onClick={() => onWishlist(product)}>Wishlist</Button>
    </div>
  )
}
```

**features has No user Action**

```tsx
// ❌ Bad Example 1: No Handler (Should be in Entity or Widget)
// features/product/ui/ProductPrice.tsx
export const ProductPrice = ({ price }: { price: number }) => {
  return <div className="text-lg">${price.toFixed(2)}</div>
}
```

### Widgets Layer

```tsx
widgets/header/
  ui/     // Composition of features
  api/    // Widget-specific APIs
  model/  // Types + minimal logic
  lib/    // Widget-specific utilities
  config/ // Widget configurations

```

**Rules:**

- Compose features, don't create new handlers
- Only domain data as props
- or Nothing props

### Pages Layer

```tsx
pages/main/
  ui/     // Page composition
  api/    // Page-specific data
  model/  // Routes + types
  lib/    // Page-specific utilities
  config/ // Page configurations
```

## 3. Props Guidelines

### For shared/ui ONLY:

- Can accept event handlers
- Can accept styling props
- Can accept configuration props

### For All Other Components:

```tsx
// ✅ Good
const ProductCard = ({ product }) => { ... }

// ❌ Bad
const ProductCard = ({ product, onAddToCart, onWishlist }) => { ... }

```

- Accept only domain data
- Avoid event handlers
- Avoid configuration props
- Avoid styling props

## 5. Dependencies

Unidirectional flow:

```
pages → widgets → features → entities → shared
```

Key rules:

- Lower layers cannot import from higher layers
- Each layer can only import from layers below it
- `shared` is the foundation - no dependencies

---

# [부록] Teo’s Naming Conventions

## Component Names (Domain First)

```tsx
// ✅ Good
ProductAddButton.tsx
ProductDeleteButton
CartRemoveButton.tsx
OrderSubmitForm.tsx

// ❌ Bad
AddProductButton.tsx
DeleteProductButton.tsx
RemoveFromCartButton.tsx
SubmitOrderForm.tsx
```

## Event Handlers (handle + Function)

```tsx
// ✅ Good
function handleAddProduct() {}
function handleRemoveCartItem() {}
function handleSubmitOrder() {}

search "function handle"

// ❌ Bad
function addProduct() {}
function onCartRemove() {}
function submitOrder() {}

```

## Domain Hooks

```tsx
// Domain Hooks
// ✅ Good
useProduct()
useCart()
useOrder()

// ❌ Bad
useProductLogic()
useCartHandler()
useOrderHelpers()
```

## API Hooks

```tsx
// API Hooks + api path
// ✅ Good
useQueryProducts()
useQueryOrderStatus()
useMutationCartAdd()

// ❌ Bad
useProductsData()
useAddToCart()
useOrderStatusFetch()
```

## Full Example:

```tsx
// features/product/add/ui/ProductAddButton.tsx
export const ProductAddButton = () => {
  const { product } = useProduct()
  const { mutate } = useMutationProductAdd()

  function handleProductAdd() {
    mutate(product.id)
  }

  return <Button onClick={handleProductAdd}>Add</Button>
}
```

**Key Points:**

1. Components: Domain first
2. Handlers: `handle-` prefix
3. Domain Hooks: `use{Domain}`
4. API Hooks: `useQuery-` or `useMutation-`
5. Consistency in casing rules

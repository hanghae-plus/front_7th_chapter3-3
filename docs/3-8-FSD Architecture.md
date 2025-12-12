# 3-8-FSD 아키텍쳐의 배경과 의의

[📚 Reference | Feature-Sliced Design](https://feature-sliced.design/docs/reference)

대규모 프로젝트에서 수직(Layer) 관심사와 수평적 관심사를 모두 포함할 수 있는 폴더구조를 만들고,

최대한 미리 정해진 규칙에 따라 작성하도록 하여

1. 관심사를 분리할 수 있도록 하고
2. 예측가능한 구조를 만들기 위한 컨벤션

---

![image.png](https://feature-sliced.design/assets/images/visual_schema-e826067f573946613dcdc76e3f585082.jpg)

![**Layer**](https://feature-sliced.design/kr/img/layers/folders-graphic-light.svg#light-mode-only)

**Layer**

![**Slice**](https://feature-sliced.design/kr/assets/images/graphic-nested-slices-b9c44e6cc55ecdbf3e50bf40a61e5a27.svg)

**Slice**

---

## Layer

FSD는 위에서 아래로 다음과 같은 레이어로 구성됩니다:

1. **app 레이어** (최상위)
   - 애플리케이션의 전체적인 설정과 초기화를 담당
   - 실제 예시:
     - 글로벌 스타일 설정
     - 라우팅 설정
     - 스토어 초기화
     - 다국어 설정
2. **processes 레이어**
   - 페이지 간 비즈니스 프로세스를 처리
   - 실제 예시:
     - 사용자 인증 흐름
     - 결제 프로세스
     - 회원가입 단계별 진행
3. **pages 레이어**
   - 실제 페이지를 구성하는 컴포넌트들
   - 실제 예시:
     - 홈페이지
     - 상품 목록 페이지
     - 마이페이지
     - 장바구니 페이지
4. **widgets 레이어**
   - 재사용 가능한 복잡한 UI 블록
   - 실제 예시:
     - 헤더 네비게이션
     - 상품 검색 필터
     - 댓글 위젯
     - 장바구니 미니 위젯
5. **features 레이어**
   - 특정 비즈니스 기능을 담당
   - 실제 예시:
     - 상품 정렬 기능
     - 좋아요 버튼
     - 리뷰 작성 폼
     - 수량 선택기
6. **entities 레이어**
   - 비즈니스 엔티티와 관련된 로직
   - 실제 예시:
     - 상품(Product) 모델
     - 사용자(User) 모델
     - 주문(Order) 모델
     - 리뷰(Review) 모델
7. **shared 레이어** (최하위)
   - 공통으로 사용되는 유틸리티와 UI 컴포넌트
   - 실제 예시:
     - UI 버튼, 인풋 컴포넌트
     - 날짜 포맷팅 유틸
     - API 클라이언트
     - 타입 정의

각 레이어의 주요 특징:

- 상위 레이어는 하위 레이어에 의존할 수 있지만, 그 반대는 불가능
- 각 레이어는 자신의 책임만을 가짐
- 모든 레이어는 shared 레이어를 사용할 수 있음

---

## segment

FSD의 각 세그먼트(segment)의 특징

### 1. **ui 세그먼트**

```tsx
// ui/ProductCard.tsx
const ProductCard = ({ product }) => {
  return (
    <div>
      <h3>{product.name}</h3>
      <PriceDisplay price={product.price} />
      <AddToCartButton productId={product.id} />
    </div>
  )
}
```

**특징:**

- 순수한 표현 컴포넌트
- 비즈니스 로직을 포함하지 않음
- props를 통해 데이터와 이벤트 핸들러를 받음
- 재사용 가능한 UI 컴포넌트들의 집합

### 2. **model 세그먼트**

```tsx
// model/types.ts
interface Product {
  id: string;
  name: string;
  price: number;
}

// model/store.ts
const addProduct => (product: Product) {
  return [...products, product]
}

const getProduct => (id: string) {
  return products.find(p => p.id === id);
}

const validateProductData = (product: Product): boolean => {
  return product.name.length > 0 && product.price > 0;
};
```

**특징:**

- 데이터 구조(타입, 인터페이스) 정의
- 상태 관리 로직
- 비즈니스 규칙과 유효성 검사
- 다른 세그먼트에서 사용할 공통 로직

### 3. **api 세그먼트**

```tsx
// api/productApi.ts
export const productApi = {
  fetchProducts: async () => {
    const response = await axios.get("/api/products")
    return response.data
  },

  createProduct: async (product: Product) => {
    const response = await axios.post("/api/products", product)
    return response.data
  },
}
```

**특징:**

- 외부 서비스와의 통신 담당
- API 엔드포인트 정의
- 데이터 변환 (DTO 변환)
- 에러 처리

### 4. **lib 세그먼트**

```tsx
// lib/helpers.ts
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  }).format(price)
}
```

**특징:**

- 유틸리티 함수들의 모음
- 순수 함수들로 구성
- 도메인 특화 헬퍼 함수
- 재사용 가능한 로직

### 5. **config 세그먼트**

```tsx
// config/constants.ts
export const PRODUCT_CONFIG = {
  MAX_NAME_LENGTH: 100,
  MIN_PRICE: 100,
  DEFAULT_CURRENCY: "KRW",
  IMAGE_SIZES: {
    THUMBNAIL: { width: 200, height: 200 },
    FULL: { width: 800, height: 600 },
  },
}
```

**특징:**

- 상수 값 정의
- 환경 설정
- 도메인별 설정 값
- 전역 설정

### 세그먼트 간의 관계

```tsx
// 전체적인 구조 예시
src/
└── entities/
    └── product/
        ├── ui/
        │   ├── ProductCard.tsx     // UI 컴포넌트
        │   └── ProductList.tsx
        ├── model/
        │   ├── types.ts           // 타입 정의
        │   └── store.ts           // 상태 관리
        ├── api/
        │   └── productApi.ts      // API 통신
        ├── lib/
        │   └── helpers.ts         // 유틸리티
        └── config/
            └── constants.ts       // 설정
```

### 세그먼트의 장점:

1. **관심사의 분리**
   - 각 세그먼트가 특정 역할에 집중
   - 코드의 복잡도 감소
2. **재사용성**
   - 세그먼트별로 독립적인 기능 제공
   - 다른 도메인에서 쉽게 재사용 가능
3. **유지보수성**
   - 명확한 구조로 인한 코드 파악 용이
   - 변경 사항의 영향 범위 최소화

**Layer + Slice + Segment**

| 층       | `ui`                                                                                           | `model`                                                                                                                                                                                                                                                              | `lib`                                                                                                                                                                         | `api`                                                                                                                    |
| -------- | ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Shared   | UI kit                                                                                         | 일반적으로 사용되지 않음                                                                                                                                                                                                                                             | 여러 관련 파일의 유틸리티 모듈.개별 헬퍼를 사용해야 하는 경우 .과 같은 유틸리티 라이브러리를 사용하는 것을 고려하세요 [`lodash-es`](https://www.npmjs.com/package/lodash-es). | 인증이나 캐싱과 같은 추가 기능이 있는 기본 API 클라이언트입니다.                                                         |
| Entities | 대화형 요소를 위한 슬롯이 있는 비즈니스 엔터티의 골격                                          | 이 엔티티의 인스턴스에 대한 데이터 저장소와 해당 데이터를 조작하는 기능.이 세그먼트는 서버 측 데이터를 저장하는 데 가장 적합합니다. [TanStack Query](https://tanstack.com/query/latest) 또는 다른 암묵적 저장 방법을 사용하는 경우 이 세그먼트를 생략할 수 있습니다. | 저장소와 관련이 없는 이 엔터티의 인스턴스를 조작하기 위한 기능                                                                                                                | 백엔드와의 쉬운 통신을 위해 Shared의 API 클라이언트를 사용하는 API 방법                                                  |
| Features | 사용자가 이 기능을 사용할 수 있도록 하는 대화형 요소                                           | 비즈니스 로직 및 인프라 데이터 저장소(필요한 경우)(예: 현재 앱 테마). 이는 실제로 사용자에게 가치를 제공하는 코드입니다.                                                                                                                                             | `model`세그먼트 내 비즈니스 로직을 간결하게 설명하는 데 도움이 되는 인프라 코드                                                                                               | 백엔드에서 이 기능을 나타내는 API 메서드.엔티티에서 API 메서드를 구성할 수 있습니다.                                     |
| Widgets  | 엔티티와 기능을 독립형 UI 블록으로 구성합니다.오류 경계와 로딩 상태도 포함할 수 있습니다.      | 필요한 경우 인프라 데이터 저장                                                                                                                                                                                                                                       | 비즈니스와 관련되지 않은 상호작용(예: 제스처) 및 블록이 페이지에서 기능하는 데 필요한 기타 코드                                                                               | 일반적으로 사용되지 않지만 중첩된 라우팅 컨텍스트(예: [Remix](https://remix.run/) ) 에 데이터 로더를 포함할 수 있습니다. |
| Pages    | 엔티티, 기능 및 위젯을 완전한 페이지로 구성합니다.오류 경계 및 로딩 상태도 포함할 수 있습니다. | 일반적으로 사용되지 않음                                                                                                                                                                                                                                             | 비즈니스와 관련되지 않은 상호작용(예: 제스처) 및 페이지에서 완전한 사용자 경험을 제공하는 데 필요한 기타 코드                                                                 | SSR 지향 프레임워크를 위한 데이터 로더                                                                                   |

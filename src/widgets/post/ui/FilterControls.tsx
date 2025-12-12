import OrderSelect from "../../../features/post/ui/OrderSelect"
import SearchInput from "../../../features/post/ui/SearchInput"
import SortBySelect from "../../../features/post/ui/SortBySelect"
import TagSelect from "../../../features/tag/ui/TagSelect"

const FilterControls = () => {
  return (
    <div className="flex gap-4">
      <SearchInput />
      <TagSelect />
      <SortBySelect />
      <OrderSelect />
    </div>
  )
}

export default FilterControls

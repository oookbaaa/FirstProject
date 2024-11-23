
import Form from "next/form"
import SearchFormReset from "./SearchFormReset"
import { SearchIcon } from "lucide-react"

const SearchForm = ({query}: {query?: string}) => {
    
   
  return (
    <Form action="/" scroll={false} className='search-form'>
        <input className="search-input" defaultValue={query} name="query" placeholder="Search..." />
        <div className="flex gap-2">
            {query && <SearchFormReset/>}
            <button className="search-btn text-white" type="submit">
              <SearchIcon size={24} />
            </button>
        </div>
    </Form>
  )
}

export default SearchForm
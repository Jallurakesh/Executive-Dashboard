export default function SearchBar({ query, setQuery }){
  return (
    <input className="search" placeholder="Search widgets (catalog)..." value={query} onChange={e=>setQuery(e.target.value)} />
  )
}

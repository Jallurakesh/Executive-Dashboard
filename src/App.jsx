import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Category from './components/Category'
import SearchBar from './components/SearchBar'
import AddWidgetModal from './components/AddWidgetModal'
import { addWidgetToCategory, createWidget, persist, reset } from './widgetsSlice'
import seed from './data/seed.json'

export default function App(){
  const dispatch = useDispatch()
  const { categories, allWidgets } = useSelector(s=>s.widgets)
  const [query, setQuery] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState(null)

  useEffect(()=>{
    dispatch(persist())
  }, [categories, allWidgets, dispatch])

  const matches = useMemo(() => {
    if(!query) return allWidgets
    const q = query.toLowerCase()
    return allWidgets.filter(w => (w.name + ' ' + w.type + ' ' + (w.text||'')).toLowerCase().includes(q))
  }, [query, allWidgets])

  const openAdd = (categoryId) => {
    setActiveCategory(categoryId)
    setModalOpen(true)
  }

  const onCreate = ({name, type, text}) => {
    if(!name) return
    dispatch(createWidget({name, type, text}))
    setModalOpen(false)
  }

  const onAddExisting = (widget) => {
    dispatch(addWidgetToCategory({ categoryId: activeCategory, widget }))
    setModalOpen(false)
  }

  return (
    <div className="container">
      <div className="toolbar">
        <div className="row">
          <div className="title">Executive Dashboard</div>
          <span className="pill">React + Redux Toolkit + Recharts</span>
        </div>
        <div className="row">
          <SearchBar query={query} setQuery={setQuery} />
          <button className="btn secondary" onClick={()=>setModalOpen(true)}>+ Add Widget</button>
          <button className="btn secondary" onClick={()=>dispatch(reset())}>Reset</button>
          <a className="btn" href="https://recharts.org/en-US/examples" target="_blank" rel="noreferrer">Recharts Examples</a>
        </div>
      </div>

      {/* Catalog */}
      <div className="card" style={{marginBottom:16}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <h3>Widget Catalog</h3>
          <span className="muted">{matches.length} results</span>
        </div>
        <div className="grid" style={{rowGap:12}}>
          {matches.map(w => (
            <div key={w.id} className="card" style={{gridColumn:'span 3'}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div>
                  <div style={{fontWeight:700}}>{w.name}</div>
                  <div className="muted small">{w.type.toUpperCase()}</div>
                </div>
                <button className="btn small" onClick={()=>onAddExisting(w)}>Add</button>
              </div>
              {w.text && <p className="muted small" style={{marginTop:8}}>{w.text}</p>}
            </div>
          ))}
          {matches.length === 0 && <div className="muted">No results for “{query}”.</div>}
        </div>
      </div>

      {/* Categories */}
      <div className="grid">
        {categories.map(cat => (
          <div key={cat.id} className="category">
            <Category category={cat} data={seed} onOpenAdd={openAdd} />
          </div>
        ))}
      </div>

      <AddWidgetModal
        open={modalOpen}
        onClose={()=>setModalOpen(false)}
        onCreate={onCreate}
        onAddExisting={onAddExisting}
        available={allWidgets}
      />

      <div className="footer small">State is saved in your browser (localStorage). Add/remove widgets, search catalog, and use the Shuffle button on charts to see dynamic updates.</div>
    </div>
  )
}

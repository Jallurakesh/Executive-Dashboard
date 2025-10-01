import { useDispatch } from 'react-redux'
import WidgetCard from './WidgetCard'
import { removeWidgetFromCategory } from '../widgetsSlice'

export default function Category({ category, data, onOpenAdd }){
  const dispatch = useDispatch()
  const onRemove = (instanceId) => {
    dispatch(removeWidgetFromCategory({ categoryId: category.id, instanceId }))
  }

  return (
    <section className="category">
      <div className="category-head">
        <div className="row">
          <h2 style={{margin:0}}>{category.name}</h2>
          <span className="pill">{category.widgets.length} widgets</span>
        </div>
        <div className="row">
          <button className="btn secondary" onClick={()=>onOpenAdd(category.id)}>+ Add Widget</button>
        </div>
      </div>
      <div className="widgets">
        {category.widgets.map(w => (
          <WidgetCard key={w.instanceId} widget={w} onRemove={onRemove} data={data} />
        ))}
        {category.widgets.length === 0 && (
          <div className="card" style={{gridColumn:'span 12'}}>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
              <div>
                <h3>No widgets yet</h3>
                <p className="muted">Click <span className="kbd">+ Add Widget</span> to populate this category.</p>
              </div>
              <button className="btn" onClick={()=>onOpenAdd(category.id)}>Add your first widget</button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

import { useState } from 'react'

export default function AddWidgetModal({ open, onClose, onCreate, available, onAddExisting }){
  const [name, setName] = useState('')
  const [type, setType] = useState('bar')
  const [text, setText] = useState('')

  if(!open) return null

  return (
    <div className="modal-backdrop" style={{display:'flex'}}>
      <div className="modal">
        <h2>Add Widget</h2>
        <div className="field">
          <label>Name</label>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Widget name" />
        </div>
        <div className="field">
          <label>Type</label>
          <select value={type} onChange={e=>setType(e.target.value)}>
            <option value="bar">Bar (dynamic)</option>
            <option value="line">Line (dynamic)</option>
            <option value="pie">Pie (dynamic)</option>
            <option value="note">Text</option>
          </select>
          <span className="muted">Chart widgets include a Shuffle button for dynamic updates.</span>
        </div>
        <div className="field">
          <label>Text</label>
          <textarea rows={3} value={text} onChange={e=>setText(e.target.value)} placeholder="Optional description" />
        </div>
        <div className="row" style={{justifyContent:'flex-end'}}>
          <button className="btn secondary" onClick={onClose}>Cancel</button>
          <button className="btn" onClick={()=>{ onCreate({name, type, text}); setName(''); setText('') }}>Create in Catalog</button>
        </div>
        <hr style={{border:'none', borderTop:'1px solid #20304f', margin:'14px 0'}} />
        <div>
          <h3>Or add from existing</h3>
          <div className="muted small" style={{marginBottom:8}}>Pick from the catalog to add into this category.</div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:8, maxHeight:220, overflow:'auto'}}>
            {available.map(w => (
              <button key={w.id} className="btn secondary" onClick={()=>onAddExisting(w)}>{w.name} — {w.type}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

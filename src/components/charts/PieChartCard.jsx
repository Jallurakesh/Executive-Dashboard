import { useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'

export default function PieChartCard({ title, data }){
  const [values, setValues] = useState(data)
  const shuffle = () => setValues(prev => prev.map(d => ({...d, value: Math.max(1, Math.round(d.value * (0.6 + Math.random()*0.8)))})))
  return (
    <div className="card" style={{height:260}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
        <h3>{title}</h3>
        <button className="btn secondary small" onClick={shuffle}>Shuffle</button>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={values} dataKey="value" nameKey="name" outerRadius={80} label />
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

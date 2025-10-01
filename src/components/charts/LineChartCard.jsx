import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

export default function LineChartCard({ title, data }){
  const [values, setValues] = useState(data)
  const shuffle = () => setValues(prev => prev.map(d => ({...d, value: Math.max(1, Math.round(d.value * (0.6 + Math.random()*0.8)))})))
  return (
    <div className="card" style={{height:260}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
        <h3>{title}</h3>
        <button className="btn secondary small" onClick={shuffle}>Shuffle</button>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={values}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

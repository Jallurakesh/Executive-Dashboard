import BarChartCard from './charts/BarChartCard'
import PieChartCard from './charts/PieChartCard'
import LineChartCard from './charts/LineChartCard'

export default function WidgetCard({ widget, onRemove, data }){
  const { name, type, text, instanceId } = widget

  const render = () => {
    if (type === 'bar') return <BarChartCard title={name} data={data.risks} />
    if (type === 'pie') return <PieChartCard title={name} data={data.assets} />
    if (type === 'line') return <LineChartCard title={name} data={data.alerts} />
    return (
      <div className="card" style={{minHeight:220}}>
        <h3>{name}</h3>
        <p className="muted">{text || 'Random text for assignment'}</p>
      </div>
    )
  }

  return (
    <div className="widget">
      <div className="actions">
        <button className="btn danger small" onClick={() => onRemove(instanceId)} title="Remove">✕</button>
      </div>
      {render()}
    </div>
  )
}

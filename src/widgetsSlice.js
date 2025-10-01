import { createSlice, nanoid } from '@reduxjs/toolkit'

const initial = (() => {
  const persisted = localStorage.getItem('dashboard-state')
  if (persisted) return JSON.parse(persisted)
  return {
    categories: [
      { id: 'cspm', name: 'CSPM Executive Dashboard', widgets: [] },
      { id: 'cnapp', name: 'CNAPP Overview', widgets: [] },
    ],
    allWidgets: [
      { id: nanoid(), name: 'Risk Overview', type: 'bar', text: 'Cloud risk by severity', dataKey: 'risks' },
      { id: nanoid(), name: 'Assets by Type', type: 'pie', text: 'Distribution by asset type', dataKey: 'assets' },
      { id: nanoid(), name: 'Alerts by Day', type: 'line', text: 'Alert trend last 7 days', dataKey: 'alerts' },
      { id: nanoid(), name: 'Notes', type: 'note', text: 'Just a text widget', dataKey: '' },
    ]
  }
})()

const slice = createSlice({
  name: 'widgets',
  initialState: initial,
  reducers: {
    addWidgetToCategory: {
      reducer(state, action) {
        const { categoryId, widget } = action.payload
        const cat = state.categories.find(c => c.id === categoryId)
        if (!cat) return
        cat.widgets.push({ ...widget, instanceId: nanoid() })
      },
      prepare({ categoryId, widget }) {
        return { payload: { categoryId, widget } }
      }
    },
    removeWidgetFromCategory(state, action) {
      const { categoryId, instanceId } = action.payload
      const cat = state.categories.find(c => c.id === categoryId)
      if (!cat) return
      cat.widgets = cat.widgets.filter(w => w.instanceId !== instanceId)
    },
    createWidget: {
      reducer(state, action) {
        state.allWidgets.push(action.payload)
      },
      prepare({ name, type, text }) {
        return { payload: { id: nanoid(), name, type, text, dataKey: type } }
      }
    },
    deleteFromCatalog(state, action) {
      const id = action.payload
      state.allWidgets = state.allWidgets.filter(w => w.id !== id)
      // also remove from categories
      state.categories.forEach(c => {
        c.widgets = c.widgets.filter(w => w.id !== id)
      })
    },
    persist(state) {
      localStorage.setItem('dashboard-state', JSON.stringify(state))
    },
    reset(state) {
      localStorage.removeItem('dashboard-state')
      return initial
    }
  }
})

export const { addWidgetToCategory, removeWidgetFromCategory, createWidget, deleteFromCatalog, persist, reset } = slice.actions
export default slice.reducer

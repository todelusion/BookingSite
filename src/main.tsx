import React from 'react'
import ReactDOM from 'react-dom/client'

import DatepickerNoRrange from './datepickerNoRrange/App'
import './assets/tailwind.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <div className='relative h-screen'>
      <div className='absolute left-1/2 top-1/4'>
        <DatepickerNoRrange />
      </div>
        
    </div>
  </React.StrictMode>
)

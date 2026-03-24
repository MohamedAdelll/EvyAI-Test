import 'tailwindcss/tailwind.css'
import './style.css'

import App from 'components/App'
import { createRoot } from 'react-dom/client'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)
root.render(<App />)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { Provider } from 'react-redux'
import { store } from './store'
import { MainPage } from './pages'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
      <StrictMode>
        <MainPage />
      </StrictMode>
  </Provider>
)

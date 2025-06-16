import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './store'
import { IntlProvider } from 'react-intl';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <IntlProvider locale="zh-CN">
        <App />
      </IntlProvider>
    </Provider>
  </StrictMode>,
)

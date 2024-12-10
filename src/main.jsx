import { createRoot } from 'react-dom/client'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import App from './App.jsx'

import {Provider} from "react-redux"
import {store} from "./store/index.js";
import {ToastContainer} from "react-toastify";

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
      <ToastContainer />
  </Provider>,
)
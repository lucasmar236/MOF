import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/scss/bootstrap.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from "./services/configureStore";
import {BrowserRouter} from "react-router-dom";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
      </Provider>
  </React.StrictMode>
);
reportWebVitals();

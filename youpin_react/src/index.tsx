import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import IndexNesting from './views/IndexNesting';
import './scss/GoodsDetail.scss'
import './scss/GoodsDetailImg.scss'
import IndexRouter from './Router/IndexRouter'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <IndexRouter />
);
reportWebVitals();

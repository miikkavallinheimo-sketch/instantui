import React from 'react';
import ReactDOM from 'react-dom/client';
import DecorativeElementsDemo from './components/decorative/DecorativeElementsDemo';
import './index.css';

ReactDOM.createRoot(document.getElementById('decorative-root')!).render(
  <React.StrictMode>
    <DecorativeElementsDemo />
  </React.StrictMode>
);

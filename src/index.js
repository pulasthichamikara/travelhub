import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { UserContexProvider } from './contex/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContexProvider>
      {/* <App /> */}
      <>test</>
    </UserContexProvider>
  </React.StrictMode>
);

reportWebVitals();

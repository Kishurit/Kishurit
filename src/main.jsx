import React from 'react';
import { createRoot } from 'react-dom/client'; // Correct import from react-dom
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider } from 'react-bootstrap';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'; // Removed unused import useQuery

import './App.css';
import './style/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const queryClient = new QueryClient();

// Corrected import and usage of createRoot
const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ThemeProvider dir="rtl">
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

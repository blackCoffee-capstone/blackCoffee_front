import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// style
import './assets/style/reset.css'
import './assets/style/common.css'
import 'swiper/css/bundle'; // swiper style 한번에 적용
// recoil
import { RecoilRoot } from 'recoil'
// react-query
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
			suspense: true,
      // useErrorBoundary: true,
    },
    // mutations: {
    //   useErrorBoundary: true,
    // },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);

// import reportWebVitals from './reportWebVitals';
// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
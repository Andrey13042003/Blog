import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux/es/exports';
import App from './components/App';
import store from './Redux/Store';

import 'bootstrap/dist/css/bootstrap.css';

document.body.style.backgroundColor = '#E5E5E5';
const root = ReactDOM.createRoot(document.querySelector('.blog'));
root.render(
  <Provider store={store}> 
    <App />
  </Provider>
);
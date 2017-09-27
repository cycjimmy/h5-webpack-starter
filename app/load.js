// global css
import './theme/main.scss';

// component
import LoadingComponent from './loadingComponent/Loading.component';

document.addEventListener('readystatechange', () => {
  console.log('documentReadyState: ' + document.readyState);
});

new LoadingComponent().load();

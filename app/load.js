// global css
import './theme/main.scss';

// polyfill
import './polyfill';

// component
import LoadingComponent from './loadingComponent/Loading.component';
import PromptMobileComponentIns from './share/promptMobile/PromptMobile.component.ins';

document.addEventListener('readystatechange', () => {
  console.log('documentReadyState: ' + document.readyState);
});

Promise.resolve()
  .then(() => new PromptMobileComponentIns().load())
  .then(() => new LoadingComponent().load())
  .catch(e => console.error(e));

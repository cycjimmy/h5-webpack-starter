// global css
import './theme/main.scss';

// component
import LoadingComponent from './loadingComponent/Loading.component';
import PromptMobileComponentIns from './share/promptMobile/PromptMobile.component.ins';

document.addEventListener('readystatechange', () => {
  console.log('documentReadyState: ' + document.readyState);
});

new PromptMobileComponentIns().load()
  .then(() => new LoadingComponent().load())
  .catch((err) => {
    console.log(err);
  });

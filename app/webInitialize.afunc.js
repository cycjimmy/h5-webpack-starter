/**
 *  web init
 */

// component
import MainComponent from './mainComponent/Main.component';
import PromptMobileComponentIns from './share/promptMobile/PromptMobile.component.ins';
import PromptOrientationComponent from './share/promptOrientation/PromptOrientation.component';

export default () => {
  if (new PromptMobileComponentIns().getIsMobile()) {
    return Promise.all([
      new MainComponent().load(),
      new PromptOrientationComponent().load(),
    ])
      .catch(err => console.error('Failed to init', err));
  }
};


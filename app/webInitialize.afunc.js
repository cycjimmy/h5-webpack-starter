import root from './pages/root';
import PromptMobileComponentIns from './share/promptMobile/PromptMobile.component.ins';
import PromptOrientationComponentIns from './share/promptOrientation/PromptOrientation.component.ins';
import weChatShare from './weChatShare';

export default () => Promise.resolve()
  .then(() => new PromptMobileComponentIns().getIsMobile()
    ? Promise.resolve()
    : Promise.reject())
  .then(() => Promise.all([
    weChatShare(),
    new root().init(),
    new PromptOrientationComponentIns().load(),
  ]))
  .catch(err => console.error('Failed to init', err));



import root from './pages/root';
import promptMobile from './popups/promptMobile/promptMobile.component.ins';
import promptOrientation from './popups/promptOrientation/promptOrientation.component.ins';
import weChatShare from './shared/weChatShare';

export default () => Promise.resolve()
  .then(() => (promptMobile.getIsMobile()
    ? Promise.resolve()
    : Promise.reject()))
  .then(() => Promise.all([
    weChatShare(),
    root.init(),
    promptOrientation.load(),
  ]))
  .catch((err) => console.error('Failed to init', err));

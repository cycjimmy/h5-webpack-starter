import root from './pages/root';
import promptOrientation from './popups/promptOrientation/promptOrientation.component.ins';
import weChatShare from './shared/weChatShare';

export default () => Promise.resolve()
  .then(() => Promise.all([
    weChatShare(),
    root.init(),
    promptOrientation.load(),
  ]))
  .catch((err) => console.error('Failed to load', err));

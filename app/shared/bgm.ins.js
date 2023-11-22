import { h5Pages } from '@cycjimmy/h5-pages';
import h5AudioControls from '@cycjimmy/h5-audio-controls';

import staticFiles from '@/staticFiles';

export default h5AudioControls(staticFiles.bgm, {
  context: h5Pages.root,
  positionType: 'absolute',
});

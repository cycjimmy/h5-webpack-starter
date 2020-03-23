// services
import h5Pages from '@cycjimmy/h5-pages';
import h5AudioControls from '@cycjimmy/h5-audio-controls';
import CreateInstance from '@cycjimmy/awesome-js-funcs/designPattern/CreateInstance';

import staticFiles from './staticFiles';

const instance = new CreateInstance();

export default () => {
  if (instance()) {
    return instance();
  }

  const bgmComponent = h5AudioControls(staticFiles.bgm, {
    context: h5Pages.root,
    positionType: 'absolute',
  });
  instance(bgmComponent);

  return bgmComponent;
};


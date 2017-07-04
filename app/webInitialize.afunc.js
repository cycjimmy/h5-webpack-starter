/**
 *  web init
 */

// component
import MainComponent from './mainComponent/Main.component';

export default () => {

  return Promise.all([
    // load main
    new MainComponent().load(),

  ])
    .catch(err => console.error('Failed to init', err));
};


import React from 'react';
import ScratchGUI from 'scratch-gui';
import { Provider } from 'react-redux';
import store from 'scratch-gui/redux/store';

const ScratchEditor = () => (
    <Provider store={store}>
      <ScratchGUI />
    </Provider>
  );
  
  export default ScratchEditor;
  
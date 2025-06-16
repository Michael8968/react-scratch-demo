declare module 'scratch-gui' {
  interface ScratchGUIOptions {
    projectId?: string | null;
  }

  class ScratchGUI {
    constructor(options: ScratchGUIOptions);
    getRootElement(): HTMLElement;
  }

  export default ScratchGUI;
} 
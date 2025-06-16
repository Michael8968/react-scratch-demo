import * as React from 'react';
import renderGUI from './render-gui';

const ScratchEditor = () => {
    const appTarget = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (appTarget.current) {
            renderGUI(appTarget.current);
        }
    }, []);

    return (
        <div>
            <div ref={appTarget} />
        </div>
    );
};

export default ScratchEditor;
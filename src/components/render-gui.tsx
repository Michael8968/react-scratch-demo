import React from 'react';
import { createRoot } from 'react-dom/client';
import { compose } from 'redux';

import GUI, { AppStateHOC, HashParserHOC } from 'scratch-gui';

console.log('GUI', GUI);
console.log('AppStateHOC', AppStateHOC);
console.log('HashParserHOC', HashParserHOC);

interface GuiProps {
    canEditTitle?: boolean;
    isScratchDesktop?: boolean;
    showTelemetryModal?: boolean;
    canSave?: boolean;
    backpackVisible?: boolean;
    showComingSoon?: boolean;
    backpackHost?: string | null;
    onClickLogo?: () => void;
    onTelemetryModalCancel?: () => void;
    onTelemetryModalOptIn?: () => void;
    onTelemetryModalOptOut?: () => void;
}

const onClickLogo = (): void => {
    window.location.href = 'https://scratch.mit.edu';
};

const handleTelemetryModalCancel = (): void => {
    console.log('User canceled telemetry modal');
};

const handleTelemetryModalOptIn = (): void => {
    console.log('User opted into telemetry');
};

const handleTelemetryModalOptOut = (): void => {
    console.log('User opted out of telemetry');
};

/*
 * Render the GUI playground. This is a separate function because importing anything
 * that instantiates the VM causes unsupported browsers to crash
 * @param appTarget - the DOM element to render to
 */
const renderGUI = (appTarget: HTMLElement): void => {
    GUI.setAppElement(appTarget);

    // note that redux's 'compose' function is just being used as a general utility to make
    // the hierarchy of HOC constructor calls clearer here; it has nothing to do with redux's
    // ability to compose reducers.
    const WrappedGui = compose(
        AppStateHOC,
        HashParserHOC
    )(GUI) as React.ComponentType<GuiProps>;

    // TODO a hack for testing the backpack, allow backpack host to be set by url param
    const backpackHostMatches = window.location.href.match(/[?&]backpack_host=([^&]*)&?/);
    const backpackHost = backpackHostMatches ? backpackHostMatches[1] : null;

    const scratchDesktopMatches = window.location.href.match(/[?&]isScratchDesktop=([^&]+)/);
    let simulateScratchDesktop: boolean | string | undefined;
    if (scratchDesktopMatches) {
        try {
            // parse 'true' into `true`, 'false' into `false`, etc.
            simulateScratchDesktop = JSON.parse(scratchDesktopMatches[1]);
        } catch {
            // it's not JSON so just use the string
            // note that a typo like "falsy" will be treated as true
            simulateScratchDesktop = scratchDesktopMatches[1];
        }
    }

    const root = createRoot(appTarget);
    root.render(
        simulateScratchDesktop ?
            <WrappedGui
                canEditTitle
                isScratchDesktop
                showTelemetryModal
                canSave={false}
                onTelemetryModalCancel={handleTelemetryModalCancel}
                onTelemetryModalOptIn={handleTelemetryModalOptIn}
                onTelemetryModalOptOut={handleTelemetryModalOptOut}
            /> :
            <WrappedGui
                canEditTitle
                backpackVisible
                showComingSoon
                backpackHost={backpackHost}
                canSave={false}
                onClickLogo={onClickLogo}
            />
    );
};

export default renderGUI;
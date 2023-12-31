import React from "react";
// import { Modal } from "native-base";
import compiling from './assets/protofitoCompiling.gif';
import compilingW from './assets/protofitoCompilingW.gif';
import loading from './assets/protofitoLoading.gif';
import loadingW from './assets/protofitoLoadingW.gif';
import dancing from './assets/protofitoDancing.gif';
import dancingW from './assets/protofitoDancingW.gif';
import { AlertDialog } from 'protolib'
import { Button, useThemeName} from 'tamagui'


const DeviceModal = ({ stage, onCancel, onSelect, showModal, modalFeedback }) => {
    const isError = modalFeedback?.details?.error
    const isLoading = ['write'].includes(stage) && !isError && !modalFeedback?.message?.includes('Please hold "Boot"')
    const visibleImage = (isLoading || ['idle', 'compile'].includes(stage)) && !isError
    const themeName = useThemeName();
    const stages = {
        'yaml': 'Uploading yaml to the project...',
        'compile': 'Compiling firmware...',
        'upload': 'Connect your device and click select to chose the port. ',
        'write': 'Writting firmware to device. Please do not unplug your device.',
        'idle': 'Device configured successfully. You can unplug your device.'
    }

    const [msg, setMsg] = React.useState(stages[stage])

    const ModalText = () => {
        return (
            <div style={{ textAlign: 'center', color: isError ? 'red' : '', marginTop: isError ? '80px' : '', marginBottom: '0px' }}>
                {
                    stage === 'upload'
                    && !isError
                    && <>If you don't see your device on the menu, download device drivers on
                        <a href="https://www.silabs.com/documents/public/software/CP210x_Windows_Drivers.zip" target="_blank" style={{ paddingLeft: '5px' }}>
                            Windows
                        </a>,
                        <a href="https://www.silabs.com/documents/public/software/Mac_OSX_VCP_Driver.zip" target="_blank" style={{ paddingInline: '5px' }}>
                            Mac
                        </a>
                        or <a href="https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers?tab=downloads" target="_blank">
                            other OS
                        </a>
                    </>
                }
            </div>
        )
    }

    const stepsTranslator = {
        'compile': '1',
        'upload': '2',
        'write': '3',
        'idle': '4'
    }

    // return (<Modal isOpen={showModal} onClose={() => onCancel()} style={{ position: 'relative',backgroundColor: "yellow"}}>
    return (<AlertDialog open={showModal} hideAccept={true}>
        <div style={{ height: "350px", width: '400px', position: 'relative', overflow: 'visible', justifyContent: "space-between", display: 'flex', flexDirection: 'column' }}>
            <div>
                <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 'xs' }}>{`[${stepsTranslator[stage]}/${Object.keys(stepsTranslator).length}]`}</div>
                <div style={{ textAlign: 'center', color: isError ? 'red' : '', marginBottom: "0px", marginTop: stepsTranslator[stage] === '2' ? '100px' : '0px' }}>
                    {
                        modalFeedback && ['write', 'compile', 'upload'].includes(stage)
                            ? modalFeedback.message : msg
                    }
                </div>
                <ModalText />
            </div>
            {isLoading
                ? <img
                    alt="protofito loading"
                    style={{ height: "160px", width: "300px", alignSelf: "center", marginTop: "30px", marginBottom: "10px", objectFit: 'cover' }}
                    src={themeName=='light'?loading.src:loadingW.src}
                />
                : null}
            {stage == 'idle' && !isError
                ? <img
                    alt="protofito dancing"
                    style={{ height: "160px", width: "190px", alignSelf: "center", marginTop: "30px", marginBottom: "10px", objectFit: 'cover' }}
                    src={themeName=='light'?dancing.src:dancingW.src}
                />
                : null}
            {stage == 'compile' && !isError
                ? <img
                    alt="protofito compiling"
                    style={{ height: "160px", width: "180px", alignSelf: "center", marginTop: "30px", marginBottom: "10px", objectFit: 'cover' }}
                    src={themeName=='light'?compiling.src:compilingW.src}
                />
                : null}
            <div style={{ justifyContent: 'center', alignSelf: 'center', display: 'flex', gap: "20px" }}>
                {stage != 'write' && stage != 'idle' || isError ? <button
                    style={{ padding: '10px 20px 10px 20px', backgroundColor: '#cccccc40', borderRadius: '10px' }}
                    onClick={() => {
                        onCancel()
                    }}>
                    Cancel
                </button> : <></>}
                {stage == 'upload' ? <button
                    style={{ padding: '10px 20px 10px 20px', backgroundColor: 'black', color: 'white', borderRadius: '10px' }}
                    onClick={() => {
                        onSelect()
                    }}>
                    Select
                </button> : <></>}
                {stage == 'idle' ? <button
                    style={{ padding: '10px 20px 10px 20px', backgroundColor: 'black', color: 'white', borderRadius: '10px' }}
                    onClick={() => {
                        onCancel()
                    }}>
                    Done!
                </button> : <></>}
            </div>
            {/* </div> */}
        </div>
    </AlertDialog >)
}

export default DeviceModal
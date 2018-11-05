import {getContainer} from './../container/index';

export default  function initCamera() {
    const el = getContainer();
    return new THREE.PerspectiveCamera
    (
        75,
        el.clientWidth / el.clientHeight,
        0.1,
        1000
    );
}


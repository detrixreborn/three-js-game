export let isFullContainment = false;
export let isCarFacedBarrier = false;

function generateContainerAndTarget(wall, car) {
    let areaObj = new THREE.Box3().setFromObject(wall);
    let target = new THREE.Box3().setFromObject(car);
    return  [areaObj, target];
}

export function checkGarageCollisions(wall, car) {
    let [areaObj, target] = generateContainerAndTarget(wall, car);

    if (areaObj.containsBox(target)) {
        isFullContainment = true;
        return;
    }

    isFullContainment = false;
}

export function checkBarrierCollisions(barrier, car) {
    let [areaObj, target] = generateContainerAndTarget(barrier, car);
    if(areaObj.intersectsBox(target)) {
        isCarFacedBarrier = true;
    }
}
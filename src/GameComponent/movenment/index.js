import {speed} from "../speed";
import { previousDirection } from "../controls";
import {RIGHT_DIRECTION, LEFT_DIRECTION} from "../constants/directions";

export function move(car, firstWheel, secondWheel) {
    const velocity = speed.get();

    if (previousDirection === LEFT_DIRECTION){
        car.position.x -= velocity;
        firstWheel.rotation.z += velocity;
        secondWheel.rotation.z += velocity;
    }

    if (previousDirection === RIGHT_DIRECTION){
        car.position.x += velocity;
        firstWheel.rotation.z -= velocity;
        secondWheel.rotation.z -= velocity;
    }
}
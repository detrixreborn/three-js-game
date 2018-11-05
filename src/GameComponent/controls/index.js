import {speed} from "../speed";
import {LINEAR_ACCELERATION, INITIAL_SPEED} from "../constants/speed";
import {
    RIGHT_DIRECTION,
    LEFT_DIRECTION,
    RIGHT_KEY_CODE,
    LEFT_KEY_CODE
} from "../constants/directions";

export let previousDirection = undefined;
export let arrowsPressed = false;

export function initArrowsControl() {
    document.addEventListener('keyup', ArrowUpped, false);
    document.addEventListener('keydown', ArrowPressed, false);

    function ArrowUpped() {
        if (event.keyCode === LEFT_KEY_CODE) { arrowsPressed = false; }
        if (event.keyCode === RIGHT_KEY_CODE) { arrowsPressed = false; }
    }

    function ArrowPressed() {
        if (event.keyCode === LEFT_KEY_CODE) { shouldIncreaseSpeedOrDecrease(LEFT_DIRECTION); }
        if (event.keyCode === RIGHT_KEY_CODE) { shouldIncreaseSpeedOrDecrease(RIGHT_DIRECTION); }
    }

    function increaseSpeed() {
       speed.increase(Math.abs(LINEAR_ACCELERATION))
    }

    function decreaseSpeed(){
        speed.decrease(Math.abs(LINEAR_ACCELERATION))
    }

    function doesDirectionSame(currentDirection) {
        return previousDirection === currentDirection;
    }

    function isJustStarted() {
        return previousDirection === undefined
            && speed.get() === INITIAL_SPEED;
    }

    function startMoving(currentDirection) {
        previousDirection = currentDirection;
        increaseSpeed();
    }

    function carSpeedAllowedToStop() {
        return -0.02 < speed.get() === speed.get() < 0.02
    }

    function doesCarStopped() {
        return  carSpeedAllowedToStop()
            && !arrowsPressed;
    }

    function shouldIncreaseSpeedOrDecrease(currentDirection){
        if (isJustStarted()) {
            startMoving(currentDirection);
            return;
        }

        if (doesDirectionSame(currentDirection)){
            increaseSpeed(); // accelerate..
        } else if (!doesDirectionSame(currentDirection) && !doesCarStopped()) {
            decreaseSpeed(); // move slower..
        }
        else if (!doesDirectionSame() && doesCarStopped()){
            previousDirection = currentDirection;
            speed.reset();
        }
    }
}
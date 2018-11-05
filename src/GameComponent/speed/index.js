import {INITIAL_SPEED} from "../constants/speed";

export const speed = {
    velocity: INITIAL_SPEED,

    get: function () {
      return this.velocity
    },

    reset: function () {
        this.velocity = INITIAL_SPEED
    },

    increase: function (value) {
        this.velocity += value
    },

    decrease: function (value) {
        this.velocity -= value
    }
};
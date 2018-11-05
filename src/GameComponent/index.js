import React, {Component} from 'react';
import {INITIAL_SPEED} from "./constants/speed";
import {containerId, highScoreId, playId, score} from "./constants/ids";

import {getContainer, getPlayButton, getCanvas} from "./container";
import initScene from "./scene";
import initCamera from './camera';
import initRenderer from "./renderer";
import initBoxGeometry from "./geometry";
import initMesh from "./mesh/square";
import initWheel from "./mesh/wheel";

import {initArrowsControl} from "./controls";
import {updateHighScore, initHighScore, initTimeScore, destroyTimer} from "./score";
import {checkGarageCollisions, checkBarrierCollisions, isFullContainment, isCarFacedBarrier} from "./collision";
import {move} from "./movenment";
import {speed} from "./speed";



export class GameContainer extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    };

    componentDidMount() {
        this.initApp();
    };

    handleClick() {window.location.reload()}


    initApp() {
        //each frame identifier
        let frameId = undefined;

        //CONTAINER
        const container = getContainer();

        //PLAY AGAIN BTN
        const playAgainBtn = getPlayButton();

        //SCENE
        const scene = initScene();

        //CAMERA
        const camera = initCamera();
        camera.position.z = 20;

        //RENDERER
        const renderer = initRenderer();
        renderer.setClearColor(0x005555, 1); // change the background color
        renderer.shadowMap.enabled = true;

        //CAR
        const carSkeletonGeometry = initBoxGeometry(14, 5);
        const carSkeletonMaterial = new THREE.MeshBasicMaterial({color: 0x81ffff});
        const carSkeleton = initMesh(carSkeletonGeometry, carSkeletonMaterial);
        carSkeleton.position.x = -30;
        carSkeleton.renderOrder = 1;

        //GARAGE
        const garageGeometry = initBoxGeometry(20, 13);
        const garageMaterial = new THREE.MeshBasicMaterial( {color: 0x8888ff} );
        const garage = initMesh(garageGeometry, garageMaterial);
        garage.position.x = 20;
        garage.position.y = 0;
        scene.add(garage);

        //BARRIER
        const barrierGeometry = initBoxGeometry(0.5, 13);
        const barrierMaterial = new THREE.MeshBasicMaterial({color: 0x12388ff});
        const barrier = initMesh(barrierGeometry, barrierMaterial);
        barrier.position.x = 30;
        barrier.position.y = 0;
        scene.add(barrier);

        //WHEELS

        const firstWheel = initWheel();
        firstWheel.position.y = -4.5;
        firstWheel.position.x = -34;

        const secondWheel = initWheel();
        secondWheel.position.y = -4.5;
        secondWheel.position.x = -26;

        const group = new THREE.Group();
        group.add(carSkeleton);
        group.add(firstWheel);
        group.add(secondWheel);
        scene.add(group);



        //CHECK WIN CONDITION
        function isMissionCompleted() {
            return isFullContainment
                && speed.get() === INITIAL_SPEED;
        }

        //CHECK LOSE CONDITION
        function isMissionFailed() {
            return isCarFacedBarrier;
        }
        function generateBlurEffect() {
            const canvas = getCanvas();
            canvas.style.filter = 'blur(15px)';
        }

        //INIT CONTROLS
        initArrowsControl();
        initTimeScore();
        initHighScore();

        //POSTPROCESSING


        //LIGHT

        const  loop = function () {
            frameId = requestAnimationFrame(loop); //required

            checkGarageCollisions(garage, carSkeleton);
            checkBarrierCollisions(barrier, carSkeleton);

            move(group, firstWheel, secondWheel);

            if (isMissionCompleted()){
                generateBlurEffect();
                cancelAnimationFrame(frameId);
                clearInterval(destroyTimer);
                updateHighScore();
                playAgainBtn.innerHTML = 'Victory, play again';
                playAgainBtn.style.visibility = "visible";
                return;
            }

            if (isMissionFailed()){
                generateBlurEffect();
                cancelAnimationFrame(frameId);
                clearInterval(destroyTimer);
                playAgainBtn.innerHTML = 'Lose, play again';
                playAgainBtn.style.visibility = "visible";
                return;
            }

            renderer.render(scene, camera); //required
        };

        loop();

        //DOM preparation
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);
    };



    render() {
        const styles = {
            height: '300px',
            width: '1200px',
            backgroundColor: 'yellow',
        };

        const btnStyle = {
            visibility: 'hidden',
            padding: '10px',
            color: 'green',
            left: '40%',
            top: '100px',
            fontSize: '20px',
            position: 'absolute',
        };

        const highScoreStyle = {
            position: 'absolute',
            right: '20%',
            top: '50px',
            padding: '10px',
            backgroundColor: 'white',
        };

        const scoreStyle = {
            position: 'absolute',
            padding: '10px',
            top: '60px',
            left: '40%',
            color: 'white'
        };

        const garageStyle = {
            color: 'white',
            position: 'absolute',
            top: '80px',
            right: '35%',

        }

        return (
            <React.Fragment>
                <div id={containerId} style={styles}>Samsung Homework - Dima Oriekhov</div>
                <button id={playId} style={btnStyle} onClick={this.handleClick}></button>

                <div style={scoreStyle}>
                    <span>TIME: </span>
                    <span id={score}></span>
                </div>

                <span style={garageStyle}>Amazing Garage :)</span>

                <div style={highScoreStyle}>
                    <span>HIGH SCORE: </span>
                    <ol id={highScoreId}> 0</ol>
                </div>
            </React.Fragment>
        );
    }
}

export default GameContainer;

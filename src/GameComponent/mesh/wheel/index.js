import initBoxGeometry from "../../geometry";
import initMesh from "../square";

export default function initWheel() {
    const circkleGeometry = new THREE.CircleGeometry( 1.8, 128, 0, 6.1);
    const circkleMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    return new THREE.Mesh( circkleGeometry, circkleMaterial );
}
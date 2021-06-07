import { MD2Loader } from 'three/examples/jsm/loaders/MD2Loader.js';
import { DoubleSide, BoxGeometry, Mesh, TextureLoader, MeshBasicMaterial } from "three"
import lady from "./assets/LadyDeath5.png"

export default class Model {
    constructor(scene, manager) {
        this.scene = scene;
        this.mesh = null;
        this.manager = manager;
        this.geometry = null
    }

    load(path) {

        // Manager is passed in to loader to determine when loading done in main
        // Load model with FBXLoader

        new MD2Loader(this.manager).load(
            path,
            geometry => {

                var geometry = new BoxGeometry(20, 40, 20);
                var material = new MeshBasicMaterial({
                    color: 0x000000,
                    side: DoubleSide,
                    wireframe: false,
                    transparent: true,
                    opacity: 0.5
                });
                //this.mesh=new Mesh(geometry, material);

                this.geometry = geometry;
                this.mesh = new Mesh(geometry, material);

                //this.mesh = new Mesh(geometry, new MeshBasicMaterial({
                //    map: new TextureLoader().load(lady), // dowolny plik png, jpg
                //    morphTargets: true // animowanie materiału modelu
                //}))
                this.scene.add(this.mesh);
                //console.log(this.geometry.animations) // tu powinny być widoczne animacje

            },

        );

    }

    unload() {
        this.scene.remove(this.mesh); // ew funkcja do usunięcia modelu ze sceny
    }
}
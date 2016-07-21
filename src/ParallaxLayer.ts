
module bma.pixi {
    export class ParallaxLayer extends PIXI.Container {

        public px:number = 0;
        public py:number = 0;
        public pz:number = 0;

        constructor(z:number = 0) {
            super();
            this.pz = z;
        }

    }
}
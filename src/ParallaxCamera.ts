module bma.pixi {
    export class ParallaxCamera {
        public bounds:PIXI.Rectangle;
        public x:number = 0;
        public y:number = 0;
        public layers:ParallaxLayer[] = [];

        protected _baseZoom:number = 1;
        protected _zoom:number = 1;
        protected _target:PIXI.DisplayObject;

        protected _shakeEndTime:number = 0;
        protected _shakeStrength:number = 0;

        constructor(public renderer:PIXI.SystemRenderer, public baseContainer:PIXI.Container, public focalLength:number = 300, public movementDamping:number = 10) {
        }

        // *********************************************************************************************
        // * Public																					   *
        // *********************************************************************************************
        public update() {
            if (!this.baseContainer) return;

            let sw = this.renderer.width * 0.5;
            let sh = this.renderer.height * 0.5;
            let shakeX = 0;
            let shakeY = 0;

            let target = this._target;

            if (target) {
                if (this.movementDamping == 0) {
                    this.x = -target.x;
                    this.y = -target.y;
                }
                else {
                    this.x += (-this.x - target.x) / this.movementDamping;
                    this.y += (-this.y - target.y) / this.movementDamping;
                }
            }

            let shakeStrength = this._shakeStrength;
            if (shakeStrength) {
                var t = Date.now();
                if (t > this._shakeEndTime) {
                    this._shakeStrength = 0;
                }
                else {
                    shakeX = this.randomFloat(-shakeStrength, shakeStrength);
                    shakeY = this.randomFloat(-shakeStrength, shakeStrength);
                }
            }

            let bounds = this.bounds;
            bounds = null;
            if (bounds) {
                let zoom = this.zoom;
                if (this.x <= -(bounds.width) * zoom)
                    this.x = -(bounds.width) * zoom;
                else if (this.x >= (-bounds.x) * zoom)
                    this.x = (-bounds.x) * zoom;

                if (this.y <= -(bounds.height) * zoom)
                    this.y = -(bounds.height) * zoom;
                else if (this.y >= (-bounds.y) * zoom)
                    this.y = (-bounds.y) * zoom;
            }

            let n = this.layers.length;
            while (--n > -1) {
                let layer = this.layers[n];
                let d = this.focalLength / (this.focalLength - layer.pz);
                layer.x = (layer.px + this.x + shakeX ) * d;
                layer.y = (layer.py + this.y + shakeY ) * d;
                layer.scale.set(d, d);
            }

            let tx = 0, ty = 0;
            if (target) {
                let p = this.getParallaxParent(target.parent);
                if (p) {
                    tx = p.x * (1 / p.scale.x);
                    ty = p.y * (1 / p.scale.y);
                }
            }

            this.baseContainer.x = this.x - tx + shakeX + sw;
            this.baseContainer.y = this.y - ty + shakeY + sh;
        }

        public addLayer(layer:ParallaxLayer) {
            if (layer['pz'] == null) throw Error('Layers needs to be a ParallaxLayer.');

            if (this.layers.indexOf(layer) == -1) {
                this.layers.push(layer);
                this.baseContainer.addChild(layer);
                this.zsort();
            }
        }

        public removeLayer(layer:ParallaxLayer) {
            let index = this.layers.indexOf(layer);
            if (index != -1)
                this.layers.splice(index, 1);
            if (layer.parent === this.baseContainer) this.baseContainer.removeChild(layer);
        }

        public shake(strength:number, duration:number = 1.0):void {
            this._shakeStrength = strength;
            this._shakeEndTime = Date.now() + duration * 1000;
        }

        public stopShake() {
            this._shakeStrength = 0;
        }

        public setTarget(target:PIXI.DisplayObject, reposition:boolean = true) {
            this._target = target;
            if (reposition) {
                this.x = -target.x;
                this.y = -target.y;
            }
        }

        public zsort() {
            this.layers = this.layers.sort((a:ParallaxLayer, b:ParallaxLayer) => a.pz - b.pz);
            for (let i = 0; i < this.layers.length; ++i) {
                this.baseContainer.addChildAt(this.layers[i], i);
            }
        }

        public dispose() {
            this.layers = null;
            this._target = null;
            this.baseContainer.removeChildren();
            this.baseContainer = null;
        }

        public get target():PIXI.DisplayObject {
            return this._target;
        }

        public get baseZoom():number {
            return this._baseZoom;
        }

        public set baseZoom(value:number) {
            this._baseZoom = value;
            this.zoom = this.zoom;
        }

        public get zoom():number {
            return this._zoom;
        }

        public set zoom(value:number) {
            this._zoom = value;
            this.baseContainer.scale.set(value * this._baseZoom, value * this._baseZoom);
        }

        // *********************************************************************************************
        // * Protected																				   *
        // *********************************************************************************************
        protected getParallaxParent(p:PIXI.Container):ParallaxLayer {
            if (p == null) return null;
            if (p['pz']) return <ParallaxLayer>p;
            return this.getParallaxParent(p.parent);
        }

        protected randomFloat(min:number, max:number):number {
            return Math.random() * (max - min) + min;
        }
    }
}
var bma;
(function (bma) {
    var pixi;
    (function (pixi) {
        var ParallaxCamera = (function () {
            function ParallaxCamera(renderer, baseContainer, focalLength, movementDamping) {
                if (focalLength === void 0) { focalLength = 300; }
                if (movementDamping === void 0) { movementDamping = 10; }
                this.renderer = renderer;
                this.baseContainer = baseContainer;
                this.focalLength = focalLength;
                this.movementDamping = movementDamping;
                this.x = 0;
                this.y = 0;
                this.layers = [];
                this._baseZoom = 1;
                this._zoom = 1;
                this._shakeEndTime = 0;
                this._shakeStrength = 0;
            }
            // *********************************************************************************************
            // * Public																					   *
            // *********************************************************************************************
            ParallaxCamera.prototype.update = function () {
                if (!this.baseContainer)
                    return;
                var sw = this.renderer.width * 0.5;
                var sh = this.renderer.height * 0.5;
                var shakeX = 0;
                var shakeY = 0;
                var target = this._target;
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
                var shakeStrength = this._shakeStrength;
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
                var bounds = this.bounds;
                bounds = null;
                if (bounds) {
                    var zoom = this.zoom;
                    if (this.x <= -(bounds.width) * zoom)
                        this.x = -(bounds.width) * zoom;
                    else if (this.x >= (-bounds.x) * zoom)
                        this.x = (-bounds.x) * zoom;
                    if (this.y <= -(bounds.height) * zoom)
                        this.y = -(bounds.height) * zoom;
                    else if (this.y >= (-bounds.y) * zoom)
                        this.y = (-bounds.y) * zoom;
                }
                var n = this.layers.length;
                while (--n > -1) {
                    var layer = this.layers[n];
                    var d = this.focalLength / (this.focalLength - layer.pz);
                    layer.x = (layer.px + this.x + shakeX) * d;
                    layer.y = (layer.py + this.y + shakeY) * d;
                    layer.scale.set(d, d);
                }
                var tx = 0, ty = 0;
                if (target) {
                    var p = this.getParallaxParent(target.parent);
                    if (p) {
                        tx = p.x * (1 / p.scale.x);
                        ty = p.y * (1 / p.scale.y);
                    }
                }
                this.baseContainer.x = this.x - tx + shakeX + sw;
                this.baseContainer.y = this.y - ty + shakeY + sh;
            };
            ParallaxCamera.prototype.addLayer = function (layer) {
                if (layer['pz'] == null)
                    throw Error('Layers needs to be a ParallaxLayer.');
                if (this.layers.indexOf(layer) == -1) {
                    this.layers.push(layer);
                    this.baseContainer.addChild(layer);
                    this.zsort();
                }
            };
            ParallaxCamera.prototype.removeLayer = function (layer) {
                var index = this.layers.indexOf(layer);
                if (index != -1)
                    this.layers.splice(index, 1);
                if (layer.parent === this.baseContainer)
                    this.baseContainer.removeChild(layer);
            };
            ParallaxCamera.prototype.shake = function (strength, duration) {
                if (duration === void 0) { duration = 1.0; }
                this._shakeStrength = strength;
                this._shakeEndTime = Date.now() + duration * 1000;
            };
            ParallaxCamera.prototype.stopShake = function () {
                this._shakeStrength = 0;
            };
            ParallaxCamera.prototype.setTarget = function (target, reposition) {
                if (reposition === void 0) { reposition = true; }
                this._target = target;
                if (reposition) {
                    this.x = -target.x;
                    this.y = -target.y;
                }
            };
            ParallaxCamera.prototype.zsort = function () {
                this.layers = this.layers.sort(function (a, b) { return a.pz - b.pz; });
                for (var i = 0; i < this.layers.length; ++i) {
                    this.baseContainer.addChildAt(this.layers[i], i);
                }
            };
            ParallaxCamera.prototype.dispose = function () {
                this.layers = null;
                this._target = null;
                this.baseContainer.removeChildren();
                this.baseContainer = null;
            };
            Object.defineProperty(ParallaxCamera.prototype, "target", {
                get: function () {
                    return this._target;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ParallaxCamera.prototype, "baseZoom", {
                get: function () {
                    return this._baseZoom;
                },
                set: function (value) {
                    this._baseZoom = value;
                    this.zoom = this.zoom;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ParallaxCamera.prototype, "zoom", {
                get: function () {
                    return this._zoom;
                },
                set: function (value) {
                    this._zoom = value;
                    this.baseContainer.scale.set(value * this._baseZoom, value * this._baseZoom);
                },
                enumerable: true,
                configurable: true
            });
            // *********************************************************************************************
            // * Protected																				   *
            // *********************************************************************************************
            ParallaxCamera.prototype.getParallaxParent = function (p) {
                if (p == null)
                    return null;
                if (p['pz'])
                    return p;
                return this.getParallaxParent(p.parent);
            };
            ParallaxCamera.prototype.randomFloat = function (min, max) {
                return Math.random() * (max - min) + min;
            };
            return ParallaxCamera;
        }());
        pixi.ParallaxCamera = ParallaxCamera;
    })(pixi = bma.pixi || (bma.pixi = {}));
})(bma || (bma = {}));
//# sourceMappingURL=ParallaxCamera.js.map
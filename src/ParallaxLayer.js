var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var bma;
(function (bma) {
    var pixi;
    (function (pixi) {
        var ParallaxLayer = (function (_super) {
            __extends(ParallaxLayer, _super);
            function ParallaxLayer(z) {
                if (z === void 0) { z = 0; }
                _super.call(this);
                this.px = 0;
                this.py = 0;
                this.pz = 0;
                this.pz = z;
            }
            return ParallaxLayer;
        }(PIXI.Container));
        pixi.ParallaxLayer = ParallaxLayer;
    })(pixi = bma.pixi || (bma.pixi = {}));
})(bma || (bma = {}));
//# sourceMappingURL=ParallaxLayer.js.map
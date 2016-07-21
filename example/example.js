var test = {};
(function () {

    var ParallaxExample = function () {
        var that = this;
        this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {backgroundColor: 0x0});
        document.body.appendChild(this.renderer.view);
        this.stage = new PIXI.Container();
        this.stage.interactive = true;
        var g = new PIXI.Graphics();
        g.beginFill(0xff);
        g.drawRect(0,0, this.renderer.view.width, this.renderer.view.height);
        g.endFill();
        this.stage.addChild(g);

        PIXI.loader
            .add('images/atlas.json')
            .load(function () {
                that.start();
            });

    };

    test.ParallaxExample = ParallaxExample;
    var p = ParallaxExample.prototype;

    p.start = function () {
        var that = this;

        this.zoom = 1;

        var baseContainer = new PIXI.Container();
        this.stage.addChild(baseContainer);

        // baseContainer.addChild(s);

        this.camera = new bma.pixi.ParallaxCamera(this.renderer, baseContainer);

        var layer0 = new bma.pixi.ParallaxLayer(100);
        var layer1 = new bma.pixi.ParallaxLayer(0);
        var layer2 = new bma.pixi.ParallaxLayer(-10);
        var layer3 = new bma.pixi.ParallaxLayer(-300);
        var layer4 = new bma.pixi.ParallaxLayer(-1000);

      /*  var blur = new PIXI.filters.BlurFilter();
        blur.blur = 4;
        layer0.filters = [blur];

        blur = new PIXI.filters.BlurFilter();
        blur.blur = 2;
        layer1.filters = [blur];
       */

        this.populate(layer0, 'cloud1', 20, [-1000, 1000, -1000, 1000]);
        this.populate(layer1, 'tile', 20, [-1000, 1000, -1000, 1000], true);
        this.populate(layer3, 'tiles', 20, [-1000, 1000, -1000, 1000]);
        this.populate(layer4, 'planet', 15, [-1000, 1000, -1000, 1000]);

        this.player = PIXI.Sprite.fromFrame('plane');
        this.player.anchor.set(0.5, 0.5);
        layer2.addChild(this.player);

        this.camera.addLayer(layer0);
        this.camera.addLayer(layer1);
        this.camera.addLayer(layer2);
        this.camera.addLayer(layer3);
        this.camera.addLayer(layer4);

        this.camera.setTarget(this.player);

        this.initControls();

        function animate() {
            that.update();
            that.renderer.render(that.stage);
            requestAnimationFrame(animate);
        }
        animate();
    };


    p.update = function () {

        if (this.isMoving) {
            this.renderer.plugins.interaction.mouse.getLocalPosition(this.player.parent, this._p);
            var dx = this._p.x - this.player.x;
            var dy = this._p.y - this.player.y;
            var angle = Math.atan2(dy, dx);
            this.player.rotation = angle;
            this.player.x += 5 * Math.cos(angle);
            this.player.y += 5 * Math.sin(angle);
        }


        this.camera.zoom += (this.zoom - this.camera.zoom) / 15;

        this.camera.update();
    };

    p.initControls = function () {
        var that = this;
        this.touchId = -1;
        this.isMoving = false;
        this._p = new PIXI.Point(0,0);

        var zoom = 0.7;

        this.stage.on('mousedown', function (e) {
            that.isMoving = true;
            that.zoom = zoom;
        });

        this.stage.on('mouseup', function (e) {
            that.isMoving = false;
            that.zoom = 1;
        });

        this.stage.on('touchstart', function (e) {
            if (that.touchId != -1) return;
            that.touchId = e.data.identifier;
            that.isMoving = true;
            that.zoom = zoom;
        });

        this.stage.on('touchend', function (e) {
            if (e.data.identifier != that.touchId) return;
            that.touchId = -1;
            that.isMoving = false;
            that.zoom = 1;
        });
    };

    p.populate = function (layer, asset, count, bounds, rotate) {
        while (--count > -1) {
            var s = PIXI.Sprite.fromFrame(asset);
            s.anchor.set(0.5, 0.5);
            s.x = this.integer(bounds[0], bounds[1]);
            s.y = this.integer(bounds[2], bounds[3]);
            layer.addChild(s);
            if (rotate) s.rotation = Math.PI * 0.25;

        }
    };

    p.integer = function (min, max) {
        return Math.round(Math.random() * (max - min) + min);
    };
    p.float = function (min, max) {
        return Math.random() * (max - min) + min;
    }

}());






var test = {};
(function () {

    var ParallaxExample = function () {
        var that = this;
        this.renderer = PIXI.autoDetectRenderer($(window).width(), $(window).height());
        document.body.appendChild(this.renderer.view);
        this.stage = new PIXI.Container();
        this.stage.interactive = true;
        var g = new PIXI.Graphics();
        g.beginFill(0);
        g.drawRect(0, 0, this.renderer.view.width, this.renderer.view.height);
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
        this.useZoom = true;

        //create the container holding the parallax layers
        var baseContainer = new PIXI.Container();

        this.stage.addChild(baseContainer);

        //create the camera
        this.camera = new bma.pixi.ParallaxCamera(this.renderer, baseContainer);

        //create layers with z value
        var layer0 = new bma.pixi.ParallaxLayer(100); //top most
        var layer1 = new bma.pixi.ParallaxLayer(30);
        var layer2 = new bma.pixi.ParallaxLayer(-10);
        var layer3 = new bma.pixi.ParallaxLayer(-400);
        var layer4 = new bma.pixi.ParallaxLayer(-600);
        var layer5 = new bma.pixi.ParallaxLayer(-1300);
        var layer6 = new bma.pixi.ParallaxLayer(-2000); //bottom

        this.camera.addLayer(layer0);
        this.camera.addLayer(layer1);
        this.camera.addLayer(layer2);
        this.camera.addLayer(layer3);
        this.camera.addLayer(layer4);
        this.camera.addLayer(layer5);
        this.camera.addLayer(layer6);

        //add some assets
        this.populate(layer0, 'cloud1', 5, [-1000, 1000, -1000, 1000], 1, 2, 0.5, 0.8);
        this.populate(layer1, 'tile', 10, [-1000, 1000, -1000, 1000]);
        this.populate(layer3, 'tiles', 10, [-2000, 2000, -2000, 2000]);
        this.populate(layer4, 'cloud2', 20, [-4000, 4000, -4000, 4000], 3, 5, 0.3, 0.5);
        this.populate(layer5, 'tile', 40, [-5000, 5000, -5000, 5000]);

        var back = PIXI.Sprite.fromFrame('planet');
        back.width = back.height = 20000;
        back.anchor.set(0.5, 0.5);
        layer6.addChild(back);

        //set camera boundaries
        var size = 800;
        var bounds = new PIXI.Graphics();
        bounds.lineStyle(10, 0x00ff00, 0.3);
        bounds.drawRect(-size, -size, size * 2, size * 2);
        bounds.endFill();
        layer2.addChild(bounds);
        this.camera.bounds = new PIXI.Rectangle(-size, -size, size, size);

        //create the "player" and set it as the camera target
        this.player = PIXI.Sprite.fromFrame('player');
        this.player.anchor.set(0.5, 0.5);
        layer2.addChild(this.player);
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
            this.renderer.plugins.interaction.eventData.data.getLocalPosition(this.player.parent, this._p);
            var dx = this._p.x - this.player.x;
            var dy = this._p.y - this.player.y;
            var angle = Math.atan2(dy, dx);
            this.player.x += 8 * Math.cos(angle);
            this.player.y += 8 * Math.sin(angle);
        }

        if (this.useZoom) this.camera.zoom += (this.zoom - this.camera.zoom) / 15;

        //the camera update method has to be called every frame
        this.camera.update();
    };

    p.initControls = function () {
        var that = this;
        this.touchId = -1;
        this.isMoving = false;
        this._p = new PIXI.Point(0, 0);

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

        $('#focalLength').val(this.camera.focalLength);
        $('#focalLength').change(function () {
            that.camera.focalLength = $(this).val();
        });

        $('#movementDamping').val(this.camera.movementDamping);
        $('#movementDamping').change(function () {
            that.camera.movementDamping = $(this).val();
        });

        $('#useZoom').change(function () {
            that.useZoom = $(this)[0].checked;
        });

        $('#shake').click(function () {
            that.camera.shake(15, 2);
        });
    };

    p.populate = function (layer, asset, count, bounds, scaleMin, scaleMax, alphaMin, alphaMax) {
        scaleMin = scaleMin || 1;
        scaleMax = scaleMax || 1;
        alphaMin = alphaMin || 1;
        alphaMax = alphaMax || 1;
        while (--count > -1) {
            var s = PIXI.Sprite.fromFrame(asset);
            s.anchor.set(0.5, 0.5);
            s.x = this.integer(bounds[0], bounds[1]);
            s.y = this.integer(bounds[2], bounds[3]);
            layer.addChild(s);
            s.rotation = this.float(0, Math.PI * 2);
            var scale = this.float(scaleMin, scaleMax);
            s.scale.set(scale, scale);
            s.alpha = this.float(alphaMin, alphaMax);
        }
    };

    p.integer = function (min, max) {
        return Math.round(Math.random() * (max - min) + min);
    };
    p.float = function (min, max) {
        return Math.random() * (max - min) + min;
    }

}());






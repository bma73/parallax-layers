Parallax Layers
===============

Parallax layers for [PixiJS](http://www.pixijs.com/)

 

Example at <https://bma73.github.io/parallax-layers/>

 

Create a container holding the parallax layers  


~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 var baseContainer = new PIXI.Container();
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

 

Create the camera

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 this.camera = new bma.pixi.ParallaxCamera(this.renderer, baseContainer);
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

 

Create parallax layers

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var layer0 = new bma.pixi.ParallaxLayer(100); //top most
var layer1 = new bma.pixi.ParallaxLayer(30);
var layer2 = new bma.pixi.ParallaxLayer(-10);
var layer3 = new bma.pixi.ParallaxLayer(-400);
var layer4 = new bma.pixi.ParallaxLayer(-600);
var layer5 = new bma.pixi.ParallaxLayer(-1300);
var layer6 = new bma.pixi.ParallaxLayer(-2000); //bottom
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

and add them to the camera

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
this.camera.addLayer(layer0);
this.camera.addLayer(layer1);
this.camera.addLayer(layer2);
this.camera.addLayer(layer3);
this.camera.addLayer(layer4);
this.camera.addLayer(layer5);
this.camera.addLayer(layer6);
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

 

Call the camera.update() method every frame

 

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
camera.setTarget() 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

sets the target to any PIXI.DisplayObject. The target must be child of a
“parallax layer”.  


~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
camera.bounds = new PIXI.Rectangle(-2000, -1000, 2000, 1000);  
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

restricts the camera movement - in this example from x -2000 to 2000 and y from
-1000 to 1000.  


~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
camera.shake(strength, durationMs)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

shakes the camera  


~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
camera.zoom = value
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

sets the camera zoom factor

 

 



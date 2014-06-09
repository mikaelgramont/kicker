var KickerModel = function(height, width, angle) {
	this.height = parseFloat(height);
	this.width = parseFloat(width);
	this.angle = parseFloat(angle);
	this.radius = this.calculateRadius(this.height, this.angle);
	this.length = this.calculateLength(this.height, this.angle);
};

KickerModel.prototype.height = null;

KickerModel.prototype.width = null;

KickerModel.prototype.angle = null;

KickerModel.prototype.radius = null;

KickerModel.prototype.length = null;

KickerModel.prototype.calculateRadius = function(h, alphaDeg) {
  var alphaRad = alphaDeg * Math.PI / 180,
      r = h / (1 - Math.cos(alphaRad));
  return r;
}

KickerModel.prototype.calculateLength = function(h, alphaDeg) {
  var alphaRad = alphaDeg * Math.PI / 180,
      l = h * Math.sin(alphaRad) / (1 - Math.cos(alphaRad));
  return l;    
}

KickerModel.prototype.createProfile = function(rendering) {
	console.log('creating a profile');
	if (rendering == 'canvas') {
		return this.createCanvasProfile_();
	} else if (rendering == 'webgl') {
		return this.createWebGLProfile_();
	}
};

KickerModel.prototype.createCanvasProfile_ = function() {
  console.log('creating a canvas profile');
  var points = [];

  var canvasHeight = 600;
  var angleRad = this.angle * Math.PI / 180;
  var scale = 150;
  var steps = 20;
  var currentAngleRad, x, y;
  var scaledRadius = this.radius * scale;

  for (var i = 0; i < steps; i++) {
    currentAngleRad = i / steps * angleRad;
    x = scaledRadius * Math.sin(currentAngleRad);
    y = canvasHeight - scaledRadius * (1 - Math.cos(currentAngleRad));
    points.push([x,y]);
  }
  points.push([x + 20, y]); 
  points.push([x + 20, canvasHeight]); 
  points.push([0, canvasHeight]); 

  return new Profile(points, this.width);
};

KickerModel.prototype.createWebGLProfile_ = function() {
  console.log('creating a WebGL profile');
  var points = [];

  var angleRad = this.angle * Math.PI / 180;
  var steps = 20;
  var currentAngleRad, x, y;

  for (var i = 0; i <= steps; i++) {
    currentAngleRad = i / steps * angleRad;
    x = this.radius * Math.sin(currentAngleRad);
    y = this.radius * (1 - Math.cos(currentAngleRad));
    points.push([x,y]);
  }
  points.push([x + .2, y]); 
  points.push([x + .2, 0]); 

  return new Profile(points, this.width);
};
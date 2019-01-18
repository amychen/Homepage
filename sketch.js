var particles = [];
function setup() {
	createCanvas(windowWidth, windowHeight);
	for (var i = 0; i < 19; i++) {
		particles.push(new Particle());
	}
}

function draw() {
	background(255, 255, 255);
	fill(0,0,0);
	months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	textFont("Georgia");
	textSize(40);
	textAlign(LEFT);
	text(months[parseInt(month(), 10) - 1] + " " + day() + ", " + year(), windowWidth / 2.1, windowHeight / 2.3);
	textSize(20);
	text(hour() < 10 ? "0" + hour() + ":" + minute() + ":" + second() : hour() + ":" + minute() + ":" + second(), windowWidth / 1.57, windowHeight / 2.01);
	
	if (temp != undefined) {
		text(temp + "F " + desc, windowWidth/1.1, windowHeight - 20);
	}

	particles.forEach(function(particle) {
		particle.move(1);
		particle.display();
	});

	for (var i = 0; i < particles.length; i++) {
		for (var j = 0; j < particles.length; j++) {
			if (dist(particles[i].x, particles[i].y, particles[j].x, particles[j].y) < 130) {
				stroke(0,0,0, map(dist(particles[i].x, particles[i].y, particles[j].x, particles[j].y), 0, 150, 5, 20));
				line(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
			}
		}
	};
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function Particle() {
	this.x = random(0, windowWidth);
	this.y = random(0, windowHeight);
	this.radius = random(5, 35);
	this.speed = random(5, 8);
	this.directionX = Math.random(-1, 1) < 0 ? Math.random(-2, -1) : Math.random(1, 2);
	this.directionY = Math.random(-1, 1) < 0 ? Math.random(-2, -1) : Math.random(1, 2);
	this.clr = color(random(1, 255), random(1, 255), random(1, 255), random(40, 140));
	noStroke();
		
	this.display = function() {
		fill(this.clr);
		ellipse(this.x, this.y, this.radius);
	};

	this.move = function(boostSpeed) {
		this.x += this.speed * this.directionX * boostSpeed;
		this.y += this.speed * this.directionY * boostSpeed;

		if (this.x > windowWidth || this.x < 0) {
			this.directionX *= -1;
			this.newParticle();
		}

		if (this.y > windowHeight || this.y < 0) {
			this.directionY *= -1;
			this.newParticle();
		}
	}

	this.moveToMouse = function() {
		if ((this.x > mouseX && this.directionX > 0) || (this.x < mouseX && this.directionX < 0)) {
			this.directionX *= -1;
		}
		if ((this.y > mouseY && this.directionY > 0) || (this.y < mouseY && this.directionY < 0)) {
			this.directionY *= -1;
		}

		this.move(5);
	}

	this.newParticle = function() {
		this.speed = random(5, 8);
		this.radius = random(5, 35);
	}
}

function mousePressed() {
	particles.forEach(function(particle) {
		particle.moveToMouse();
	});
}

var temp;
var desc;
const promise = new Promise((res, rej) => {
	if (navigator.geolocation) {
		navigator.geolocation.watchPosition(function(position) {
			pos = {
				lat: position.coords.latitude,
				long: position.coords.longitude
			};
			url = "https://api.openweathermap.org/data/2.5/weather?lat=" + pos.lat + "&lon=" + pos.long + auth_token;
			console.log(url);
			res(url);
		});
	} else {
		rej('error')
	}
}).then(function getWeather(url) {
	var request = new XMLHttpRequest();
	request.open("GET", url);
	request.onload = function() {
		var response = JSON.parse(this.response);
		if (request.status >= 200 && request.status < 400) {
			const kel = response.main.temp;
			temp = parseInt((kel - 273.15) * 1.8 + 32);
			desc = response.weather[0].main;
		} else {
			console.log("Error");
		}
	}
	request.send();
}).catch(function err() {
	console.log("error");
});



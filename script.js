let cvs = document.getElementsByTagName("canvas")[0];
let ctx = cvs.getContext("2d");

window.addEventListener("resize", resizeCanvas);
function resizeCanvas() {
	cvs.width = window.innerWidth;
	cvs.height = window.innerHeight;
	graph.resizing(window.innerWidth, window.innerHeight);
}

class Graph {
	constructor(width, height) {
		this.resizing(width, height);
	}

	resizing(width, height) {
		this.width = width;
		this.height = height;
		this.center = [this.width / 2, this.height / 2];
		this.unit = [(this.width - 5) / 20, (this.width - 5) / 20];
		this.drawAxes();
		console.log(this.center);
	}

	drawAxes() {
		ctx.translate(this.center[0], this.center[1]);
		ctx.clearRect(-this.center[0], -this.center[1], this.width, this.height);
		ctx.fillStyle = "#797979";
		for (let i = -10; i < 11; i++) {
			ctx.fillRect(this.unit[0] * i - 0.5, -this.height / 2, 1, this.height);
		}
		for (let i = -10; i < 11; i++) {
			ctx.fillRect(-this.width / 2, this.unit[1] * i - 0.5, this.width, 1);
		}
		ctx.fillStyle = "#000";
		/*x:*/ ctx.fillRect(-this.width / 2, -1, this.width, 2);
		/*y:*/ ctx.fillRect(-1, -this.height / 2, 2, this.height);
	}
}

let graph = new Graph(window.innerWidth, window.innerHeight);

resizeCanvas();
// cvs.addEventListener("mousedown", (eve) => console.log(eve));
// cvs.addEventListener("mouseup", (eve) => console.log(eve));
cvs.addEventListener("mousemove", (eve) => {
	let x = eve.movementX,
		y = eve.movementY;
	console.log(graph.center);
	ctx.translate(-graph.center[0], -graph.center[1]);
	graph.center[0] += x;
	graph.center[1] += y;
	graph.drawAxes();
	console.log(graph.center);
});

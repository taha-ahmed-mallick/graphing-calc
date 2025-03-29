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
		this.drag = false;
		this.touchCoord = [0, 0];
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

		// || to y-axis*
		let yLimit = [
			Math.floor(-this.center[0] / this.unit[0]),
			Math.floor((this.width - this.center[0]) / this.unit[0]),
		];
		for (let i = yLimit[0]; i <= yLimit[1]; i++) {
			ctx.fillRect(this.unit[0] * i - 0.5, -this.center[1], 1, this.height);
		}
		// || to x-axis
		let xLimit = [
			Math.floor(-this.center[1] / this.unit[1]),
			Math.floor((this.height - this.center[1]) / this.unit[1]),
		];
		for (let i = xLimit[0]; i <= xLimit[1]; i++) {
			ctx.fillRect(-this.center[0], this.unit[1] * i - 0.5, this.width, 1);
		}
		ctx.fillStyle = "#000";
		/*x:*/ ctx.fillRect(-this.center[0], -1, this.width, 2);
		/*y:*/ ctx.fillRect(-1, -this.center[1], 2, this.height);

		// point to draw on (m,n)
		ctx.fillStyle = "#03A9F4";
		let [m, n] = [0.5, -1];
		ctx.arc(this.unit[0] * m, -this.unit[1] * n, 4, 0, Math.PI * 2);
		ctx.fill();
		ctx.beginPath();
	}
}

let graph = new Graph(window.innerWidth, window.innerHeight);

resizeCanvas();
cvs.addEventListener("mousedown", () => (graph.drag = true));
cvs.addEventListener("mouseup", () => (graph.drag = false));
cvs.addEventListener("mouseleave", () => (graph.drag = false));
cvs.addEventListener("mousemove", (eve) => {
	if (!graph.drag) return null;
	let x = eve.movementX,
		y = eve.movementY;
	ctx.translate(-graph.center[0], -graph.center[1]);
	graph.center[0] += x;
	graph.center[1] += y;
	graph.drawAxes();
});

cvs.addEventListener("touchstart", (eve) => {
	graph.drag = true;
	graph.touchCoord = [eve.changedTouches[0].pageX, eve.changedTouches[0].pageY];
});
cvs.addEventListener("touchend", () => (graph.drag = false));
cvs.addEventListener("touchcancel", () => (graph.drag = false));
cvs.addEventListener("touchmove", (eve) => {
	let change = [eve.changedTouches[0].pageX - graph.touchCoord[0], eve.changedTouches[0].pageY - graph.touchCoord[1]];
	graph.touchCoord = [eve.changedTouches[0].pageX, eve.changedTouches[0].pageY];
	ctx.translate(-graph.center[0], -graph.center[1]);
	graph.center[0] += change[0];
	graph.center[1] += change[1];
	graph.drawAxes();
});

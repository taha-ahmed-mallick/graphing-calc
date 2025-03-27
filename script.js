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
		for (
			let i = Math.floor(-this.center[0] / this.unit[0]);
			i <= Math.floor((this.width - this.center[0]) / this.unit[0]);
			i++
		) {
			ctx.fillRect(this.unit[0] * i - 0.5, -this.center[1], 1, this.height);
		}
		for (
			let i = Math.floor(-this.center[1] / this.unit[1]);
			i <= Math.floor((this.width - this.center[1]) / this.unit[1]);
			i++
		) {
			ctx.fillRect(-this.center[0], this.unit[1] * i - 0.5, this.width, 1);
		}
		ctx.fillStyle = "#000";
		/*x:*/ ctx.fillRect(-this.center[0], -1, this.width, 2);
		/*y:*/ ctx.fillRect(-1, -this.center[1], 2, this.height);
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
	console.log(graph.center);
	ctx.translate(-graph.center[0], -graph.center[1]);
	graph.center[0] += x;
	graph.center[1] += y;
	graph.drawAxes();
	console.log(graph.center);
});

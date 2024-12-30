// test/script.js

const parallelLines = require('parallel-lines')
const points = [
	{ x: 20, y: 20 },
	{ x: 20, y: 50 },
	{ x: 30, y: 70 },
	{ x: 40, y: 100},
	{ x: 80, y: 120},
	{ x: -1, y: 130},
	{ x: -10, y: 10},
	{ x: -10, y: 0},
	{ x: 20, y: 0}
];
console.log('const coordinates = ');
console.log(points);
console.log(';\n');
console.log('const parallel = ');
const lines = parallelLines.getParallels(points, 5);
console.log(lines);
console.log(';\n');
const line1 = [ 5, 63.301270189221924, 12.679491924311229, 78.66025403784438 ];
const line2 = [ 7.5, 77.5, 17.5, 107.5 ];
const intersection = parallelLines.findIntersection(line1, line2);

const leftPoints = [];
const rightPoints = [];
const lines1 = [  { x: 20, y: 50 },
  { x: 30, y: 70 } ];
const parallels1 = parallelLines.parallels(lines1[0], lines1[1], 15, leftPoints, rightPoints);


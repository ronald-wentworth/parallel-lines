// test/script.js

const parallelLines = require('parallel-lines')
const points = [
	{ x: 20, y: 20 },
	{ x: 20, y: 50 },
	{ x: 30, y: 70 },
	{ x: 40, y: 100},
	{ x: 80, y: 120}
];
console.log('const coordinates = ');
console.log(points);
console.log(';\n');
console.log('const parallel = ');
console.log(parallelLines.getParallels(points, 5));
console.log(';\n');


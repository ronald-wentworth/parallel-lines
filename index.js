//index.js

const rightPoints = [];
const leftPoints = [];

function findIntersection(line1, line2) {
	const [x1, y1, x2, y2] = line1;
	const [x3, y3, x4, y4] = line2;
	const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
	if (denominator === 0) { 
	// The lines are parallel or coincident 
		return null;
	}
	const intersectX = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / denominator;
	const intersectY = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / denominator;
	return { x: intersectX, y: intersectY }; 
}
function checkPointPositionDirected(x1, y1, x2, y2, px, py) {
    const D = (x2 - x1) * (py - y1) - (y2 - y1) * (px - x1);

    if (D > 0) {
        return 1
    } else if (D < 0) {
        return -1
    } else {
        return 0;
    }
}

function parallels(p1, p2, offset) {
	const x1 = p1.x;
	const y1 = p1.y;
	const x2 = p2.x;
	const y2 = p2.y;
	const rightFrom = {x:0, y:0};
	const rightTo = {x:0, y:0};
	const leftFrom = {x:0, y:0};
	const leftTo = {x:0, y:0};
	

	if (x1 === x2) { // Vertical line
		rightFrom.x = x1 + offset;
		rightFrom.y = y1;
		rightTo.x = x2 + offset;
		rightTo.y = y2;
		leftFrom.x = x1 - offset;
		leftFrom.y = y1;
		leftTo.x = x2 - offset;
		leftTo.y = y2;
	} else if (y1 === y2) { // Horizontal line
		rightFrom.x = x1;
		rightFrom.y = y1 + offset;
		rightTo.x = x2;
		rightTo.y = y2 + offset;
		leftFrom.x = x1;
		leftFrom.y = y1 - offset;
		leftTo.x = x2;
		leftTo.y = y2 - offset;
	} else { // Diagonal line
		// Calculate the slope
		const dx = p2.x - p1.x;
		const dy = p2.y - p1.y;

		// Calculate the angle of the line
		const angle = Math.atan2(dy, dx);

		// Calculate the parallel line points
		const parallelX1 = x1 + offset * Math.sin(angle + Math.PI / 2);
		const parallelY1 = y1 - offset * Math.cos(angle + Math.PI / 2);
		const parallelX2 = x2 + offset * Math.sin(angle + Math.PI / 2);
		const parallelY2 = y2 - offset * Math.cos(angle + Math.PI / 2);

		const parallelX3 = x1 - offset * Math.sin(angle + Math.PI / 2);
		const parallelY3 = y1 + offset * Math.cos(angle + Math.PI / 2);
		const parallelX4 = x2 - offset * Math.sin(angle + Math.PI / 2);
		const parallelY4 = y2 + offset * Math.cos(angle + Math.PI / 2);

		// Draw the parallel lines
		rightFrom.x = parallelX1;
		rightFrom.y = parallelY1;
		rightTo.x = parallelX2;
		rightTo.y = parallelY2;
		leftFrom.x = parallelX3;
		leftFrom.y = parallelY3;
		leftTo.x = parallelX4;
		leftTo.y = parallelY4;
	}
	if(checkPointPositionDirected(x1, y1, x2, y2, rightTo.x, rightTo.y) === -1) {
		let tempX = rightTo.x;
		let tempY = rightTo.y;
		rightTo.x = leftTo.x;
		rightTo.y = leftTo.y;
		leftTo.x = tempX;
		leftTo.y = tempY;
		tempX = rightFrom.x;
		tempY = rightFrom.y;
		rightFrom.x = leftFrom.x;
		rightFrom.y = leftFrom.y;
		leftFrom.x = tempX;
		leftFrom.y = tempY;
	}
	console.log('rightFrom:');
	console.log(rightFrom);
	console.log('rightTo:');
	console.log(rightTo);
	if( rightPoints.length > 0 ) {

		const modLine = rightPoints[rightPoints.length - 1];
		const line1Start = rightPoints[rightPoints.length - 2];
		const line1 = [line1Start.x, line1Start.y, modLine.x, modLine.y];
		const line2 = [rightFrom.x, rightFrom.y, rightTo.x, rightTo.y];
		const intersectPoint = findIntersection(line1, line2);
		modLine.x = intersectPoint.x;
		modLine.y = intersectPoint.y;
		rightPoints.push(rightTo);
	} else {
		rightPoints.push(rightFrom);
		rightPoints.push(rightTo);
	}
	if( leftPoints.length > 0 ) {
		const modLine = leftPoints[leftPoints.length - 1];
		const line1Start = leftPoints[leftPoints.length - 2];
		const line1 = [line1Start.x, line1Start.y, modLine.x, modLine.y];
		const line2 = [leftFrom.x, leftFrom.y, leftTo.x, leftTo.y];
		const intersectPoint = findIntersection(line1, line2);
		modLine.x = intersectPoint.x;
		modLine.y = intersectPoint.y;
		leftPoints.push(leftTo);
	} else {
		leftPoints.push(leftFrom);
		leftPoints.push(leftTo);
	}
}
function getParallels(points, distance) {
	points.forEach((point, i) => {
		if(i > 0) {
			parallels(points[i - 1], point, distance);
		}
	});

	return { l: leftPoints, r: rightPoints };
}
module.exports = { getParallels, findIntersection }


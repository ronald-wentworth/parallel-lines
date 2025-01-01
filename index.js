//index.js

function findIntersection(line1, line2) {
	const [x1, y1, x2, y2] = line1;
	const [x3, y3, x4, y4] = line2;
    const isLine1Vertical = (x1 === x2);
    const isLine2Vertical = (x3 === x4);
    const isLine1Horizontal = (y1 === y2);
    const isLine2Horizontal = (y3 === y4);
    if((isLine1Vertical && isLine2Vertical) ||
    	(isLine1Horizontal && isLine2Horizontal)) {
    	return { x: x3, y: y3};
    }
    if(isLine1Vertical) {
    	const intersectY = ((y4 - y3) / (x4 - x3)) * (x1 - x3) + y3;
    	return { x: x2, y: intersectY };
    }
    if (isLine2Vertical) {
        const intersectY = ((y2 - y1) / (x2 - x1)) * (x3 - x1) + y1; 
        return { x: x3, y: intersectY };
    }
    if (isLine1Horizontal) {
    	const intersectX  = x3 + ((y1-y3) / ((y4 - y3) / (x4 - x3)));
    	return { x: intersectX, y: y2 };
    }
    if (isLine2Horizontal) {
    	const intersectX  = x1 + ((y1-y3) / ((y2 - y1) / (x2 - x1)));
    	return { x: intersectX, y: y2 };
    }
	const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
	if (denominator === 0) { // The lines are parallel or coincident 
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

function parallels(p1, p2, offset, leftPoints, rightPoints) {
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
		const dx = x2 - x1;
		const dy = y2 - y1;
		const length = Math.sqrt( dx * dx + dy * dy );
		const unitX = dx / length;
		const unitY = dy / length;
		const perpX = -unitY * offset;
		const perpY = unitX * offset;
		rightFrom.x = x1 + perpX;
		rightFrom.y = y1 + perpY;
		rightTo.x = x2 + perpX;
		rightTo.y = y2 + perpY;
		leftFrom.x = x1 - perpX;
		leftFrom.y = y1 - perpY;
		leftTo.x = x2 - perpX;
		leftTo.y = y2 -perpY;
	}
	if(checkPointPositionDirected(x1, y1, x2, y2, rightTo.x, rightTo.y) === 1) {
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
	const rightPoints = [];
	const leftPoints = [];
	points.forEach((point, i) => {
		if(i > 0) {
			parallels(points[i - 1], point, distance, leftPoints, rightPoints);
		}
	});
	return { l: leftPoints, r: rightPoints };
}
module.exports = { getParallels, findIntersection, parallels, checkPointPositionDirected }


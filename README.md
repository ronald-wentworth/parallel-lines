# Parallel Lines

This library demonstrates how to draw parallel lines based on a set of given points using JavaScript. The original lines are drawn in blue, and the parallel lines are drawn in red.

## Features

- Draws lines connecting specified points.
- Calculates and draws parallel lines at a specified offset.

## Getting Started
To run this project locally, follow these steps:
To use
  
  `npm install parallel-lines`

or
**Clone the repository** (or download the files):
> git clone https://github.com/ronald-wentworth/parallel-lines.git
> cd parallel-lines
## Available functions
### getParallels
1. **points:**  an array of connected x, y coordinates (i.e [{x:0, y:10}, {x:5, y:11} ...)
2. **distance:** a value representing the distance from the above points that new points should be generated

***returns*** a left(l) and right(r) array of points representing the new parallel lines (i.e {l:[{x:0,y:10}...}],r:[...]} 

### findIntersection
1. **line1** an array with 4 elements represeting the from xy coords and the to xy coords for the first line
2. **line2** same as 1 except for the second line

***returns*** xy coords where the 2 lines intersect

### checkPointPositionDirected
1. **x1, y1** point where line starts
2. **x2, y2** point where line ends
3. **px, py** test point

***returns*** which direction the point is relative to the direction of the line 1 left, -1 right, 0 on line

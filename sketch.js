var cols, rows;
var w = 6;
var edgeLength = 100;
var grid = [];
var count = 0;
var current;
var bottomReached = false;
var stack = [];
var ids= [];
var idsExpanded = [];
var visitArray=[];
function setup() {
    
  createCanvas(w*edgeLength, w*edgeLength);
  cols = floor(edgeLength)
  rows = floor(edgeLength)
  //frameRate(5);
  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var cell = new Cell(i, j);
      grid.push(cell)
    }
  }
  current = grid[0];
  drawMaze();

}

function solveAStar(flag,control){
    
    let nRows = edgeLength;
    let nCols = edgeLength;
    var start = grid[0];
    var end = Math.floor(edgeLength*edgeLength-1);
    var startX = start % nCols;
    var startY = Math.floor(start / nRows);
    var endX = end % nCols;
    var endY = Math.floor(end / nRows);

    // begin A* algorithm

	
    // List of nodes currently being explored. The node with the smallest fScore
    // will be evaluated and moved to the closed list
  
    var t0 = performance.now()
    var open = [];
    open.push(grid[0]);

    // Nodes already evaluated will show as true
    var closed = Array(nRows*nCols).fill(false);

    // Position of Cell from which the cell came. Start cell has position 1
    var cameFrom = [];

    // gScore is number of steps to reach current node
    var gScore = Array(nRows*nCols).fill(Infinity);
    gScore[index(start.i,start.j)] = 0;

    // fScore is heuristic combining gScore and Manhattan distance to finish
    var fScore = Array(nRows*nCols).fill(Infinity);
    fScore[index(start.i,start.j)] = costEstimate(index(start.i,start.j), endX, endY, nRows, nCols,flag);
    
    var path = null;

    while (open.length > 0){
        var bestFScore = Infinity;
        var curr = null;
        var currentIndex = 0;
        // select cell with lowest fScore to explore this iteration
        for(var i = 0; i < open.length; i++){
            if(fScore[index(open[i].i,open[i].j)] < bestFScore){
                bestFScore = fScore[index(open[i].i, open[i].j)];
                curr = open[i];
                currentIndex = i;
            }
        }
        if (index(curr.i,curr.j) == end){
            path = reconstructPath(cameFrom, curr);
            break;
        }
        // remove current from open list and add to closed list
        open.splice(currentIndex, 1);
        closed[index(curr.i,curr.j)] = true;
       
        var top = grid[index(curr.i,curr.j-1)];
        var bottom = grid[index(curr.i,curr.j+1)];
        var right = grid[index(curr.i+1,curr.j)];
        var left = grid[index(curr.i-1,curr.j)];
        let all = []
       
        all.push(top);
        all.push(right);
        all.push(bottom);
        all.push(left);
        // add neighbors to open list if no wall separates and calculate fScore
        for (var k = 0; k < 4; k++){
            if(all[k] !== undefined && grid[index(curr.i,curr.j)].walls[k] == false){
            var tentativeGScore = gScore[index(curr.i,curr.j)] + 1;

            if (tentativeGScore >= gScore[index(all[k].i, all[k].j)])
                continue;
            
            // indicate that neighbor came from the current cell
            cameFrom[index(all[k].i, all[k].j)] = curr;
            gScore[index(all[k].i, all[k].j)] = tentativeGScore;
            fScore[index(all[k].i, all[k].j)] = gScore[index(all[k].i, all[k].j)] + costEstimate(index(all[k].i, all[k].j), endX, endY, nRows, nCols);
            if(!open.includes(all[k])){
                open.push(all[k]);
            }
            }
        }
    }
    var t1 = performance.now();
    console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")
    document.getElementById("time").innerHTML = "Time taken to find the path: "+ (t1-t0) + " ms";
    ids = path;
    document.getElementById("pathLength").innerHTML = "Path length: " + path.length;
    document.getElementById("expandNodes").innerHTML = "Expanded nodes number: " + closed.filter(x => x === true).length;
    for(var i = 0; i < path.length; i++){
        grid[path[i]].showPath(flag,control);
    }
}


function solveUCS(flag,control){
    let nRows = edgeLength;
    let nCols = edgeLength;
    var start = grid[0];
    var end = Math.floor(edgeLength*edgeLength-1);
     // gScore is number of steps to reach current node
    var t0 = performance.now();
    var frontier = [];
    frontier.push([0,grid[0],[]]);
    var visited = [];
    let count = 5;
    let path = [];
    let resultPath = [];
    while(frontier.length > 0){
        frontier = frontier.sort(sortFunction);
        let removed = frontier.shift(); 
        let cost = removed[0];
        let node = removed[1];
        let parent = removed[2];
        if(!visited.includes(node)){
            path.push(node);
            visited.push(node);
             
            if(index(node.i,node.j) === end){
                parent.push(node)
                resultPath = parent;
                break;
            }
            var top = grid[index(node.i,node.j-1)];
            var bottom = grid[index(node.i,node.j+1)];
            var right = grid[index(node.i+1,node.j)];
            var left = grid[index(node.i-1,node.j)];
            let all = []

            all.push(top);
            all.push(right);
            all.push(bottom);
            all.push(left);
            for (var k = 0; k < 4; k++){
            if(all[k] !== undefined && grid[index(node.i,node.j)].walls[k] == false && !visited.includes(all[k])){
             
                let temp = [];
                for (let i = 0; i < parent.length; i++) {
                   temp[i] = parent[i];
                }
                let totalCost = cost + 1;
                temp.push(node);
                frontier.push([totalCost,all[k],temp])     
            }
        }
        }
       count++;
    }
    var t1 = performance.now();
     console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")
       document.getElementById("time").innerHTML = "Time taken to find path: "+(t1-t0) + " ms";
        ids = resultPath;
       document.getElementById("pathLength").innerHTML = "Path length: " + resultPath.length;
       document.getElementById("expandNodes").innerHTML = "Expanded nodes number: " + path.length;
     for(var i = 0; i < resultPath.length; i++){
        resultPath[i].showPath(false,control);
    }
    
    
 
}

function solveIDS(flag,control){
	idsExpanded = [];
    let nRows = edgeLength;
    let nCols = edgeLength;
    var start = grid[0];
    var end = Math.floor(edgeLength*edgeLength-1);
	var t0 = performance.now();
    iterativeDeepeningDFS(start,end)
	var t1 = performance.now();
	showIds();
	    document.getElementById("time").innerHTML = "Time taken to find path: "+(t1-t0) + " ms";
       document.getElementById("pathLength").innerHTML = "Path length: " + ids.length;
       document.getElementById("expandNodes").innerHTML = "Expanded nodes number: " + idsExpanded.length;
}

const iterativeDeepeningDFS = function (start, target) {
    // Start by doing DFS with a depth of 1, keep doubling depth until we reach the "bottom" of the tree or find the node we're searching for
	
    for (let i = 0; i < edgeLength*edgeLength; i++) {
       // One of the "end nodes" of the search with this depth has to still have children and set this to false again
		visitArray = [];
        var result = iterativeDeepeningDFSRec(start, target, 0, i,visitArray);
        if (result != null) {
            // We've found the goal node while doing DFS with this max depth
            return result;
        }

        // We haven't found the goal node, but there are still deeper nodes to search through

    }
	
	
    // Bottom reached is true.
    // We haven't found the node and there were no more nodes that still have children to explore at a higher depth.
    return null;
};

const iterativeDeepeningDFSRec = function (node, target, currentDepth, maxDepth,visitArray) {
   
    if (index(node.i,node.j) === target) {
        // We have found the goal node we we're searching for
        console.log("Found the node we're looking for!");
		
        bottomReached = true;
        return node;
    }

    if (currentDepth === maxDepth) {
        // We have reached the end for this depth...
        bottomReached = true;
        return null;
    }
	visitArray.push(node);
	idsExpanded.push(node);
    var top = grid[index(node.i,node.j-1)];
    var bottom = grid[index(node.i,node.j+1)];
    var right = grid[index(node.i+1,node.j)];
    var left = grid[index(node.i-1,node.j)];
    let all = []

    all.push(top);
    all.push(right);
    all.push(bottom);
    all.push(left);
    for (var k = 0; k < 4; k++){
        if(all[k] !== undefined && grid[index(node.i,node.j)].walls[k] == false && !visitArray.includes(all[k])){
            var result = iterativeDeepeningDFSRec(all[k], target, currentDepth + 1, maxDepth,visitArray);
            if (result != null) {
                // We've found the goal node while going down that child
                return result;
            }
            
        }
    }


    // We've gone through all children and not found the goal node
    return null;
};

function showIds(){
   
     for(var i = 0; i < ids.length; i++){
        if(ids[i].i === undefined){
            grid[ids[i]].showPath(false,2);
        }
         else{
             ids[i].showPath(false,2)
         }
    }
}

function sortFunction(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}
function reconstructPath(cameFrom, current){
    console.log(current)
    totalPath = [];
    totalPath.push(index(current.i,current.j));
    while (current !== undefined && index(current.i,current.j) != -1){
        current = cameFrom[index(current.i,current.j)];
    
        if(current !== undefined && index(current.i,current.j) != -1)
            totalPath.push(index(current.i,current.j));
    }
    return totalPath;
}


function costEstimate(position, endX, endY, nRows, nCols,flag){
    pX = position % nCols;
    pY = Math.floor(position / nRows);
    if(flag === true){
        
        return Math.abs(pX - endX) + Math.abs(pY - endY);
    }
    
    else {
        return Math.sqrt((Math.abs(pX - endX)**2) + (Math.abs(pY - endY)**2));
    }
}





function drawMaze(){ 
    stack.push(current);
    current.visited = true;
    while(stack.length !== 0){
        background(51)
        current = stack[stack.length-1] 


          // STEP 1
          var next = current.checkNeighbors();
          if (next) {
            next.visited = true;
            // STEP 2
            stack.push(next);

            // STEP 3
            removeWalls(current, next);

          } else {
            stack.pop();
          }


        count++;
    }

	
    for (var i = 0; i < grid.length; i++) {
    grid[i].show();
	}
	
	
  
}

function index(i,j){
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1;
  }
  return i + j * cols;
}

function removeWalls(a, b) {
  var x = a.i - b.i
  if (x === 1 ) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  var y = a.j - b.j
  if (y === 1 ) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}

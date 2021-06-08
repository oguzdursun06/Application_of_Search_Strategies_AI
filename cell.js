function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.walls = [true, true, true, true];
  this.visited = false;
  this.checkNeighbors = function() {
    var neighbors = [];

    var top = grid[index(i, j - 1)];
    var bottom = grid[index(i, j + 1)];
    var right = grid[index(i + 1, j)];
    var left = grid[index(i - 1, j)];

    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }

    if (neighbors.length > 0) {
      var r  = floor(random(0, neighbors.length));
      return neighbors[r];
    } else {
      return undefined;

    }

  }

  
  this.show = function(){
    var x = this.i * w;
    var y = this.j * w;
    stroke(255);
    if (this.walls[0]) {
      line(x    ,y    ,x+w  ,y)
    }
    if (this.walls[1]) {
      line(x+w  ,y    ,x+w  ,y+w)
    }
    if (this.walls[2]) {
      line(x+w  ,y+w  ,x    ,y+w)
    }
    if (this.walls[3]) {
      line(x    ,y+w  ,x    ,y)
    }
    if (this.visited){
      noStroke();
      fill(65, 169, 71, 100);
      rect(x, y, w, w);
    }
  }
  
  
  this.showPath = function(flag,control){
      var x = this.i * w;
      var y = this.j * w;
      if(flag){
      noStroke();
      fill(200, 29, 241, 200);
      rect(x+w/4, y+w/4, w/2,w/2 );
      }
      
      else{
          noStroke();
          if(control === 0){
          fill(200, 229, 11,200);
            rect(x+w/4, y+w/4, w/2,w/2 );
          }
          else if(control == 1){
              fill(255, 0, 70, 255);
            rect(x+w/4, y+w/4, w/2,w/2);
          }
          else{
              fill(0, 181, 204, 150);
              rect(x+w/4, y+w/4, w/2,w/2 );
          }
      }
  }

}

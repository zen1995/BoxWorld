var game = {};

var Edge = function(p1,p2){
	this.p1 = p1;
	this.p2 = p2;
	this.distance = 0;
	this.pre = -1;
	this.next = -1;
}

game.edge = function(p1,p2){
	return new Edge(p1,p2);
}

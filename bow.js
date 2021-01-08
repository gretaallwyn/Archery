class Bow{
    constructor(bodyA, pointB){
        var options = {
            bodyA: bodyA,
            pointB: pointB,
            stiffness: 0.4,
            length: 1
        }
        
       this.bowShot = Constraint.create(options);
        World.add(world, this.bowShot);
        this.pointB=pointB;
    }
    attach(body){
        this.bowShot.bodyA = body;
    }
    
    fly(){
        this.bowShot.bodyA = null;
    }

    display(){
       
        if(this.bowShot.bodyA){
            var pointA = this.bowShot.bodyA.position;
            var pointB = this.pointB;
            push();
            
            
            
           
                
                line(pointA.x , pointA.y, pointB.x , pointB.y);
               
                
            
           
            
            pop();
        }
    }
}   
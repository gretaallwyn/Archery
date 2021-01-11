const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Query = Matter.Query;
const Bounds = Matter.Bounds;
const SAT = Matter.SAT;

//variables for man holding bow and arrow,target board object,arrows array and arrow objects 
var man,manImg;
var arrow,arrowImg;
var bow,bowImg;
var archeryBoard,archeryBoardImg;
var arr1,arr2,arr3,arr4;
var arrows;
var arrows=[];
var gameState="onBow";


//load images for backgroun, man
function preload(){
    backgroundImg = loadImage("images/archery bacground3.jpg");
    manImg = loadImage("images/archery2.png");
   // arrowImg = loadImage("images/archery arrow2.png");
    archeryBoardImg = loadImage("images/archery board 2.png");

}


function setup(){
    var canvas = createCanvas(windowWidth,windowHeight);
    engine = Engine.create();
    world = engine.world;

    //a temporary gorund to place the arrows
    ground= new Ground(width/4,height-40,400,5);

    //the target board
    board= new Board(width-400,height/2+100);

    //four arrow objects
    arr1= new Arrow(265,350,250,100);
    arr2= new Arrow(380,740,250,100);
    arr3= new Arrow(380,740,250,100);
    arr4= new Arrow(380,740,250,100);
    

    //pushing the arrows in reverse order into the array
     arrows.push(arr4);
     arrows.push(arr3);
     arrows.push(arr2);
     arrows.push(arr1);


    //constraint to drag and release arrow from bow 
    bow= new Bow(arr1.body,{x:265,y:350})
    //ground= createSprite(width/4,height-40,400,5);
}





function draw(){
    background(backgroundImg);
    Engine.update(engine);

    


  

    //image of the man

    image(manImg,100,height/2-100,200,400);

    ground.display();
    //image(archeryBoardImg,width-500,height/2-50,400,400);


    
    
    board.display();
    arr1.display();
    arr2.display();
    arr3.display();
    arr4.display();
    bow.display();

   // detectCollision= Query.collides(board.body,arrows[arrows.length-1].body);
  
    //console.log(detectCollision);

    //console.log(arrows[arrows.length-1].body.velocity.x);
    // if( arrows[arrows.length-1].body.position.x>1000 && arrows[arrows.length-1].body.position.x<1330 ){
    //         Matter.Body.setStatic(arrows[arrows.length-1].body,true);
    // }
    //drawSprites();

    textSize(20);
    fill("blue");
    text(mouseX+","+mouseY,mouseX,mouseY);
}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(arrows[arrows.length-1].body, {x: mouseX , y: mouseY});
      // Matter.Body.applyForce(arrows[arrows.length-1].body,arrows[arrows.length-1].body.position,{x:5,y:-5})
       return false;
    }
}


function mouseReleased(){
    bow.fly();
    arrows.pop();
    gameState = "launched";
    return false;
}

function keyPressed(){
    if(keyCode===32 && gameState==="launched"){
        if(arrows.length>=0){
            Matter.Body.setPosition(arrows[arrows.length-1].body,{x:265,y:350})
            bow.attach(arrows[arrows.length-1].body);
            gameState = "onBow";
        }
    }
}

/*
                             * Returns a list of collisions between `body` and `bodies`.
                             * @method collides
                             * @param {body} body
                             * @param {body[]} bodies
                             * @return {object[]} Collisions*/
                             
                     /*Query.collides = function(body, bodies) {
                                var collisions = [];
                        
                                for (var i = 0; i < bodies.length; i++) {
                                    var bodyA = bodies[i];
                                    
                                    if (Bounds.overlaps(bodyA.bounds, body.bounds)) {
                                        for (var j = bodyA.parts.length === 1 ? 0 : 1; 
                                            j < bodyA.parts.length; j++) {
                                            var part = bodyA.parts[j];
                        
                                            if (Bounds.overlaps(part.bounds, body.bounds)) {
                                                var collision = SAT.collides(part, body);
                        
                                                if (collision.collided) {
                                                    collisions.push(collision);
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }
                                
                                console.log(collisions);

                                return collisions;
             };*/

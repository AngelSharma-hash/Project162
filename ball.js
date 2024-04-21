AFRAME.registerComponent("balls",{
    init:function(){
        this.shootballs()
    },
    shootballs:function(){
        window.addEventListener("keydown",(e)=>{
            if (e.key==="q"){
                var ball = document.createElement("a-entity")
                ball.setAttribute("geometry",{
                    primitive:"sphere",
                    radius:0.1
                })
                ball.setAttribute("material",{
                    src:"./123.jpg"
                })
                
                var cam = document.querySelector("#camera")
                var pos = cam.getAttribute("position")
                ball.setAttribute("position",{x:pos.x,y:pos.y,z:pos.z})
                var camera = document.querySelector("#camera").object3D
                direction = new THREE.Vector3()
                camera.getWorldDirection(direction)
                ball.setAttribute("velocity",direction.multiplyScalar(-10))
                var scene = document.querySelector("#scene")

                ball.setAttribute("dynamic-body",{
                    shape:"sphere",
                    mass:"0",
                })
                ball.addEventListener("collide",this.removeBalls)

                scene.appendChild(ball)
            }
        })
    },
    removeBalls:function(e){
        console.log(e.detail.target.el)
        console.log(e.detail.body.el)
        var element = e.detail.target.el
        var elHit = e.detail.body.el
        if (elHit.id.includes("box")){
        elHit.setAttribute("material",{
            opacity:1,
            transparent:true
        })
        var impulse = new CANNON.Vec3(-2.5,2.5,1.75)
        var world_point = new CANNON.Vec3().copy(
            elHit.getAttribute("position")
        )
        elHit.body.applyImpulse(impulse,world_point)
        element.removeEventListener("collide",this.shoot)      
        var scene = document.querySelector("#scene")
        scene.removeChild(element)
        
        }
        
    }
})
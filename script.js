document.addEventListener('DOMContentLoaded', ()=>{

    const cursor = {
            pos: {x: 0, y: 0},
            pre: null,
            active: false,
            moving: false

    }

    const myCanvas = document.querySelector('#myCanvas')
    const context = myCanvas.getContext('2d')

    myCanvas.width = 700
    myCanvas.height = 500
    context.lineWidth = 1
    

    const lineColor = document.querySelector('#lineColor')
    lineColor.onchange = () => {
        context.strokeStyle = lineColor.value
    }
    const lineWidth = document.querySelector('#lineWidth')
    lineWidth.onmouseleave = () => {
        context.lineWidth = lineWidth.value
    }

//const linha = {
//    pos: {x: 350, y: 250},
//    pre: {x:10,y:10}
//}

    const drawLine = (line) => {

        context.beginPath()
        context.moveTo(line.pre.x,line.pre.y)
        context.lineTo(line.pos.x,line.pos.y)
        context.stroke()        
    }

    const cicle = () => {
        if(cursor.active && cursor.moving && cursor.pre){
            drawLine({pos: cursor.pos, pre: cursor.pre})
            cursor.moving = false
        }
        cursor.pre = {x: cursor.pos.x, y: cursor.pos.y}

        setTimeout(cicle,10)
    }

//    drawLine({pos: {x: 350, y: 250}, pre: {x: 10, y: 10}})

    myCanvas.onmousedown = (event) => {
        cursor.active = true
    }

    myCanvas.onmouseup = (event) => {
        cursor.active = false
    }

    myCanvas.onmousemove = (event) => {
        cursor.pos.x = event.clientX
        cursor.pos.y = event.clientY
        cursor.moving = true
    }

    cicle()
    

    

})


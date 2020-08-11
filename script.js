document.addEventListener('DOMContentLoaded', ()=>{

    // Obj ponteiro
    const cursor = {
            pos: {x: 0, y: 0},
            pre: null,
            active: false,
            moving: false
    }

    // Selecionando canvas
    const myCanvas = document.querySelector('#myCanvas')
    const context = myCanvas.getContext('2d')

    // Definindo tamanho do canvas e da linha
    myCanvas.width = 700
    myCanvas.height = 500
    context.lineWidth = 1
    
    // Definindo método para mudar espessura e cor da linha 
    const lineColor = document.querySelector('#lineColor')
    lineColor.onchange = () => {
        context.strokeStyle = lineColor.value
    }
    const lineWidth = document.querySelector('#lineWidth')
    lineWidth.onchange = () => {
        context.lineWidth = lineWidth.value
    }

    // Método para desenhar uma linha no contexto do canvas
    const drawLine = (line) => {
        context.beginPath()
        context.moveTo(line.pre.x,line.pre.y)
        context.lineTo(line.pos.x,line.pos.y)
        context.stroke()        
    }

    // TODO: Método para desenhar um circulo no contexto do canvas
    const drawFillCircle = (line) => {
        context.beginPath()
        context.arc(x, y, radius, 0, 2 * Math.PI, false)
        context.fill()
    }
    
    // Ciclo de reload do canvas
    const cicle = () => {
        if(cursor.active && cursor.moving && cursor.pre){
            drawLine({pos: cursor.pos, pre: cursor.pre})    
            const x = Math.pow(cursor.pos.x - cursor.pre.x)
            const y = Math.pow(cursor.pos.y - cursor.pre.y)

            cursor.moving = false
        }
        cursor.pre = {x: cursor.pos.x, y: cursor.pos.y}

        setTimeout(cicle,10)
    }

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


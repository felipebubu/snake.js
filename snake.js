<canvas id="snake" width=300 height=300 style="border:1px solid #DF6B6B;"></canvas>
<script>
    var surface = document.getElementById('snake');
    var ctx = surface.getContext('2d');
    ctx.strokeStyle = '#DF6B6B';
    const Player = {
        x: 144,
        y: 144,
        length: 5,
        speed_x: 4,
        speed_y: 0,
        width: 2,
        height: 2,
    }

    let blocks = [[144, 142,], [144, 140,], [144, 138,], [144, 136]];

    var savestate_x = 0;
    var savestate_y = 0;
    function draw([x, y]){
        ctx.clearRect(0, 0, surface.width, surface.height);
        ctx.rect(x, y, Player.width, Player.height);
    }


    var block_coord = 0;
    function block(){
        let block = [Math.floor(Math.random() * 300), Math.floor(Math.random() * 300)];
        while(block[0] % 4 != 0){
        block[0] = Math.floor(Math.random() * 300);
        }

        while(block[1] % 4 != 0){
        block[1] = Math.floor(Math.random() * 300);
        }

        block_coord = block;
    }

    block()


    let direction_x = 0;
    let direction_y = 0;

    function animate(){
        ctx.beginPath()
        draw([Player.x, Player.y])
        for(let i = 1; i < Player.length; i++){
            draw(blocks[blocks.length - i]);
        }
        draw(block_coord);
        Player.x += Player.speed_x
        Player.y += Player.speed_y
        ctx.stroke();
        requestAnimationFrame(animate);

        let reversed_blocks = blocks.slice().reverse()
        for (let i = 0; i < Player.length - 1; i++){
            if ((Player.x == reversed_blocks[i][0] && Player.y == reversed_blocks[i][1]) || (Player.x > 298 || Player.x < 0) || (Player.y > 302 || Player.y < 0)){
                Player.x = 144
                Player.y = 144
                Player.length = 5
                block()
            }
        }


        blocks.push([Player.x, Player.y])
        if (Player.x == block_coord[0] && Player.y == block_coord[1]){
            Player.length++;
            block();
        }
    }
    animate();


    const bind_up = [38, 36, 87]
    const bind_down = [40, 35, 83]
    const bind_right = [39, 34, 68]
    const bind_left = [37, 46, 65]

    function ValidateNewDirection(key){
        if(Player.speed_y == 4 && bind_up.includes(key))
            return false

        else if(Player.speed_y == -4 && bind_down.includes(key))
            return false

        else if(Player.speed_x == 4 && bind_left.includes(key))
            return false

        else if(Player.speed_x == -4 && bind_right.includes(key))
            return false

        return true
    }

    function SnakeUp(){
        Player.speed_y = -4;
        Player.speed_x = 0;

    }

    function SnakeDown(){
        Player.speed_y = 4;
        Player.speed_x = 0;
    }

    function SnakeRight(){
        Player.speed_y = 0;
        Player.speed_x = 4;
    }

    function SnakeLeft(){
        Player.speed_y = 0;
        Player.speed_x = -4
    }

    window.addEventListener("keydown", function(e){
        const key = e.keyCode;
        if(ValidateNewDirection(key)){
            if(bind_up.includes(key))
                SnakeUp();
            if(bind_down.includes(key))
                SnakeDown();
            if(bind_right.includes(key))
                SnakeRight();
            if(bind_left.includes(key))
                SnakeLeft();
        }


    });
</script>

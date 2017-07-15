
/** Class representing an Enemy */
class Enemy {
    /**
     * Create an Enemy.
     * @constructor 
     * @param {object} position - represents starting position with x and y properties
     * @param {number} speed - represents how fast our enemy can move 
     */
    constructor(position, speed) {
        /**
        * @var {string} this.sprite - represents an image path  for displaying enemy bugs 
        */
        this.sprite = 'images/enemy-bug.png';
        let { x, y } = position;
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

    /**
     * @description  Update the enemy's position
     * @method 
     * @param {date} dt - a time delta between ticks
     */
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += this.speed * dt;

        while (this.x > 450) {
            this.x = -50;
        }
    }

    /**
     * @description  Renders all the enemies on the screen
     * @method 
     */
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

}


/** Class representing a Player */
class Player {
    /**
    * Creates a Player.
    * @constructor
    * @param {object} position - represents starting position with x and y properties
    */
    constructor(position) {
        /**
         * @var {string} this.sprite - represents an image path  for displaying player
         */
        let { x, y } = position;
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-boy.png';
    }

    /**
    * @description  Renders player on the screen
    * @method 
    */
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    /**
    * @description  handles keyboard input and checks for collisions with barriers. 
    * Handles collision with the water.
    * @method 
    * @param {string} key the name of pressed key
    */
    handleInput(key) {

        if (key === 'left') {
            let x = this.x;
            x -= 101;
            let isNotCollidedWithLeftBarrier = x !== -101;
            if (isNotCollidedWithLeftBarrier) {
                this.x = x;
            }
        }
        else if (key === 'right') {
            let x = this.x;
            x += 101;
            let isNotCollidedWithRightBarrier = x !== 505;
            if (isNotCollidedWithRightBarrier) {
                this.x = x;
            }
        }
        else if (key === 'down') {
            let y = this.y;
            y += 80;
            let isNotCollidedWithBottomBarrier = y !== 480;
            if (isNotCollidedWithBottomBarrier) {
                this.y = y;
            }
        }
        else if (key === 'up') {
            let y = this.y;
            y -= 80;
            this.y = y;
            let iSCollidedWithWater = y === 0;
            let self = this;
            if (iSCollidedWithWater) {
                setTimeout(function () {
                    self.resetToInitialPos();
                }, 300);

            }
        }
    }

    /**
     * @description  resets player to initial position when he has won or has lost the game.
     * @method 
     */
    resetToInitialPos() {
        let { x, y } = playerInitialPosition;
        this.x = x;
        this.y = y;
    }
}

//position objects with properties x and y for correct initial placement for enemies and player
let enemy1Position = { x: -50, y: 65 };
let enemy2Position = { x: -50, y: 147 };
let enemy3Position = { x: -50, y: 230 };
let playerInitialPosition = { x: 202, y: 320 };

//instantiate three enemies
let enemy1 = new Enemy(enemy1Position, 100);
let enemy2 = new Enemy(enemy2Position, 150);
let enemy3 = new Enemy(enemy3Position, 300);

// instantiate player  
let player = new Player(playerInitialPosition);

// place all the enemy instances  in array
let allEnemies = [enemy1, enemy2, enemy3];

// This listens for key presses and sends the keys to handleInput method
document.addEventListener('keyup', function (e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

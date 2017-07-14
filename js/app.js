
/** Class representing an Enemy */
class Enemy {
    /**
     * Create an Enemy.
     * @param {object} position - represents starting position with x and y variables
     * @param {number} speed - represents how fast our enemy can move 
     */
    constructor(position, speed) {
        /**
        * 
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
     * @param {object} position - represents starting position with x and y variables
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
  * @description  handles keyboard input and checks for collisions with barriers. Handles collision with the water.
  * @method 
  * @param {string} key the name of pressed key
  */
    handleInput(key) {

        if (key === 'left') {
            let x = this.x;
            x -= 101;
            let isNotCollided = x !== -101;
            if (isNotCollided) {
                this.x = x;
            }
        }
        else if (key === 'right') {
            let x = this.x;
            x += 101;
            let isNotCollided = x !== 505;
            if (isNotCollided) {
                this.x = x;
            }
        }
        else if (key === 'down') {

            let y = this.y;
            y += 80;
            let isNotCollided = y !== 480;
            if (isNotCollided) {
                this.y = y;
            }
        }
        else if (key === 'up') {
            let y = this.y;
            y -= 80;
            this.y = y;
            let iSCollided = y === 0;
            if (iSCollided) {
                this.resetToInitialPos();
                alert("you won the game");
            }
        }

        console.log(`x: ${this.x} y: ${this.y} Coll:`);
    }

   /**
   * @description  resets player to initial position when he has won and has lost the game.
   */
    resetToInitialPos() {
        let { x, y } = playerInitialPosition;
        this.x = x;
        this.y = y;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


let enemy1Position = { x: -50, y: 65 };
let enemy2Position = { x: -50, y: 147 };
let enemy3Position = { x: -50, y: 230 };
let playerInitialPosition = { x: 202, y: 320 };

let enemy1 = new Enemy(enemy1Position, 100);
let enemy2 = new Enemy(enemy2Position, 150);
let enemy3 = new Enemy(enemy3Position, 300);

let allEnemies = [enemy1, enemy2, enemy3];
let player = new Player(playerInitialPosition);
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

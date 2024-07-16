// Wait until the page is fully loaded...
document.addEventListener("DOMContentLoaded",
    // ...and then...
    ()=> {
        // Store inside of variables the references to all the DOM div elements we need:
        const gameContainer = document.getElementById("game-container");
        const startButton = document.getElementById("start-button");
        const resetButton = document.getElementById("reset-button");
        const scoreDisplay = document.getElementById("score");
        const timerDisplay = document.getElementById("timer");

        // Set the initial values for starting the game:
        let score = 0;
        let timeLeft = 20;
        let canClick = true;

        // And create a variable to hold how quickly the flowers will change locations on the screen:
        let flowerTimer;

        // Create a function to start the game:
        function startGame() {
            startButton.style.display = "none";
            resetButton.style.display = "none";
            score = 0;
            timeLeft = 20;
            // Display the current score counter and remaining time counter:
            scoreDisplay.textContent = 'Number of flowers collected: ${score}';
            timerDisplay.textContent = 'TIME REMAINING: ${timeLeft} seconds';
            // Call on the spawnFlower function:
            spawnFlower();
            // Set how quickly the flowers change on the screen to 0.25 seconds (aka 250 milliseconds):
            flowerTimer = setInterval(spawnFlower, 250);
            // Decrement the game's timer by one every second...
            const gameTimer = setInterval(  ()=> {
                timeLeft--;
                timerDisplay.textContent = 'TIME REMAINING: ${timeLeft} seconds';
                // ...and once the timer reaches zero, reset this timer and call on the endGame function:
                if (timeLeft <= 0) {
                    clearInterval(flowerTimer);
                    clearInterval(gameTimer);
                    endGame();
                }
            }, 1000);
        }

    // Create the function to spawn the flower animation in a new location on the screen:
    function spawnFlower() {
        // If the game isn't running then end the function:
        if (!canClick) return;
        // But if the game is still running, then...
        // create a variable to call on the DOM div called "flowers": 
        const flower = document.getElementById("flowers");
        if (flower) gameContainer.removeChild(flower);
        // Create a variable to hold a new element on the page - the flower image:
        const newFlower = document.createElement("img");
        // Set the source of that new image tag on the page to be the flower gif:
        newFlower.src = "/Images/FromTenor_changing-flowers.gif";
        // Set the image id to be "flower":
        newFlower.id = "flower";
        // Position the flower in a random location within the game-container square:
        newFlower.style.left = '${Math.random() * 200}px';
        newFlower.style.top = '${Math.random() * 200}px';
        // Pay attention to every time the flower gif is clicked on...
        newFlower.addEventListener("click", 
            // ...and if the game is over then end the function
            () => {
                if (!canClick) return;
                // But if the flower is still clickable, then increase the score by one...
                score++;
                scoreDisplay.textContent = 'Number of flowers collected: ${score}';
                // ...and remove the flower image from the screen:
                gameContainer.removeChild(newFlower);
            }
        );

        // Append the newFlower image into the gameContainer
        gameContainer.appendChild(newFlower);
    }


});
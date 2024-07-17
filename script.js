// Wait until the page is fully loaded...
document.addEventListener("DOMContentLoaded",
    // ...and then...
    ()=> {
        // Store inside of variables references to the DOM div elements we need:
        const gameContainer = document.getElementById("game-container");
        const startButton = document.getElementById("start-button");
        const resetButton = document.getElementById("reset-button");
        const scoreDisplay = document.getElementById("score");
        const timerDisplay = document.getElementById("timer");
        const finalScore = document.getElementById("final-score");

        // Set the initial values for starting the game:
        let score = 0;
        let timeLeft = 30;
        // And turn on the ability to click on the flower image as it appears on the screen:
        let canClick = true;

        // Create a variable to hold how quickly the flowers will change locations on the screen:
        let flowerTimer;

        // Create a function to start the game:
        function startGame() {
            // Remove both the start button and the reset button from the screen:
            startButton.style.display = "none";
            resetButton.style.display = "none";
            // In case of multiple rounds of playing, reset the score and timer each time a new game begins:
            score = 0;
            timeLeft = 30;
            // Display the current score counter and remaining time counter:
            scoreDisplay.style.display = "block";
            scoreDisplay.textContent = 'Number of flowers collected: ' + score;
            timerDisplay.style.display = "block";
            timerDisplay.textContent = 'TIME REMAINING: ' + timeLeft + ' seconds';
            // Call on the spawnFlower function:
            spawnFlower();
            // Set how quickly the flowers change on the screen to 0.700 seconds (aka 700 milliseconds):
            flowerTimer = setInterval(spawnFlower, 700);
            // Decrement the game's timer by one every second...
            const gameTimer = setInterval(  ()=> {
                timeLeft--;
                timerDisplay.textContent = 'TIME REMAINING: ' + timeLeft + ' seconds';
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
        // create a variable to call on the DOM div called "flower": 
        const flower = document.getElementById("flower");
        if (flower) gameContainer.removeChild(flower);
        // Create a variable to hold a new element on the page - the flower image:
        const newFlower = document.createElement("img");
        // Set the source of that new image tag on the page to be the flower gif:
        newFlower.src = "Images/FromTenor_changing-flowers.gif";
        // Set the image id to be "flower":
        newFlower.id = "flower";
        // Position the flower in a random location within the game-container square:
        let leftSpacing = Math.floor(Math.random() * 200);
        newFlower.style.left = leftSpacing +"px";
        let topSpacing = Math.floor(Math.random() * 200);
        newFlower.style.top = topSpacing+'px';
        // Pay attention to every time the flower gif is clicked on...
        newFlower.addEventListener("click", 
            // ...and if the game is over then end the function
            () => {
                if (!canClick) return;
                // But if the flower is still clickable, then increase the score by one...
                score++;
                scoreDisplay.textContent = 'Number of flowers collected: ' + score;
                // ...and remove the flower image from the screen:
                gameContainer.removeChild(newFlower);
            }
        );

        // Add this newFlower image into the gameContainer
        gameContainer.appendChild(newFlower);
    }

    // Create a function to handle ending the game:
    function endGame() {
        // Remove the start button from the screen:
        startButton.style.display = "none";
        // Cause the reset button to appear:
        resetButton.style.display = "block";
        // Display how many flowers the user clicked on before time ran out:
        finalScore.setAttribute('style', 'white-space: pre;');
        finalScore.textContent = '\r\nGAME OVER! \r\n \r\nYou\'ve built a beautiful \r\nbouquet by collecting \r\n' + score + ' flowers! \r\n💐';
        // Reset the timer display to be blank:
        timerDisplay.style.display = "none";
        // Reset the score counter display to be blank:
        scoreDisplay.style.display = "none";
        // Turn off the ability to click on any new flowers:
        canClick = false;
        // Remove flower gif from the screen:
        flower.style.display = "none";
    }

    // Add an event listener for starting the game on mouse click to the start button:
    startButton.addEventListener("click", startGame);

    // Add an event listener for resetting/replaying a new game on mouse click to the reset button:
    resetButton.addEventListener("click", () => {
        // Remove the start and reset buttons from the screen:   
        startButton.styledisplay = "none";
        resetButton.styledisplay = "none";
        // Also remove the game over / final score message from the game area:
        finalScore.style.display = "none";
        // Make the flowers clickable
        canClick = true;
        // Call on the startGame function:
        startGame();
    } );





});
document.addEventListener('DOMContentLoaded', function() {
    let gameState = "new"
    
    let homeScoreEl = document.getElementById("home-score-el")
    let guestScoreEl = document.getElementById("guest-score-el")
    let timerEl = document.getElementById("timer-el")

    let initialTime = 20 * 60
    let timeLeft = initialTime

    function formatTime(seconds) {
        let minutes = Math.floor(seconds / 60)
        let secs = seconds % 60
        return (
            (minutes < 10 ? "0" + minutes : minutes) + ":" +
            (secs < 10 ? "0" + secs : secs)
        )
    }

    timerEl.textContent = formatTime(initialTime)


    let homeScorePoints = 0
    let guestScorePoints = 0

    function addPoints(point) {
        console.log("button clicked!")
        
        switch(point) {
            case '+1-home':
                console.log("home score 1 point added")
                homeScorePoints += 1
                break
            case '+2-home':
                homeScorePoints += 2
                break
            case '+3-home':
                homeScorePoints += 3
                break
            case '+1-guest':
                guestScorePoints += 1
                break
            case '+2-guest':
                guestScorePoints += 2
                break
            case '+3-guest':
                guestScorePoints += 3
                break
        }

        homeScoreEl.textContent = homeScorePoints
        guestScoreEl.textContent = guestScorePoints

    }


    function newGame() {
        
        if(timerInterval) {
            clearInterval(timerInterval)
        }
        
        homeScoreEl.textContent = 0
        guestScoreEl.textContent = 0
        homeScorePoints = 0
        guestScorePoints = 0
        timeLeft = initialTime
        timerEl.style.fontSize = "60px"
        timerEl.textContent = formatTime(initialTime)

        gameState = 'new'
        
    }



    let timerInterval
    
    function startTimer() {
        console.log("start clicked") 
                
        if (gameState === "new") {
            gameState = "running"
                    if(timerInterval) {
                        clearInterval(timerInterval)
                    }

                            timerInterval = setInterval(function() {
                            
                                timerEl.textContent = formatTime(timeLeft)

                                if (timeLeft === 0 ) {
                                    clearInterval(timerInterval)
                                    timerEl.style.fontSize = "50px"
                                    timerEl.textContent = "GAME OVER"
                                }

                                timeLeft--

                            }, 1000)
                    
        }


    }


    function pauseTimer() {
        
        if(gameState === "running") {

            gameState = "paused"

            if(timerInterval) {
                clearInterval(timerInterval)
                timerInterval = null
                console.log("Timer paused at:" + timeLeft)
            }

        }
        
        
    }

    function resumeTimer() {
        if(!timerInterval && gameState === "paused") {
            
            timerInterval = setInterval(function(){
                timerEl.textContent = formatTime(timeLeft)

                if(timeLeft === 0) {
                    clearInterval(timerInterval)
                    timerEl.style.fontSize = "50px"
                    timerEl.textContent = "GAME OVER"
                }

                timeLeft--

                

            },1000)

            gameState = "running"
        }
    }

    window.addPoints = addPoints
    window.newGame = newGame
    window.startTimer = startTimer
    window.pauseTimer = pauseTimer
    window.resumeTimer = resumeTimer

})



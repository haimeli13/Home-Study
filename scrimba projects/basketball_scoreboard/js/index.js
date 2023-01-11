

/* ⁡⁢⁢⁣​‌‌‍⁡⁣⁢⁣𝗛𝗼𝗺𝗲 𝗙𝘂𝗻𝗰𝘁𝗶𝗼𝗻𝘀⁡​⁡ */

let homeScore = document.getElementById("home-score")
let homeCounter = 0

function addOneHome()
{
    homeCounter += 1
    homeScore.textContent = homeCounter
}

function addTwoHome()
{
    homeCounter += 2
    homeScore.textContent = homeCounter
}

function addThreeHome()
{
    homeCounter += 3
    homeScore.textContent = homeCounter
}


/* ​‌‌‍⁡⁣⁢⁣𝗚𝘂𝗲𝘀𝘁 𝗙𝘂𝗻𝗰𝘁𝗶𝗼𝗻𝘀⁡​ */

let guestScore = document.getElementById("guest-score")
let guestCounter = 0

function addOneGuest()
{
    guestCounter += 1
    guestScore.textContent = guestCounter
}

function addTwoGuest()
{
    guestCounter += 2
    guestScore.textContent = guestCounter
}

function addThreeGuest()
{
    guestCounter += 3
    guestScore.textContent = guestCounter
}

/* ⁡⁢⁣⁣​‌‌‍𝗰𝗼𝗺𝗺𝗼𝗻​⁡ */

let periodEl = document.getElementById("period-num")
let period = 1

function reset()
{
    guestCounter = 0
    guestScore.textContent = guestCounter
    
    homeCounter = 0
    homeScore.textContent = homeCounter

    period = 1
    periodEl.textContent = period
}

/* ⁡⁢⁣⁢​‌‌‍𝗧𝗜𝗠𝗘𝗥​⁡ */
class Timer {
    constructor(root) {
        root.innerHTML = Timer.getHTML();

        this.el = {
            minutes: root.querySelector(".timer__part--minutes"),
            seconds: root.querySelector(".timer__part--seconds"),
            control: root.querySelector(".timer__btn--control"),
            reset: root.querySelector(".timer__btn--reset")
        };

        this.interval = null; // the timer is running? - use as a boolean
        this.remainingSeconds = 0;

        // wait for click event from the control button class
        this.el.control.addEventListener("click", () =>
            {
                if (this.interval === null)
                {
                    this.start();
                }
                else
                {
                    this.stop();
                }
            }
        );

        // Wait for click event from the reset button class
        this.el.reset.addEventListener("click", () => {
                const inputMinutes = prompt("Enter number of minutes:");

                if (inputMinutes < 60 && inputMinutes >= 1 && inputMinutes % 1 == 0) // Not supporting hours
                {
                    this.stop();
                    this.remainingSeconds = inputMinutes * 60;
                    this.updateInterfaceTime();
                }
                else
                {
                    alert("Minimum time - 1 minute \nMaximum time - 60 minutes\nUse round minutes only!");
                }
            }
        );
    }

    // Calculate timer minutes and seconds
    updateInterfaceTime()
    {
        const minutes = Math.floor(this.remainingSeconds / 60);
        const seconds = this.remainingSeconds % 60;

        // if only 1 number so pad into the start (put) "0" in start -> 01 instead of 1
        this.el.minutes.textContent = minutes.toString().padStart(2, "0");
        this.el.seconds.textContent = seconds.toString().padStart(2, "0");
    }

    // Changing icon according to status
    updateInterfaceControls()
    {
        if (this.interval === null) // timer not running
        {
            //if timer not running use the play_Arrow icon
            this.el.control.innerHTML = `<span class="material-icons">play_arrow</span>`;

            //used to display the start icon class instead of stop when not runnings
            this.el.control.classList.add("timer__btn--start");
            this.el.control.classList.remove("timer__btn--stop");
        }
        else
        {
            //if timer not running use the pause icon
            this.el.control.innerHTML = `<span class="material-icons">pause</span>`;

            //used to display the stop icon class instead of start when not runnings
            this.el.control.classList.add("timer__btn--stop");
            this.el.control.classList.remove("timer__btn--start");
        }
    }

    start()
    {
        if (period < 4)
        {
            if (this.remainingSeconds == 0)
            {
                return;
            }

            // setInterval -> run code in timer -> changing from null to value
            this.interval = setInterval(() => {
                this.remainingSeconds--; // minus second every time (timing)
                this.updateInterfaceTime(); // update interface of the time

                if (this.remainingSeconds == 0)
                {
                    this.stop();
                    // period handling
                    var periodNum = document.getElementById('period-num');
                    period++;
                    periodNum.textContent = period;
                }
                else
                {
                    reset();
                }
                
            } , 1000); // 1000 is 1 second
            
            this.updateInterfaceControls();
        }
        else
        {
            alert("Reset Game before continue");
        }
    }

    // stop the setInterval from the start method to keep going
    stop()
    {
        clearInterval(this.interval);

        this.interval = null; // stopping the timer from running

        this.updateInterfaceControls();
    }

    static getHTML() {
        return `
            <span class="timer__part timer__part--minutes">00</span>
            <span class="timer__part">:</span>
            <span class="timer__part timer__part--seconds">00</span>
            <button type="button" class="timer__btn timer__btn--control timer__btn--start">
                <span class="material-icons">play_arrow</span>
            </button>
            <button type="button" class="timer__btn timer__btn--reset">
                <span class="material-icons">timer</span>
            </button>
        `;
    }
}

new Timer(
    document.querySelector(".timer")
);
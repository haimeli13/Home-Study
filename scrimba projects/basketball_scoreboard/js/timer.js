var period = 0;

export default class Timer {
    constructor(root)
    {
        root.innerHTML = Timer.getHTML();

        this.el = {
            minutes: root.querySelector(".timer__part--minutes"),
            seconds: root.querySelector(".timer__part--seconds"),
            control: root.querySelector(".timer__btn--control"),
            reset: root.querySelector(".timer__btn--reset")
        };

        this.interval = null; // the timer is running?
        this.remainingSeconds = 0;

        // wait for click event from the control
        this.el.control.addEventListener("click", () => {
            if (this.interval == null)
            {
                this.start();
            }
            else
            {
                this.stop();
            }
        });

        // wait for click event from the reset
        this.el.reset.addEventListener("click", () => {
            const inputMinutes = prompt("Enter number of minutes:");

            if (inputMinutes < 60) // not supporting hours
            {
                this.stop();
                this.remainingSeconds = inputMinutes * 60;
                this.updateInterfaceTime();
            }
        });
    }

    updateInterfaceTime () // Calculate timer minutes and seconds
    {
        const minutes = Math.floor(this.remainingSeconds / 60);
        const seconds = this.remainingSeconds % 60;

        // if only 1 number so pad into the start (put) "0" in start -> 01 instead of 1
        this.el.minutes.textContent = minutes.toString().padStart(2, "0");
        this.el.minutes.textContent = seconds.toString().padStart(2, "0");
    }

    updateInterfaceControls()
    {
        if (this.interval == null) // timer not running
        {
            //if timer not running use the play_Arrow icon
            this.el.control.innerHTML = '<span class="material-icons">play_arrow</span>';

            //used to display the start icon class instead of stop when not runnings
            this.el.control.classList.add("timer__btn--start");
            this.el.control.classList.remove("timer__btn--stop");
        }
        else
        {
            //if timer not running use the pause icon
            this.el.control.innerHTML = '<span class="material-icons">pause_arrow</span>';
            
            //used to display the stop icon class instead of start when not runnings
            this.el.control.classList.add("timer__btn--stop");
            this.el.control.classList.remove("timer__btn--start");
        }
    }

    start()
    {
        if (this.remainingSeconds == 0)
        {
            return;
        }

        // setInterval -> run code in timer -> changing from null to value
        this.interval = setInterval(() => {
            this.remainingSeconds--; //minus second
            this.updateInterfaceTime(); // update time

            if (this.remainingSeconds == 0)
            {
                this.stop();
                var periodNum = document.getElementById("period-num");

                periodNum.textContent = period + 1;
            }
        }, 1000); // 1000 is 1 second

        this.updateInterfaceControls();
    }

    stop()
    {
        // stop the setInterval from the start method to keep going
        clearInterval(this.interval);

        this.interval = null; // stopping the timer from running

        this.updateInterfaceControls();
    }

    static getHTML()
    {
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
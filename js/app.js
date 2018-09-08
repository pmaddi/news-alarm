const TIME_KEY = "timer_time";
// USER INPUTS
var to_airport = '';
var from_airport = '';
var timer_time = '';

function showResult() {
    $(".content").html(`
        <div class='center-container'>
            Your value-at-risk is ${value_at_risk}.
            A fair price for an insurance policy to cover this risk is ${insurance_price}.
        </div>
    `);
}

function showLoadingIndicator(loading_message) {
    /*
     * Show loading spinner
     */

    $(".content").html(`
        <div class='center-container'>
            <img src="/static/img/spinner-1s-200px.gif"/>
            <br/>
            ${loading_message}
        </div>
    `);
}

function loadClock() {
    // Load cached value if a new value isn't provided
    timer_time = $('#timer_time').val()
    if (timer_time === undefined) {
        timer_time = localStorage.getItem(TIME_KEY);
    } else {
        localStorage.setItem(TIME_KEY, timer_time);
    }
    console.log(timer_time);

    $(".content").html(`
        <div class='subheader center-container'>
            Clock
        </div>
        <div class='center-container'>
            <button id='back' type="button" class="btn primary-button btn-lg w-100" onclick="getFreshAlarmTime()">
                Change Alarm
            </button>
        </div>
        <div class='center-container'>
            <div id='clock'>

            </div>

        </div>
        </div>
        <div class='center-container'>
            <button id='get-news' type="button" class="btn primary-button btn-lg w-100" onclick="getNews()">
                Get News
            </button>
        </div>
        <div class='center-container'>
            <p id="news_text"></p>
        </div>
    `);
}


function getFreshAlarmTime() {
    localStorage.removeItem(TIME_KEY);
    getAlarmTime();
}


function getAlarmTime() {
    // Check for cached value
    var timer_val = localStorage.getItem(TIME_KEY);
    console.log(timer_val);
    if (timer_val !== null) {
        loadClock();
        return;
    }
    $(".content").html(`
        <div class='subheader center-container'>
            Set Up Alarm
        </div>
        </div>
        <div class='center-container'>
            <label for="timer_time">Time</label>
            <input id="timer_time" name="timer_time" class="w-100 datetimeinput" type="text" placeholder='HH:MM'/>
        </div>
        <div class='center-container'>
            <button id='gettime-next' type="button" class="btn primary-button btn-lg w-100" onclick="loadClock()" disabled>
                Next
            </button>
        </div>
    `);

    $("#timer_time").timepicker({
        timeFormat: 'HH:mm',
        dropdown: false,
        scrollbar: false
    });

    $(".datetimeinput").on("keyup", function(event) {
        let enable_button = $('#timer_time').val().length >= 4;
        $("#gettime-next").prop('disabled', !enable_button);
        if ((event.which == 13) && enable_button) {
            loadClock();
        }
    });
}


$(document).ready(function () {
    getAlarmTime();
});

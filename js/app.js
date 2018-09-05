// USER INPUTS
var to_airport = '';
var from_airport = '';
var timer_date = '';
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
    $(".content").html(`
        <div class='subheader center-container'>
            Clock
        </div>
        <div class='center-container'>
            <button id='back' type="button" class="btn primary-button btn-lg w-100" onclick="getAlarmTime()">
                Back
            </button>
        </div>
        <div class='center-container'>
            <img src="/static/img/spinner-1s-200px.gif"/>
            <br/>

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


function getAlarmTime() {
    $(".content").html(`
        <div class='subheader center-container'>
            Set Up Alarm
        </div>
        </div>
        <div class='center-container'>
            <label for="timer_date">Date</label>
            <input id="timer_date" name="timer_date" class="w-100 datetimeinput" type="text" placeholder='MM/DD/YYYY'/>
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

    $("#timer_date").datepicker();
    $("#timer_time").timepicker({
        timeFormat: 'HH:mm',
        dropdown: false,
        scrollbar: false
    });

    $(".datetimeinput").on("keyup", function(event) {
        // enable proceeding to next input interface only when both date/time fields have input
        let enable_button = ($('#timer_date').val().length >= 6) && ($('#timer_time').val().length >= 4);
        $("#gettime-next").prop('disabled', !enable_button);
        if ((event.which == 13) && enable_button) {
            loadClock();
        }
    });
}


$(document).ready(function () {
    getAlarmTime();
});

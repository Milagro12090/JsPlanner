function getLocalStorage(key) {
    let value = localStorage.getItem(key);
    if (value) {
        $(`#text${key}`).text(value);
    }
}
//function for creating rowz and top date
$( document ).ready(function() {
    //grab current and use moment to display date
    $("#current").text(moment().format("dddd, MMMM Do"));
    //let i= 9 to create 9 seperate colums
    for (let i = 9; i < 18; i++) {
    
        //column structure using ${i}!
        var row = $(`<div data-time=${i} id='${i}' class="row">`);
        var col1 = $('<div class="col-sm-2"> <p class="hour">' + formatAMPM(i) + '</p>');
        var col2 = $(`<div class="col-sm-8 past"><textarea id=text${i} class="schedData"></textarea>`);        
        var col3 = $(`<div class="col-sm-2"><button class="Btn" id=${i}><i class="fas fa-save"></i></button>`)
        
        row.append(col1);
        row.append(col2);
        row.append(col3);

        //add to container
        $(".container").append(row);

        getLocalStorage(i);
    }
    //function to determine am from pm within columns
    function formatAMPM(hours) {
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        return hours + ampm;
    }
formatAMPM();
//determine if future, past, or present with updating colors
function updateColors(){
        var currentTime = new Date().getHours();
        //${i} for assigning to the style.css and added classes
        for (var i = 9; i < 18; i++) { 
        //console.log(currentTime, $(`#${i}`).data("time"));
        //for current time changing to red
         if ($(`#${i}`).data("time") == currentTime){
            $(`#text${i}`).addClass( "present");
        //for future time changing to green 
        } else if (currentTime < $(`#${i}`).data("time")) {
            $(`#text${i}`).addClass( "future");
        }
    }
}
//grabs above function to update colors
setInterval(function() {
    updateColors();
}, 1000);
//event listener that assigns data from user input on click to any coloumn that will save after refresh
var saveBtn = $('.Btn');
saveBtn.on('click', function(){
    let eventId = $(this).attr('id');
    let eventText = $(this).parent().siblings().children('.schedData').val();
    localStorage.setItem(eventId, eventText);
});});

$(document).ready (function(){
  let currentInput = localStorage.getItem('input')
    if (currentInput === 'Computer') {
      $("#Computer").addClass('selected');
    }
    else if (currentInput === 'Laptop') {
      $("#Laptop").addClass('selected');
    }
    else if (currentInput === 'DocCam') {
      $("#DocCam").addClass('selected');
    }
    else if (currentInput === 'bluRay') {
      $("#BluRay").addClass('selected');
    }
});
//1st input button
$(document).ready( function(){
  $(document).on('click', 'button:button[id^="Computer"]', function (event) {
    $.get("scripts/Inputs/input_1.php");
    $(this).addClass('selected');
    $("#DocCam").removeClass('selected');
    $("#BluRay").removeClass('selected');
    $("#Laptop").removeClass('selected');
    localStorage.setItem('input', 'Computer')
    
    

});
//2nd Input Button
  $(document).on('click', 'button:button[id^="Laptop"]', function (event) {
    $.get("scripts/Inputs/input_4.php");
      $(this).addClass('selected');
    $("#Computer").removeClass('selected');
    $("#DocCam").removeClass('selected');
    $("#BluRay").removeClass('selected');
    localStorage.setItem('input', 'Laptop')
    
});
  //3rd Input Button
  $(document).on('click', 'button:button[id^="DocCam"]', function (event) {
    $.get("scripts/Inputs/input_5.php");
      $(this).addClass('selected');
    $("#Computer").removeClass('selected');
    $("#BluRay").removeClass('selected');
    $("#Laptop").removeClass('selected');
    localStorage.setItem('input', 'DocCam')
    
});
  //4th Input Button
  $(document).on('click', 'button:button[id^="BluRay"]', function (event) {
    $.get("scripts/Inputs/input_6.php");
      $(this).addClass('selected');
    $("#Computer").removeClass('selected');
    $("#DocCam").removeClass('selected');
    $("#Laptop").removeClass('selected');
    localStorage.setItem('input', 'bluRay')
    
});
//Projector Power on and Off Button
$(document).ready(function(){
  let projectorPower = localStorage.getItem('PJPOWER');

  if(projectorPower === 'on') {
     $('#PJ_ON').text("Turn Off Projector");
      $('#PJ_ON').css('background-color', '#808080');
      $('#top-background').css('background-color', '#7cb342');
    };

});
$('#PJ_ON').click(function() {
  var clicks = $(this).data('clicks');
  if (clicks) {
    $('#PJ_ON').text("Turn On Projector");
    $(this).css('background-color', '#7cb342');
    $('#top-background').css('background-color', '#cccccc');
     $.get("scripts/power_off.php");
     localStorage.setItem('PJPOWER', 'off')

  } else {
      $('#PJ_ON').text("Turn Off Projector");
      $(this).css('background-color', '#808080');
      $('#top-background').css('background-color', '#7cb342');

    $.get("scripts/power_on.php");
    localStorage.setItem('PJPOWER', 'on')
  }
  $(this).data("clicks", !clicks);
});
//Microphone Mute Button
$(document).ready(function(){
  let mute = localStorage.getItem('micMute');
  if(mute === 'muted') {
    $("#mic_Icon").attr('src',"images/Mic_Mute.svg");
    $("#micBar").attr('class',"mute");
  }
});
$('#mic_Icon').click(function() {
  var clicks = $(this).data('clicks');
  if (clicks) {
    $("#mic_Icon").attr('src',"images/Mic_Icon.svg");
    $("#micBar").removeAttr('class',"mute");
     $.get("scripts/Mic/Mic_unmute.php");
     localStorage.setItem('micMute', 'unmuted')

  } else {
   $("#mic_Icon").attr('src',"images/Mic_Mute.svg");
    $("#micBar").attr('class',"mute");
    $.get("scripts/Mic/Mic_mute.php");
    localStorage.setItem('micMute', 'muted')

  }
  $(this).data("clicks", !clicks);
});
//Volume Mute Button
$(document).ready(function(){
  let mute = localStorage.getItem('volumeMute');
  if(mute === 'muted') {
    $("#volume_Icon").attr('src',"images/Volume_Mute.svg");
    $("#volumeBar").attr('class',"mute");
  }
})
$('#volume_Icon').click(function() {
  var clicks = $(this).data('clicks');
  if (clicks) {
    $("#volume_Icon").attr('src',"images/Volume.svg");
    $("#volumeBar").removeAttr('class',"mute");
     $.get("scripts/Volume/Volume_unmute.php");
     localStorage.setItem('volumeMute', 'unmuted')

  } else {
   $("#volume_Icon").attr('src',"images/Volume_Mute.svg");
    $("#volumeBar").attr('class',"mute");
    $.get("scripts/Volume/Volume_mute.php");
    localStorage.setItem('volumeMute', 'muted')
  }
  $(this).data("clicks", !clicks);
});
//Sound Vollume
$(document).ready(function(){
   $('#volumeBar').val(JSON.parse(localStorage.getItem('volume'))) 
});
$('#volumeBar').on('input',function(){
  var volumeValue = $(this).val();
 localStorage.setItem('volume', JSON.stringify(volumeValue))
    
if (volumeValue < 1) {
  $.get("scripts/Volume/Volume_0.php")
} 
else if (volumeValue <= 5) {
   $.get("scripts/Volume/Volume_5.php")

 }
else if (volumeValue <= 10) {
   $.get("scripts/Volume/Volume_10.php")

}
else if (volumeValue <= 15) {
   $.get("scripts/Volume/Volume_15.php")

 } 
else if (volumeValue <= 20)  {
   $.get("scripts/Volume/Volume_20.php")

}
else if (volumeValue <= 25) {
   $.get("scripts/Volume/Volume_25.php")

 }
else if (volumeValue <= 30)  {
   $.get("scripts/Volume/Volume_30.php")

}
else if (volumeValue <= 35) {
   $.get("scripts/Volume/Volume_35.php")

 }
else if (volumeValue <= 40) {
   $.get("scripts/Volume/Volume_40.php")

}
else if (volumeValue <= 45) {
   $.get("scripts/Volume/Volume_45.php")

 }
else if (volumeValue <= 50 ) {
   $.get("scripts/Volume/Volume_50.php")

}
else if (volumeValue <= 55) {
   $.get("scripts/Volume/Volume_55.php")

 }
else if (volumeValue <= 60) {
     $.get("scripts/Volume/Volume_60.php")
}
else if (volumeValue <= 65) {
   $.get("scripts/Volume/Volume_65.php")

 }
else if (volumeValue <= 70) {
   $.get("scripts/Volume/Volume_70.php")

}
else if (volumeValue <= 75) {
   $.get("scripts/Volume/Volume_75.php")

 }
else if (volumeValue <= 80){
     $.get("scripts/Volume/Volume_80.php")

}
else if (volumeValue <= 85) {
   $.get("scripts/Volume/Volume_85.php")

 }
else if (volumeValue <= 90) {
   $.get("scripts/Volume/Volume_90.php")

 }
 else if (volumeValue <= 95) {
   $.get("scripts/Volume/Volume_95.php")

 }
else {
   $.get("scripts/Volume/Volume_100.php")
}
});
//Microphone Volume 
$(document).ready(function(){
   $('#micBar').val(JSON.parse(localStorage.getItem('micVolume'))) 
});
$('#micBar').on('input', function(){
  var micValue = $(this).val();
 localStorage.setItem('micVolume', JSON.stringify(micValue))
    
if (micValue < 1) {
  $.get("scripts/Mic/Mic_0.php")
} 
else if (micValue <= 5) {
   $.get("scripts/Mic/Mic_5.php")

} 
else if (micValue <= 10) {
   $.get("scripts/Mic/Mic_10.php")

} 
else if (micValue <= 15) {
   $.get("scripts/Mic/Mic_15.php")

} 
else if (micValue <= 20)  {
   $.get("scripts/Mic/Mic_20.php")

}
else if (micValue <= 25) {
   $.get("scripts/Mic/Mic_25.php")

} 
else if (micValue <= 30)  {
   $.get("scripts/Mic/Mic_30.php")

}
else if (micValue <= 35) {
   $.get("scripts/Mic/Mic_35.php")

} 
else if (micValue <= 40) {
   $.get("scripts/Mic/Mic_40.php")

}
else if (micValue <= 45) {
   $.get("scripts/Mic/Mic_45.php")

} 
else if (micValue <= 50 ) {
   $.get("scripts/Mic/Mic_50.php")

}
else if (micValue <= 55) {
   $.get("scripts/Mic/Mic_55.php")

} 
else {
   $.get("scripts/Mic/Mic_60.php")
}
});
//Clock
var interval = setInterval(timestamphome, 1000);




 function timestamphome(){
 var date;
date = new Date();

 
 var time = document.getElementById('clock'); 
 time.innerHTML = date.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true});


  }
});

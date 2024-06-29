(function($) {
  $.fn.audioDJ = function(options) {
    var configs = $.extend({
      "playerID": 1,
      "path": "file:///C:/Users/sonvt/Music/",
      "src": "DJ X-Sonic & Ray - The Hymn Of The Nautilus",
      "ext": ".mp3",
      "pitch": false,
      "pitchrate": 1,
      "controls": false,
      "pitchlimit": 2.5,
      "skiptime": 10,
      "pitchTime": 120,
      "squishIntervall": 1,
      "artistTheme": ["#00ffff", "#7affff", "#00ffff", "#007dff"]
    }, options);
    
    var audioelement = this;
    
    var playerArea = $("<div/>");
    playerArea.css({
      "width": "100%",
      "height": "210px",
      "background": "#303030",
    });
    
    var player = $("<audio id='player"+configs.playerID+"' style='width:100%;'></audio>");
    player.appendTo(playerArea);
    player.attr({
      "src": configs.path+configs.src+configs.ext,
      "controls": configs.controls
    })
      .prop({
      "preservesPitch": configs.pitch,
      "playbackRate": configs.pitchrate,
    });
    
    playerArea.appendTo(audioelement);
    
    var playerDisplay = $("<div/>");
    playerDisplay.css({
      "width": "99%",
      "height": "90px",
      "background": "#151515",
      "border": "2px outset rgba(255, 255, 255, 0.8)",
      "display": "flex",
      "flex-direction": "row"
    });
    
    playerDisplay.appendTo(playerArea);
    
    var trackNumber = $("<div id='trackNumber"+configs.playerID+"'></div>");
    trackNumber.css({
      "width": "5%",
      "height": "50px",
      "margin-top": "12px",
      "font-size": "20px",
      "font-weight": "bold",
      "font-family": "impact",
      "color": configs.artistTheme[0],
      "padding-top": "20px",
      "text-align": "center",
    });
    
    trackNumber.appendTo(playerDisplay).text("1");
    
    var artist = $("<div id='artist"+configs.playerID+"'></div>");
    artist.css({
      "width": "60%",
      "height": "50px",
      "margin-top": "12px",
      "font-size": "20px",
      "font-weight": "bold",
      "font-family": "impact",
      "color": configs.artistTheme[0],
      "padding-top": "20px",
      "text-align": "left",
    });
    
    artist.appendTo(playerDisplay).text(configs.src);
    
    var equalizer = $("<div class='player"+configs.playerID+" equalizer' style='margin-top: 6px;'>");
    equalizer.css({
      "width": "20%",
      "height": "60px",
      "margin-top": "12px",
      "padding-top": "4px",
      "text-align": "center",
    });
    
    equalizer.appendTo(playerDisplay);
    
    function setEq() {
      var scW = window.screen.availWidth;
      
      if (scW > 1600) {
        $("#player"+configs.playerID).equalizer({
    	color: configs.artistTheme[1],
    	color1: configs.artistTheme[2],
    	color2: configs.artistTheme[3],
		width: 140,
		height: 60,
		bars: 16,
		components: 20
         });
      } else {
        $("#player"+configs.playerID).equalizer({
    	color: configs.artistTheme[1],
    	color1: configs.artistTheme[2],
    	color2: configs.artistTheme[3],
		width: 90,
		height: 50,
		bars: 12,
		components: 20
         });
      }
    }
    
    try {
      setEq();
    } catch(error) {
      console.log(error);
    }
    
    var tracktime = $("<div id='tracktime"+configs.playerID+"'></div>");
    tracktime.css({
      "width": "15%",
      "height": "50px",
      "margin-top": "12px",
      "font-size": "20px",
      "font-weight": "bold",
      "font-family": "impact",
      "color": configs.artistTheme[0],
      "padding-top": "20px",
      "text-align": "center",
    });
    
    tracktime.appendTo(playerDisplay).text("00:00");
    
    var timebox = $("<div id='timebox"+configs.playerID+"'></div>");
    timebox.css({
      "width": "99%",
      "height": "30px",
      "background": "#202020",
      "text-align": "left",
      "padding-top": "16px",
      "border": "2px outset rgba(255, 255, 255, 0.8)",
      "cursor": "pointer"
    });
    
    timebox.appendTo(playerArea);
    
    var timeProgress = $("<div id='timeProgress"+configs.playerID+"'></div>");
    timeProgress.css({
      "width": "100%",
      "height": "12px",
      "background": "lime",
    });
    
    timeProgress.appendTo(timebox);
    
    var playerTools = $("<div/>");
    playerTools.css({
      "width": "99%",
      "height": "50px",
      "background": "#151515",
      "border": "2px outset rgba(255, 255, 255, 0.8)",
      "padding-top": "12px",
      "display": "flex",
      "flex-direction": "row",
      "text-align": "left"
    });
    
    playerTools.appendTo(playerArea);
    
    var playBtn = $("<button id='playBtn"+configs.playerID+"' class='toolbuttons' accesskey='L'>&#9654;</button>");
    playBtn.appendTo(playerTools);
    
    var stopBtn = $("<button id='stopBtn"+configs.playerID+"' class='toolbuttons3'>&#9632;</button>");
    stopBtn.appendTo(playerTools);
    
    var rewBtn = $("<button id='rewBtn"+configs.playerID+"' class='toolbuttons4'>&laquo;</button>");
    rewBtn.appendTo(playerTools);
    
    var forwBtn = $("<button id='forwBtn"+configs.playerID+"' class='toolbuttons4'>&raquo;</button>");
    forwBtn.appendTo(playerTools);
    
    var skiprewBtn = $("<button id='skiprewBtn"+configs.playerID+"' class='toolbuttons2'><small>|</small>&laquo;</button>");
    skiprewBtn.appendTo(playerTools);
    
    var skipforwBtn = $("<button id='skipforwBtn"+configs.playerID+"' class='toolbuttons2'>&raquo;<small>|</small></button>");
    skipforwBtn.appendTo(playerTools);
    
    var pitchbend = $("<button id='pitchbend"+configs.playerID+"' class='toolbuttons4' style='width:100px; background:#2a002a; border-color:#2a002a;'>Bend</button>");
    pitchbend.appendTo(playerTools);
    
    var squish = $("<button id='squishBtn"+configs.playerID+"' class='toolbuttons3'>Sq</button>");
    squish.appendTo(playerTools);
    
    var pitchArea = $("<div/>");
    pitchArea.css({
      "width": "150px",
      "height": "36px",
      "margin-left": "9px",
    });
    
    pitchArea.appendTo(playerTools);
    
    var pitchRange = $("<input type='range' class='slider' id='pitchRange"+configs.playerID+"' style='width: 140px; height: 20px; margin-top: 9px; background:#00a3ff;'/>");
    pitchRange.attr({
      "max": 4,
      "min": 0.25,
      "step": 0.01,
      "value": configs.pitchrate
    });
    
    pitchRange.appendTo(pitchArea);
    
    var playRev = $("<button id='playRev"+configs.playerID+"' class='toolbuttons4'>Rw</button>");
    playRev.appendTo(playerTools);
    
    var chgPlayer = $("<button id='chgPlayer"+configs.playerID+"' class='toolbuttons'>&#8660;</button>");
    chgPlayer.appendTo(playerTools);
    
    var playerinfoBox = $("<div id='playerinfoBox'/>");
    playerinfoBox.css({
      "width": "180px",
      "height": "20px",
      "background": "rgba(15, 15, 15, 0.6)",
      "border": "4px solid white",
      "padding": "4px",
      "font-size": "16px",
      "font-weight": "bold",
      "color": "white",
      "text-align": "center",
      "position": "absolute",
      "left": "12px",
      "top": "12px",
      "border-radius": "6px",
      "display": "none"
    });
    
    playerinfoBox.appendTo(audioelement);
    
    function showTitle(info) {
    playerinfoBox.text(info);
    }
    
    $("#playBtn"+configs.playerID).on("mouseenter", function() {
      playerinfoBox.text("Play/Pause");
    });
    
    $("#playBtn"+configs.playerID).on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var infoWidth = playerinfoBox.width();
      var infoPos = infoWidth/2;
    
      playerinfoBox.animate({left: xPos - infoPos, top: yPos - 60},6).show();
    });
    
      $("#playBtn"+configs.playerID).on("mouseleave", function() {
      playerinfoBox.hide();
    });
    
    $("#stopBtn"+configs.playerID).on("mouseenter", function() {
      playerinfoBox.text("Stop");
    });
    
    $("#stopBtn"+configs.playerID).on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var infoWidth = playerinfoBox.width();
      var infoPos = infoWidth/2;
    
      playerinfoBox.animate({left: xPos - infoPos, top: yPos - 60},6).show();
    });
    
      $("#stopBtn"+configs.playerID).on("mouseleave", function() {
      playerinfoBox.hide();
    });
    
    $("#rewBtn"+configs.playerID).on("mouseenter", function() {
      playerinfoBox.text("Rewind "+configs.skiptime+"s");
    });
    
    $("#rewBtn"+configs.playerID).on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var infoWidth = playerinfoBox.width();
      var infoPos = infoWidth/2;
    
      playerinfoBox.animate({left: xPos - infoPos, top: yPos - 60},6).show();
    });
    
      $("#rewBtn"+configs.playerID).on("mouseleave", function() {
      playerinfoBox.hide();
    });
    
    $("#forwBtn"+configs.playerID).on("mouseenter", function() {
      playerinfoBox.text("Forward "+configs.skiptime+"s");
    });
    
    $("#forwBtn"+configs.playerID).on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var infoWidth = playerinfoBox.width();
      var infoPos = infoWidth/2;
    
      playerinfoBox.animate({left: xPos - infoPos, top: yPos - 60},6).show();
    });
    
      $("#forwBtn"+configs.playerID).on("mouseleave", function() {
      playerinfoBox.hide();
    });
    
    $("#skiprewBtn"+configs.playerID).on("mouseenter", function() {
      playerinfoBox.text("Previous Track");
    });
    
    $("#skiprewBtn"+configs.playerID).on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var infoWidth = playerinfoBox.width();
      var infoPos = infoWidth/2;
    
      playerinfoBox.animate({left: xPos - infoPos, top: yPos - 60},6).show();
    });
    
      $("#skiprewBtn"+configs.playerID).on("mouseleave", function() {
      playerinfoBox.hide();
    });
    
    $("#skipforwBtn"+configs.playerID).on("mouseenter", function() {
      playerinfoBox.text("Next Track");
    });
    
    $("#skipforwBtn"+configs.playerID).on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var infoWidth = playerinfoBox.width();
      var infoPos = infoWidth/2;
    
      playerinfoBox.animate({left: xPos - infoPos, top: yPos - 60},6).show();
    });
    
      $("#skipforwBtn"+configs.playerID).on("mouseleave", function() {
      playerinfoBox.hide();
    });
    
    $("#pitchbend"+configs.playerID).on("mouseenter", function() {
      playerinfoBox.text("Pitch-Bending");
    });
    
    $("#pitchbend"+configs.playerID).on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var infoWidth = playerinfoBox.width();
      var infoPos = infoWidth/2;
    
      playerinfoBox.animate({left: xPos - infoPos, top: yPos - 60},6).show();
    });
    
      $("#pitchbend"+configs.playerID).on("mouseleave", function() {
      playerinfoBox.hide();
    });
    
    $("#squishBtn"+configs.playerID).on("mouseenter", function() {
      playerinfoBox.text("Squish");
    });
    
    $("#squishBtn"+configs.playerID).on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var infoWidth = playerinfoBox.width();
      var infoPos = infoWidth/2;
    
      playerinfoBox.animate({left: xPos - infoPos, top: yPos - 60},6).show();
    });
    
      $("#squishBtn"+configs.playerID).on("mouseleave", function() {
      playerinfoBox.hide();
    });
    
    $("#pitchRange"+configs.playerID).on("mouseenter", function() {
      playerinfoBox.text("Pitch: "+configs.pitchrate);
    });
    
    $("#pitchRange"+configs.playerID).on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var infoWidth = playerinfoBox.width();
      var infoPos = infoWidth/2;
      var playRate = $("#player"+configs.playerID).prop("playbackRate");
    
      playerinfoBox.animate({left: xPos - infoPos, top: yPos - 60},6).show().text("Pitch Player 1: " + Math.round(playRate*100)/100);
      $(this).trigger("change");
    });
    
    $("#pitchRange"+configs.playerID).on("mouseleave", function() {
      playerinfoBox.hide();
    });
    
    $("#playRev"+configs.playerID).on("mouseenter", function() {
      playerinfoBox.text("Play Reverse");
    });
    
    $("#playRev"+configs.playerID).on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var infoWidth = playerinfoBox.width();
      var infoPos = infoWidth/2;
    
      playerinfoBox.animate({left: xPos - infoPos, top: yPos - 60},6).show();
    });
    
      $("#playRev"+configs.playerID).on("mouseleave", function() {
      playerinfoBox.hide();
    });
    
    $("#chgPlayer"+configs.playerID).on("mouseenter", function() {
      playerinfoBox.text("Change To Next Player");
    });
    
    $("#chgPlayer"+configs.playerID).on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var infoWidth = playerinfoBox.width();
      var infoPos = infoWidth/2;
    
      playerinfoBox.animate({left: xPos - infoPos, top: yPos - 60},6).show();
    });
    
      $("#chgPlayer"+configs.playerID).on("mouseleave", function() {
      playerinfoBox.hide();
    });
    
    $("#playBtn"+configs.playerID).on("click", function() {
      var fullTime = $("#player"+configs.playerID).prop("duration");
      var status = $(this).attr("style");
      
      if (fullTime > 0) {
        if (!status) {
          $("#player"+configs.playerID).trigger("play");
          $(this).css({
            "background": "linear-gradient(to right, navy, skyblue, navy)",
            "border-style": "inset",
            "border-color": "skyblue"
          });
        } else {
          $("#player"+configs.playerID).trigger("pause");
          $(this).removeAttr("style");
        }
      }
    });
    
    function setTime() {
      var fulltime = $("#player"+configs.playerID).prop("duration");
      var timepos = $("#player"+configs.playerID).prop("currentTime");
      var timeDelta = fulltime - timepos;
      var milliSec = Math.floor((timeDelta - Math.floor(timeDelta))*10);
      var deltaMin = parseInt(timeDelta/60 % 60);
      var deltaSec = parseInt(timeDelta % 60);
      
      deltaMin = (deltaMin < 10 ? "0"+deltaMin : deltaMin);
      deltaSec = (deltaSec < 10 ? "0"+deltaSec : deltaSec);
      
      if (fulltime > 0) {
        $("#tracktime"+configs.playerID).text(deltaMin + ":" + deltaSec + "." + milliSec);
        $("#timeProgress"+configs.playerID).css("width", timepos/fulltime*100 + "%");
        if (timeDelta < 20) {
          $("#timeProgress"+configs.playerID).css("background","red");
        } else {
          $("#timeProgress"+configs.playerID).css("background","lime");
        }
      } else {
        $("#tracktime"+configs.playerID).text("00:00");
        $("#timeProgress"+configs.playerID).css("width","100%");
      }
    }
    
    $("#player"+configs.playerID).on("timeupdate durationchange", setTime);
    
    function searchTime(e) {
      var fulltime = $("#player"+configs.playerID).prop("duration");
      var timeposX = e.offsetX;
      var searchSize = $("#timebox"+configs.playerID).width();
      var currTime = timeposX/searchSize*fulltime;
      
      if (fulltime > 0) {
        $("#player"+configs.playerID).prop("currentTime", currTime);
      }
    }
    
    $("#timebox"+configs.playerID).on("click", searchTime);
    
    function lookTime(e) {
      var fulltime = $("#player"+configs.playerID).prop("duration");
      var timepos = $("#player"+configs.playerID).prop("currentTime");
      var timeposX = e.offsetX;
      var xPos = e.pageX;
      var yPos = e.pageY;
      var searchSize = timebox.width();
      var boxdelta = searchSize - timeposX;
      var currTime = timeposX/searchSize*fulltime;
      var currTime11 = boxdelta/searchSize*fulltime;
      
      var tDmin = parseInt(currTime/60 % 60);
      var tDsec = parseInt(currTime % 60);
      var tbDmin = parseInt(currTime11/60 % 60);
      var tbSec = parseInt(currTime11 % 60);
      
      if (fulltime > 0) {
        tDmin = (tDmin < 10 ? "0"+tDmin : tDmin);
        tDsec = (tDsec < 10 ? "0"+tDsec : tDsec);
        tbDmin = (tbDmin < 10 ? "0"+tbDmin : tbDmin);
        tbSec = (tbSec < 10 ? "0"+tbSec : tbSec);
      
        playerinfoBox.text(tDmin+":"+tDsec+ " / "+tbDmin+":"+tbSec);
      } else {
        playerinfoBox.text("No Track loaded!");
      }
      
      playerinfoBox.animate({left: xPos-playerinfoBox.width()/2+"px", top: yPos-playerinfoBox.height() - 30+"px"},1);
    }
    
     $("#timebox"+configs.playerID).on("mouseenter", function(e) {
      var xPos = e.pageX;
      playerinfoBox.show();
    });
    
    $("#timebox"+configs.playerID).on("mouseleave", function() {
      playerinfoBox.hide();
    });
    
    $("#timebox"+configs.playerID).on("mousemove", lookTime);
    
    $("#timebox"+configs.playerID).on("mousedown touchstart", function() {
      $(this).on("mousemove", searchTime);
    });
    
    $("#timebox"+configs.playerID).on("mouseup touchend", function() {
      $(this).off("mousemove").on("mousemove", lookTime);
    });
    
    $("#stopBtn"+configs.playerID).on("click", function() {
      $("#player"+configs.playerID).trigger("pause");
      $("#player"+configs.playerID).prop("currentTime",0);
      $("#playBtn"+configs.playerID).html("&#9654;").removeAttr("style");
  	});
    
    $("#rewBtn"+configs.playerID).on("click", function() {
      $("#player"+configs.playerID).prop("currentTime", $("#player"+configs.playerID).prop("currentTime") - configs.skiptime);
    });
    
    $("#forwBtn"+configs.playerID).on("click", function() {
      $("#player"+configs.playerID).prop("currentTime", $("#player"+configs.playerID).prop("currentTime") + configs.skiptime);
    });
    
    var pitchMenuMod = $("<div/>");
    pitchMenuMod.css({
      "width": "90px",
      "height": "200px",
      "overflow": "auto",
      "padding": "6px",
      "background": "rgba(15, 15, 15, 0.8)",
      "border": "2px outset rgba(255, 255, 255, 0.6)",
      "position": "absolute",
      "left": "20px",
      "top": "20px",
      "z-index": 200,
      "display": "none"
    }).appendTo(audioelement);
    
    var pitchList = $("<ul id='pitchList"+configs.playerID+"'></ul>");
    pitchList.css({
      "padding": "1px",
      "margin": "1px",
      "font-size": "16px",
      "font-weight": "bold",
      "color": "white"
    }).appendTo(pitchMenuMod);
    
    var pitchVals = $("<li style='border-bottom: 1px solid rgba(255, 255, 255, 0.8); padding-top:6px; padding-bottom:6px; cursor:pointer;'>0.25</li><li style='border-bottom: 1px solid rgba(255, 255, 255, 0.8); padding-top:6px; padding-bottom:6px; cursor:pointer;'>0.50</li><li style='border-bottom: 1px solid rgba(255, 255, 255, 0.8); padding-top:6px; padding-bottom:6px; cursor:pointer;'>0.75</li><li style='border-bottom: 1px solid rgba(255, 255, 255, 0.8); padding-top:6px; padding-bottom:6px; cursor:pointer;'>1.00</li><li style='border-bottom: 1px solid rgba(255, 255, 255, 0.8); padding-top:6px; padding-bottom:6px; cursor:pointer;'>1.10</li><li style='border-bottom: 1px solid rgba(255, 255, 255, 0.8); padding-top:6px; padding-bottom:6px; cursor:pointer;'>1.25</li><li style='padding-top:6px; padding-bottom:6px; cursor:pointer;'>1.50</li>");
    pitchVals.appendTo(pitchList);
    
    $("#pitchbend"+configs.playerID).on("contextmenu", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      
      pitchMenuMod.animate({left:xPos - pitchMenuMod.width()/2+"px", top:yPos + $("#pitchRange"+configs.playerID).height() + 10},1).show();
      return false;
    });
    
    var closePitch;
    
    pitchMenuMod.on("mouseleave", function() {
      closePitch = setTimeout(function() {
        pitchMenuMod.hide();
      },1500);
    });
    
    $("#pitchList"+configs.playerID).on("mouseenter", function() {
      $("#pitchList"+configs.playerID+" li").on("mouseenter", function() {
        $(this).css("background", "#00b9ff");
      });
      
      $("#pitchList"+configs.playerID+" li").on("mouseleave", function() {
        $(this).css("background", "none");
      });
      
      $("#pitchList"+configs.playerID+" li").on("click", function() {
        $("#pitchRange"+configs.playerID).val($(this).text()).trigger("change");
        pitchMenuMod.hide();
      });
      
      $("#pitchList"+configs.playerID+" li").on("contextmenu", function() {
        $(this).click();
        return false;
      });
    });
    
    $("#pitchList"+configs.playerID).on("mouseleave", function() {
      $("#pitchList1 li").off("mouseenter").off("mouseleave").off("click").off("contextmenu");
    });
    
    $("#pitchRange"+configs.playerID).on("change", function() {
      var ptVal = $(this).val();
      $("#player"+configs.playerID).prop("playbackRate", ptVal);
    });
    
    $("#pitchRange"+configs.playerID).on("contextmenu", function() {
      $(this).val(1).trigger("change");
      return false;
    });
    
    var pitchPlay, pitchPlay2;
    
    function stopBend() {
      clearInterval(pitchPlay);
    }
    
    function setBend() {
      var playRate = $("#player"+configs.playerID).prop("playbackRate");
      
      if (playRate >= configs.pitchlimit) {
        clearInterval(pitchPlay);
      } else {
        $("#player"+configs.playerID).prop("playbackRate", playRate + 0.01);
      }
    }
    
    function startBend() {
      pitchPlay = setInterval(function() {
        setBend();
      },20);
    }
    
    function stopBendRew() {
      clearInterval(pitchPlay2);
    }
    
    function setBendRew() {
      var playRate = $("#player"+configs.playerID).prop("playbackRate");
      
      if (playRate < 1.01) {
        clearInterval(pitchPlay2);
      } else {
        $("#player"+configs.playerID).prop("playbackRate", playRate - 0.01);
      }
    }
    
    function startBendRew() {
      pitchPlay2 = setInterval(function() {
        setBendRew();
      },10);
    }
    
    $("#pitchbend"+configs.playerID).on("mousedown touchstart", function(evt) {
      if (evt.which === 1) {
        stopBendRew();
        startBend();
        $(this).css({
          "background": "linear-gradient(to right, #520054, #9800c6, #520054)",
          "border-style": "inset",
          "border-color": "#9800c6"
        });
      }
    });
        
    $("#pitchbend"+configs.playerID).on("mouseup touchend", function(evt) {
      if (evt.which === 1) {
        stopBend();
        startBendRew();
        $(this).css({
          "background": "#290029",
          "border-style": "outset",
          "border-color": "#290029"
        });
      }
    });
    
    var pitchin, pitchout;
    var pinout = false;
    
    function pitchIn() {
      var playRate = $("#player"+configs.playerID).prop("playbackRate");
      $("#player"+configs.playerID).prop("playbackRate", playRate + 0.01);
      
      if (playRate > 1) {
        clearInterval(pitchin);
        $("#playBtn"+configs.playerID).removeAttr("disabled").css({
          "background": "linear-gradient(to right, navy, skyblue, navy)",
          "border-color": "skyblue"
        });
        $("#pitchbend"+configs.playerID).removeAttr("disabled").css({
          "background": "linear-gradient(to right, #520054, #9800c6, #520054)",
          "border-style": "inset",
          "border-color": "#9800c6"
        });
        setTimeout(function() {
          $("#pitchbend"+configs.playerID).css({
          "background": "#290029",
          "border-style": "outset",
          "border-color": "#290029"
        });
        }, 500);
        pinout = false;
      }
    }
    
    function pitchOut() {
      var playRate = $("#player"+configs.playerID).prop("playbackRate");
      $("#player"+configs.playerID).prop("playbackRate", playRate - 0.01);
      $("#playBtn"+configs.playerID).attr("disabled", "disabled").css({
          "background": "linear-gradient(to right, #363636, yellow, #363636)",
          "border-color": "yellow"
        });
      
      if (playRate < 0.26) {
        clearInterval(pitchout);
        $("#playBtn"+configs.playerID).removeAttr("disabled").removeAttr("style");
        $("#pitchbend"+configs.playerID).removeAttr("disabled");
        $("#player"+configs.playerID).trigger("pause");
        pinout = false;
      }
    }
    
    function startPitchIn() {
      $("#pitchbend"+configs.playerID).attr("disabled", "disabled");
      $("#player"+configs.playerID).trigger("play").prop("playbackRate", 0.25);
      $("#playBtn"+configs.playerID).attr("disabled", "disabled").css({
          "background": "linear-gradient(to right, #363636, yellow, #363636)",
          "border-color": "yellow"
        });
      pinout = true;
	  pitchin = setInterval(pitchIn, configs.pitchTime);
    }
    
    function startPitchOut() {
      $("#playBtn"+configs.playerID).attr("disabled", "disabled");
      $("#pitchbend"+configs.playerID).attr("disabled", "disabled");
      pinout = true;
	  pitchout = setInterval(pitchOut, configs.pitchTime);
    }
    
    $("#playBtn"+configs.playerID).on("contextmenu", function() {
      var status = $(this).attr("style");
      
      if (!pinout) {
        if (!status) {
        startPitchIn();
      	} else {
        startPitchOut();
      	}
      return false;
      }
    });
    
    var squisher, reverser;
    
    function playSquish() {
      var timepos = $("#player"+configs.playerID).prop("currentTime");
      var sqFreq = configs.squishIntervall;
	  $("#player"+configs.playerID).prop("currentTime", timepos - sqFreq);
    }
    
    function setSquish() {
      var sqFreq = configs.squishIntervall;
      squisher = setInterval(function() {
        playSquish();
      }, sqFreq*1000);
    }
    
    $("#squishBtn"+configs.playerID).on("click", function() {
      var sqStatus = $(this).attr("style");
      
      if (!sqStatus) {
        clearTimeout(reverser);
        $("#playRev"+configs.playerID).removeAttr("style");
        setSquish();
        $(this).css({
          "background": "linear-gradient(to right, darkred, red, darkred)",
          "border-style": "inset",
          "border-color": "red"
        });
      } else {
        clearInterval(squisher);
        $(this).removeAttr("style");
      }
    });
    
    var squishMenuMod = $("<div/>");
    squishMenuMod.css({
      "width": "90px",
      "height": "200px",
      "overflow": "auto",
      "padding": "6px",
      "background": "rgba(15, 15, 15, 0.8)",
      "border": "2px outset rgba(255, 255, 255, 0.6)",
      "position": "absolute",
      "left": "20px",
      "top": "20px",
      "z-index": 200,
      "display": "none"
    }).appendTo(audioelement);
    
    var squishList = $("<ul id='squishList"+configs.playerID+"'></ul>");
    squishList.css({
      "padding": "1px",
      "margin": "1px",
      "font-size": "16px",
      "font-weight": "bold",
      "color": "white"
    }).appendTo(squishMenuMod);
    
    var squishVals = $("<li style='border-bottom: 1px solid rgba(255, 255, 255, 0.8); padding-top:6px; padding-bottom:6px; cursor:pointer;'>0.25</li><li style='border-bottom: 1px solid rgba(255, 255, 255, 0.8); padding-top:6px; padding-bottom:6px; cursor:pointer;'>0.50</li><li style='border-bottom: 1px solid rgba(255, 255, 255, 0.8); padding-top:6px; padding-bottom:6px; cursor:pointer;'>0.75</li><li style='border-bottom: 1px solid rgba(255, 255, 255, 0.8); padding-top:6px; padding-bottom:6px; cursor:pointer;'>1.00</li><li style='border-bottom: 1px solid rgba(255, 255, 255, 0.8); padding-top:6px; padding-bottom:6px; cursor:pointer;'>2.00</li><li style='padding-top:6px; padding-bottom:6px; cursor:pointer;'>4.00</li>");
    squishVals.appendTo(squishList);
    
    $("#squishList"+configs.playerID).on("mouseenter", function() {
      $("#squishList"+configs.playerID+" li").on("mouseenter", function() {
        $(this).css("background", "#00b9ff");
      });
      
      $("#squishList"+configs.playerID+" li").on("mouseleave", function() {
        $(this).css("background", "none");
      });
      
      $("#squishList"+configs.playerID+" li").on("click", function() {
        var sqVals = parseFloat($(this).text());
        clearTimeout(reverser);
        clearTimeout(squisher);
        $("#playRev"+configs.playerID).removeAttr("style");
        squisher = setInterval(function() {
        $("#player"+configs.playerID).prop("currentTime", $("#player"+configs.playerID).prop("currentTime") - sqVals);
        }, sqVals*1000);
        $("#squishBtn"+configs.playerID).css({
          "background": "linear-gradient(to right, darkred, red, darkred)",
          "border-style": "inset",
          "border-color": "red"
        });
        
        squishMenuMod.hide();
      });
      
      $("#squishList"+configs.playerID+" li").on("contextmenu", function() {
        $(this).click();
        return false;
      });
    });
    
    $("#squishList"+configs.playerID).on("mouseleave", function() {
      $("#squishList1"+configs.playerID+" li").off("mouseenter").off("mouseleave").off("click").off("contextmenu");
    });
    
    $("#squishBtn"+configs.playerID).on("contextmenu", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      
      squishMenuMod.animate({left:xPos - squishMenuMod.width()/2+"px", top:yPos + $("#squishBtn"+configs.playerID).height() + 10},1).show();
      return false;
    });
    
    var closeSquish;
    
    squishMenuMod.on("mouseleave", function() {
      closeSquish = setTimeout(function() {
        squishMenuMod.hide();
      },1500);
    });
    
    function playReverse() {
      var timepos = $("#player"+configs.playerID).prop("currentTime");
      var playRate = $("#player"+configs.playerID).prop("playbackRate");
      $("#player"+configs.playerID).prop("currentTime", timepos - 0.125 * playRate);
  	}
    
    function setReverse() {
      var playRate = $("#player"+configs.playerID).prop("playbackRate");
      reverser = setInterval(function() {
      playReverse();
      }, 90 / playRate);
  	}
    
    $("#playRev"+configs.playerID).on("click", function() {
      var revStatus = $(this).attr("style");
      
      if (!revStatus) {
        clearTimeout(squisher);
        $("#squishBtn"+configs.playerID).removeAttr("style");
        setReverse();
        $(this).css({
          "background": "linear-gradient(to right, #363600, yellow, #363600)",
          "border-style": "inset",
          "border-color": "yellow"
        });
      } else {
        clearInterval(reverser);
        $(this).removeAttr("style");
      }
    });
    
    $("#stopBtn"+configs.playerID).on("mousedown touchstart", function() {
      $(this).css({
        "background": "linear-gradient(to right, darkred, red, darkred)",
        "border-style": "inset",
        "border-color": "red"
      });
    });
    
    $("#stopBtn"+configs.playerID).on("mouseup mouseleave touchend", function() {
      $(this).css({
        "background": "#290000",
        "border-style": "outset",
        "border-color": "#290000"
      });
    });
    
    $("#forwBtn"+configs.playerID).on("mousedown touchstart", function() {
      $(this).css({
        "background": "linear-gradient(to right, #363636, yellow, #363600)",
        "border-style": "inset",
        "border-color": "yellow"
      });
    });
    
    $("#forwBtn"+configs.playerID).on("mouseup mouseleave touchend", function() {
      $(this).css({
        "background": "#292900",
        "border-style": "outset",
        "border-color": "#292900"
      });
    });
    
    $("#rewBtn"+configs.playerID).on("mousedown touchstart", function() {
      $(this).css({
        "background": "linear-gradient(to right, #363636, yellow, #363600)",
        "border-style": "inset",
        "border-color": "yellow"
      });
    });
    
    $("#rewBtn"+configs.playerID).on("mouseup mouseleave touchend", function() {
      $(this).css({
        "background": "#292900",
        "border-style": "outset",
        "border-color": "#292900"
      });
    });
    
    $("#skipforwBtn"+configs.playerID).on("mousedown touchstart", function() {
      $(this).css({
        "background": "linear-gradient(to right, green, lime, green)",
        "border-style": "inset",
        "border-color": "lime"
      });
    });
    
    $("#skipforwBtn"+configs.playerID).on("mouseup mouseleave touchend", function() {
      $(this).css({
        "background": "#002900",
        "border-style": "outset",
        "border-color": "#002900"
      });
    });
    
    $("#skiprewBtn"+configs.playerID).on("mousedown touchstart", function() {
      $(this).css({
        "background": "linear-gradient(to right, green, lime, green)",
        "border-style": "inset",
        "border-color": "lime"
      });
    });
    
    $("#skiprewBtn"+configs.playerID).on("mouseup mouseleave touchend", function() {
      $(this).css({
        "background": "#002900",
        "border-style": "outset",
        "border-color": "#002900"
      });
    });
    
    $("#chgPlayer"+configs.playerID).on("mousedown touchstart", function() {
      $(this).css({
        "background": "linear-gradient(to right, navy, skyblue, navy)",
        "border-style": "inset",
        "border-color": "skyblue"
      });
    });
    
    $("#chgPlayer"+configs.playerID).on("mouseup mouseleave touchend", function() {
      $(this).css({
        "background": "#000029",
        "border-style": "outset",
        "border-color": "#000029"
      });
    });
    
    return audioelement;
  };
  
}(jQuery));

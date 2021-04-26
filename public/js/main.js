var rotationsTime = 8;
var wheelSpinTime = 6;
var ballSpinTime = 5;
var order = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  36,
];
var numorder = [
  "♦",
  "♣",
  "♥",
  "♠",
  "♦",
  "♣",
  "♥",
  "♠",
  "♦",
  "♣",
  "♥",
  "♠",
  "♦",
  "♣",
  "♥",
  "♠",
  "♦",
  "♣",
  "♥",
  "♠",
  "♦",
  "♣",
  "♥",
  "♠",
  "♦",
  "♣",
  "♥",
  "♠",
  "♦",
  "♣",
  "♥",
  "♠",
  "♦",
  "♣",
  "♥",
  "♠",
];
var numred = [
  "♦",
  "♥",
  "♦",
  "♥",
  "♦",
  "♥",
  "♦",
  "♥",
  "♦",
  "♥",
  "♦",
  "♥",
  "♦",
  "♥",
  "♦",
  "♥",
  "♦",
  "♥",
];
var numblack = [
  "♣",
  "♠",
  "♣",
  "♠",
  "♣",
  "♠",
  "♣",
  "♠",
  "♣",
  "♠",
  "♣",
  "♠",
  "♣",
  "♠",
  "♣",
  "♠",
  "♣",
  "♠",
];
var numgreen = [0];
var numbg = $(".pieContainer");
var ballbg = $(".ball");
var btnSpin = $("#btnSpin");
var toppart = $("#toppart");
var pfx = $.keyframe.getVendorPrefix();
var transform = pfx + "transform";
var rinner = $("#rcircle");
var numberLoc = [];
$.keyframe.debug = true;

createWheel();
function createWheel() {
  var temparc = 360 / numorder.length;
  for (var i = 0; i < numorder.length; i++) {
    numberLoc[numorder[i]] = [];
    numberLoc[numorder[i]][0] = i * temparc;
    numberLoc[numorder[i]][1] = i * temparc + temparc;

    newSlice = document.createElement("div");
    $(newSlice).addClass("hold");
    newHold = document.createElement("div");
    $(newHold).addClass("pie");
    newNumber = document.createElement("div");
    $(newNumber).addClass("num");

    newNumber.innerHTML = numorder[i];
    $(newSlice).attr("id", "rSlice" + i);
    $(newSlice).css(
      "transform",
      "rotate(" + numberLoc[numorder[i]][0] + "deg)"
    );

    $(newHold).css("transform", "rotate(9.73deg)");
    $(newHold).css("-webkit-transform", "rotate(9.73deg)");

    if ($.inArray(numorder[i], numgreen) > -1) {
      $(newHold).addClass("greenbg");
    } else if ($.inArray(numorder[i], numred) > -1) {
      $(newHold).addClass("redbg");
    } else if ($.inArray(numorder[i], numblack) > -1) {
      $(newHold).addClass("greybg");
    }

    $(newNumber).appendTo(newSlice);
    $(newHold).appendTo(newSlice);
    $(newSlice).appendTo(rinner);
  }
  //console.log(numberLoc);
}

btnSpin.click(function () {
  var rndNum = Math.floor(Math.random() * 35 + 0);

  winningNum = rndNum;
  spinTo(winningNum);
  globalThis.win = winningNum;
  console.log(winningNum);
});

$("#btnb").click(function () {
  $(".title").css("font-size", "+=1.3em");
  $(".spinner").css("font-size", "+=1.3em");
});
$("#btns").click(function () {
  $(".title").css("font-size", "-=1.3em");
  $(".spinner").css("font-size", "-=1.3em");
});

function resetAni() {
  animationPlayState = "animation-play-state";
  playStateRunning = "running";

  $(ballbg)
    .css(pfx + animationPlayState, playStateRunning)
    .css(pfx + "animation", "none");

  $(numbg)
    .css(pfx + animationPlayState, playStateRunning)
    .css(pfx + "animation", "none");
  $(toppart)
    .css(pfx + animationPlayState, playStateRunning)
    .css(pfx + "animation", "none");

  $("#rotate2").html("");
  $("#rotate").html("");
}

function spinTo(num) {
  var temparc = 360 / order.length;
  for (var i = 0; i < order.length; i++) {
    numberLoc[order[i]] = [];
    numberLoc[order[i]][0] = i * temparc;
    numberLoc[order[i]][1] = i * temparc + temparc;
  }
  //get location
  var temp = numberLoc[order[num]][0] + 4;
  console.log(temp);
  //randomize
  var rndSpace = Math.floor(Math.random() * 360 + 1);
  console.log(rndSpace);
  resetAni();
  setTimeout(function () {
    bgrotateTo(rndSpace);
    ballrotateTo(rndSpace + temp);
    console.log(rndSpace + temp);
  }, 500);
}

function ballrotateTo(deg) {
  var temptime = rotationsTime + "s";
  var dest = -360 * ballSpinTime - (360 - deg);
  $.keyframe.define({
    name: "rotate2",
    from: {
      transform: "rotate(0deg)",
    },
    to: {
      transform: "rotate(" + dest + "deg)",
    },
  });

  $(ballbg).playKeyframe({
    name: "rotate2", // name of the keyframe you want to bind to the selected element
    duration: temptime, // [optional, default: 0, in ms] how long you want it to last in milliseconds
    timingFunction: "ease-in-out", // [optional, default: ease] specifies the speed curve of the animation
    complete: function () {
      $(".win").html(numorder[win]);
    }, //[optional]  Function fired after the animation is complete. If repeat is infinite, the function will be fired every time the animation is restarted.
  });
}

function bgrotateTo(deg) {
  var dest = 360 * wheelSpinTime + deg;
  var temptime = (rotationsTime * 1000 - 1000) / 1000 + "s";

  $.keyframe.define({
    name: "rotate",
    from: {
      transform: "rotate(0deg)",
    },
    to: {
      transform: "rotate(" + dest + "deg)",
    },
  });

  $(numbg).playKeyframe({
    name: "rotate", // name of the keyframe you want to bind to the selected element
    duration: temptime, // [optional, default: 0, in ms] how long you want it to last in milliseconds
    timingFunction: "ease-in-out", // [optional, default: ease] specifies the speed curve of the animation
    complete: function () {}, //[optional]  Function fired after the animation is complete. If repeat is infinite, the function will be fired every time the animation is restarted.
  });

  $(toppart).playKeyframe({
    name: "rotate", // name of the keyframe you want to bind to the selected element
    duration: temptime, // [optional, default: 0, in ms] how long you want it to last in milliseconds
    timingFunction: "ease-in-out", // [optional, default: ease] specifies the speed curve of the animation
    complete: function () {}, //[optional]  Function fired after the animation is complete. If repeat is infinite, the function will be fired every time the animation is restarted.
  });
}

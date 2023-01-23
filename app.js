"use strict";

const canvas = document.querySelector("canvas");
const ctxs = canvas.getContext("2d");

const setColor = document.querySelector("#color-option");
const defaultColors = Array.from(document.querySelectorAll(".color-option"));

const text = document.querySelector("#text");
const line_width = document.querySelector("#pen-size");
const fontSize = document.querySelector("#font-size");
const eraserSize = document.querySelector("#eraser-size");

const { width, height } = canvas.getBoundingClientRect();

canvas.width = width;
canvas.height = height;
let CANVAS_WIDTH = canvas.width;
let CANVAS_HEIGHT = canvas.height;
let F_SIZE = String(fontSize.value) + "px ";
let Drawing = false;
let Filling = false;

ctxs.lineWidth = line_width.value || eraserSize.value;
ctxs.lineCap = "round";
ctxs.lineJoin = "round";
ctxs.textAlign = "center";
if (sessionStorage.setItem === "") {
  ctxs.font = "normal " + F_SIZE + "ariel";
} else {
  ctxs.font = sessionStorage.getItem("style") + F_SIZE + sessionStorage.getItem("font");
}

function onStrokeMouse(event) {
  if (Drawing) {
    Drawing = true;
    ctxs.lineTo(event.offsetX, event.offsetY);
    ctxs.stroke();
    return;
  }
  ctxs.beginPath();
  ctxs.moveTo(event.offsetX, event.offsetY);
}

function onStrokeTouchStart(event) {
  ctxs.beginPath();
  ctxs.moveTo(event.touches[0].clientX - canvas.offsetLeft, event.touches[0].clientY - canvas.offsetTop);
}

function onStrokeTouchMove(event) {
  if (Drawing) {
    ctxs.lineTo(event.touches[0].clientX - canvas.offsetLeft, event.touches[0].clientY - canvas.offsetTop);
    ctxs.stroke();
    return;
  } 
}


function onShapeMouse(event) {
  if (Drawing) {
    Drawing = true;
    ctxs.lineTo(event.offsetX, event.offsetY);
    ctxs.fill();
    return;
  }
  ctxs.beginPath();
  ctxs.moveTo(event.offsetX, event.offsetY);
}

function onShapeTouchMove(event) {
  if (Drawing) {
    ctxs.lineTo(event.touches[0].clientX - canvas.offsetLeft, event.touches[0].clientY - canvas.offsetTop);
    ctxs.fill();
    return;
  } 
}

function onStartDrawing() {
  Drawing = true;
}

function onCancleDrawing() {
  Drawing = false;
}

function onSetColor(event) {
  ctxs.strokeStyle = event.target.value;
  ctxs.fillStyle = event.target.value;
}

function onChangeColor(event) {
  const colorOption = event.target.dataset.color;
  ctxs.strokeStyle = colorOption;
  ctxs.fillStyle = colorOption;
  setColor.value = colorOption;
}

function getLineWidth(event) {
  ctxs.lineWidth = event.currentTarget.value;
}

function onSizeChanger(event) {
  ctxs.font = sessionStorage.getItem("style") + String(event.currentTarget.value) + "px " + sessionStorage.getItem("font");
}

if (window.navigator.maxTouchPoints === 0) {
  canvas.addEventListener("mousemove", onStrokeMouse);
  canvas.addEventListener("mousedown", onStartDrawing);
  canvas.addEventListener("mouseup", onCancleDrawing);
  defaultColors.forEach((item) => {
    item.addEventListener("mousedown", onChangeColor);
  });
} else {
  canvas.addEventListener("touchstart", onStrokeTouchStart, { passive: false });
  canvas.addEventListener("touchmove", onStrokeTouchMove, { passive: false });
  canvas.addEventListener("touchstart", onStartDrawing, { passive: false });
  canvas.addEventListener("touchend", onCancleDrawing, { passive: false });
  defaultColors.forEach((item) => {
    item.addEventListener("touchstart", onChangeColor, { passive: false });
  });
}

setColor.addEventListener("change", onSetColor);
line_width.addEventListener("change", getLineWidth);
fontSize.addEventListener("change", onSizeChanger);
eraserSize.addEventListener("change", getLineWidth);

// btns tool box onoff
const OptionBtns = Array.from(document.querySelectorAll(".option-btns>button"));

function OptionONOFF(event) {
  const Options = document.querySelectorAll(".tools>div");
  let CLASS_NAME = event.currentTarget.className;

  Options.forEach((item) => {
    if (item.className.includes(CLASS_NAME)) {
      item.classList.remove("off");
    } else {
      item.classList.add("off");
    }
  });
}

if (window.navigator.maxTouchPoints === 0) {
  OptionBtns.forEach((item, idx) => {
    if (idx < 3) {
      item.addEventListener("mousedown", OptionONOFF);
    }
  });
} else {
  OptionBtns.forEach((item, idx) => {
    if (idx < 4) {
      item.addEventListener("touchstart", OptionONOFF, { passive: false });
    }
  });
}

// btns Option set
const PenBtn = document.querySelector(".pen");
const Pen_Rect = document.querySelector(".pen-rect");
const Pen_Round = document.querySelector(".pen-round");
const FontBtn = document.querySelector(".font");
const EraserBtn = document.querySelector(".erase");
const Erase_Rect = document.querySelector(".rect");
const Erase_Round = document.querySelector(".circle");
const ShapeBtn = document.querySelector(".shape");
const FillBtn = document.querySelector(".fill");
const Status = document.querySelector(".status");

function onPen() {
  Filling = false;
  ctxs.strokeStyle = setColor.value;
  ctxs.stroke();
  Status.innerText = "You can Draw!";
  if (Drawing) {
    Drawing = true;
  }
  if (window.navigator.maxTouchPoints === 0) {
    canvas.addEventListener("mousemove", onStrokeMouse);
    canvas.removeEventListener("mousemove", onShapeMouse);
  } else {
    canvas.addEventListener("touchstart", onStrokeTouchStart, { passive: false });
    canvas.addEventListener("touchmove", onStrokeTouchMove, { passive: false });
    canvas.removeEventListener("touchmove", onShapeTouchMove, { passive: false });
  }
}

function onEraser() {
  if (window.navigator.maxTouchPoints === 0) {
    canvas.addEventListener("mousemove", onStrokeMouse);
    canvas.removeEventListener("mousemove", onShapeMouse);
  } else {
    canvas.addEventListener("touchstart", onStrokeTouchStart, { passive: false });
    canvas.addEventListener("touchmove", onStrokeTouchMove, { passive: false });
    canvas.removeEventListener("touchstart", onShapeTouchMove), { passive: false };
  }
}

function onPenRect() {
  ctxs.lineCap = "square";

}

function onPenRound() {
  ctxs.lineCap = "round";

}

function onEraseRect() {
  ctxs.lineCap = "square";
  ctxs.strokeStyle = "#ffffff";
  ctxs.stroke();
}
function onEraseRound() {
  ctxs.lineCap = "round";
  ctxs.strokeStyle = "#ffffff";
  ctxs.stroke();
}

function onDrawShape() {
  Status.innerText = "Draw a Shape!";
  if (window.navigator.maxTouchPoints === 0) {
    canvas.removeEventListener("mousemove", onStrokeMouse);
    canvas.addEventListener("mousemove", onShapeMouse);
  } else {
    canvas.addEventListener("touchstart", onStrokeTouchStart, { passive: false });
    canvas.addEventListener("touchmove", onShapeTouchMove, { passive: false });
  }
}

function onFillCanvas() {
  Drawing = false;
  ctxs.fillStyle = setColor.value;
  ctxs.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  Status.innerText = "Canvas Filled!";
  if (Filling) {
    Filling = true;
  }
}

if (window.navigator.maxTouchPoints === 0) {
  PenBtn.addEventListener("mousedown", onPen);
  Pen_Rect.addEventListener("mousedown", onPenRect);
  Pen_Round.addEventListener("mousedown", onPenRound);
  EraserBtn.addEventListener("mousedown", onEraser);
  Erase_Rect.addEventListener("mousedown", onEraseRect);
  Erase_Round.addEventListener("mousedown", onEraseRound);
  ShapeBtn.addEventListener("mousedown", onDrawShape);
  FillBtn.addEventListener("mousedown", onFillCanvas);
} else {
  PenBtn.addEventListener("touchstart", onPen, { passive: false });
  Pen_Rect.addEventListener("touchstart", onPenRect, { passive: false });
  Pen_Round.addEventListener("touchstart", onPenRound, { passive: false });
  EraserBtn.addEventListener("touchstart", onEraser, { passive: false });
  Erase_Rect.addEventListener("touchstart", onEraseRect, { passive: false });
  Erase_Round.addEventListener("touchstart", onEraseRound, { passive: false });
  ShapeBtn.addEventListener("touchstart", onDrawShape, { passive: false });
  FillBtn.addEventListener("touchstart", onFillCanvas, { passive: false });
}

const fontSelect = document.querySelector(".selection");
const arrowBtn = document.querySelector(".arrow");
const fontList = document.querySelector(".list");
const Default = document.querySelector(".defaultFont");
const Users = document.querySelector(".userFont");
const Normal = document.querySelector(".normal");
const Bold = document.querySelector(".bold");
const Italic = document.querySelector(".italic");

function ArrowAct() {
  const arrow = document.querySelector(".arrow>span");

  arrow.classList.toggle("clicked");
  fontList.classList.toggle("close");
}

function onNanumGothic(event) {
  const NanumGothic = new FontFace("NanumGothic", "url(font/NanumGothic/NanumGothic-Regular.ttf)");
  fontSelect.innerText = "NanumGothic";
  NanumGothic.load().then(function (font) {
    ctxs.font = String(fontSize.value) + "px " + "NanumGothic";
    sessionStorage.setItem("font", "NanumGothic");
  });
  fontList.classList.add("close");
}

function onHahmlet(event) {
  const Hahmlet = new FontFace("Hahmlet", "url(font/Hahmlet/Hahmlet-VariableFont_wght.ttf)");
  fontSelect.innerText = "Hahmlet";
  Hahmlet.load().then(function (font) {
    ctxs.font = String(fontSize.value) + "px " + "Hahmlet";
    sessionStorage.setItem("font", "Hahmlet");
  });
  fontList.classList.add("close");
}

function onNormal(event) {
  ctxs.font = "normal " + String(fontSize.value) + "px " + sessionStorage.getItem("font");
  sessionStorage.setItem("style", "normal ");
}

function onBold(event) {
  ctxs.font = "bold " + String(fontSize.value) + "px " + sessionStorage.getItem("font");
  sessionStorage.setItem("style", "bold ");
}

function onItalic(event) {
  ctxs.font = "italic " + String(fontSize.value) + "px " + sessionStorage.getItem("font");
  sessionStorage.setItem("style", "italic ");
}

if (window.navigator.maxTouchPoints === 0) {
  arrowBtn.addEventListener("mousedown", ArrowAct);
  Default.addEventListener("mousedown", onNanumGothic);
  Users.addEventListener("mousedown", onHahmlet);
  Normal.addEventListener("mousedown", onNormal);
  Bold.addEventListener("mousedown", onBold);
  Italic.addEventListener("mousedown", onItalic);
} else {
  arrowBtn.addEventListener("touchstart", ArrowAct, { passive: false });
  Default.addEventListener("touchstart", onNanumGothic, { passive: false });
  Users.addEventListener("touchstart", onHahmlet, { passive: false });
  Normal.addEventListener("touchstart", onNormal, { passive: false });
  Bold.addEventListener("touchstart", onBold, { passive: false });
  Italic.addEventListener("touchstart", onItalic, { passive: false });
}

// Ask Clean
const CleanerBtn = document.querySelector(".clear-btn");
const AskClean = document.querySelector(".erase-alert");
const AnsClean = Array.from(document.querySelectorAll(".erase-alert>button"));

function onQuestion() {
  AskClean.classList.remove("off");
}

function offQuestion() {
  AskClean.classList.add("off");
  AnsClean.forEach((item) => {
    if (item.className.match("-y")) {
      if (window.navigator.maxTouchPoints === 0) {
        ctxs.fillStyle = "#ffffff";
        ctxs.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      } else {
        ctxs.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      }
    }
  });
}

if (window.navigator.maxTouchPoints === 0) {
  CleanerBtn.addEventListener("mousedown", onQuestion);
  AnsClean.forEach((item) => {
    item.addEventListener("mousedown", offQuestion);
  });
} else {
  CleanerBtn.addEventListener("touchstart", onQuestion, { passive: false });
  AnsClean.forEach((item) => {
    item.addEventListener("touchstart", offQuestion, { passive: false });
  });
}

const ImageUp = document.querySelector("#upload-file");
const SaveBtn = document.querySelector(".save-btn");

// text, image upload, file save
function onAddTextMouse(event) {
  const message = text.value;
  if (message != "") {
    ctxs.save();
    ctxs.lineWidth = 1;
    ctxs.fillText(message, event.offsetX, event.offsetY);
    ctxs.restore();
    canvas.removeEventListener("mousemove", onStrokeMouse);
    canvas.removeEventListener("mousemove", onShapeMouse);
  }
  else { 
    canvas.addEventListener("mousemove", onStrokeMouse);
    canvas.addEventListener("mousemove", onShapeMouse);
  }
}

function onAddTextTouch(event) {
  const message = text.value;
  if (message != "") {
    ctxs.save();
    ctxs.lineWidth = 1;
    ctxs.fillText(message, event.touches[0].clientX - canvas.offsetLeft, event.touches[0].clientY - canvas.offsetTop);
    ctxs.restore();
    canvas.removeEventListener("touchstart", onStrokeTouchStart, { passive: false });
    canvas.removeEventListener("touchmove", onStrokeTouchMove, { passive: false });
    canvas.removeEventListener("touchmove", onShapeTouchMove, { passive: false });
  } else { 
    canvas.addEventListener("touchstart", onStrokeTouchStart, { passive: false });
    canvas.addEventListener("touchmove", onStrokeTouchMove, { passive: false });
  }
}


function onFileUp_Change(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctxs.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ImageUp.value = null;
  };
}

function onFileSave() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "myFileImage.png";
  a.click(); //fake click
}

ImageUp.addEventListener("change", onFileUp_Change);
if (window.navigator.maxTouchPoints === 0) {
  SaveBtn.addEventListener("mousedown", onFileSave);
  canvas.addEventListener("dblclick", onAddTextMouse);
} else {
  SaveBtn.addEventListener("touchstart", onFileSave, { passive: false });
  canvas.addEventListener("touchstart", onAddTextTouch, {passive: false});
}



// smartphone >> nope!!!!

function error() {
  const body = document.body;
  const Errormessage = document.createElement("span");
  body.insertAdjacentElement("afterbegin", Errormessage);
  Errormessage.innerHTML = "Oops!! I'm sorry 🥹 <br/> This is for Tablet or PC browser.";
}

if (window.navigator.maxTouchPoints > 0) {
  if (window.innerWidth < 500 || window.innerHeight < 500) {
    window.addEventListener("load", error);
  } else {
    window.removeEventListener("load", error);
  }
}

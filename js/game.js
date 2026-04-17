import { Character } from "../models/character.class.js";
import { Endboss } from "../models/endboss.class.js";
import { IntervalHub } from "../models/intervalHub.class.js";
import { Keyboard } from "../models/keyboard.class.js";
import { SoundHub } from "../models/soundHub.class.js";
import { World } from "../models/world.class.js";
import {
    getPrivacyPolicyTemplate,
    getImprintTemplate,
    getControlTemplate,
    getRestartTemplate,
} from "./template.js";

let canvas;
let world;

window.fullscreen = fullscreen;
window.start = start;
window.openDialog = openDialog;
window.closeDialog = closeDialog;
window.mute = mute;
window.volume = volume;
window.finished = finished;
window.home = home;


function init() {
    // world = null funktioniert noch nicht weil noch intervalle laufen!
    world = null;
    canvas = document.getElementById("canvas");
    world = new World(canvas);
    Keyboard.setControls();

}

function start() {
    const start = document.getElementById("start-screen");
    const dialogref = document.getElementById("restart-home");
    dialogref.style.display = "none"
    start.style.display = "none";
    init();
}

function finished() {
    if (!Character.alive || !Endboss.alive) {
        setTimeout(() => {
            const start = document.getElementById("start-screen");
            start.style.display = "flex";
            Character.alive = true;
            Endboss.alive = true;
            openDialog("restart-home");
        }, 2000);
        IntervalHub.stopAllIntervals();
    }
}

function home() {
    const endRef = document.getElementById("restart-home");
    endRef.close();
    endRef.innerHTML = "";
    endRef.style.display = "none";
}

function openDialog(id) {
    const openDialogRef = document.getElementById(id);
    openDialogRef.innerHTML = "";
    openDialogRef.showModal();
    if (id == "information-dialog") {
        const dataRef = document.getElementById("information-dialog");
        dataRef.innerHTML += getImprintTemplate() + getPrivacyPolicyTemplate();
    } else if (id == "controls-dialog") {
        const dataRef2 = document.getElementById(id);
        dataRef2.innerHTML += getControlTemplate();
    } else if (id == "restart-home") {
        const restartRef = document.getElementById(id);
        restartRef.innerHTML = getRestartTemplate();
        restartRef.style.display = "flex";
    }
}

function closeDialog(id) {
    const openDialogRef = document.getElementById(id);
    openDialogRef.close();
    openDialogRef.innerHTML = "";
}

function mute() {
    SoundHub.stopAll();
    const muteRef = document.getElementById("mute-button");
    const volumeRef = document.getElementById("volume-button");
    muteRef.style.display = "none";
    volumeRef.style.display = "block";
}

function volume() {
    SoundHub.playAll();
    const muteRef = document.getElementById("mute-button");
    const volumeRef = document.getElementById("volume-button");
    muteRef.style.display = "block";
    volumeRef.style.display = "none";
}

function fullscreen() {
    const fullscreenRef = document.getElementById("canvas");
    enterFullscreen(fullscreenRef);
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}



// Responsive
// Zu wenige Hühner
// Collision von oben
// JS Doc
// Lebensbalken vom Endboss muss sich nach jedem treffer aktualisieren
// toten code entfernen
// Methoden Kürzen maximal 14 zeilen!!
// Soundhub überprüfen
// Sound Icon tauschen
// Impressum Farben anpassen nicht richtig lesbar!

// Restart button

// der Welt einen neuen wert zuweisen! leerer Array! und neu erstellen!!
// es müssen alle referenzen gelöscht werden (alle intervalle, solange eins übrig ist gehts nicht!!) // world auf null setzen?
// ALLE INTERVALLE MÜSSEN GELÖSCHT WERDEN!!

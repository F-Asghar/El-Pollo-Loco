import { level1, initLevel } from "../levels/level1.js";
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
window.startGame = startGame;
window.openDialog = openDialog;
window.closeDialog = closeDialog;
window.mute = mute;
window.volume = volume;
window.finished = finished;
window.home = home;

/**
 * Initializes the main game components by capturing the canvas element,
 * creating the game world instance, and binding keyboard controls.
 * * @global
 * @requires World
 * @requires Keyboard
 */
function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas);
    Keyboard.setControls();
    // checkSavedMuteState();
}

/**
 * Starts the game by resetting and hiding the menu/dialog overlays,
 * initializing the level layout and game objects, and playing the start sound.
 * * @global
 * @requires SoundHub
 */
function startGame() {
    const start = document.getElementById("start-screen");
    const dialogref = document.getElementById("restart-home");
    dialogref.close();
    dialogref.innerHTML = "";
    dialogref.style.display = "none";
    start.style.display = "none";
    initLevel();
    init();
    SoundHub.playOne(SoundHub.gameStart);
    SoundHub.playOne(SoundHub.backgroundMusik);
}


/**
 * Checks if the game has concluded (either the player or the endboss is dead).
 * If the game is over, it waits 2 seconds before resetting character states,
 * stopping the music, and displaying the game-over/restart dialog overlay.
 * * @global
 * @requires Character
 * @requires Endboss
 * @requires SoundHub
 */
function finished() {
    if (!Character.alive || !Endboss.alive) {
        setTimeout(() => {
            const start = document.getElementById("start-screen");
            start.style.display = "flex";
            Character.alive = true;
            Character.isNearBy = false;
            Endboss.alive = true;
            SoundHub.resetSound();
            openDialog("restart-home");
        }, 2000);
    }
}

/**
 * Resets and closes the restart/home dialog overlay.
 */
function home() {
    const endRef = document.getElementById("restart-home");
    endRef.close();
    endRef.innerHTML = "";
    endRef.style.display = "none";
}

/**
 * Opens a modal dialog by its ID and dynamically injects the correct HTML template
 * based on whether it is the legal information, controls layout, or restart menu.
 * * @param {string} id - The HTML ID attribute of the dialog element to be opened.
 */
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

/**
 * Closes a modal dialog by its ID and clears out its inner HTML contents.
 * * @param {string} id - The HTML ID attribute of the dialog element to be closed.
 */
function closeDialog(id) {
    const openDialogRef = document.getElementById(id);
    openDialogRef.close();
    openDialogRef.innerHTML = "";
}

/**
 * Mutes all game audio tracks and toggles the visible control buttons 
 * to show the volume icon instead of the mute icon.
 * * @requires SoundHub
 */
function mute() {
    SoundHub.handleMute();
}

/** 
 * Unmutes/plays all game audio tracks and toggles the visible control buttons 
 * to show the mute icon instead of the volume icon.
 * * @requires SoundHub
 */
function volume() {
    SoundHub.handleVolume();
}


/**
 * Requests to trigger fullscreen mode specifically for the game canvas element.
 */
function fullscreen() {
    const fullscreenRef = document.getElementById("canvas");
    enterFullscreen(fullscreenRef);
}

/**
 * Cross-browser helper function that requests the browser to display 
 * a given HTML element in full-screen mode.
 * * @param {HTMLElement} element - The DOM element to be scaled to full screen.
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

/**
 * Event listener that monitors window resizing. It automatically opens a full-screen
 * blocking modal if the screen width drops below 600px (e.g., forcing mobile rotation), 
 * and closes it when the screen is wide enough.
 */
window.addEventListener("resize", () => {
    const lockScreen = document.getElementById("lock-screen");
    if (window.innerWidth < 600) {
        lockScreen.showModal();
    } else {
        lockScreen.close();
    }
});

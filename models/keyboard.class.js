
export class Keyboard {
    static UP = false;
    static LEFT = false;
    static RIGHT = false;
    static D = false;

    static setControls() {
        window.addEventListener("keydown", (e) => {
            if (e.key == " ") {
                Keyboard.UP = true;
            }
            if (e.key == "ArrowLeft") {
                Keyboard.LEFT = true;
            }
            if (e.key == "ArrowRight") {
                Keyboard.RIGHT = true;
            }
            if (e.key == "d") {
                Keyboard.D = true;
            }
        });

        window.addEventListener("keyup", (e) => {
            if (e.key == " ") {
                Keyboard.UP = false;
            }
            if (e.key == "ArrowLeft") {
                Keyboard.LEFT = false;
                // Character.walking_sound_running = false;
            }
            if (e.key == "ArrowRight") {
                Keyboard.RIGHT = false;
                // Character.walking_sound_running = false;
            }
            if (e.key == "d") {
                Keyboard.D = false;
            }
        });

        window.addEventListener("pointerdown", (e) => {
            if (e.target.id === "btn-up") Keyboard.UP = true;
            if (e.target.id === "btn-left") Keyboard.LEFT = true;
            if (e.target.id === "btn-right") Keyboard.RIGHT = true;
            if (e.target.id === "btn-throw") Keyboard.D = true;
        });

        // 2. Wenn man den Button loslässt (Finger weg)
        window.addEventListener("pointerup", (e) => {
            if (e.target.id === "btn-up") Keyboard.UP = false;
            if (e.target.id === "btn-left") Keyboard.LEFT = false;
            if (e.target.id === "btn-right") Keyboard.RIGHT = false;
            if (e.target.id === "btn-throw") Keyboard.D = false;
        });

        window.addEventListener("pointercancel", () => {
            Keyboard.UP = false;
            Keyboard.LEFT = false;
            Keyboard.RIGHT = false;
            Keyboard.D = false;
        });
    }

}

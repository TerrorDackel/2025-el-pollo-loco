/**
 * Represents the keyboard input state for the game.
 * Each property indicates whether a specific key is currently pressed.
 */
class Keyboard {
    /** @type {boolean} Whether the Left Arrow key is pressed (move left). */
    LEFT = false;

    /** @type {boolean} Whether the Right Arrow key is pressed (move right). */
    RIGHT = false;

    /** @type {boolean} Whether the Up Arrow key is pressed (jump). */
    UP = false;

    /** @type {boolean} Whether the Down Arrow key is pressed (currently unused). */
    DOWN = false;

    /** @type {boolean} Whether the Space key is pressed (throw bottle). */
    SPACE = false;

    /** @type {boolean} Prevents bottle-throw autofire when SPACE is held down. */
    SPACE_PRESSED = false;

    /** @type {boolean} Whether the D key is pressed (custom use). */
    D = false;

    /** @type {boolean} Whether the F key is pressed (toggle fullscreen). */
    F = false;

    /** @type {boolean} Whether the P key is pressed (pause game). */
    P = false;

    /** @type {boolean} Indicates current pause state (true = paused). */
    PAUSE = false;

    /** @type {boolean} Whether the T key is pressed (turn music off). */
    T = false;

    /** @type {boolean} Whether the Z key is pressed (turn music on). */
    Z = false;

    /** @type {boolean} Whether the I key is pressed (show information, triggers pause). */
    INFO = false;

    /** @type {boolean} Whether the M key is pressed (open menu). */
    MENU = false;

    /** @type {boolean} Whether the Enter key is pressed (confirm / proceed). */
    ENTER = false;

    /** @type {boolean} Whether the E key is pressed (custom use). */
    E = false;

    /** @type {boolean} Whether the Escape key is pressed (exit / close dialog). */
    ESC = false;

    /** @type {boolean} Whether the J key is pressed (play again: yes). */
    J = false;

    /** @type {boolean} Whether the N key is pressed (play again: no). */
    N = false;
}

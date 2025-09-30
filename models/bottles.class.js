/**
 * Represents a bottle item in the game world.
 * Bottles are static, collectible objects without logic.
 * Extends DrawableObject for rendering support.
 */
class Bottle extends DrawableObject {

    /**
     * Initialises a new bottle instance with size and default image.
     */
    constructor() {
        super();
        this.loadImage("./imgs/6_salsa_bottle/1_salsa_bottle_on_ground.png");
        this.width = 60;
        this.height = 80;
    }
}

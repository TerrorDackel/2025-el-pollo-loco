/**
 * Represents a throwable bottle in the game world.
 * Extends MovableObject to inherit movement, collision and animation.
 */
class ThrowableObjects extends MovableObject {
    IMAGES_THROWBOTTLES = [
        "./imgs/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "./imgs/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "./imgs/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "./imgs/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png"
    ];

    IMAGES_SMASHINGBOTTLES = [
        "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
        "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
        "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
        "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
        "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
        "./imgs/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png"
    ];

    constructor(x, y, world) {
        super();
        this.loadImages(this.IMAGES_THROWBOTTLES);
        this.loadImages(this.IMAGES_SMASHINGBOTTLES);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 60;
        this.debugMode = true;
        this.world = world;
        this.hasHit = false;
        this.animate();
        this.throw();
    }

    /** Sicherstellen, dass Bottles IMMER oben sichtbar sind */
    draw(ctx) {
        ctx.save()
        super.draw(ctx)  // MovableObject.draw() verwenden
        ctx.restore()
    }

    isAboveGround() { return this.y < 330; }

    animate() {
        let timeoutSet = false;
        const interval = setInterval(() => {
            if (this.isAboveGround()) this.animateThrow();
            else this.animateSmash(interval, timeoutSet);
        }, 100);
    }

    animateThrow() {
        this.playAnimation(this.IMAGES_THROWBOTTLES);
        this.checkBottleEnemyCollision();
    }

    animateSmash(interval, timeoutSet) {
        if (!timeoutSet) {
            timeoutSet = true;
            this.currentImage = 0;
            setTimeout(() => this.removeAfter(interval), 300);
        }
        this.playAnimation(this.IMAGES_SMASHINGBOTTLES);
        SoundManager.playSound("smashBottle");
    }

    removeAfter(interval) {
        clearInterval(interval);
        const index = this.world.throwableObjects.indexOf(this);
        if (index !== -1) this.world.throwableObjects.splice(index, 1);
    }

    throw() {
        this.speedY = 10;
        this.applyGravity();
        setInterval(() => { if (this.isAboveGround()) this.x += 10; }, 1000 / 50);
    }

    checkBottleEnemyCollision() {
        if (this.hasHit || !this.world) return;
        if (this.tryHitBoss()) return;
        this.tryHitEnemies();
    }

    tryHitBoss() {
        const boss = this.world.level?.boss;
        if (boss && this.isBottleColliding(boss)) {
            this.hasHit = true;
            boss.hitByBottle();
            this.removeBottle();
            return true;
        }
        return false;
    }

    tryHitEnemies() {
        this.world.enemies?.forEach((enemy, index) => {
            if (this.isBottleColliding(enemy)) {
                this.hasHit = true;
                if (enemy instanceof Endboss) enemy.hitByBottle();
                else {
                    enemy.die();
                    this.world.enemies.splice(index, 1);
                }
                this.removeBottle();
            }
        });
    }

    removeBottle() {
        const index = this.world.throwableObjects.indexOf(this);
        if (index !== -1) this.world.throwableObjects.splice(index, 1);
    }

    isBottleColliding(enemy) {
        return (
            this.x + this.width > enemy.x &&
            this.x < enemy.x + enemy.width &&
            this.y + this.height > enemy.y &&
            this.y < enemy.y + enemy.height
        );
    }
}

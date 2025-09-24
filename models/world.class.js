class World {  
    character = new Character()
    level = level1
    canvas
    ctx
    keyboard
    camera_x = 0
    statusBar = new StatusBar()
    throwableObjects = []
    running = true
    coins = []
    score = 0
    bottles = []

    constructor(canvas, keyboard) {
        this.canvas = canvas
        this.ctx = canvas.getContext("2d")
        this.keyboard = keyboard
        this.statusBar = new StatusBar()
        this.level = level1
        this.setWorld()
        this.spawnCoins()
        this.spawnBottles()
        this.run()
        this.draw()

        this.character.animate()

        if (!SoundManager.isMuted) {
            SoundManager.playBackground("music")
        }
    }

    setWorld() {
        this.character.world = this
        this.enemies = this.level.enemies

        // WICHTIG: Nach dem globalen clearAllIntervals() beim init()
        // müssen die bereits instanziierten Gegner ihre AI/Intervals
        // neu starten. Guard verhindert doppelte Starts.
        this.enemies.forEach(e => {
            e.setWorld?.(this)
            if (!e._aiStarted && typeof e.animate === "function") {
                e._aiStarted = true
                e.animate()
            }
        })

        if (this.level.boss) {
            const b = this.level.boss
            b.setWorld(this)
            if (!b._aiStarted && typeof b.animate === "function") {
                b._aiStarted = true
                b.animate()
            }
        }
    }

    run() {
        this.interval = setInterval(() => {
            if (!this.running) return
            this.checkCollisionCoins()
            this.checkCollisionBottles()
            if (this.character && typeof this.character.checkCollisionWithEnemies === "function") {
                this.character.checkCollisionWithEnemies()
            }

            if (this.level.boss) {
                const boss = this.level.boss
                const d = Math.abs(this.character.x - boss.x)

                if (d < 600 && !boss.contactWithCharacter) {
                    boss.letEndbossTouch()
                }

                if (d >= 800 && boss.contactWithCharacter && !boss.isDead) {
                    boss.contactWithCharacter = false
                    SoundManager.stopBackground()
                    SoundManager.playBackground("music")
                }
            }
        }, 50)
    }

    pauseGame() {
        this.running = false
        this.character.pauseAnimation()
    }

    resumeGame() {
        this.running = true
        this.character.resumeAnimation()
        this.draw()
    }

    restartGame() {
        clearAllIntervals()
        Object.assign(this, new World(this.canvas, this.keyboard))
    }

    createEnemies() {
        return [new Chicken(), new ChickenBig(), new Chickensmall()]
    }

    tryThrowObject() {
        if (this.character.collectedBottles > 0) {
            let bottle = new ThrowableObjects(this.character.x + 100, this.character.y + 100, this)
            this.throwableObjects.push(bottle)
            SoundManager.playSound("whisleBottle")
            this.character.collectedBottles--
            this.statusBar.setPersentageBottles(this.character.collectedBottles)
            if (this.level.boss && bottle.isBottleColliding(this.level.boss)) {
                this.level.boss.hitByBottle()
            }
        }
    }

    checkCollisionBottles() {
        this.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                SoundManager.playSound("collectingBottle")
                this.bottles.splice(index, 1)
                this.character.collectedBottles++
                this.statusBar.setPersentageBottles(this.character.collectedBottles)
            }
        })
    }

    checkCollisionCoins() {
        this.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                SoundManager.playSound("coin")
                this.score++
                this.statusBar.setPersentageCoins(this.score)
                this.coins.splice(index, 1)
            }
        })
    }

    spawnCoins() {
        for (let i = 0; i < 20; i++) {
            let x = 100 + Math.random() * 3000
            let y = 100 + Math.random() * 150
            let coin = new Coins()
            coin.x = x
            coin.y = y
            this.coins.push(coin)
        }
    }

    spawnBottles() {
        for (let i = 0; i < 10; i++) {
            let x = 1000 + Math.random() * 2000
            let y = 300
            let bottle = new Bottle()
            bottle.x = x
            bottle.y = y
            this.bottles.push(bottle)
        }
    }

    draw() {
        if (!this.running) return
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.translate(this.camera_x, 0)

        // Hintergrund
        this.addObjectsToMap(this.level.backgroundObjects)

        this.ctx.translate(-this.camera_x, 0)
        this.statusBar.drawStatusBars(this.ctx)
        this.ctx.translate(this.camera_x, 0)

        // Spielfiguren und Objekte in richtiger Reihenfolge
        this.addToMap(this.character)
        this.addObjectsToMap(this.level.clouds)
        this.addObjectsToMap(this.level.enemies)
        this.addObjectsToMap(this.coins)

        // Boss zuerst
        if (this.level.boss) this.addToMap(this.level.boss)

        // Dann die Flaschen VORNE
        this.addObjectsToMap(this.throwableObjects)

        // Am Ende die am Boden liegenden Flaschen
        this.addObjectsToMap(this.bottles)

        this.ctx.translate(-this.camera_x, 0)
        requestAnimationFrame(() => this.draw())
    }

    addObjectsToMap(objects) {
        if (!objects || objects.length === 0) return
        objects.forEach((o) => this.addToMap(o))
    }

    addToMap(obj) {
        if (obj.otherDirection) this.flipImage(obj)
        obj.draw(this.ctx)
        if (obj.drawFrame) obj.drawFrame(this.ctx)
        if (obj.otherDirection) this.flipImageBack(obj)
    }

    flipImage(obj) {
        this.ctx.save()
        this.ctx.translate(obj.width, 0)
        this.ctx.scale(-1, 1)
        obj.x = obj.x * -1
    }

    flipImageBack(obj) {
        obj.x = obj.x * -1
        this.ctx.restore()
    }
}

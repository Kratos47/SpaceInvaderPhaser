import { SpriteBase } from "./SpriteBase.js";
import { activeScene, denormalizeToHex } from "../Globals.js";

export class BoxSprite extends SpriteBase {
    static Name = Object.freeze({
        Box: "Box",
        Box1: "Box1",
        Box2: "Box2",
        Uninitialized: "Uninitialized"
    });

    // Static member to toggle collision boxes (T key)
    static ColSpriteToggel = false;

    constructor() {
        super();
        this.name = BoxSprite.Name.Uninitialized;
        this.poLineColor = denormalizeToHex(1, 1, 1);
        this.lineWidth = 2;
        this.alpha = 1.0;

        this.x = 0.0;
        this.y = 0.0;
        this.sx = 1.0;
        this.sy = 1.0;
        this.angle = 0.0;

        this.poBoxSprite = activeScene.make.graphics({ add: false });
        console.assert(this.poBoxSprite !== null, "Phaser Graphics creation failed");
    }

    Set(name, x, y, width, height, pLineColor = null, lineWidth = 2, alpha = 1.0) {
        this.name = name;
        this.x = x;
        this.y = y;

        // Azul pushes width/height into scale properties
        this.sx = width;
        this.sy = height;

        this.lineWidth = lineWidth;
        this.alpha = alpha;

        if (pLineColor !== null) {
            this.poLineColor = denormalizeToHex(pLineColor);
        }
    }

    privClear() {
        this.name = BoxSprite.Name.Uninitialized;
        this.poLineColor = denormalizeToHex(1, 1, 1);
        this.alpha = 1.0;
        this.x = 0.0;
        this.y = 0.0;
        this.sx = 1.0;
        this.sy = 1.0;
        this.angle = 0.0;
    }

    SwapColor(myColor, show = true) {
        this.poBoxSprite.setVisible(show);
        if (!show) return;
        this.poLineColor = denormalizeToHex(myColor);
    }

    SetLineColor(r, g, b, alpha = 1.0) {
        this.poLineColor = denormalizeToHex(r, g, b);
        this.alpha = alpha;
    }

    SetScreenRect(x, y, width, height) {
        this.Set(this.name, x, y, width, height);
    }

    SetName(inName) {
        this.name = inName;
    }

    GetName() {
        return this.name;
    }

    Wash() {
        this.privClear();
    }

    Update() {
        if (!this.poBoxSprite) return;

        this.poBoxSprite.clear();
        this.poBoxSprite.lineStyle(this.lineWidth, this.poLineColor, this.alpha);

        const w = this.sx;
        const h = this.sy;

        // Draw centered (Azul standard)
        this.poBoxSprite.strokeRect(-w / 2, -h / 2, w, h);

        this.poBoxSprite.x = this.x;
        this.poBoxSprite.y = this.y;
        this.poBoxSprite.angle = this.angle;
    }

    Render() {
        if (!BoxSprite.ColSpriteToggel) return;
        if (!this.poBoxSprite || !this.poBoxSprite.visible) return;

        const renderer = activeScene.sys.renderer;
        const camera = activeScene.cameras.main;
        this.poBoxSprite.renderWebGL(renderer, this.poBoxSprite, camera);
    }
}
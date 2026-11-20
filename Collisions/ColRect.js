/**
 * @file ColRect.js
 */
export class ColRect {
    constructor(x = 0, y = 0, width = 0, height = 0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    // --- ADDED: C#-style Method Overloading for Set() ---
    Set(a, b, c, d) {
        // Check if 4 numbers were passed: Set(x, y, width, height)
        if (a !== undefined && b !== undefined && c !== undefined && d !== undefined) {
            this.x = a;
            this.y = b;
            this.width = c;
            this.height = d;
        } 
        // Check if 1 object was passed: Set(otherColRect)
        else if (a !== undefined && a.x !== undefined) {
            this.x = a.x;
            this.y = a.y;
            this.width = a.width;
            this.height = a.height;
        }
    }

    static Intersect(ColRectA, ColRectB) {
        let A_minx = ColRectA.x - ColRectA.width / 2;
        let A_maxx = ColRectA.x + ColRectA.width / 2;
        let A_miny = ColRectA.y - ColRectA.height / 2;
        let A_maxy = ColRectA.y + ColRectA.height / 2;

        let B_minx = ColRectB.x - ColRectB.width / 2;
        let B_maxx = ColRectB.x + ColRectB.width / 2;
        let B_miny = ColRectB.y - ColRectB.height / 2;
        let B_maxy = ColRectB.y + ColRectB.height / 2;

        return !(B_maxx < A_minx || B_minx > A_maxx || B_maxy < A_miny || B_miny > A_maxy);
    }

    Union(otherColRect) {
        let minX = Math.min(this.x - this.width / 2, otherColRect.x - otherColRect.width / 2);
        let maxX = Math.max(this.x + this.width / 2, otherColRect.x + otherColRect.width / 2);
        let minY = Math.min(this.y - this.height / 2, otherColRect.y - otherColRect.height / 2);
        let maxY = Math.max(this.y + this.height / 2, otherColRect.y + otherColRect.height / 2);

        this.width = maxX - minX;
        this.height = maxY - minY;
        this.x = minX + this.width / 2;
        this.y = minY + this.height / 2;
    }
}
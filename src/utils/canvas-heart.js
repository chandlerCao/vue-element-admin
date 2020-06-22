// 登陆背景用的桃心
export default class Heart {
    constructor(box, obj = {}) {
        this.box = box
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        // canvas.style.pointerEvents = 'none';
        canvas.style.left = '0';
        canvas.style.top = '0';
        canvas.width = this.box.offsetWidth;
        canvas.height = this.box.offsetHeight;
        box.appendChild(canvas);

        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.len = obj.len || 10;
        this.color = obj.color || '#409eff';
        this.heartArr = [];

        this.init();
        requestAnimationFrame(() => {
            this.startAni();
        })
    }
    init() {
        for (let i = 0; i < this.len; i++) {
            this.heartArr.push({
                x: Math.random() * this.box.offsetWidth,
                y: Math.random() * this.box.offsetHeight,
                speedY: Math.random() * 0.5,
                r: Math.random() * 0.5,
                opacity: Math.random(),
                opacitySpeed: Math.random() * 0.02
            })
        }
    }
    startAni() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.heartArr.forEach(heart => {
            heart.y -= heart.speedY;
            heart.opacity -= heart.opacitySpeed;
            heart.r += 0.01;
            if (heart.opacity <= 0) {
                heart.opacity = 1;
                heart.x = Math.random() * this.box.offsetWidth;
                heart.y = Math.random() * this.box.offsetHeight;
                heart.r = Math.random() * 0.02;
            }
            this.drawHeart(heart.x, heart.y, heart.r, heart.opacity);
        });
        setTimeout(() => {
            requestAnimationFrame(() => {
                this.startAni();
            })
        }, 20);
    }
    getX(r, t) {
        return r * (16 * Math.pow(Math.sin(t), 3));
    }
    getY(r, t) {
        return -r * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    }
    drawHeart(x, y, r, opacity) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.getX(r, 0) + x, this.getY(r, 0) + y); //移动绘图游标至原点
        let radian = 0;

        while (radian <= (Math.PI * 2)) {
            radian += Math.PI / 180;
            this.ctx.lineTo(this.getX(r, radian) + x, this.getY(r, radian) + y);
        }
        this.ctx.fillStyle = this.color;
        this.ctx.globalAlpha = opacity;
        this.ctx.fill();
        this.ctx.closePath()
    }
}
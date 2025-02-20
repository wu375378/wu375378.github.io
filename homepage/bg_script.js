class ExpandingCircles {
    constructor(canvas, options = {}) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.circles = []; // 全ての円を管理する配列
  
      // オプションのデフォルト値を設定
      this.options = {
        baseSpacing: 100, // 円の間隔
        circleCount: 20, // 初期円の数
        maxRadius: Math.max(window.innerWidth, window.innerHeight) * 1.5, // 最大半径
        mobileBreakpoint: 768, // モバイルの判定幅
        mobileLineWidth: 1, // モバイル時の線の太さ
        desktopLineWidth: 2, // デスクトップ時の線の太さ
        circleOpacity: 0.8, // 円の不透明度
        ...options, // ユーザー指定のオプションを上書き
      };
  
      this.isMobile = window.innerWidth <= this.options.mobileBreakpoint; // スマホかどうかの判定
      this.lineWidth = this.isMobile ? this.options.mobileLineWidth : this.options.desktopLineWidth; // 線の太さ
  
      this.resizeCanvas();
      window.addEventListener('resize', () => this.resizeCanvas());
      this.createInitialCircles();
      this.animate();
  
      // 新しい円を一定間隔で追加
      setInterval(() => this.addNewCircle(), 1000);
    }
  
    resizeCanvas() {
      const oldWidth = this.canvas.width || window.innerWidth;
      const oldHeight = this.canvas.height || window.innerHeight;
  
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
  
      const scaleWidth = this.canvas.width / oldWidth || 1;
      const scaleHeight = this.canvas.height / oldHeight || 1;
      const scale = Math.min(scaleWidth, scaleHeight);
  
      this.circles.forEach(circle => {
        circle.radius *= scale; // 半径をスケールに合わせて調整
      });
  
      this.ctx.setTransform(1, 0, 0, 1, 0, 0); // スケールをリセット
  
      // スマホ判定を更新
      this.isMobile = window.innerWidth <= this.options.mobileBreakpoint;
      this.lineWidth = this.isMobile ? this.options.mobileLineWidth : this.options.desktopLineWidth;
    }
  
    createInitialCircles() {
      this.circles.length = 0; // 配列を初期化
      for (let i = 0; i < this.options.circleCount; i++) {
        const radius = this.options.baseSpacing * i; // 等間隔で初期半径を設定
        const speedMultiplier = 0.5 + i * 0.1; // 初期状態の円をゆっくり広がる
        this.circles.push(new this.Circle(radius, speedMultiplier, this)); // Circleに親インスタンスを渡す
      }
    }
  
    addNewCircle() {
      const lastRadius = this.circles[0] ? this.circles[0].radius : 0; // 最後の円の半径を取得
      const radius = lastRadius - this.options.baseSpacing; // 前の円の間隔に合わせる
      const speedMultiplier = 0.5; // 速度倍率
      if (radius >= 0) {
        this.circles.unshift(new this.Circle(radius, speedMultiplier, this)); // 配列の先頭に追加
      }
    }
  
    animate() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // キャンバスをクリア
  
      this.circles.forEach((circle, index) => {
        circle.update();
        circle.draw();
  
        if (circle.isFaded()) {
          this.circles.splice(index, 1); // 配列から削除
        }
      });
  
      requestAnimationFrame(() => this.animate());
    }
  
    Circle = class {
      constructor(radius, speedMultiplier, parent) {
        this.radius = radius; // 初期半径
        this.opacity = parent.options.circleOpacity; // 不透明度
        this.speed = 0.2 * speedMultiplier * 1.2; // 初期速度を1.2倍に
        this.parent = parent; // 親インスタンスを参照
      }
  
      update() {
        this.radius += this.speed; // 半径を拡大
      }
  
      draw() {
        const ctx = this.parent.ctx;
        ctx.beginPath();
        ctx.arc(this.parent.canvas.width / 2, this.parent.canvas.height / 2, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 240, 255, ${this.opacity})`;
        ctx.lineWidth = this.parent.lineWidth; // スマホかどうかで線の太さを切り替え
        ctx.stroke();
      }
  
      isFaded() {
        return this.radius > this.parent.options.maxRadius; // 最大半径を超えたら削除
      }
    };
  }
  
  // 複数箇所でインスタンス化して使用
  const canvas1 = document.getElementById('circleCanvas1');
  const canvas2 = document.getElementById('circleCanvas2');
  
  if (canvas1) {
    new ExpandingCircles(canvas1, { circleCount: 15 });
  }
  
  if (canvas2) {
    new ExpandingCircles(canvas2, { baseSpacing: 150, circleOpacity: 0.6 });
  }
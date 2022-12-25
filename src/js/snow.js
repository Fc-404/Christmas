export default {
  speed: 1,
  quantity: 0,
  cell: [],
  ctx: null,
  width: 0,
  height: 0,
  on: false,

  calc: function () {
    for (let i = 0; i < this.quantity; ++i) {
      this.cell[i].y += (this.cell[i].s + this.speed)
      if (this.cell[i].y > this.height) {
        this.cell[i].x = Math.floor(Math.random() * this.width)
        this.cell[i].y = -Math.floor(Math.random() * this.height)
        this.cell[i].r = Math.floor(Math.random() * 10 + 2)
        let a = (1 - (((this.cell[i].r - 2) * 0.9) / 8) + 0.1).toFixed(2)
        a = a > 1 ? 1 : Number(a)
        this.cell[i].a = a
        this.cell[i].s = Math.random() + 0.1
      }
    }
  },

  draw: function () {
    for (let i = 0; i < this.quantity; ++i) {
      this.ctx.beginPath()
      this.ctx.save()
      this.ctx.arc(
        this.cell[i].x,
        this.cell[i].y,
        this.cell[i].r,
        0, Math.PI * 2
      )
      this.ctx.fillStyle = 'rgba(255, 255, 255, ' + this.cell[i].a + ')'
      this.ctx.fill()
      this.ctx.strokeStyle = 'rgba(255, 255, 255, ' + this.cell[i].a + ')'
      this.ctx.stroke()
      this.ctx.closePath()
      this.ctx.restore()
    }
  },

  init: function (canvas, v) {
    this.ctx = canvas.getContext('2d')
    this.width = canvas.width = window.innerWidth
    this.height = canvas.height = window.innerHeight

    this.set(v ? v : 30)

    return this
  },

  start: function () {
    const self = this
    this.on = true

    const procedure = function () {
      self.ctx.clearRect(0, 0, self.width, self.height)
      self.calc()
      self.draw()
      if (self.on)
        requestAnimationFrame(procedure)
    }

    procedure()
  },

  stop: function () {
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.on = false
  },

  set: function (v) {
    let dif = v - this.quantity
    this.quantity = v

    if (dif > 0) {
      let r = 0, a = 0
      for (let i = 0; i < dif; ++i) {
        r = Math.floor(Math.random() * 10 + 2)
        a = (1 - (((r - 2) * 0.9) / 8) + 0.1).toFixed(2)
        a = a > 1 ? 1 : Number(a)
        this.cell.push({
          x: Math.floor(Math.random() * this.width),
          y: Math.floor(Math.random() * this.height),
          r: r,
          a: a,
          s: Math.random() + 0.1,
        })
      }
    } else {
      dif = -dif
      for (let i = 0; i < dif; ++i) {
        this.cell.pop()
      }
    }
  }
}

import { AbstractForm } from './AbstractForm.js';
class Triangle extends AbstractForm {
  // add default values to avoid errors on empty arguments
  constructor (
    x = 0,
    y = 0,
    width = 0,
    height = 0,
    fillColor = '',
    strokeColor = '',
    strokeWidth = 2,
    pesenteur= false
  ) {
    super(x,y,width, height, fillColor, strokeColor, strokeWidth, pesenteur)
  }


  /**
   * Dessine la forme spécifique à cette classe
   * @param ctx contexte 2D du canvas
   */
  draw (ctx) {
    ctx.save()

    // set the styles for this shape
    ctx.fillStyle = this.fillColor
    ctx.lineWidth = this.strokeWidth

    // create the *path*
    ctx.beginPath()
    ctx.strokeStyle = this.strokeColor

    // pousse l'objet au bas de l'écran
    const MAX_HEAD = 80
    let new_y = (this.pesanteur) ? window.innerHeight - this.height - MAX_HEAD: this.y

    // un peu d'ombre pour les triangles
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 2;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';

    // triangle avec une base
    ctx.moveTo(this.x + this.width/2, new_y)
    ctx.lineTo(this.right, new_y + this.height)
    ctx.lineTo(this.x, new_y + this.height)

    ctx.closePath()

    // draw the path to screen
    ctx.fill()
    ctx.stroke()

    // restores the styles from earlier
    // preventing the colors used here
    // from polluting other drawings
    ctx.restore()
  }

  /**
   * get array of forms
   * @return {[Triangle,...]}
   */
  static buildForms() {
    // create a new rectangle object using the Immeuble class
    const myTriangle = new Triangle(250, 70, 100, 100, 'gold', '', 2, true )
    let max = ~~Math.random() * 10 + 5
    let forms = []
    for (let i=0; i<max; i++ ) {
      forms.push(
        new Triangle(
          ~~(Math.random()*3*myTriangle.x + 50) ,
          ~~(Math.random()*myTriangle.y),
          ~~(Math.random()*3*myTriangle.width),
          ~~(Math.random()*myTriangle.height),
          myTriangle.fillColor,
          myTriangle.strokeColor,
          '',
          i%2===0))
    }
    const builds = forms

    return builds
  }

}

export { Triangle }

import { AbstractForm } from './AbstractForm.js';

/**
 * Déssine un triangle
 */
export class Triangle extends AbstractForm {
  // add default values to avoid errors on empty arguments
  constructor(
    x = 0,
    y = 0,
    width = 0,
    height = 0,
    fillColor = '',
    strokeColor = '',
    strokeWidth = 2,
    pesenteur = false,
    ordreConstruction = 100
  ) {
    super(x, y, width, height, fillColor, strokeColor, strokeWidth, pesenteur, ordreConstruction)
  }


  /**
   * Dessine la forme spécifique à cette classe
   * @param ctx contexte 2D du canvas
   */
  draw(ctx) {
    super.draw(ctx)
    ctx.save()

    // set the styles for this shape
    ctx.fillStyle = this.fillColor
    ctx.lineWidth = this.strokeWidth

    // create the *path*
    ctx.beginPath()
    ctx.strokeStyle = this.strokeColor

    // pousse l'objet au bas de l'écran
    let new_y =  this.y

    // un peu d'ombre pour les triangles
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 2;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';

    // triangle avec une base
    ctx.moveTo(this.x + this.width / 2, new_y)
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
    const myTriangle = new Triangle(250, 70, 100, 100, 'gold', '', 2, true)
    let max = ~~(Math.random() * 5) + 5 // max in [5..10]
    let forms = []
    for (let i = 0; i < max; i++) {
      forms.push(
        new Triangle(
          ~~(Math.random() * 3 * myTriangle.x + 50),
          ~~(Math.random() * myTriangle.y),
          ~~(Math.random() * 3 * myTriangle.width + 10),
          ~~(Math.random() * myTriangle.height + 10),
          myTriangle.fillColor,
          myTriangle.strokeColor,
          '',
          i % 2 === 0 // pesenteur une fois sur 2
        )
      )
    }
    // retourne un tableau d'objets de type Triangle
    return forms
  }

}

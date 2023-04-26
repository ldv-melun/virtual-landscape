import { AbstractForm } from './AbstractForm.js';

/**
 * Une box avec un text à l'intérieur 
 */
export class TextBox extends AbstractForm {
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
   * draw a rectangular form with ctx (must be override by subclasses)
   * @param ctx 2D from canvas
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

    let new_y = this.y

    ctx.rect(this.x, new_y, this.width, this.height)
    // draw the path to screen
    ctx.fill()
    ctx.stroke()

    // dessine un texte
    ctx.fillStyle = 'black'
    ctx.fillText(' TextBox Form', this.x + 10, new_y + 50);
    ctx.fillText('pesanteur=' + this.pesanteur, this.x + 10, new_y + 80);
    // restores the styles from earlier
    // preventing the colors used here
    // from polluting other drawings
    ctx.restore()
  }

  /**
   * get array of instances of this class (must be override by subclasses)
   * @return {[Object,...]}
   *
   */
  static buildForms() {
    const aForm1 = new TextBox(250, 70, 100, 100, 'gold', '', 2, true, 101)
    const aForm2 = new TextBox(250, 70, 100, 100, 'gold', '', 2, false, 101)
    return [aForm1, aForm2]
  }

}


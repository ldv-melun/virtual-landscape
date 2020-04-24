import { AbstractForm } from './AbstractForm.js';
class Planete extends AbstractForm {
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
    const MAX_HEAD = 0
    let new_y = (this.pesanteur) ? window.innerHeight - this.height - MAX_HEAD: this.y

    let rayon = this.width/2;
    let sommets = [];
    let nbSommets = 31;
    let angle=0;
    let x1
    let y1;
    let ox
    let oy // origine
    ox= this.x + rayon;
    oy= this.y + rayon;

    for (let i=0; i<nbSommets; i++) {
      x1=ox+Math.cos(angle)*rayon;
      y1=oy+Math.sin(angle)*rayon;
      sommets.push( {'x' : ~~Math.round(x1), 'y': ~~Math.round(y1) } );
      angle+=((2*Math.PI)/nbSommets);
    }
    // maintenant on dessine
    for (let i=0; i<sommets.length; i++){
      let p1 = sommets[i];
      for (let j=i+1; j<sommets.length; j++)
      {
        let p2 = sommets[j];
        ctx.moveTo(p1.x,p1.y)
        ctx.lineTo(p2.x,p2.y);
      }
    }
    // ctx.rect(this.x, this.y, this.width, this.height)
    ctx.closePath()

    ctx.stroke()

    // restores the styles from earlier
    // preventing the colors used here
    // from polluting other drawings
    ctx.restore()
  }

  /**
   * get array of forms
   * @return {[Planete...]}
   */
  static buildForms() {
    const cx =  window.innerWidth/0.9 - 600/2

    const myPlanete = new Planete(cx, 10, 600, 600, 'gold', '', 1, false )
    const forms = [myPlanete]
    return forms
  }

}

export { Planete }

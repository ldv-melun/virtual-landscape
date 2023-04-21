import {AbstractForm} from './AbstractForm.js';

/**
 * Dessine un immeuble
 */
export class Immeuble extends AbstractForm {

  // you create new Rectangles by calling this as a function
  // these are the arguments you pass in
  // add default values to avoid errors on empty arguments
  constructor(
    x = 0,
    y = 0,
    width = 0,
    height = 0,
    fillColor = '',
    strokeColor = '',
    strokeWidth = 2,
    pesanteur = false,
    ordreConstruction = 100
  ) {
    super(x, y, width, height, fillColor, strokeColor, strokeWidth, pesanteur, ordreConstruction)
  }

  /**
   * Dessine la forme spécifique à cette classe
   * @param ctx contexte 2D du canvas
   */
  draw(ctx) {
    const MAX_FENETRE_ETAGE = Math.floor(Math.random()*16) + 4
    const MAX_ETAGE = Math.floor(Math.random()*8) + 4
     // la hauteur de l'immeuble tient compte de l'arrondi du calcul de la hauteur d'un étage
    this.height = Math.floor(this.height / MAX_ETAGE) * MAX_ETAGE

    // redefinition de y si pesanteur
    super.draw(ctx)

    // console.log(this.toString())
    // destructuring
    // const {
    //   x, y, width, height,
    //   fillColor, strokeColor, strokeWidth
    // } = this

    // saves the current styles set elsewhere
    // to avoid overwriting them
    ctx.save()

    // set the styles for this shape
    ctx.fillStyle = this.fillColor
    ctx.lineWidth = this.strokeWidth

    // create the *path*
    ctx.beginPath()
    ctx.strokeStyle = this.strokeColor
   
    let new_y = this.y
    let wCase = Math.floor(this.width / MAX_FENETRE_ETAGE)
    let hCase = Math.floor(this.height / MAX_ETAGE)

    // console.log("MAX_ETAGE :" + MAX_ETAGE + "  MAX_FENETRE_ETAGE :" + MAX_FENETRE_ETAGE)

    // https://developer.mozilla.org/fr/docs/Tutoriel_canvas/Ajout_de_styles_et_de_couleurs
    for (let i = 0; i < MAX_FENETRE_ETAGE; i++) {
      for (let j = 0; j < MAX_ETAGE; j++) {
        /*ctx.fillStyle = 'rgb(' + Math.floor(255 - 42.5 * i) + ',' +
          Math.floor(255 - 42.5 * j) + ',0)';*/
        ctx.rect(this.x + i * wCase, new_y + j * hCase, wCase, hCase);
        ctx.fillRect(this.x + i * wCase, new_y + j * hCase, wCase, hCase);
      }
    }
    // ctx.rect(this.x, new_y, this.width, this.height)
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
   * @return {[Immeuble,...]}
   */
  static buildForms() {
    let widthCase = 100;
    let max = Math.floor(Math.random() * 5) + 3
    let forms = []
    for (let i = 0; i < max; i++) {
      forms.push(new Immeuble(
        Math.floor(Math.random() * window.innerWidth),
        Math.floor(Math.random() * 400) + 10,
        Math.floor(Math.random() * (widthCase) + 20),
        Math.floor(Math.random() * (widthCase * 2) + 30),
        (i % 2 === 0) ? 'gold' : 'gray',
        'black',
        1,
        true
      ))
    }
    return forms
  }
}


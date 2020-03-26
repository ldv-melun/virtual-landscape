import { Immeuble } from './modules/Immeuble.js';
import { Triangle } from './modules/Triangle.js';
import { AbstractForm } from './modules/AbstractForm';

var cwPrev = null
var chPrev = null

// construit les différentes formes du paysage, en appelant la méthode statique
// buildForms de chacune des classes
function buildForms() {
  let forms = Immeuble.buildForms()
  forms = forms.concat(Triangle.buildForms())
  forms = forms.concat(AbstractForm.buildForms())
  // à compléter/modifier
  // etc. pour chacune de vos classes
  return forms
}

function clearCanvas() {
  const c = document.getElementById('sceneryCanvas')
  const ctx = c.getContext("2d");

  if (cwPrev) {
    ctx.clearRect(0, 0, cwPrev, chPrev)
  }
  const cw = c.width = window.innerWidth;
  const ch = c.height = window.innerHeight - 80;

  console.log("window.innerHeight : " + window.innerHeight);

  cwPrev = cw
  chPrev = ch
}

function _drawForms (forms) {
  const c = document.getElementById('sceneryCanvas')
  const ctx = c.getContext("2d");

  clearCanvas()

  console.log("forms :" + JSON.stringify(forms))

  // draw all forms by looping over them
  forms.forEach(form => form.draw(ctx))
}

function drawThisForm(whichForm) {
  if (whichForm === 'Immeuble') {
    _drawForms(Immeuble.buildForms())
  } else if (whichForm === 'Triangle') {
    _drawForms(Triangle.buildForms())
  } else if (whichForm === 'AbstractForm') {
  _drawForms(AbstractForm.buildForms())
  }
}

function drawAllForms () {
  _drawForms(buildForms())
}

export  { drawAllForms, drawThisForm }


import { Immeuble } from './modules/Immeuble.js';
import { Triangle } from './modules/Triangle.js';
import { Planete } from './modules/Planete.js';
import { AbstractForm } from './modules/AbstractForm.js';

import * as modulesForms from "./modules/index.js"; // pour drawThisForm

var cwPrev = null
var chPrev = null

function clearCanvas() {
  const c = document.getElementById('sceneryCanvas')
  const ctx = c.getContext("2d");

  if (cwPrev) {
    ctx.clearRect(0, 0, cwPrev, chPrev)
  }
  const cw = c.width = window.innerWidth
  const ch = c.height = window.innerHeight - 80;

  // console.log("window.innerHeight : " + window.innerHeight);

  cwPrev = cw
  chPrev = ch
}

/**
 * Dessine tous les objets dans le canvas
 * @param forms tableau d'objets de type AbstractForm
 * @private
 */
function _drawForms(forms) {
  const c = document.getElementById('sceneryCanvas')
  const ctx = c.getContext("2d");

  clearCanvas()
  console.log("forms :" + JSON.stringify(forms))

  // draw all forms by looping over them
  forms.forEach(form => form.draw(ctx))
}


/**
 * construit les différentes formes du paysage, en appelant la méthode statique
 * buildForms de chacune des classes
 *
 * @return {Object[]}
 */
function buildAllForms() {
  const mod = modulesForms;
  let allForms = []

  // Bonne idée, mais on ne maitris pas l'ordre d'exécution des classes
  // console.log(Object.keys(mod))
  // let keys = Object.keys(mod)
  // for (let i=0; i<keys.length; i++)
  //   allForms = allForms.concat(mod[keys[i]].buildForms())

  allForms = Planete.buildForms()
  allForms = allForms.concat(Immeuble.buildForms())
  allForms = allForms.concat(Triangle.buildForms())
  allForms = allForms.concat(AbstractForm.buildForms())


  return allForms 

  // à compléter/modifier
  // etc. pour chacune de vos classes
  
}

/**
 *  dessine uniquement la forme passée dont le nom est reçu en paramètre  (attention, le fichier modules/index.js doit être mis à jour pour chaque classe ajoutée)
 * @param whichForm le nom d'une classe héritant d'AbstractForm dans modules
 */
function drawThisForm(whichForm) {
  const mod = modulesForms;
  if (typeof mod[whichForm] !== undefined) {
    _drawForms(mod[whichForm].buildForms())
  }
}

function drawAllForms() {
  _drawForms(buildAllForms())
}

// accroche des fonctions du module au document courant (pour être appelées ensuite)
document.drawForm = drawThisForm
document.drawAllForms = drawAllForms

// exécutions de fonctions sur événement 
document.addEventListener('DOMContentLoaded', document.drawAllForms)
visualViewport.addEventListener('resize', document.drawAllForms)



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
  const allForms = []

  // console.log(Object.keys(mod))
  // console.log(Object.values(mod)[0].buildForms()[0].orderConstruction)
  // console.log(Object.keys(mod))

  let keys = Object.keys(mod)
  for (let i = 0; i < keys.length; i++)
    allForms.push(...mod[keys[i]].buildForms())

  // les formes sont trièes selon leur ordre de construction (priorité au plus petits)  
  return allForms.sort((a, b) => a.ordreConstruction - b.ordreConstruction)

}

/**
 * Dessine uniquement la forme passée dont le nom est reçu en paramètre  (attention, le fichier modules/index.js doit être mis à jour pour chaque classe ajoutée)
 * @param formClassName le nom d'une classe héritant d'AbstractForm dans modules
 */
function drawThisForm(formClassName) {
  const mod = modulesForms;
  if (typeof mod[formClassName] !== undefined) {
    _drawForms(mod[formClassName].buildForms())
  }

}

/**
 * Dessine toutes les formes
 */
function drawAllForms() {
  _drawForms(buildAllForms())
}

/**
 * Update listes des composants
 */
function updateListeDesComposants() {
  let composants = document.getElementById("composants")

  // vide la liste de composants
  while (composants.firstChild) {
    composants.removeChild(composants.lastChild);
  }

  // reconstruction d'après les classes placées dans le module
  const formesModules = modulesForms;
  let keys = Object.keys(formesModules)
  keys.forEach(formClassName => composants.appendChild(createLinkComposant(formClassName)))


  // au debut, dessine toutes les formes
  drawAllForms()
}

/**
 * Construit un element <a> appelant la fonction drawForm avec le nom d'une classe en argument
 * @param {string} formClassName 
 * @returns HTMLElement
 */
function createLinkComposant(formClassName) {
  let comp = document.createElement("a")
  comp.setAttribute('href', "#")
  comp.setAttribute('onclick', "document.drawForm(\'" + formClassName + "\');return false;")
  comp.innerText = formClassName;
  return comp
}


// accroche des fonctions du module au document courant (pour être appelées ensuite)
document.drawForm = drawThisForm
document.drawAllForms = drawAllForms


// exécutions de fonctions sur événement 
document.addEventListener('DOMContentLoaded', updateListeDesComposants)
visualViewport.addEventListener('resize', document.drawAllForms)


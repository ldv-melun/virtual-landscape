
import * as lesModulesForms from "./modules/index.js"; 

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
 * @param ctx 2d context canvas
 * @param forms tableau d'objets de type AbstractForm
 * @private
 */
function _drawForms(ctx, forms) {
  // const c = document.getElementById('sceneryCanvas')
  // const ctx = c.getContext("2d");

  clearCanvas()
  // console.log("forms :" + JSON.stringify(forms))

  // dessine chacunes des formes (appel de la méthode draw des objets)
  forms.forEach(form => form.draw(ctx))
}


/**
 * construit les différentes formes du paysage, en appelant la méthode statique
 * buildForms de chacune des classes
 *
 * @return {Object[]}
 */
function buildAllForms() {
  const c = document.getElementById('sceneryCanvas')
  const ctx = c.getContext("2d");
  const lesModules = lesModulesForms;
  const allForms = []

  // console.log(Object.classNames(lesModules))
  // console.log(Object.values(lesModules)[0].buildForms()[0].orderConstruction)

  // construit une liste (allForms) à partir d'un ensemble de listes (buildForms()) 
  let classNames = Object.keys(lesModules)
  for (let i = 0; i < classNames.length; i++)
    allForms.push(...lesModules[classNames[i]].buildForms(ctx))

  // les formes sont triées selon leur ordre de construction (priorité aux plus petits)  
  return allForms.sort((a, b) => a.ordreConstruction - b.ordreConstruction)

}

/**
 * Dessine uniquement la forme passée dont le nom est reçu en paramètre  (attention, le fichier modules/index.js doit être mis à jour pour chaque classe ajoutée)
 * @param formClassName le nom d'une classe héritant d'AbstractForm dans modules
 */
function drawThisForm(formClassName) {
  const c = document.getElementById('sceneryCanvas')
  const ctx = c.getContext("2d");
  const lesModules = lesModulesForms;

  if (typeof lesModules[formClassName] !== undefined) {
    _drawForms(ctx, lesModules[formClassName].buildForms(ctx))
  }
}

/**
 * Dessine toutes les formes
 */
function drawAllForms() {
  const c = document.getElementById('sceneryCanvas')
  const ctx = c.getContext("2d");
  _drawForms(ctx, buildAllForms(ctx))
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

  // reconstruction de la listes des formes d'après les classes placées dans js/modules
  const formeslesModulesules = lesModulesForms;
  let classNames = Object.keys(formeslesModulesules)
  classNames.forEach(formClassName => composants.appendChild(createLinkComposant(formClassName)))

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


// ------- CODE D'INITIALISATION ------------

// accroche des fonctions au DOM (pour être appelées ensuite)
document.drawForm = drawThisForm
document.drawAllForms = drawAllForms

// définitions de fonctions sur événement 
document.addEventListener('DOMContentLoaded', updateListeDesComposants)
visualViewport.addEventListener('resize', document.drawAllForms)

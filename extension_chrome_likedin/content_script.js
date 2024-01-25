let res = []
let button_suivant = null;
async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function findButton(){
  const buttons = document.getElementsByTagName('button');
  for (let i = 0; i < buttons.length; i++){
    const value = buttons[i].getAttribute('aria-label');
    if (value === "Suivant"){
      button_suivant = buttons[i];
      break;
    }
  }
}
async function extractProfileData() {
  const buttons = document.getElementsByTagName('button');
  for (let i = 0; i < buttons.length; i++){
    const value = buttons[i].getAttribute('aria-label');
    if (value === "Suivant"){
      button_suivant = buttons[i];
      break;
    }
  }

  const span = document.getElementsByClassName("entity-result__title-text t-16");
  const div_role = document.getElementsByClassName("entity-result__primary-subtitle t-14 t-black t-normal");
  const recherche = document.querySelector('.search-global-typeahead__input');
  let lieux = null;
  const filtre_button = document.getElementsByClassName('artdeco-hoverable-trigger artdeco-hoverable-trigger--content-placed-bottom ember-view');
  for (let i = 0; i < filtre_button.length; i++){
    let bb  = filtre_button[i].getElementsByTagName('button')[0];
    if (bb.ariaLabel.split('.')[0] == "Filtre Lieux"){
      lieux = bb.innerText.split('\n')[0];
      break;
    }
  }
  for (let i = 0; i < span.length; i++){
    info_personne = [];
    const a =  span[i].getElementsByClassName("app-aware-link")[0]
    const profile = a.href.split("?")[0]
    const role = div_role[i];
    let nom_prenom = "Account not viewable";
    // Pour un navigateur en FRANCAIS !!!!!!!!!!!!!
    if (a.innerText != "Utilisateur LinkedIn"){
      nom_prenom = a.getElementsByTagName('span')[0].getElementsByTagName('span')[0].innerText
    }
    info_personne.push(profile);
    info_personne.push(nom_prenom);
    info_personne.push(role.innerText);
    info_personne.push(lieux);
    info_personne.push(recherche.value);
    res.push(info_personne);
  }
  button_suivant.click();
  await sleep(7000);
}
async function extraction(){
  do {
    await extractProfileData()
  } while(!button_suivant.disabled)
}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === "extractProfiles") {
    console.log("Extraction en cours...");
    await extraction()
    console.log("Extraction terminée !")
    chrome.runtime.sendMessage({ action: "sendProfileData", profileData: res });
  }
});

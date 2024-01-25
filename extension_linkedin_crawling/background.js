token = null;

async function recup(){
  const apiUrl = 'http://serveur.voicedigit.com:8000/get-csrf-token';

  try {
    console.log("coucou")
    const response = await fetch(apiUrl);
    console.log(response)
    const data = await response.json();
    console.log("tranquille")
    const csrfToken = data.csrf_token;
    console.log('CSRF Token:', csrfToken);
    return csrfToken;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function envoie(request){
  if (token == null){
    console.log("salut")
    token = await recup();
  }
  console.log("token est"+token)
  const apiUrl = 'http://serveur.voicedigit.com:8000/api/linkedin-profiles-crawler';
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': token,
      },
      body: JSON.stringify({ profiles: request}),
    });
    console.log(response)

    if (response.ok) {
      const data = await response.json();
      console.log('Success:', data);
    } else {
      console.error('Error:', response);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getLinks(){
  let profiles = []
  const apiUrl = 'http://serveur.voicedigit.com:8000/api/get-linkedin-profiles';
  try {
    const response = await fetch(apiUrl);
    console.log(response)
    const data = await response.json();
    console.log("Data : "+data)
    profiles.push(data.profiles);
    console.log('Profiles data : ');
    console.log(profiles[0])
  } catch (error) {
    console.error('Error:', error);
  }
  return profiles;
}

async function extractFromProfil(url,appelle){
  return new Promise((resolve, reject) => {
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
      if (message.result == "FINITO") {
        resolve(message.people);
      } else {
        reject(new Error("La fonction n'a pas pu être exécutée dans le content-script"));
      }
    });
    chrome.tabs.update({ url: url }, function(tab) {
      chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
        if (changeInfo.status == "complete" && tabId === tab.id) {
          isPageLoaded = true;
          if (appelle == false) {
            appelle = true;

            chrome.tabs.sendMessage(tabId, { action: "openUrl", url: url }, function(response) {
              // Ne rien faire ici, le résultat sera renvoyé par le listener ci-dessus
            });
          }
        }
      });
    });
  });
}

async function openPage(url){
  appelle = false
  return await extractFromProfil(url,appelle)
  .then((resolve) => {
    return resolve;
  })
  .catch((error) => {
    console.error(error);
  });
}

async function extractFromExp(url,appelle){
  return new Promise((resolve, reject) => {
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
      if (message.result == "FINITO EXP") {
        resolve(message.experience);
      } else {
        console.log(message.result)
        reject(new Error("La fonction n'a pas pu être exécutée dans le content-script"));
      }
    });
    chrome.tabs.update({ url: url }, function(tab) {
      chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
        if (changeInfo.status == "complete" && tabId === tab.id) {
          if (appelle == false) {
            appelle = true;
            chrome.tabs.sendMessage(tabId, { action: "crawlExp", url: url }, function(response) {
              // Ne rien faire ici, le résultat sera renvoyé par le listener ci-dessus
            });
          }
        }
      });
    });
  });
}

async function openExpPage(url){
  appelle = false
  return await extractFromExp(url,appelle)
  .then((resolve) => {
    return resolve;
  })
  .catch((error) => {
    console.error(error);
  });
}

async function crawl(request) {
  let res = []
  console.log("on est ici")
  let profiles = await getLinks();
  console.log("Profiles fetched : ")
  console.log(profiles[0])

  for (let i = 0; i < profiles[0].length; i++) {
    let people = {
      "id": profiles[0][i].id,
      "recherche": profiles[0][i].research,
      "recherche_localisation": profiles[0][i].location, 
      "url": profiles[0][i].profile_url,
      "name": profiles[0][i].Name,
      "role_actuel": profiles[0][i].role,
      "localisation": "",
      "info": "",
      "description": ""
    }
    console.log("i ="+i)
    console.log("Profile : ")
    url = profiles[0][i].profile_url;
    const experiences_url = url+"/details/experience/";
    const education_url = url+"/details/education/";
    console.log(profiles[0][i].profile_url)
    console.log("avant extractFromProfil")
    let info = await openPage(url);
    people["localisation"] = info["location"];
    people["info"] = info["info"];
    console.log("après extractFromProfil")
    console.log(info)
    console.log("avant extractionExpérience")
    await sleep(2000);
    let exp = await openExpPage(experiences_url);
    people["description"] = exp;
    console.log("aprés extractionExpérience ")
    console.log(exp)
    res.push(people);
  }
  return res
}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === "sendProfileData") {
    let data = await crawl(request)
    await envoie(data);
  }
});

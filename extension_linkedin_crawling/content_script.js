async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function crawlEducation(url){
  //window.open(url, '_blank')
  window.location.href = url;

  setTimeout(function () {
    console.log(window.location)
    console.log(url)
    let all = []
    let li = document.getElementsByClassName("pvs-list__paged-list-item artdeco-list__item pvs-list__item--line-separated pvs-list__item--one-column")
    console.log(li)
    if(li !== null) {
      let number = li.length
      console.log(number)
      for (let i = 1; i < number + 1; i++) {
        let single = []
        var role = "pas de poste renseignée"
        var buss = "pas d'entreprise renseignée"
        var form = "pas de formation renseignée"
        var time = "pas de durée renseignée"
        var loca = "pas de localisation renseignée"
        var supp = "pas de données supplémentaires renseignées"
        var all_supp = []

        if (i === 1) {
          role = document.evaluate("/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section/div[2]/div/div[1]/ul/li[" + i + "]/div/div/div[2]/div[1]/a/div/span/span[1]/text()",
              document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
          console.log(role)
          buss = document.evaluate("/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section/div[2]/div/div[1]/ul/li[" + i + "]/div/div/div[2]/div[1]/a/span[1]/span[1]/text()",
              document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
          console.log(buss)
          time = document.evaluate("/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section/div[2]/div/div[1]/ul/li[" + i + "]/div/div/div[2]/div[1]/a/span[2]/span[1]/text()",
              document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
          console.log(time)

        } else {
          role = document.evaluate("/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section/div[2]/div/div[1]/ul/li[" + i + "]/div/div/div[2]/div[1]/a/div/span/span[1]/text()",
              document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
          console.log(role)
          buss = document.evaluate("/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section/div[2]/div/div[1]/ul/li[" + i + "]/div/div/div[2]/div[1]/a/span[1]/span[1]/text()",
              document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
          console.log(buss)
          time = document.evaluate("/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section/div[2]/div/div[1]/ul/li[" + i + "]/div/div/div[2]/div[1]/a/span[2]/span[1]/text()",
              document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
          console.log(time)

        }
        single.push(role)
        single.push(buss)
        single.push(time)
        all.push(single)
        console.log(all)
      }
    }
    return all
  }, 10000)
}

async function crawlExperience(url){
  console.log("on est dans crawlExperience")
  await sleep(4000)
  let all = []
  let li = document.getElementsByClassName("pvs-list__paged-list-item artdeco-list__item pvs-list__item--line-separated pvs-list__item--one-column")
  console.log(li)
  if (li !== null) {
    let number = li.length
    let allRole = document.getElementsByClassName("mr1 t-bold");
    for (let i = 0; i < number; i++) {
      console.log("i="+i)
      let mission = {
        "role": [],
        "description": [],
        "competence": [],
        "bacasable": "",
        "entreprise": "",
        "duree": ""
      };
      let lii = li[i];
      mission["bacasable"] = lii.textContent
      let job = lii.getElementsByClassName("mr1 t-bold")
      let descriptionJob = lii.getElementsByClassName("display-flex align-items-center t-14 t-normal t-black")
      let infoJob = lii.getElementsByClassName("t-14 t-normal")
      // console.log("cc")
      // console.log(infoJob)
      //console.log(descriptionJob)
      if (job.length == 1){
        try {
          mission["role"].push(job[0].getElementsByTagName("span")[0].textContent)
          console.log("cc")
          mission["description"].push(descriptionJob[0].getElementsByTagName("span")[0].textContent)
          console.log("youpi")
          mission["competence"].push(descriptionJob[1].getElementsByTagName("span")[0].textContent)
          console.log("ho oui oui")
        } catch {
        }
      } else {
        for (let j = 0; j < job.length; j++){
          if (j == 0){
            mission["entreprise"] = job[j].getElementsByTagName("span")[0].textContent
          } else {
            mission["role"].push(job[j].getElementsByTagName("span")[0].textContent)
            //console.log(descriptionJob[j].getElementsByTagName("span")[0].textContent)
          }
          
          // if (j != 0){
          //   console.log(descriptionJob[j].getElementsByTagName("span")[0].textContent)
          //   mission["role"].push(job[j].getElementsByTagName("span")[0].textContent)
          //   mission["description"].push(descriptionJob[j].getElementsByTagName("span")[0].textContent)
          // }
          
        }
        for (let j = 0; j < descriptionJob.length; j++){
          let text = descriptionJob[j].getElementsByTagName("span")[0].textContent
          if (text.startsWith("Compétences")){
            mission["competence"].push(text)
          } else {
            mission["description"].push(text)
          }
          
        }
      }
      
      all.push(mission)
    }
  }
  console.log(all)
  return all
}

async function sendToBackground(data){
  chrome.runtime.sendMessage({ action: "sendToBackground", data: data})
}

function sendMessageToBackground(messsage){
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({action: "openExperience", url: messsage}, reponse => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      }
      else {
        resolve(response);
      }
    });
  });
}

async function openNewPage(url){
  try {
    await sendMessageToBackground(url);
    console.log("new page ouverte");
  } catch (error) {
    console.error("bruh il y a un prob", error);
  }
}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === "fetchLinks") {
    chrome.runtime.sendMessage({ action: "sendProfileData" });
  }
  if(request.action === "openUrl"){
    console.log('in openUrl')

    const full_name = document.getElementsByClassName("text-heading-xlarge inline t-24 v-align-middle break-words")[0].innerHTML;

    const role = document.getElementsByClassName("text-body-medium break-words")[0].innerHTML;

    const location = document.getElementsByClassName("text-body-small inline t-black--light break-words")[0].innerHTML;
    let infoo = "";
    try {
      infoo = document.getElementsByClassName('artdeco-card ember-view relative break-words pb3 mt2')[0].innerText;
    } catch {
      
    }
    
    let info = {
      "name": full_name,
      "role": role,
      "location": location,
      "info": infoo
    }
    console.log(full_name)
    console.log(role)
    console.log(location)
    //await sleep(2000);
    //await openNewPage(url);

    //let experiences_list= await crawlExperience(experiences_url)
    //console.log(experiences_list)
    //let educations_list= await crawlEducation(education_url)
    //console.log(experiences_list)
    //console.log(educations_list)
    // await openNewPage(experiences_url)
    // let exp = await crawlExperience(window.location.href);
    // console.log("c'est fini l'exp")
    
    chrome.runtime.sendMessage({result: "FINITO",people: info});
  }
  if (request.action === "crawlExp"){
    let exp = await crawlExperience(window.location.href);
    console.log("c'est fini l'exp")
    console.log(exp)
    chrome.runtime.sendMessage({result: "FINITO EXP", experience: exp});
  }
});

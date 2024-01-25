token = null;
async function recup(){
  const apiUrl = 'http://serveur.voicedigit.com:8000/get-csrf-token';

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const csrfToken = data.csrf_token;
    console.log('CSRF Token:', csrfToken);
    return csrfToken;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function envoie(request) {
  if (token == null){
    token = await recup();
  }
  console.log("token est"+token)
  const profileData = request.profileData;
  const apiUrl = 'http://serveur.voicedigit.com:8000/api/linkedin-profiles';

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': token,
      },
      body: JSON.stringify({ profiles: profileData }),
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





chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {

  if (request.action === "sendProfileData") {
    await envoie(request)
  }
});

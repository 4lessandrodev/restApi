const btn = document.getElementById('btn-generate');
const inputCredential = document.getElementById('credential');
const userName = document.getElementById('name');
const password = document.getElementById('password');

function generateCredential() {

  let user = { email: userName.value, password: password.value };
  // Encrypt
  let credential = CryptoJS.AES.encrypt(JSON.stringify(user), 'credential').toString();
  inputCredential.value = credential;

  //Put this credential in headers on request POST
  //headers:{ credential }

}

btn.addEventListener('click', generateCredential);
const server = "180.189.90.200";
const createChannelBtn = document.getElementById("createBtn");
const errorText = document.getElementById("error_text");

const createChannel = () => {
  fetch(`http://` + server + `:9322/api/v1/NACUser/createChannel`, {}).then(
    res => {
      if (res.status === 200 || res.status === 201) {
        res.text().then(text => console.log(text));
        
        document.getElementById("noChannel").style.display = 'none';
        document.getElementById("loding").style.display = 'inline-block';
        createChannelBtn.style.display = 'none';
        errorText.style.fontSize = '20px';

        deployRC();
      } else {
        console.log(res.statusText);
      }
    }
  );
};
createChannelBtn.addEventListener("click", createChannel);

const deployRC = () => {
  fetch(`http://` + server + `:9322/api/v1/NACUser/deployRC`, {}).then(res => {
    if (res.status === 200 || res.status === 201) {
      res.text().then(text => console.log(text));
      errorText.innerHTML = `
<div class="loading">
    <span></span>
    <span></span>
    <span></span>
  </div>
  <span>체인코드 업로드 중..RC</span>
`;
      deployACC();
    } else {
      console.log(res.statusText);
    }
  });
};

const deployACC = () => {
  fetch(`http://` + server + `:9322/api/v1/NACUser/deployACC`, {}).then(res => {
    if (res.status === 200 || res.status === 201) {
      res.text().then(text => console.log(text));
      errorText.innerHTML = `
<div class="loading">
    <span></span>
    <span></span>
    <span></span>
  </div>
  <span>체인코드 업로드 중..ACC</span>
`;
      deployJC();
    } else {
      console.log(res.statusText);
    }
  });
};

const deployJC = () => {
  fetch(`http://` + server + `:9322/api/v1/NACUser/deployJC`, {}).then(res => {
    if (res.status === 200 || res.status === 201) {
      errorText.innerHTML = `
<div class="loading">
    <span></span>
    <span></span>
    <span></span>
  </div>
  <span>체인코드 업로드 중..JC</span>
`;
      document.location.href = "/";
    } else {
      console.log(res.statusText);
    }
  });
};

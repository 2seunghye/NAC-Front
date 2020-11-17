 const createChannel = () => {
    fetch(`http://36.38.56.78:9322/api/v1/NACUser/createChannel`, {}).then((res) => {
      if (res.status === 200 || res.status === 201) {
        res.text().then((text) => console.log(text));
        deployRC();
      } else {
        console.log(res.statusText);
      }
    });
  };

  var createBtn = document.getElementById('createBtn');
  createBtn.addEventListener('click', createChannel);

  const deployRC = () => {
    fetch(`http://36.38.56.78:9322/api/v1/NACUser/deployRC`, {}).then((res) => {
      if (res.status === 200 || res.status === 201) {
        res.text().then((text) => console.log(text));
        deployACC();
      } else {
        console.log(res.statusText);
      }
    });
  };
  
  const deployACC = () => {
    fetch(`http://36.38.56.78:9322/api/v1/NACUser/deployACC`, {}).then((res) => {
      if (res.status === 200 || res.status === 201) {
        res.text().then((text) => console.log(text));
        deployJC();
      } else {
        console.log(res.statusText);
      }
    });
  };
  
  const deployJC = () => {
    fetch(`http://36.38.56.78:9322/api/v1/NACUser/deployJC`, {}).then((res) => {
      if (res.status === 200 || res.status === 201) {
        document.location.href = '/';
      } else {
        console.log(res.statusText);
      }
    });
  };

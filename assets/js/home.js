import routes from '../../routes';
import axios from 'axios';
import { lookUpArr, policyArr } from '../../db2';

const btn = document.getElementById('test-btn');
const container = document.getElementById('container');

// function postData(url = '', data = {}) {
//   // Default options are marked with *
//   return fetch('http://192.168.0.8:9322/api/v1/NACUser/registerNetwork', {
//     method: 'POST',
//     headers: {
//       orgAffiliation: 'userOrg',
//       orgMspld: 'UserOrgMSP',
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     body: JSON.stringify(data), // body data type must match "Content-Type" header
//   }).then((response) => response.json()); // parses JSON response into native JavaScript objects
// }

var registerDate = {
  methodName: 'Yu206',
  subject: {
    name: 'gateway',
    macAddress: '0.0.0.0',
  },
};
// registerDate.methodName = saf;

//zmpfrYDUrkwM

//methodList 아무것도 없으면? => createChannel 있으면? => getMethodList
const registerNetwork = () => {
  fetch(`http://192.168.0.8:9322/api/v1/NACUser/registerNetwork`, {
    method: 'POST',
    headers: {
      'content-Type': 'application/json',
      orgAffiliation: 'userOrg',
      orgMspId: 'UserOrgMSP',
    },
    body: JSON.stringify(registerDate),
  }).then((res) => {
    if (res.status === 200 || res.status === 201) {
      res.text().then((text) => console.log(text));
    } else {
      console.log(res.statusText);
    }
  });
};

const createChannel = () => {
  fetch(`http://192.168.0.8:9322/api/v1/NACUser/registerNetwork`, {
    method: 'POST',
    headers: {
      'content-Type': 'application/json',
      orgAffiliation: 'userOrg',
      orgMspId: 'UserOrgMSP',
    },
    body: JSON.stringify(registerDate),
  }).then((res) => {
    if (res.status === 200 || res.status === 201) {
      res.text().then((text) => console.log(JSON.parse(text)));
    } else {
      console.log(res.statusText);
    }
  });
};

const getMethodList = () => {
  fetch(`http://192.168.0.8:9322/api/v1/lookUpTables`, {
    headers: {
      userName: 'Yu206',
      secretKey: 'zmpfrYDUrkwM',
      orgAffiliation: 'userOrg',
      orgMspId: 'UserOrgMSP',
    },
  }).then((res) => {
    if (res.status === 200 || res.status === 201) {
      res.text().then((text) => console.log(JSON.parse(text)));
    } else {
      console.log(res.statusText);
    }
  });
};

const getlookupTable = () => {
  fetch(`http://192.168.0.8:9322/api/v1/lookUpTable?methodName=Yu206`, {
    headers: {
      userName: 'Yu206',
      secretKey: 'zmpfrYDUrkwM',
      orgAffiliation: 'userOrg',
      orgMspId: 'UserOrgMSP',
    },
  }).then((res) => {
    if (res.status === 200 || res.status === 201) {
      res.text().then((text) => console.log(JSON.parse(text)));
    } else {
      console.log(res.statusText);
    }
  });
};

function init() {
  btn.addEventListener('click', createChannel);
}

if (container) {
  init();
}

function createSelect() {
  const selectBox = document.getElementById('selectBox');

  for (var i = 0; i < lookUpArr.length; i++) {
    selectBox.innerHTML += `<option value=${i}>${lookUpArr[i].methodName}</option>`;
  }
}

createSelect();

const lookup_table = document.getElementById('lookupTable');
let object_table = document.getElementById('objectTable');
let tbody = document.getElementById('tbody');

selectBox.addEventListener('change', (event) => {
  lookup_table.innerHTML = `
          <dl>
              <dt>Method Name</dt>
              <dd>${lookUpArr[event.target.value].methodName}</dd>
          </dl>
          <dl>
              <dt>abi</dt>
              <dd>${lookUpArr[event.target.value].abi}</dd>
          </dl>
          <dl>
              <dt>Subject-macAddress</dt>
              <dd>${lookUpArr[event.target.value].subject.macAddress}</dd>
          </dl>
          <dl>
              <dt>Subject-scName</dt>
              <dd>${lookUpArr[event.target.value].subject.scName}</dd>
          </dl>
          <dl>
              <dt>scName</dt>
              <dd>${lookUpArr[event.target.value].scName}</dd>
          </dl>
          `;

  object_table.style.display = 'block';
  tbody.innerHTML = '';
  for (var i = 0; i < lookUpArr[event.target.value].objects.length; i++) {
    tbody.innerHTML += `
              <tr id=tr_${i}>
                  <td>${i + 1}</td>
                  <td>${lookUpArr[event.target.value].objects[i].name}</td>
                  <td>${lookUpArr[event.target.value].objects[i].macAddress}</td>
              </tr>
              `;
  }

  for (var i = 0; i < lookUpArr[event.target.value].objects.length; i++) {
    document.getElementById(`tr_${i}`).addEventListener('click', showPolicy);
  }
});

function showPolicy() {
  var tob_Date = policyArr[0].timeOfUnblock;
  var tob_timeArr = tob_Date.split('T');
  var tob_dateArr = tob_timeArr[0].split('-');
  var tob_hourArr = tob_timeArr[1].split(':');
  var tob_date = `${tob_dateArr[0]}-${tob_dateArr[1] - 1}-${tob_dateArr[2]}`;
  var tob_time = `${tob_hourArr[0]}:${tob_hourArr[1]}:${tob_hourArr[2].substr(0, 2)}`;

  var lr_Date = policyArr[0].toLR;
  var lr_timeArr = lr_Date.split('T');
  var lr_dateArr = lr_timeArr[0].split('-');
  var lr_hourArr = lr_timeArr[1].split(':');
  var lr_date = `${lr_dateArr[0]}-${lr_dateArr[1] - 1}-${lr_dateArr[2]}`;
  var lr_time = `${lr_hourArr[0]}:${lr_hourArr[1]}:${lr_hourArr[2].substr(0, 2)}`;

  const policy_table = document.getElementById('policyTable');
  const misbe_table = document.getElementById('misbeTable');
  policy_table.innerHTML = `
              <dl>
                  <dt>Action</dt>
                  <dd>${policyArr[0].action}</dd>
              </dl>
              <dl>
                  <dt>Method Name</dt>
                  <dd>${policyArr[0].methodName}</dd>
              </dl>
              <dl>
                  <dt>Min Interval</dt>
                  <dd>${policyArr[0].minInterval}</dd>
              </dl>
              <dl>
                  <dt>noFR</dt>
                  <dd>${policyArr[0].noFR}</dd>
              </dl>
              <dl>
                  <dt>Object-macAddress</dt>
                  <dd>${policyArr[0].object.macAddress}</dd>
              </dl>
              <dl>
                  <dt>Object-name</dt>
                  <dd>${policyArr[0].object.name}</dd>
              </dl>
              <dl>
                  <dt>Permission</dt>
                  <dd>${policyArr[0].permission}</dd>
              </dl>
              <dl>
                  <dt>Resource</dt>
                  <dd>${policyArr[0].resource}</dd>
              </dl>
              <dl>
                  <dt>Threshold</dt>
                  <dd>${policyArr[0].threshold}</dd>
              </dl>
              <dl>
                  <dt>Time of Unblock</dt>
                  <dd>${tob_date} ${tob_time}</dd>
              </dl>
              <dl>
                  <dt>toLR</dt>
                  <dd>${lr_date} ${lr_time}</dd>
              </dl>
            `;

  document.getElementById('misTable').style.display = 'block';
  document.getElementById('misbody').innerHTML = '';

  for (var i = 0; i < policyArr[0].misbehaviorTables.length; i++) {
    var timeData = policyArr[0].misbehaviorTables[i].time;
    var timeArr = timeData.split('T');
    var dateArr = timeArr[0].split('-');
    var hourArr = timeArr[1].split(':');
    var date = `${dateArr[0]}-${dateArr[1] - 1}-${dateArr[2]}`;
    var time = `${hourArr[0]}:${hourArr[1]}:${hourArr[2].substr(0, 2)}`;

    document.getElementById('misbody').innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${policyArr[0].misbehaviorTables[i].penalty}</td>
                <td>${policyArr[0].misbehaviorTables[i].reason}</td>
                <td>${date} ${time}</td>
            </tr>
            `;
  }
}

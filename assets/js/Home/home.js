const server = "36.38.56.78";

const createNetwork_popup = document.getElementById('network-popup');
const createNetwork_popup_closeBtn = document.getElementById('closeBtn');

const addUser_popup = document.getElementById('addUser-popup');
const addUser_popup_closeBtn = document.getElementById('usp-closeBtn');

const addNetworkBtn = document.getElementById('addNetworkBtn');
const registerNetworkBtn = document.getElementById('createNetworkBtn');

const addUserBtn = document.getElementById('addUserBtn');
const submitUserBtn = document.getElementById('submitUserBtn');

const lookup_table = document.getElementById('lookupTable');
const object_table = document.getElementById('objectTable');
const tbody = document.getElementById('tbody');
const selectBox = document.getElementById('selectBox');
const policy_table = document.getElementById('policyTable');
const misbe_table = document.getElementById('misTable');

const lookUpTable = new Object();
const policyTable = new Object();
const methodNameList = new Array();

function createSelect() {
    for (var i = 0; i < methodNameList.length; i++) {
        selectBox.innerHTML += `<option value=${i}>${methodNameList[i]}</option>`;
    }
}

const getMethodList = () => {
    fetch(`http://` + server + `:9322/api/v1/lookUpTables`, {
        headers: {
            orgAffiliation: 'userOrg',
            orgMspId: 'UserOrgMSP',
        },
    }).then((res) => {
        if (res.status === 200 || res.status === 201) {
            res.text().then((text) => {
                let methodNameArray = JSON.parse(text);
                for (var i = 0; i < methodNameArray.length; i++) {
                    methodNameList.push(JSON.parse(methodNameArray[i]).methodName);
                }
                createSelect();
            });
        } else {
            console.log(res.statusText);
        }
    });
};

const getlookupTable = (methodName) => {
    fetch(`http://` + server + `:9322/api/v1/lookUpTable?methodName=` + methodName, {
        headers: {
            orgAffiliation: 'userOrg',
            orgMspId: 'UserOrgMSP',
        },
    }).then((res) => {
        if (res.status === 200 || res.status === 201) {
            res.text().then((text) => {
                let lookupTableData = JSON.parse(text);

                lookUpTable.methodName = lookupTableData.methodName;
                lookUpTable.subject = lookupTableData.subject;
                lookUpTable.objects = lookupTableData.objects;
                lookUpTable.scName = lookupTableData.scName;
                lookUpTable.abi = lookupTableData.abi;

                setLookUpTable();
            });
        } else {
            console.log(res.statusText);
        }
    });
};
selectBox.addEventListener('change', (event) => {
    getlookupTable(methodNameList[event.target.value]);
});

const closeCreateNetworkPopup = () => {
    createNetwork_popup.style.visibility = 'hidden';
}
createNetwork_popup_closeBtn.addEventListener('click', closeCreateNetworkPopup);

const viewCreateNetworkPopup = () => {
    createNetwork_popup.style.visibility = 'visible';
}
addNetworkBtn.addEventListener('click', viewCreateNetworkPopup);

const registerNetwork = () => {
    var registerDate = {
        methodName: document.getElementById('methodName').value,
        subject: {
            name: document.getElementById('subjectName').value,
            macAddress: document.getElementById('macAddress').value,
        },
    };

    fetch(`http://` + server + `:9322/api/v1/NACUser/registerNetwork`, {
        method: 'POST',
        headers: {
            'content-Type': 'application/json',
            orgAffiliation: 'userOrg',
            orgMspId: 'UserOrgMSP',
        },
        body: JSON.stringify(registerDate),
    }).then((res) => {
        if (res.status === 200 || res.status === 201) {
            res.text().then((text) => {
                let lookupTableData = JSON.parse(text);

                lookUpTable.methodName = lookupTableData.methodName;
                lookUpTable.subject = lookupTableData.subject;
                lookUpTable.objects = lookupTableData.object;
                lookUpTable.scName = lookupTableData.scName;
                lookUpTable.abi = lookupTableData.abi;
                setLookUpTable();

                methodNameList.push(lookUpTable.methodName);
                selectBox.innerHTML += `<option selected="true" value=${methodNameList.length - 1}>${methodNameList[methodNameList.length - 1]}</option>`;
            });

            closeCreateNetworkPopup();
        } else {
            console.log(res.statusText);
        }
    });
};
registerNetworkBtn.addEventListener('click', registerNetwork);


const closeAddUserPopup = () => {
    addUser_popup.style.visibility = 'hidden';
}
addUser_popup_closeBtn.addEventListener('click', closeAddUserPopup);

const viewAddUserPopup = () => {
    addUser_popup.style.visibility = 'visible';
    document.getElementById('methodNameAtAddUser').value = lookUpTable.methodName;
}
addUserBtn.addEventListener('click', viewAddUserPopup);

const addUser = () => {
    var userData = {
        methodName: document.getElementById('methodNameAtAddUser').value,
        object: {
            name: document.getElementById('objectName').value,
            macAddress: document.getElementById('objectMacAddress').value,
        },
        resource: document.getElementById('resource').value,
        action: document.getElementById('action').value,
        permission: document.getElementById('permission').value,
        threshold: document.getElementById('threshold').value,
        minInterval: document.getElementById('minInterval').value,
    };

    fetch(`http://` + server + `:9322/api/v1/policyTable`, {
        method: 'POST',
        headers: {
            'content-Type': 'application/json',
            orgAffiliation: 'userOrg',
            orgMspId: 'UserOrgMSP',
        },
        body: JSON.stringify(userData),
    }).then((res) => {
        if (res.status === 200 || res.status === 201) {
            res.text().then((text) => {
            });

            if (lookUpTable.objects == null) {
                lookUpTable.objects = new Array();
            }
            lookUpTable.objects.push(userData.object);

            updateLookUpTable();
            setLookUpTable();
            closeAddUserPopup();
        } else {
            console.log(res.statusText);
        }
    });
};

const updateLookUpTable = () => {
    fetch(`http://` + server + `:9322/api/v1/lookUpTable/` + lookUpTable.methodName, {
        method: 'PUT',
        headers: {
            'content-Type': 'application/json',
            orgAffiliation: 'userOrg',
            orgMspId: 'UserOrgMSP',
        },
        body: JSON.stringify(lookUpTable),
    }).then((res) => {
        if (res.status === 200 || res.status === 201) {
            res.text().then((text) => {
                console.log(text);
            });
        } else {
            console.log(res.statusText);
        }
    });
};
submitUserBtn.addEventListener('click', addUser);

const getPolicyTable = (objectIndex) => {
    objectIndex = objectIndex.split('_')[1];
    var policyTableKey = {
        methodName: lookUpTable.methodName,
        object: {
            name: lookUpTable.objects[objectIndex].name,
            macAddress: lookUpTable.objects[objectIndex].macAddress,
        },
        resource: "Network",
    };

    fetch(`http://` + server + `:9322/api/v1/policyTable/` + objectIndex, {
        method: 'POST',
        headers: {
            'content-Type': 'application/json',
            orgAffiliation: 'userOrg',
            orgMspId: 'UserOrgMSP',
        },
        body: JSON.stringify(policyTableKey),
    }).then((res) => {
        if (res.status === 200 || res.status === 201) {
            res.text().then((text) => {
                let policyTableData = JSON.parse(text);

                policyTable.methodName = policyTableData.methodName;
                policyTable.object = policyTableData.object;
                policyTable.resource = policyTableData.resource;
                policyTable.action = policyTableData.action;
                policyTable.permission = policyTableData.permission;
                policyTable.toLR = policyTableData.toLR;
                policyTable.timeOfUnblock = policyTableData.timeOfUnblock;
                policyTable.minInterval = policyTableData.minInterval;
                policyTable.noFR = policyTableData.noFR;
                policyTable.threshold = policyTableData.threshold;
                policyTable.misbehaviorTables = policyTableData.misbehaviorTables;

                setPolicyTable();
            });
        } else {
            console.log(res.statusText);
        }
    });
};

function setLookUpTable() {
    lookup_table.innerHTML = `
          <dl>
              <dt>Method Name</dt>
              <dd>${lookUpTable.methodName}</dd>
          </dl>
          <dl>
              <dt>Subject Name</dt>
              <dd>${lookUpTable.subject.name}</dd>
          </dl>
          <dl>
              <dt>Subject MacAddress</dt>
              <dd>${lookUpTable.subject.macAddress}</dd>
          </dl>
          <dl>
              <dt>scName</dt>
              <dd>${lookUpTable.scName}</dd>
          </dl>
          <dl>
              <dt>abi</dt>
              <dd>${lookUpTable.abi}</dd>
          </dl>
          `;

    addUserBtn.style.visibility = 'visible';
    object_table.style.display = 'block';

    if (lookUpTable.objects != null) {
        tbody.innerHTML = '';
        for (var i = 0; i < lookUpTable.objects.length; i++) {
            tbody.innerHTML += `
                  <tr id=tr_${i}>
                      <td class = 'objectIndex_${i}'>${i + 1}</td>
                      <td class = 'objectIndex_${i}'>${lookUpTable.objects[i].name}</td>
                      <td class = 'objectIndex_${i}'>${lookUpTable.objects[i].macAddress}</td>
                  </tr>
                  `;
        }

        for (var i = 0; i < lookUpTable.objects.length; i++) {
            document.getElementById(`tr_${i}`).addEventListener('click', (event) => {
                getPolicyTable(event.target.classList[0]);
            });
        }
    }
}

function setPolicyTable() {
    if (policyTable.timeOfUnblock != null){
        policyTable.timeOfUnblock = policyTable.timeOfUnblock.replace('T', ' ');
    }

    if (policyTable.toLR != null){
        policyTable.toLR = policyTable.toLR.replace('T', ' ');
    }

    policy_table.innerHTML = `
              <dl>
                  <dt>Method Name</dt>
                  <dd>${policyTable.methodName}</dd>
              </dl>
              <dl>
                  <dt>Object Name</dt>
                  <dd>${policyTable.object.name}</dd>
              </dl>
              <dl>
                  <dt>Object MacAddress</dt>
                  <dd>${policyTable.object.macAddress}</dd>
              </dl>
              <dl>
                  <dt>Resource</dt>
                  <dd>${policyTable.resource}</dd>
              </dl>
              <dl>
                  <dt>Action</dt>
                  <dd>${policyTable.action}</dd>
              </dl>
              <dl>
                  <dt>Permission</dt>
                  <dd>${policyTable.permission}</dd>
              </dl>
              <dl>
                  <dt>toLR</dt>
                  <dd>${policyTable.toLR}</dd>
              </dl>
              <dl>
                  <dt>Time of Unblock</dt>
                  <dd>${policyTable.timeOfUnblock}</dd>
              </dl>
              <dl>
                  <dt>Min Interval</dt>
                  <dd>${policyTable.minInterval}</dd>
              </dl>
              <dl>
                  <dt>noFR</dt>
                  <dd>${policyTable.noFR}</dd>
              </dl>
              <dl>
                  <dt>Threshold</dt>
                  <dd>${policyTable.threshold}</dd>
              </dl>
            `;

    misbe_table.style.display = 'block';
    document.getElementById('misbody').innerHTML = '';

    if (policyTable.misbehaviorTables != null) {
        for (var i = 0; i < policyTable.misbehaviorTables.length; i++) {
            if (policyTable.misbehaviorTables[i].time != null){
                policyTable.misbehaviorTables[i].time = policyTable.misbehaviorTables[i].time.replace('T', ' ');
            }

            document.getElementById('misbody').innerHTML += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${policyTable.misbehaviorTables[i].reason}</td>
                    <td>${policyTable.misbehaviorTables[i].penalty}</td>
                    <td>${policyTable.misbehaviorTables[i].time}</td>
                </tr>
                `;
        }
    }
}

function init() {
    getMethodList();
}

init();
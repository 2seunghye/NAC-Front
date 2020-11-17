import { updateNetwork } from './updateNetwork'

const deleteUser = () => {
    fetch(`http://` + server + `:9322/api/v1/policyTables/` + policyTable.id, {
      method: 'DELETE',
      headers: {
        orgAffiliation: 'userOrg',
        orgMspId: 'UserOrgMSP',
      },
    }).then((res) => {
      if (res.status === 200 || res.status === 201) {
        policyTable = new Object();

        lookUpTable.objects.splice(policyTable.index, 1);
        updateNetwork();

        document.getElementById('updateUserBtn').style.display = "none";
        document.getElementById('deleteUserBtn').style.display = "none";
      
        document.getElementById('policyTable').innerHTML = '';
      
        document.getElementById('misTable').style.display = "none";
        document.getElementById('misbody').innerHTML = '';
      } else {
        console.log(res.statusText);
      }
    });
  }
  const deleteUserBtn = document.getElementById('deleteUserBtn');
  deleteUserBtn.addEventListener('click', deleteUser);
import routes from '../../routes';
import axios from 'axios';
import { lookUpArr } from '../../db2';

const btn = document.getElementById('test-btn');
const container = document.getElementById('container');

const testView = () => {
  fetch(`https://dapi.kakao.com/v2/local/search/keyword.json?y=37.514322572335935&x=127.06283102249932&radius=20000&query=카카오프렌즈`, {
    headers: {
      Authorization: `KakaoAK dc9d70e5667aecff7649401efacca9f1`,
    },
  }).then((res) => {
    if (res.status === 200 || res.status === 201) {
      res.text().then((text) => console.log(text));
    } else {
      console.log(res.statusText);
    }
  });

  // .then((response) => response.json())
  // .then((json) => {
  //   // 받은 json으로 기능 구현
  //   console.log(json);
  // });

  //   fetch('http://125.137.22.139:9322/api/v1/NACUser/init')
  //     .then((res) => {
  //       if (res.status === 200 || res.status === 201) {
  //         res.text().then((text) => console.log(text));
  //       } else {
  //         console.log(res.statusText);
  //       }
  //     })
  //     .catch((err) => console.log(err));
};

function init() {
  btn.addEventListener('click', testView);
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
            <tr>
                <td>${i}</td>
                <td>${lookUpArr[event.target.value].objects[i].name}</td>
                <td>${lookUpArr[event.target.value].objects[i].macAddress}</td>
            </tr>
            `;
  }
});

// General api to access data
import axios from 'axios';
import { KEYS, CONSTANTS } from '.';
import { isObjEmpty, simplify } from '../utils';

axios.defaults.baseURL = CONSTANTS.BASE_URL;
axios.defaults.headers = {
  Authorization: 'Basic '+window.btoa(KEYS.BA_UNAME+':'+KEYS.BA_PWD),
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  "Access-Control-Allow-Origin":"*",
  "Access-Control-Allow-Headers":"X-Requested-With",
};

export function apiFileUpload(endpoint, formData, onSuccess, onFailure) {
    axios
      .post(endpoint, formData, {
        'Content-Type': 'multipart/form-data'
      })
      .then(response => {
        if (onSuccess) onSuccess(response.data);
      })
      .catch(error => {
        console.log(error);
        if (onFailure) onFailure(error);
      });
  }
  

export default async function Api(data) {
    let uri = data.uri ? data.uri : '';
    let method = data.method === undefined ? 'POST' : data.method;
    let headers = data.headers === undefined ? data.headers : {}
    let formData = new FormData();
    if(data.data){
        if(!isObjEmpty(data.data)){
            for(let key in data.data) {
                formData.append(key, data.data[key]);
                // if(data.data[key] === '' || data.data[key] === undefined){
                //     alert(`${key} field is required!`)
                // return;
                // }
            }
        }
    }

    if(simplify(method) === 'post'){
        return axios.post(uri, formData, headers);
    }
    if(simplify(method) === 'get'){
        return axios.get(uri);
    }
}
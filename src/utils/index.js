export function isObjEmpty(obj){
  if(obj){
    return Object.keys(obj).length === 0;
  }
  return false;
}

export function simplify(string){
  if(string !== null && string !== undefined && string !== ""){
    return string.replace(/\s/g, '').toLowerCase();
  }
  return string;
}

export function makeSentance(key){
  if(key !== null && key !== undefined && key !== ""){
    let str = key.replace("_", " ").toLowerCase();
    return str.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
  }
  // key.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
  return "";
}

export function isNullRetNull(string, retVal="n/a"){
  return  string &&
          string !== undefined &&
          string !== null &&
          string !== "" ? string : retVal;
}

export function padNumber(number, p='000'){
  let str = "" + number
  let pad = p
  return pad.substring(0, pad.length - str.length) + str;
}

export function addZeroes(no) {
  let num = no+""
  if(num.split('.').length > 1){
    const dec = num.split('.')[1]
    const len = dec && dec.length > 2 ? dec.length : 2
    return Number(num).toFixed(len)
  }else{
    return Number(num)+'.00'
  }
}

export function splitArrayIntoChunks(array, lenght) {
  var chunks = [], i = 0, n = array.length;
  while (i < n) {
    chunks.push(array.slice(i, i += lenght));
  }
  return chunks;
}

export function notifyResponse(res){
  if(res){
    if(res.data){
      if(res.data.error){
        if(res.data.error.message){
            alert(res.data.error.message)
        }
      }
    }else{
      alert("Unkown Error : "+res) 
    }
  }else{
    alert("Unkown Error : "+res)
  }
}

export function getError(res){
  if(res){
    if(res.data){
      if(res.data.error){
        if(res.data.error.message){
            return res.data.error.message
        }
      }
    }else{
      return "Unkown Error : "+res 
    }
  }else{
    return "Unkown Error : "+res
  }
}

export function getPercentage(per, total){
  return per*total/100;
}


export const sortCommunityComments = (arr) => {
  var temp = [...arr]
  arr = arr.sort((a, b) => b.parent - a.parent)
  arr.forEach((o, index) => {
      if (temp[0].parent_comment_id === 0 || temp[0].parent_comment_id === "0") return
      var parentIndex = temp.findIndex(o => o.comment_id === temp[0].parent_comment_id )
      if(parentIndex > -1){
          temp[parentIndex].replies ? temp[parentIndex].replies.push(temp[0]) : temp[parentIndex].replies = [temp[0]]
      }
      temp.shift()
  })
  return temp;
}

export const sortComments = (arr) => {
  var temp = [...arr]
  arr = arr.sort((a, b) => b.parent - a.parent)
  arr.forEach((o, index) => {
      if (temp[0].parent_comment_id === 0 || temp[0].parent_comment_id === "0") return
      var parentIndex = temp.findIndex(o => o.vcomment_id === temp[0].parent_comment_id )
      if(parentIndex > -1){
          temp[parentIndex].replies ? temp[parentIndex].replies.push(temp[0]) : temp[parentIndex].replies = [temp[0]]
      }
      temp.shift()
  })
  return temp;
}

export function getUrl(url, slug=false){
  return `https://www.youtube.com/embed/${url}`
  // if(url){
  //     if(url.includes("http")){
  //         if(url.includes("watch?v=")){
  //             return { html: `<iframe src="${url.replace("watch?v=", "embed/")}"
  //                 style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" allowfullscreen="0" donotallowfullscreen
  //                 />`}
  //         }else if(url.includes("youtu.be")){
  //             return { html: `<iframe src="${url.replace("youtu.be", "youtube.com/embed/")}"
  //                 style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" allowfullscreen="0" donotallowfullscreen
  //                 />`}
  //         }else{
  //             return { uri: url }
  //         }
  //     }else{
  //         if(slug){
  //             return { html: `<iframe src="https://www.youtube.com/embed?listType=search&list==${url}"
  //             style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" allowfullscreen="0" donotallowfullscreen
  //             />`}
  //         }

  //         return { html: `<iframe src="https://www.youtube.com/embed/${url}"
  //             style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" allowfullscreen="0" donotallowfullscreen
  //             />`}
  //     }
  // }else{
  //     return { html: `<iframe src="https://www.youtube.com/embed/zer2lMc5J5k"
  //     style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" allowfullscreen="0" donotallowfullscreen
  //     />`}
  // }
}

export function getDiffInDates(from, to){
  if(from){
      var fromDate = new Date(from); 
      var toDate = to ? new Date(to) : new Date();
      var difference_In_Time = toDate.getTime() - fromDate.getTime(); 
      var difference_In_Days = parseInt(difference_In_Time / (1000 * 3600 * 24));
      if(difference_In_Days > 365){
          return `${parseInt(difference_In_Days/365)} years`;
      }
      if(difference_In_Days > 365){
          return `${parseInt(difference_In_Days/30)} months`;
      }
      if(difference_In_Days > 6){
          return `${parseInt(difference_In_Days/7)} weeks`;
      }
      return `${parseInt(difference_In_Days)} days`;
  }
}

export function getBase64(file, cb) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
      cb(reader.result)
  };
  reader.onerror = function (error) {
      alert('Error: ', error);
  };
}

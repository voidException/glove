import {
    NativeAppEventEmitter,
    Alert
} from 'react-native';

let  fetchToolget=function(url){

   return new Promise((reslove,reject)=>{   
        fetch(url)
            .then(response=> response.json())
            .then(responseText=>{  
                let resp = typeof responseText === 'string' ? JSON.parse(responseText) : responseText;
                //console.log(resp);
                reslove(resp); //这个resp会被外部接收
            }).catch(err=>{        
                console.log(err);
                reject(err);
            });
        });
}
export default fetchToolget; 


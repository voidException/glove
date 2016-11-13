import {
    NativeAppEventEmitter,
    Alert
} from 'react-native';

let defaultOptions = {
    url:'',
    method:'POST',
    headers:{
        'Accept':'application/json',
		'Content-Type':'application/json',
    },
    body:null,
};


let  fetchTool=function(options){
	let opt = Object.assign({}, defaultOptions, options); //将默认的参数和传过来的合并在一起
    let sentData={
        credentials:"include",
    	method:opt.method,
    	headers:opt.headers,
    	body:opt.body || ''
    };
    //console.log(sentData);
   return new Promise((reslove,reject)=>{   
        fetch(opt.url, sentData)
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
    // .catch(err => {
    //     //发送请求结束通知
    //     //NativeAppEventEmitter.emit('loadingEnd');
    //     // Alert.alert(
    //     //     '请求失败',
    //     //     '请检查网络设置确定是否联网',
    //     //     [
    //     //         {
    //     //             text: '好的'
    //     //         }
    //     //     ]
    //     // );
        
    
    // });
}
export default fetchTool; 


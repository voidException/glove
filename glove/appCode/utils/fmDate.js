
//传入unix时间戳，把时间格式化为yy-mm-dd hh:mm:ss的形式
function add0(m){
		return m<10?'0'+m:m
}

let fmDate=function getyymmddhhmmss(timestamp){
	let date = new Date(timestamp);
		let Y = date.getFullYear() + '-';
		let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
		let D = date.getDate()+' ';
		if (D>=0 && D<=9) {
			D="0"+D;
		};
		let hh=date.getHours();
		let mm=date.getMinutes();
		let ss=date.getSeconds();
        
        let finalDate=Y+M+D+add0(hh)+':'+add0(mm)+':'+add0(ss);
        return finalDate;
}
export default fmDate;
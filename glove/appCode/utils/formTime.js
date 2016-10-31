
//格式化日期为2016-10-30 这样的形式

let formTime=function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDay = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDay >= 0 && strDay <= 9) {
            strDay = "0" + strDay;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDay;
        return currentdate;
    }
export default formTime;
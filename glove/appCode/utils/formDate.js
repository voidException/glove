

function formDate(date, days) { 
    var date2 = new Date(date); 
    date2.setDate(date.getDate() + days);
    var month = date2.getMonth() + 1;
    var day = date2.getDate();
    let needDate= date2.getFullYear()+"-"+(date2.getMonth()+1)+"-"+date2.getDate();
    return needDate;
}

export default formDate;
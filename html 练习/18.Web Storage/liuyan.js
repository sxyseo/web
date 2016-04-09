/**
 * Created by leyiwo on 2016/4/9.
 */

function saveStorage(id){
    var target = document.getElementById(id);
    var time = new Date().getTime();
    var str = target.value;
    localStorage.setItem(time,str);
    //alert("数据已保存");
    loadStorage('msg');
}
function readStorage(id){
    var reselt = '<table border="1">';

    for(var i =0 ; i < localStorage.length; i++)
    {
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        var date = new Date();
        date.setTime(key);
        var datestr = date.toGMTString();
        reselt += '<tr><td>这是第'+ i +'条数据</td><td>'+ value +'</td><td>'+ datestr +'</td></tr>';
    }
    reselt += '</table>';
    var target = document.getElementById(id);
    //var msg = localStorage.getItem("time");
    target.innerHTML = reselt +"<br>";

}
function clearStorage(id){
    // var target = document.getElementById(id);
    // var str = target.value;
    // localStorage.setItem('time',str);
    localStorage.clear();
}
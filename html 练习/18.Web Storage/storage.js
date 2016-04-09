/**
 * Created by leyiwo on 2016/4/9.
 */
function saveStorage(id){
    var target = document.getElementById(id);
    var str = target.value;
    sessionStorage.setItem('mess',str);
}
function readStorage(id){
    var target = document.getElementById(id);
    var msg = sessionStorage.getItem("mess");
    target.innerHTML = msg;
}
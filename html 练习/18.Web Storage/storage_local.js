/**
 * Created by leyiwo on 2016/4/9.
 */
if(window.localStorage){
    localStorage['Name'] = 'whatled';
    localStorage['Blog'] = 'http://www.whatled.com';
    localStorage['GitHub'] = 'https://www.github.com/sxyseo/'
    //读取
    console.log(localStorage.getItem('Name'));
    console.log(localStorage.getItem('Blog'));
    console.log(localStorage.getItem('GitHub'));
    //删除
    delete localStorage['Blog'];
    console.log(localStorage.getItem('Blog'));
    localStorage.removeItem('GitHub');
    console.log(localStorage.getItem('GitHub'));
    console.log(localStorage.getItem('Name'));
    //localStorage.clear();
}

function saveStorage(id){
    var target = document.getElementById(id);
    var str = target.value;
    localStorage.setItem('mess',str);
}
function readStorage(id){
    var target = document.getElementById(id);
    var msg = localStorage.getItem("mess");
    target.innerHTML = msg;
}
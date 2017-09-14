/**
 * Created by zou on 2017/9/13.
 */
function linearGradient() {
    if (!document.getElementById("slideBar")) return false;
    var s = document.getElementById("slideBar");
    s.oninput = function (i) {
        if (i != 1){
            NumberPeople(1);
        }
        var l = s.max - s.min;
        var value = s.value - s.min;
        var size = (value / l) * 100;
        size += "%";
        var css = "#slideBar::-webkit-slider-runnable-track{background: linear-gradient(270deg,#f9b852, #f9b852) no-repeat;background-size: "+size+" 100%;}";
       if (document.getElementsByTagName("style")[0]){
           var t = document.getElementsByTagName("style")[0];
         /*  t.innerText = css; //兼容性有问题*/
          t.lastChild.nodeValue = css;
       }else{
           var t = document.createElement("style");
         /*  t.innerText = css;*/
           var txt = document.createTextNode(css);
           t.appendChild(txt);
           document.body.appendChild(t)
       }
       assigningRoles();
    };
    var less = document.getElementById("less");
    var plus = document.getElementById("plus");
    less.onclick = function () {
        s.value -= 1;
        s.oninput();
    };
    plus.onclick = function () {
        s.value = parseInt(s.value) + 1;
        s.oninput();
    };
}
function NumberPeople(i) {
    if (!document.getElementById("np")) return false;
    if (!document.getElementById("slideBar")) return false;
    var np = document.getElementById("np");
    var s = document.getElementById("slideBar");
    var reg = new RegExp("^([4-9]|1[0-8])$");
    np.onblur = function () {
        if (!reg.test(np.value)){
            np.value = 4;
            s.value = np.value;
            s.oninput(1);
            alert("请输入4-18范围内的数字");
        }
    };
    if (i){
        np.value = s.value;
    }
    if (!i){
        np.oninput = function () {
            if (!np.value) {
                s.value = 4;
            }
            if (np.value){
                s.value = np.value;
            }
            s.oninput(1);
        }
    }
}
function assigningRoles() {
    if (!document.getElementById("np")) return false;
    if (!document.getElementById("ghost")) return false;
    if (!document.getElementById("person")) return false;
    var ghost = document.getElementById("ghost");
    var person = document.getElementById("person");
    var np = document.getElementById("np");
    var a = Math.ceil(np.value/3);
    var b = np.value - a;
    ghost.innerText = a;
    person.innerText = b;
}
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function'){
        window.onload = func;
    }else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
}
addLoadEvent(linearGradient);
addLoadEvent(NumberPeople);
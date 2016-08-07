/**
 * Created by Administrator on 2016/8/6 0006.
 */



/**
 * javscript tab
 * author:oksite
 * http://oksite.com.cn/
 * this event  onclick onmouseover
 */

window.onload = function() {

    tabsub('list_ul', 'content');

}

function tabsub(ida, idb) {

    var lis = document.getElementById(ida).getElementsByTagName('li');

    var divs = document.getElementById(idb).getElementsByTagName('div');

    if (lis.length != divs.length) {

        return;

    };

    for (var i = 0; i < lis.length; i++) {

        lis[i].id = i;

        lis[i].onmouseover = function() {

            for (var j = 0; j < lis.length; j++) {

                lis[j].className = '';

                divs[j].style.display = 'none';

            }
            this.className = 'action';

            divs[this.id].style.display = 'block';


        }
    }

}


console.log('gulp dewn ............')
/* div that follows mouse using javascript */
const div = document.getElementById('div');
document.onmousemove = function(e){
    div.style.left = e.x + 'px';
    div.style.top = e.y + 'px';
}


function consoleText(words, id, colors) {
    if (colors === undefined) colors = '#fff';
    var visible = true;
    var con = document.getElementById('console');
    var letterCount = 1;
    var x = 1;
    var waiting = false;
    var target = document.getElementById(id)
    target.setAttribute('style', 'color:' + colors)
    target.style.display = 'inline';
    window.setInterval(function() {
        if (letterCount >= 0 && letterCount <= words.length) {
            target.innerHTML = words.substring(0, letterCount)
            letterCount += x;
        }
    }, 300)

    window.setInterval(function() {
        if (visible === true) {
            con.className = 'console-underscore hidden'
            visible = false;
        } else {
            con.className = 'console-underscore'
            visible = true;
        }
    }, 600)
}

function regxpText() {
    let str = document.querySelector('.regexp').value;
    let regexpAllPoints = new RegExp('\'', 'gm');
    let regexpReturnApostroph = /\b\"\b/gm;
    let newstr = str.replace(regexpAllPoints, '"');
    newstr = newstr.replace(regexpReturnApostroph, '\'');
    document.querySelector('.regexp-out').value = newstr;
}
document.querySelector('.regexp').addEventListener("keyup", regxpText);

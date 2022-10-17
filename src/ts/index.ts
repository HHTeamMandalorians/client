import * as $ from 'jquery';
import fetch from 'node-fetch';
const host = '';
const port = '8080';
const candidates = await (await fetch(`http://${host}:${port}/api/v1/candidates`, {
  headers: {
    "Authorization": "5tr0ng & c0mpl1c4ted key c0de th4t n0 0ne w1ll bre4k"//"whateverStringYouWant (there's no true authorization yet, only simple header check)"
  }
})).json();
const sender = await (await fetch(`http://${host}:${port}/api/v1/candidates`, {
  vote: {
    "Authorization": "",
    "Post": ""
  }
function generateOptions(){
    let htmlValue = '';
    for(let i = 0; i < candidates.length(); i++){
        htmlValue = htmlValue + '<option value="' + i.toString() + '">' + candidates[i] + '</option>';
    }
    return htmlValue;
}
$(function(){
    $('#answer').html(generateOptions());
    $(document).on('submit', 'form.form' function(){
        let opt = $('#answer').attr('selected', true).html();
        // TODO send to database
    })
})

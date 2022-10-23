import * as $ from 'jquery';
import fetch from 'node-fetch';
const host = '';
const port = '8080';
const candidates = await (await fetch(`http://${host}:${port}/api/v1/candidates`, {
  headers: {
    "Authorization": ""//"whateverStringYouWant (there's no true authorization yet, only simple header check)"
  }
})).json();
const vote = await (await fetch(`http://${host}:${port}/api/v1/vote`, {
  headers: {
    vote: ""
  }
}))
function generateOptions(){
    let htmlValue = '';
    for(let i = 0; i < candidates.length(); i++){
        htmlValue = htmlValue + '<option value="' + i.toString() + '">' + candidates[i] + '</option>';
    }
    return htmlValue;
}
$(function(){
    let pass = $('#pass');
    $('#pass_sub').on('click', function(){
      candidates.authorization = pass.val();
    })
    $('#answer').html(generateOptions());
    $(document).on('submit', 'form.form', function(){
        let opt = $('#answer').attr('selected');
        vote.vote = opt;
    })
})

import * as $ from 'jquery';
function generateOptions(){
    let candidates = /api/v1/candidates;
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
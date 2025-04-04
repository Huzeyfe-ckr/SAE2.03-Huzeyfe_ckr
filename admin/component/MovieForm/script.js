let templateFile = await fetch('.component/MovieForm/template.html');
let template = await templateFile.text();


let MovieForm = {};

MovieForm.format = function(handler){
    let html = template;
    htlm = html.replace('{{handler}}', handler);
    return html;

}

export {MovieForm};
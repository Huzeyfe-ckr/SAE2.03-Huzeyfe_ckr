let templateFile = await fetch('./component/Footer/template.html');
let template = await templateFile.text();

let Footer = {};

Footer.format = function() {
    return template;
};

export { Footer };
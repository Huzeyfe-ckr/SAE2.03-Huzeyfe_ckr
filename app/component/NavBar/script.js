// let templateFile = await fetch("./component/NavBar/template.html");
// let template = await templateFile.text();

// let NavBar = {};

// NavBar.format = function (hHome, profiles, avatar) {
//   let html = template;
//   html = html.replace("{{hHome}}", hHome);
//   html = html.replace("{{profileOptions}}", NavBar.profilesOptions(profiles));
//   html = html.replace("{{imageURL}}", avatar);
  
//   return html;
// };

// NavBar.profilesOptions = function (profiles) {
//   let html = "";
//   if (profiles.length > 0) {
//       for (const obj of profiles) {
//           html += `<option value="${obj.id}">${obj.name}</option>`;
//       }
//   }
//   return html;
// }



// export { NavBar};
let templateFile = await fetch("./component/NavBar/template.html");
let template = await templateFile.text();

let NavBar = {};

NavBar.format = function (hHome, profiles) {
    let html = template;
    html = html.replace("{{hHome}}", hHome);
    html = html.replace("{{profileOptions}}", NavBar.profilesOptions(profiles));
    // Définir une image par défaut
    const defaultImage = "https://mmi.unilim.fr/~cakir4/SAE2.03-Huzeyfe_ckr/server/images/image-avatar.webp";
    html = html.replace("{{imageURL}}", defaultImage);
    
    return html;
};

NavBar.profilesOptions = function (profiles) {
    let html = "";
    if (profiles && profiles.length > 0) {
        // Ajouter une option par défaut
        html += '<option value="">Sélectionner un profil</option>';
        for (const obj of profiles) {
            // Ajouter l'attribut data-avatar pour chaque option
            html += `<option value="${obj.id}" data-avatar="${obj.avatar}">${obj.name}</option>`;
        }
    }
    return html;
}

export { NavBar };
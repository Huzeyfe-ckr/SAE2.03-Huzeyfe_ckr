// URL où se trouve le répertoire "server" sur mmi.unilim.fr
let HOST_URL = "https://mmi.unilim.fr/~cakir4/SAE2.03-Huzeyfe_ckr";

let DataProfil = {};

DataProfil.add = async function (fdata) {
  // console.log("DataProfil.add 1"); // Point de repère n°1
  let config = {
    method: "POST", // méthode HTTP à utiliser
    body: fdata, // données à envoyer sous forme d'objet FormData
  };

  let answer = await fetch(HOST_URL + "/server/script.php?todo=addProfil", config);

  let data = await answer.json();
  return data;
};

export { DataProfil };

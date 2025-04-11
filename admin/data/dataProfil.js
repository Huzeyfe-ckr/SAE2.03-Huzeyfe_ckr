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



DataProfil.addNewProfil = async function(formData) {
  try {
      formData.append('todo', 'addNewProfil'); // Ajout explicite du paramètre todo
      
      let config = {
          method: "POST",
          body: formData
      };
      
      let answer = await fetch(HOST_URL + "/server/script.php?todo=addNewProfil", config); // Correction du chemin
      
      if (!answer.ok) {
          throw new Error('Erreur serveur');
      }
      
      let text = await answer.text();
      return text;
      
  } catch (error) {
      console.error("Erreur:", error);
      return "Erreur lors de l'ajout du profil";
  }
};

export { DataProfil };

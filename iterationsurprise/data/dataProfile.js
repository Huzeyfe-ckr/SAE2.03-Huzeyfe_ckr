let HOST_URL = "https://mmi.unilim.fr/~cakir4/SAE2.03-Huzeyfe_ckr";

let DataProfile = {};

DataProfile.readProfile = async function () {
    let answer = await fetch(
      HOST_URL + "/server/script.php?todo=readProfiles" );
    let profile = await answer.json();
    return profile;
  };
  
  // DataProfile.requestMovies = async function () {
  //     let answer = await fetch(
  //       HOST_URL + "/server/script.php?todo=readMovies&age=7" );
  //     let profile = await answer.json();
  //     console.log(profile);
  //     return profile;
  //   };

  export { DataProfile };
let HOST_URL = "../~cakir4/SAE2.03-Huzeyfe_ckr";

let DataMovie = {};




DataMovie.request = async function(){
    let answer = await fetch(HOST_URL + "/server/script.?readmovies");
    let data = await answer.json();
    return data;
}



DataMovie.update = async function(fdata){
    let config = {
        method: "POST",
        body: fdata
    };
    let answer = await fetch(HOST_URL + "/server/script.php?todo=update", config);
    let data = await answer.json();
    return data;

}
export {DataMovie};
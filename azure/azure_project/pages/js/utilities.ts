let hikeName: string;

function selectPage(page: string): void{    
    $("#container").children(":not(."+page+")").hide();
    $("#container").children("."+page).show();
}

function showForm(page: string): void{
    selectPage(page);
    hikeName = document.getElementById("name").value;
    console.log("hike value:" + hikeName);
    //Here should go the first request to external APIs
    document.getElementById("name-form").innerHTML = hikeName;
}

function populateHikeData(page: string): void{
    selectPage(page);
    populateInfo("/app/info/hike/" + hikeName);
    //populateHikeInfo("/app/info/hike/" + hikeID);
    //populateHikeAgencies("/app/agencies/hike/" + hikeID);
    //populateGear("/app/gear/hike/" + hikeID);
    //populateItinerary("/app/itinerary/hike/" + filter);
}

function populateInfo(url: string){
    let request: XMLHttpRequest = new XMLHttpRequest();
    request.onreadystatechange = function(): void{
        if(request.readyState == 4 && request.status == 200){
            let returned: any = JSON.parse(request.responseText); //todo
            document.getElementById("hike-name").innerHTML = returned.name;
            document.getElementById("hike-name-info").innerHTML = returned.name;
            document.getElementById("description").innerHTML = returned.description;
            document.getElementById("difficulty").innerHTML = returned.difficulty;
            document.getElementById("location").innerHTML = returned.location;
        }
    }
    request.open("GET", url, true);
    request.send();
}
console.log("is this thing even working??");

var Airtable = require('airtable');
var base = new Airtable({apiKey: 'key7nJrEbX6qplCp0'}).base('appX0onJjpwGQibeA');
    console.log(Airtable);

base("paintings").select({}).eachPage(gotPageOfPaintings, gotAllPaintings);

// an empty array to hold our data
let collection = [];

// callback function that recieves our data
function gotPageOfPaintings(records, fetchNextPage) {
    console.log("gotPageOfPaintings()");
    collection.push(...records);
    fetchNextPage();
}

function fetchNextPage() {
    console.log("gotExtraData()");
    collection.push(...records);
}

// callback function that is called when all pages are loaded 
function gotAllPaintings(err) {
    console.log("gotAllPaintings()");

        //report an error, you'd want to do soemthing better than this is production
        if (err) {
            console.log("error loading data");
            console.error(err);
            return;
        }

        // call functions to log and show the books
        consoleLogPaintings();
        showPaintings();
}

// just loop through the data and console.log them
function consoleLogPaintings() {
    console.log("consoleLogPaintings()");
    //this is your empty array from earlier
    collection.forEach((painting) => {
        console.log("Painting:", painting);
    });
}

// look through our airtable data, create elements 
function showPaintings() {
    console.log("showPaintings()");
    //console.log(collection.length);

    collection.forEach((painting => {
        let container = document.createElement("div");
        container.classList.add("painting")

        // display the painting name
        var paintingTitle = document.createElement("span");
        paintingTitle.classList.add("paintingTitle");
        paintingTitle.innerText = painting.fields.title
        container.append(paintingTitle)
        
        // define the artist name 
        var artistName = painting.fields.artist;
        // replace spaces with underscores and add as a class to the container
        var artistClass = artistName.replace(" ", "_");
        container.classList.add(artistClass);
        container.append(artistName)
       
         // display the image
        var paintingImg = document.createElement("img");
        paintingImg.classList.add("paintingImg");
        paintingImg.src = painting.fields.image[0].url;
        paintingImg.style.display = "none";
        container.append(paintingImg);

        //display the written sources as links
        var writtenSource = document.createElement("a");
        writtenSource.classList.add("writing");
        writtenSource.src = painting.fields.image[0].url;
        container.append(writtenSource);

       //header buttons
        let showGlossary = document.querySelector("#glossary")
        let showGallery = document.querySelector("#gallery");
        let showResources = document.querySelector("#resources")

        //click on glossary to show painting titles
        showGlossary.addEventListener("click", function() {
            paintingTitle.style.display = "block";
            paintingImg.style.display = "none";
        })
        
        //click on gallery to show painting imgs
        showGallery.addEventListener("click", function() {
            paintingImg.style.display = "block";
            paintingTitle.style.display = "none";

        })

        //click on library to show written sources
        showResources.addEventListener("click", function() {
            writtenSource.style.display = "block";
            paintingTitle.style.display = "none";
            paintingImg.style.display = "none";

        })

        


        document.querySelector(".container").append(container)
    }));



   


}




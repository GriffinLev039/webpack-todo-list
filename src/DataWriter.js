// I need to figure out how I want to store the data.
// Probably going to start the program by
//  1. Check if any data is written
//  2. If not, write a template set of data for todo, load that data
//  3. If so, write the saved data
//Assuming I'll just use csv format for data
// name, "desc",date,{tag,tag,tag}, finished
// Name is a string, desc is a string, date will likely be a unix timestamp,
// each tag will be a string and finished will be a boolean
//Function to write data
//Function to read data
//Function to load data
//Function to wipe data
//That should be it!



document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('isWritten') != null) {
    } else {
        localStorage.setItem("isWritten", true);
        writeDefaults();
    }
});

function writeItem(name,item){
    localStorage.setItem(name,item.toCSV());
}

function writeDefaults(){
    
}

export {writeItem};
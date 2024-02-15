import {get} from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.6/croot.js";
import {setInner,addChild,hide } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.1.5/croot.js";
import {getHash,onHashChange} from "https://cdn.jsdelivr.net/gh/jscroot/url@0.0.9/croot.js";

const apiURL="https://api.github.com/repos/repoulbi/sk/contents/";
const urlPDFViewer = "https://repo.ulbi.ac.id/view/#";
const repoName = apiURL.split("/")[5];

onHashChange(runMain);

function runMain(){
    let url = apiURL+getHash();
    get(url,renderHTML);
}

function renderHTML(result){
    console.log(result);
    result.forEach(isiRow);
    hide("loading");
}

function isiRow(tree){
    if (tree.type === "dir"){
        addListDir("dirlist",tree.path);
    } else if ((tree.name.includes(".pdf")) && (tree.type==="file")){
        let url=urlPDFViewer+btoa("#/"+repoName+"/"+tree.path);
        addListFilePdf("dirlist",tree.name,url);
    }

}

function addListDir(idlist,dirname){
    // Create a new <div> element
    var newDiv = document.createElement('div');

    // Add a class to the new <div> element
    newDiv.className = 'list-item';

    // Create a new <li> element to be nested inside the <div>
    var newListItem = document.createElement('li');

    // Create a new <a> element
    var newLink = document.createElement('a');

    // Set the href attribute of the <a> element
    newLink.href = '#'+dirname; // Set the URL you want the link to point to

    // Set the text content of the <a> element
    newLink.textContent = "> "+dirname;

    // Append the <a> element to the <li> element
    newListItem.appendChild(newLink);

    // Append the new <li> element to the new <div>
    newDiv.appendChild(newListItem);

    // Get the parent <ul> element by its ID
    var ul = document.getElementById(idlist);

    // Append the new <div> element to the <ul>
    ul.appendChild(newDiv);
}

function addListFilePdf(idlist,dirname,url){
    // Create a new <div> element
    var newDiv = document.createElement('div');

    // Add a class to the new <div> element
    newDiv.className = 'list-item';

    // Create a new <li> element to be nested inside the <div>
    var newListItem = document.createElement('li');

    // Create a new <a> element
    var newLink = document.createElement('a');

    // Set the href attribute of the <a> element
    newLink.href = url; // Set the URL you want the link to point to

    // Set the text content of the <a> element
    newLink.textContent = dirname;

    // Append the <a> element to the <li> element
    newListItem.appendChild(newLink);

    // Append the new <li> element to the new <div>
    newDiv.appendChild(newListItem);

    // Get the parent <ul> element by its ID
    var ul = document.getElementById(idlist);

    // Append the new <div> element to the <ul>
    ul.appendChild(newDiv);
}

import {get} from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.6/croot.js";
import {setInner,addChild } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.1.5/croot.js";


get("https://api.github.com/repos/repoulbi/sk/git/trees/main",renderHTML);

function renderHTML(result){
    let lists=result.tree;
    console.log(lists);
    lists.forEach(isiRow);
}

function isiRow(tree){
    if (tree.type === "tree"){
        addListDir("dirlist",tree.path);
    }

}

function addListDir(idlist,dirname){
    // Create a new <div> element
    var newDiv = document.createElement('div');
    // Add a class to the new <div> element
    newDiv.className = 'list-item';
    // Create a new <li> element to be nested inside the <div>
    var newListItem = document.createElement('li');
    // Set the text content of the new <li> element
    newListItem.textContent = dirname;
    // Append the new <li> element to the new <div>
    newDiv.appendChild(newListItem);
    // Get the parent <ul> element by its ID
    var ul = document.getElementById(idlist);
    // Append the new <div> element to the <ul>
    ul.appendChild(newDiv);
}
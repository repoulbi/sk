import {get} from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.6/croot.js";
import {setInner,addChild,hide } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.1.5/croot.js";
import {getHash,onHashChange} from "https://cdn.jsdelivr.net/gh/jscroot/url@0.0.9/croot.js";
import {loading} from "https://cdn.jsdelivr.net/gh/jscroot/loading@0.0.1/croot.js";


const title = "Repositori Surat Keputusan";
const repoOrg = "repoulbi";
const urlPDFViewer = "https://repo.ulbi.ac.id/view/#";

const repoPathName = window.location.pathname;
const apiURL="https://api.github.com/repos/"+repoOrg+""+repoPathName+"contents/";
const idList = "dirlist";
const idCurrentDir = "currentdir";

document.title = title;
setInner("title",title);
onHashChange(runMain);
runMain();

function keyAPI(){
    let hashdata=getHash();
    let keyapi="root";
    if (hashdata===""){
        keyapi="topfolder";
    }else{
        keyapi=hashdata;
    }
    console.log("key:");
    console.log(keyapi);
    return keyapi;
}

function runMain(){
    setInner(idCurrentDir,"<a href='#'><box-icon name='folder-open' ></box-icon></a>");
    navDir();
    setInner(idList,loading);
    let jsonstorage=sessionStorage.getItem(keyAPI());
    if (jsonstorage){
        let contentfolder = JSON.parse(jsonstorage);
        contentfolder.forEach(isiRow);
        hide("loading");
    }else{
        let url = apiURL+getHash();
        get(url,renderHTML);
    }
    
}

function navDir(){
    let currentDirArray=getHash().split("/");
    currentDirArray = currentDirArray.filter(item => item);
    let text = "";
    for (let i = 0; i < currentDirArray.length; i++) {
        text += "/"+currentDirArray[i];
        const link = document.createElement('a');
        link.href = '#'+text;
        link.textContent = "/"+currentDirArray[i];
        document.getElementById(idCurrentDir).appendChild(link);
    }

}

function renderHTML(result){
    console.log(result);
    if (("message" in result)&&("documentation_url" in result)){
        Swal.fire({
            icon: "error",
            title: "Terdeteksi Spam",
            text: "Mohon tunggu 1 jam lagi untuk mengakses, atau ganti koneksi internet anda."
          });
    }else{
        sessionStorage.setItem(keyAPI(), JSON.stringify(result));
        result.forEach(isiRow);
        hide("loading");
    }
    
}

function isiRow(tree){
    if (tree.type === "dir"){
        addListDir(idList,tree.path);
    } else if ((tree.name.includes(".pdf")) && (tree.type==="file")){
        let url=urlPDFViewer+btoa("#"+repoPathName+""+tree.path);
        addListFilePdf(idList,tree.name,url);
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

    // Create a new <box-icon> element
    var boxIcon = document.createElement('box-icon');
    boxIcon.setAttribute('name', 'folder'); // Set the box-icon name attribute

    // Set the href attribute of the <a> element
    newLink.href = '#/'+dirname; // Set the URL you want the link to point to

    // Append the <box-icon> element to the <a> element
    newLink.appendChild(boxIcon);

    // Append the text content (directory name) to the <a> element
    newLink.appendChild(document.createTextNode(' ' + dirname.split("/").pop()));

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

    // Create a new <box-icon> element
    var boxIcon = document.createElement('box-icon');
    boxIcon.setAttribute('name', 'file'); // Set the box-icon name attribute

    // Set the href attribute of the <a> element
    newLink.href = url; // Set the URL you want the link to point to

    // Set the target attribute to "_blank" to open in a new tab
    newLink.target = '_blank';

    // Append the <box-icon> element to the <a> element
    newLink.appendChild(boxIcon);

    // Append the text content (directory name) to the <a> element
    newLink.appendChild(document.createTextNode(' ' + dirname));

    // Append the <a> element to the <li> element
    newListItem.appendChild(newLink);

    // Append the new <li> element to the new <div>
    newDiv.appendChild(newListItem);

    // Get the parent <ul> element by its ID
    var ul = document.getElementById(idlist);

    // Append the new <div> element to the <ul>
    ul.appendChild(newDiv);
}
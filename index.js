import {get} from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.6/croot.js";
import {setInner,addChild,hide } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.1.5/croot.js";
import {getHash,onHashChange} from "https://cdn.jsdelivr.net/gh/jscroot/url@0.0.9/croot.js";

const repoOrg = "repoulbi";
const urlPDFViewer = "https://repo.ulbi.ac.id/view/#";

const repoPathName = window.location.pathname;
const apiURL="https://api.github.com/repos/"+repoOrg+""+repoPathName+"contents/";
const idList = "dirlist";

onHashChange(runMain);
runMain();

function runMain(){
    setInner(idList,loading);
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


const loading=`
<svg id="loading" class="lds-microsoft" width="80px"  height="80px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><g transform="rotate(0)"><circle cx="81.73413361164941" cy="74.35045716034882" fill="#e15b64" r="5" transform="rotate(340.001 49.9999 50)">
	<animateTransform attributeName="transform" type="rotate" calcMode="spline" values="0 50 50;360 50 50" times="0;1" keySplines="0.5 0 0.5 1" repeatCount="indefinite" dur="1.5s" begin="0s"></animateTransform>
  </circle><circle cx="74.35045716034882" cy="81.73413361164941" fill="#f47e60" r="5" transform="rotate(348.352 50.0001 50.0001)">
	<animateTransform attributeName="transform" type="rotate" calcMode="spline" values="0 50 50;360 50 50" times="0;1" keySplines="0.5 0 0.5 1" repeatCount="indefinite" dur="1.5s" begin="-0.0625s"></animateTransform>
  </circle><circle cx="65.3073372946036" cy="86.95518130045147" fill="#f8b26a" r="5" transform="rotate(354.236 50 50)">
	<animateTransform attributeName="transform" type="rotate" calcMode="spline" values="0 50 50;360 50 50" times="0;1" keySplines="0.5 0 0.5 1" repeatCount="indefinite" dur="1.5s" begin="-0.125s"></animateTransform>
  </circle><circle cx="55.22104768880207" cy="89.65779445495241" fill="#abbd81" r="5" transform="rotate(357.958 50.0002 50.0002)">
	<animateTransform attributeName="transform" type="rotate" calcMode="spline" values="0 50 50;360 50 50" times="0;1" keySplines="0.5 0 0.5 1" repeatCount="indefinite" dur="1.5s" begin="-0.1875s"></animateTransform>
  </circle><circle cx="44.77895231119793" cy="89.65779445495241" fill="#849b87" r="5" transform="rotate(359.76 50.0064 50.0064)">
	<animateTransform attributeName="transform" type="rotate" calcMode="spline" values="0 50 50;360 50 50" times="0;1" keySplines="0.5 0 0.5 1" repeatCount="indefinite" dur="1.5s" begin="-0.25s"></animateTransform>
  </circle><circle cx="34.692662705396415" cy="86.95518130045147" fill="#e15b64" r="5" transform="rotate(0.183552 50 50)">
	<animateTransform attributeName="transform" type="rotate" calcMode="spline" values="0 50 50;360 50 50" times="0;1" keySplines="0.5 0 0.5 1" repeatCount="indefinite" dur="1.5s" begin="-0.3125s"></animateTransform>
  </circle><circle cx="25.649542839651176" cy="81.73413361164941" fill="#f47e60" r="5" transform="rotate(1.86457 50 50)">
	<animateTransform attributeName="transform" type="rotate" calcMode="spline" values="0 50 50;360 50 50" times="0;1" keySplines="0.5 0 0.5 1" repeatCount="indefinite" dur="1.5s" begin="-0.375s"></animateTransform>
  </circle><circle cx="18.2658663883506" cy="74.35045716034884" fill="#f8b26a" r="5" transform="rotate(5.45126 50 50)">
	<animateTransform attributeName="transform" type="rotate" calcMode="spline" values="0 50 50;360 50 50" times="0;1" keySplines="0.5 0 0.5 1" repeatCount="indefinite" dur="1.5s" begin="-0.4375s"></animateTransform>
  </circle><animateTransform attributeName="transform" type="rotate" calcMode="spline" values="0 50 50;0 50 50" times="0;1" keySplines="0.5 0 0.5 1" repeatCount="indefinite" dur="1.5s"></animateTransform></g></svg>
`
let inputBtn = document.querySelector(".input-btn");
let inputEl = document.querySelector(".input-el");
let ulEl = document.querySelector(".ul-el");
let delBtn = document.querySelector(".delete-el");
const savBtn = document.querySelector(".save-el");
let myLead = [];
let oldLead = [];


const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
    myLead = leadsFromLocalStorage;
    render(myLead);
}


savBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLead.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLead));
        render(myLead);
    })

})

function render(leads) {
    let listsItems = "";

    for (let i = 0; i < leads.length; i++) {
        listsItems += `
        <li>
             <a target='_blank' href='${leads[i]}'>
             ${leads[i]}
             </a>
        </li>`;
    }
    ulEl.innerHTML = listsItems;
}

delBtn.addEventListener("dblclick", function () {
    localStorage.clear();
    myLead = []
    render(myLead);//as mylead is empty
})


inputBtn.addEventListener("click", function () {
    myLead.push(inputEl.value);
    inputEl.value = " ";
    localStorage.setItem("myLeads", JSON.stringify(myLead));
    render(myLead);
})


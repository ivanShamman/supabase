"use strict"

window.addEventListener("load",windowLoad);

function windowLoad() {

    const htmlBlock = document.documentElement;
    const saveUserTheme = localStorage.getItem("user-theme");
    const switchInput = document.querySelector(".footer__bottom-select-theme-checker")
    const darkLogo = document.querySelectorAll(".dark-logo");
    const lightLogo = document.querySelectorAll(".light-logo");
    let userTheme;

    function changeStartHtml(){
        if(saveUserTheme === "light"){
            switchInput.checked = false;
            lightLogo[0].hidden = false;
            lightLogo[1].hidden = false;
            darkLogo[0].hidden = true;
            darkLogo[1].hidden = true;
        }
        else if(saveUserTheme === "dark"){
            switchInput.checked = true;
            lightLogo[0].hidden = true;
            lightLogo[1].hidden = true;
            darkLogo[0].hidden = false;
            darkLogo[1].hidden = false;
        }
    }

    changeStartHtml();

    if(window.matchMedia){
        userTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark":"light";
    }
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener("change", e =>{
        !saveUserTheme ? changeTheme(): null;
    });

    switchInput.addEventListener("click",function () {
       changeTheme(true);
    });

    function setThemeClass(){
        if(saveUserTheme){
            htmlBlock.classList.add(saveUserTheme);
        }
        else{
            htmlBlock.classList.add(userTheme);
        }
    }
    setThemeClass();

    function changeTheme(saveTheme = false){
        let currentTheme = htmlBlock.classList.contains("light") ? "light":"dark";
        let newTheme;
        if(currentTheme === "light"){
            newTheme = "dark";
            lightLogo[0].hidden = true;
            lightLogo[1].hidden = true;
            darkLogo[0].hidden = false;
            darkLogo[1].hidden = false;
        }
        else if(currentTheme === "dark"){
            newTheme = "light";
            lightLogo[0].hidden = false;
            lightLogo[1].hidden = false;
            darkLogo[0].hidden = true;
            darkLogo[1].hidden = true;
        }
        htmlBlock.classList.remove(currentTheme);
        htmlBlock.classList.add(newTheme);
        saveTheme ? localStorage.setItem("user-theme",newTheme):null;
    }
}


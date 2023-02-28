const buttonList = document.getElementsByClassName("nav_button");

function selectAlgorithm(alg, button) {
    selectedAlgorithm = alg;
    selectionMode = 1;

    buttonList.forEach((button, index) => {
        if (selectedAlgorithm === index) {
            button.classList.add("selected");
        } else {
            button.classList.remove("selected");
        }
    });
}

buttonList.forEach((button, index) => {
    button.addEventListener("click", () => {
        selectAlgorithm(index, button);
    });
});

let submitButton = document.getElementById("launchSubmit");
let passwordField = document.getElementById("launchPassword");

let checkboxes = document.querySelectorAll('input[type="checkbox"]');
let sliders = document.querySelectorAll('input[type="range"]')
let launchButton = document.getElementsByClassName("launchButton")[0];

let allCheckBoxesSelected = false;
let allSlidersAtMax = false;

for (checkbox of checkboxes) {
    checkbox.onchange = processCheckboxChange;
}

for (slider of sliders) {
    slider.onchange = processSliderChange;
}

launchButton.onclick = launchTheRocket;

// As page loads:
// disable all items in check-buttons div
// disable all items in levers div
// disable launch button
disableControls(true);

submitButton.addEventListener("click", function () {
   if (checkPassword(passwordField.value)) {
       disableControls(false);
   } else {
       disableControls(true);
   }
});

function checkPassword(password) {
    // The super secret password ... SSSHHHHH
    return password === "TrustNo1";
}

function disableControls(state) {
    let controls = document.getElementsByTagName("input");

    for (control of controls) {
        control.disabled = state;
    }

    passwordField.disabled = !state;
    submitButton.disabled = !state;
    launchButton.disabled = true;
}

function processCheckboxChange(event) {
    let countOfCheckedBoxes = 0;

    for (cb of checkboxes) {
        if ( cb.checked ) {
            countOfCheckedBoxes++;
        }
    }

    allCheckBoxesSelected = countOfCheckedBoxes === checkboxes.length;
    testIfReadyForLaunch();
}

function processSliderChange() {
    let countOfSlidersAtMax = 0;

    for (slider of sliders) {
        if (slider.value === "100") {
            countOfSlidersAtMax++;
        }
    }

    allSlidersAtMax = countOfSlidersAtMax === sliders.length;

    testIfReadyForLaunch()
}

function testIfReadyForLaunch() {
    launchButton.disabled = !(allCheckBoxesSelected &&
        allSlidersAtMax);
}

var id = null;

function launchTheRocket() {
    // console.log("BOOOM! We have liftoff");
    let theRocket = document.getElementsByClassName("rocket")[0];
    let computedStyle = getComputedStyle(theRocket);

    let startX = computedStyle.getPropertyValue("left");
    let startY = computedStyle.getPropertyValue("bottom");

    startX = parseInt(startX);
    startY = parseInt(startY);

    clearInterval(id);
    id = setInterval(frame, 10);
    function frame() {
        if (startX > window.innerWidth && startY > window.innerHeight) {
            clearInterval(id);
        } else {
            theRocket.style.bottom = ++startY + 'px';
            theRocket.style.left = ++startX + 'px';
        }
    }
}
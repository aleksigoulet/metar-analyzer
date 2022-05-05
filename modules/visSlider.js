const slider = document.getElementById('visValue');
const output = document.getElementById('visOutput');

//display default value
output.innerHTML = slider.value;

//update slider when moved
slider.oninput = function() {
    output.innerHTML = this.value;
}
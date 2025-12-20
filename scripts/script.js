function selectCustom() {
    let customHtml = `<div class="custom-dropdown">
  <div class="dropdown-selected">Select a city</div>
  <ul class="dropdown-list hidden">
    <li>Algiers</li>
    <li>Oran</li>
    <li>Constantine</li>
    <li>Annaba</li>
    <li>Batna</li>
    <li>Blida</li>
    <li>Sétif</li>
    <li>Chlef</li>
    <li>Biskra</li>
    <li>Tébessa</li>
    <li>Tlemcen</li>
    <li>Ouargla</li>
    <li>Béjaïa</li>
    <li>Bechar</li>
    <li>Djelfa</li>
    <li>Sidi Bel Abbès</li>
    <li>Bordj Bou Arréridj</li>
    <li>Mostaganem</li>
    <li>Msila</li>
    <li>Tiaret</li>
  </ul>
</div>`
return customHtml;
}

const selectContainer = document.getElementById('select-container');

selectContainer.innerHTML = selectCustom();

document.querySelector('.dropdown-selected').addEventListener('click', function() {
  const dropdownList = this.nextElementSibling;
  dropdownList.classList.toggle('hidden');
});

document.querySelectorAll('.dropdown-list li').forEach(function(item) {
  item.addEventListener('click', function() {
    const selectedText = this.textContent;
    const selectedItem = document.querySelector('.dropdown-selected');
    selectedItem.textContent = selectedText;
    selectedItem.style.backgroundColor = '#212529';
    selectedItem.style.color = '#F8F9FA';
    this.parentElement.classList.add('hidden'); 
  });
});

// Close the dropdown if clicked outside
document.addEventListener('click', function(event) {
  const dropdown = document.querySelector('.custom-dropdown');
  if (!dropdown.contains(event.target)) {
    dropdown.querySelector('.dropdown-list').classList.add('hidden');
  }
});

// form validation

// helper fun to validate an input field

function validateInput(inputId, hintId, regex, Errorhint, successHint){
  const inputElement = document.getElementById(inputId);
  const hintElement = document.getElementById(hintId);
  const isValid = regex.test(inputElement.value) && inputElement.value !== '';
   if (isValid) {
    //valid state
    hintElement.textContent = successHint; 
    hintElement.classList.remove('is-invalid');
    hintElement.classList.add('is-valid');
    inputElement.style.borderColor = 'green';
  } else {
    //invalid state
    hintElement.textContent = Errorhint;
    hintElement.classList.remove('is-valid');
    hintElement.classList.add('is-invalid');
    inputElement.style.borderColor = '#a52a2a';
  }
return isValid;
}

function formValidation(e) {
  e.preventDefault();
  let isValid = true;
  // name

   const nameRegex = /^[a-zA-Z\xC0-\uFFFF]+([ \-'][a-zA-Z\xC0-\uFFFF]+)*$/;

   if (!validateInput('name', 'name-hint', nameRegex, 'Enter a valid name', 'Your name is valid')) {
    isValid = false;
  }

  // phone
  const phoneRegex =  /^(00213|\+213|0)(5|6|7)[0-9]{8}$/;

  if (!validateInput('phone', 'phone-hint', phoneRegex, 'Enter a valid phone number', 'Your phone number is valid')) {
    isValid = false;
  }

  // checkbox

  const checkboxes = document.querySelectorAll('input[name="Service"]');
  let isChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
  const hintCheckbox = document.getElementById('service-hint');

  if(!isChecked){
    hintCheckbox.textContent = 'Select at least one service.'
    hintCheckbox.style.color = '#a52a2a';
   isValid =  false;
  }else{
   isValid = true;
   hintCheckbox.textContent = '';
  }

  // dropDwon

  const selectedDropdown = document.querySelector('.dropdown-selected');
  const hintSelect = document.getElementById('city-hint');

  if(selectedDropdown.textContent === 'Select a city' ){
    isValid = false;
    hintSelect.textContent = 'Select a city'
    hintSelect.style.color = '#a52a2a';
    selectedDropdown.style.borderColor = '#a52a2a'; 

  }else{
    isValid = true
     hintSelect.textContent = ` you selected ${selectedDropdown.textContent}`
    hintSelect.style.color = 'green';
    selectedDropdown.style.borderColor = 'green'; 
  }

  const messageRegex = /^[a-zA-Z0-9\s]+$/ ;

   if (!validateInput('message', 'message-hint', messageRegex, 'Invalid characters in text', 'Valid comment')) {
    isValid = false;
  }


  // days radio button

  const daysRadios = document.getElementsByName('day');
  const hintRadios = document.getElementById('day-hint');
  
 

  let radioIsChecked = Array.from(daysRadios).some(radio => radio.checked);

  if(!radioIsChecked) {
    isValid = false;
    hintRadios.textContent = 'pick a day';
    hintRadios.style.color = '#a52a2a';

  }else{
    
    isValid = true;
    hintRadios.textContent = '';
 

  }

  // times radio buttons 

  const timesRadios = document.getElementsByName('time');

  let timeRadioIsChecked = Array.from(timesRadios).some(radio => radio.checked);

  if(!timeRadioIsChecked){
    isValid = false;
  }else{
    isValid = true;

  }

return isValid;
}




form.addEventListener('submit', (e) =>{
  if(formValidation(e)){
    alert('your form submitted successfully');
     if(form){
      form.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });}
  }else{
    if(form){
      form.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

 
})
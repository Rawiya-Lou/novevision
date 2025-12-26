let url = 'https://script.google.com/macros/s/AKfycbydLF6M0UdWazwjrOZa2pw3MNf9H2bSg8FjVty-1MewMBNHwgD9qbuweLJsvPZzzSwl/exec'

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
   
     let selectData = document.getElementById('city-data');
    if (!selectData) {
      selectData = createHiddenInput();
      selectData.id = 'city-data';
      selectData.name = 'city';
      
      document.getElementById('form').appendChild(selectData);
    }
      selectData.value = selectedText;
  
  });
});

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
// Real-time listeners for immediate green/red feedback
const fields = [
  { id: 'name', hint: 'name-hint', regex: /^[a-zA-Z\xC0-\uFFFF]+([ \-'][a-zA-Z\xC0-\uFFFF]+)*$/, error: 'Enter a valid name', success: 'Name is valid' },
  { id: 'phone', hint: 'phone-hint', regex: /^(05|06|07)\d{8}$/, error: 'Enter 10-digit mobile', success: 'Phone is valid' },
  { id: 'message', hint: 'message-hint', regex: /^[a-zA-Z0-9\s.,!?]+$/, error: 'Invalid characters', success: 'Valid' }
];

fields.forEach(field => {
  const el = document.getElementById(field.id);
  if (el) {
    el.addEventListener('input', () => {
      validateInput(field.id, field.hint, field.regex, field.error, field.success);
    });
  }
});

function formValidation(e) {
  e.preventDefault();
  let isValid = true;

  // 1. Name Validation
  const nameRegex = /^[a-zA-Z\xC0-\uFFFF]+([ \-'][a-zA-Z\xC0-\uFFFF]+)*$/;
  if (!validateInput('name', 'name-hint', nameRegex, 'Enter a valid name', 'Your name is valid')) {
    isValid = false;
  }

  // 2. Phone Validation (Updated for 10-digit mobile)
  const phoneRegex = /^(05|06|07)\d{8}$/; 
  if (!validateInput('phone', 'phone-hint', phoneRegex, 'Enter 10-digit mobile number', 'Valid')) {
    isValid = false;
  }

  // 3. Checkbox Validation
  const checkboxes = document.querySelectorAll('input[name="service"]:checked');
  const hintCheckbox = document.getElementById('service-hint');
  if (checkboxes.length === 0) {
    hintCheckbox.textContent = 'Select at least one service.';
    hintCheckbox.style.color = '#a52a2a';
    isValid = false; 
  } else {
    hintCheckbox.textContent = '';
  }

  // 4. Dropdown Validation
  const selectedDropdown = document.querySelector('.dropdown-selected');
  const hintSelect = document.getElementById('city-hint');
  if (selectedDropdown.textContent === 'Select a city') {
    isValid = false;
    hintSelect.textContent = 'Select a city';
    hintSelect.style.color = '#a52a2a';
    selectedDropdown.style.borderColor = '#a52a2a';
  } else {
    hintSelect.textContent = `You selected ${selectedDropdown.textContent}`;
    hintSelect.style.color = 'green';
    selectedDropdown.style.borderColor = 'green';
  }

  // 5. Message Validation
  const messageRegex = /^[a-zA-Z0-9\s.,!?]+$/;
  if (!validateInput('message', 'message-hint', messageRegex, 'Invalid characters', 'Valid')) {
    isValid = false;
  }

  // 6. Radio Buttons (Days)
  const daysRadios = document.getElementsByName('day');
  const hintRadios = document.getElementById('day-hint');
  if (!Array.from(daysRadios).some(radio => radio.checked)) {
    isValid = false;
    hintRadios.style.color = '#a52a2a';
    hintRadios.textContent = 'Please select a day';
  }

  return isValid;
}

function resetVisuals() {
  // Reset borders
  const inputs = ['name', 'phone', 'message'];
  inputs.forEach(id => {
    document.getElementById(id).style.borderColor = '';
  });

  // Reset hints
  const hints = ['name-hint', 'phone-hint', 'service-hint', 'city-hint', 'message-hint', 'day-hint'];
  hints.forEach(id => {
    const hint = document.getElementById(id);
    if (hint) {
      hint.textContent = '';
      hint.classList.remove('is-valid', 'is-invalid');
    }
  });

  // Reset Custom Dropdown
  const selectedItem = document.querySelector('.dropdown-selected');
  selectedItem.textContent = 'Select a city';
  selectedItem.style.backgroundColor = '';
  selectedItem.style.color = '';
  selectedItem.style.borderColor = '';
}


const submitBtn = document.getElementById('submit-form-btn');
form.addEventListener('submit', async (e) => {
  e.preventDefault(); 
  
  if (formValidation(e)) {
    const formData = new FormData(form);
    const submitBtnText = submitBtn.innerText;
    
    try {
      submitBtn.disabled = true;
      submitBtn.innerText = "Sending...";
      submitBtn.style.opacity = '0.5';
      submitBtn.style.cursor='not-allowed';
      // Send data first
      await fetch(url, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });

      alert('Your form submitted successfully');
      
      // Complete Reset
      form.reset();
      resetVisuals();
      
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
      console.error('Error:', error);
      alert('There was an error sending your data.');

    } finally{
      submitBtn.disabled = false;
      submitBtn.innerText = submitBtnText;
      submitBtn.style.opacity = '1';
      submitBtn.style.cursor = 'pointer';
    }
  } else {
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

// showing the whatsup icon only when scrolling down 
window.onscroll = function() {
  const btn = document.querySelector('.whatsapp-float');
  if (document.documentElement.scrollTop > 300) {
    btn.style.display = "flex";
  } else {
    btn.style.display = "none";
  }
};

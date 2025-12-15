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
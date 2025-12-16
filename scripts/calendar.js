const calendarContainer = document.getElementById('js-calendar-container');
const dateContainer = document.getElementById('js-date-container');
const timeContainer = document.getElementById('js-time-container');

const monthElem = document.getElementById('js-month');

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const date = new Date();

function getCurrentMonth() {
    let month ='';
    let monthDigit = '';
    const currentMonth = date.getMonth();
    for(let i = 0; i< months.length; i++){
         month = months[currentMonth];
         monthDigit = currentMonth + 1;
    }
    return {month, monthDigit};
}

function createHiddenInput(){
    const hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', "hidden");
    return hiddenInput;
}
function createDivElem() {
    return document.createElement('div');
}


function createMonthElem(month){

    monthElem.textContent = month.month;
    const input = createHiddenInput();
    input.setAttribute('name', "Month");
    input.setAttribute('id', "monthData");
   input.value = month.monthDigit;
  return;
}

createMonthElem(getCurrentMonth());

function getNextSevenDays() {
    const today = new Date();
    const daysArray = [];

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    for (let i = 0; i < 7; i++) {
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + i);
        const dayOfWeek = daysOfWeek[nextDay.getDay()];
        const dayOfMonth = nextDay.getDate();
        const formattedDay = `${dayOfWeek} ${dayOfMonth}`;
        daysArray.push(formattedDay);
    }

    return daysArray;
}

function createRadioBtn(){
   const radioBtn = document.createElement('input');
   radioBtn.type = 'radio';
   radioBtn.classList.add('day-radio-btn');
   return radioBtn;

}
console.log(createRadioBtn())

function displayDays() {
    const days = getNextSevenDays();
    const daysContainer = document.getElementById("js-days");
    daysContainer.innerHTML = ""; // Clear previous content

    days.forEach(day => {
        const dayString = day;
        const parts = dayString.split(' ');
        const dayText = parts[0];
        const dayDigit = parts[1];


        // day container
         const dayContainer = createDivElem();
        dayContainer.setAttribute('id', "dayContainer");
        dayContainer.classList.add("day-btn-container");

        // Create the day digit element
        const dayRadioElement = createRadioBtn();
        dayRadioElement.classList.add("day-digit-radio");
        dayRadioElement.id = `day${dayText}`;
        dayRadioElement.name = 'day';
        dayRadioElement.value = day;

         const dayDigitElement = document.createElement('p');
        dayDigitElement.classList.add("day-digit");

        dayDigitElement.textContent = dayDigit;


    
        // Create the day text element
        const dayTextElement = document.createElement('label');
        dayTextElement.classList.add("day-text");
        dayTextElement.htmlFor = `day${dayText}`;

        dayTextElement.textContent = `${dayText}`;


        // Append the day text and digit elements to the day container
       dayContainer.append(dayRadioElement, dayDigitElement, dayTextElement);
     
        // Append the day container to the main container
        daysContainer.appendChild(dayContainer);
        
        
        dayRadioElement.addEventListener('change', () =>{

            document.querySelectorAll('label').forEach(label => {
        label.style.color = '#6C757D';
    });

            const dayTextElement = document.querySelector(`label[for="${dayRadioElement.id}"]`);
            if(dayTextElement){
                dayTextElement.style.color = '#212529';

            }
    
            const input = createHiddenInput();
            input.setAttribute('name', "Date");
            input.setAttribute('id', "dateData");
           input.value = dayDigit;
           console.log(input)
           daysContainer.appendChild(input)
        
            });
    });
    
    
}
 displayDays();

 //time slots 
function generateWorkHours() {
  const workHours = [];
  const startHour = 8; // 8:00 AM
  const endHour = 18; // 6:00 PM (24-hour format)
  const breakStartHour = 12; // 12:00 PM
  const breakStartMinute = 0;
  const breakEndHour = 12; // 12:30 PM
  const breakEndMinute = 30;

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) { // Increment by 30 minutes for half-hour intervals
      // Format the time string (e.g., "08:00", "13:30")
      const formattedHour = String(hour).padStart(2, '0');
      const formattedMinute = String(minute).padStart(2, '0');
      const currentTime = `${formattedHour}:${formattedMinute}`;
     

      // Check if the current time falls within the break period
      const isDuringBreak =
        (hour === breakStartHour && minute >= breakStartMinute && hour <= breakEndHour && minute < breakEndMinute) ||
        (hour > breakStartHour && hour < breakEndHour) ||
        (hour === breakEndHour && minute < breakEndMinute);

      if (!isDuringBreak) {
        workHours.push(currentTime);
      }
    }
  }
  return workHours;
}

function displayTimeSlots() {
    
    const workTimes = generateWorkHours();
    const timeElem = createDivElem();
    timeElem.classList.add('time');
    workTimes.forEach(time => {

        const timeBtn = document.createElement('button');
        timeBtn.classList.add('hour');

        timeBtn.textContent = time;


        timeElem.appendChild(timeBtn)
        timeContainer.appendChild(timeElem);

    timeElem.addEventListener('click', () =>{
      const input = createHiddenInput();
            
        input.setAttribute('name', "Time");
        input.setAttribute('id', "TimeData");
        input.value = time ;
     });
    });

}

displayTimeSlots()

const form =document.getElementById('form');

form.addEventListener('submit', e =>{
    e.preventDefault();
    displayDays()
})

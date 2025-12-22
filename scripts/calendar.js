const calendarContainer = document.getElementById('js-calendar-container');
const dateContainer = document.getElementById('js-date-container');
const timeContainer = document.getElementById('js-time-container');

const monthElem = document.getElementById('js-month');

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

let allBookings = [];

async function preloadBookings() {
    
    try {
        const response = await fetch(`${url}?action=getBookings`);
        allBookings = await response.json(); // Data is now preloaded
        console.log("Data preloaded successfully", allBookings);
        updateAvailability()
        displayDays(); 
    } catch (error) {
        console.error("Failed to preload:", error);
    }
}
preloadBookings();


const date = new Date();
const currentYear = date.getFullYear();

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
    input.setAttribute('name', "month");
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
   return radioBtn;

}

function displayDays() {
    const days = getNextSevenDays();
    const daysContainer = document.getElementById("js-days");
    daysContainer.innerHTML = ""; 

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
        dayRadioElement.classList.add('day-radio-btn');
        dayRadioElement.id = `day${dayText}`;
        dayRadioElement.name = 'day';
        dayRadioElement.value = day;

         const dayDigitElement = document.createElement('p');
        dayDigitElement.classList.add("day-digit");

        dayDigitElement.textContent = dayDigit;

        const dayTextElement = document.createElement('label');
        dayTextElement.classList.add("day-text");
        dayTextElement.htmlFor = `day${dayText}`;

        dayTextElement.textContent = `${dayText}`;

       dayContainer.append(dayRadioElement, dayDigitElement, dayTextElement);
     
        daysContainer.appendChild(dayContainer);
        
        
        dayRadioElement.addEventListener('change', () =>{
          const dayLabel = document.querySelectorAll('.day-text');
          
          dayLabel.forEach(label => {
            label.style.color = '#6C757D';
          });
          
          const dayTextElement = document.querySelector(`label[for="${dayRadioElement.id}"]`);
          if(dayTextElement){
            dayTextElement.style.color = '#212529';
            
          }
           timeContainer.innerHTML = "";

    const timeSlotsElement = displayTimeSlots();
  
    timeContainer.appendChild(timeSlotsElement);
    updateAvailability();

 let existingInput = document.getElementById("day-data");
    if(existingInput) existingInput.remove();
    
            const input = createHiddenInput();
            input.setAttribute('name', "date");
            input.setAttribute('id', "day-data");
           input.value =` ${getCurrentMonth().month}-${dayDigit}-${currentYear}`;
           daysContainer.appendChild(input);
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


let lastClickedBtn = null;
function displayTimeSlots() {
    
    const workTimes = generateWorkHours();
    const timeElem = createDivElem();
    timeElem.classList.add('time');

    
    workTimes.forEach(time => {
        
        const timeRadio = createRadioBtn();
        timeRadio.id = `time-${time}`;
        timeRadio.classList.add('time-radio-btn');
        timeRadio.name = 'time';
        timeRadio.value = time;
        const timeLabel = document.createElement('label');
        timeLabel.classList.add('hour');
        timeLabel.htmlFor = `time-${time}`;
        timeLabel.textContent = time;


        timeElem.append(timeRadio, timeLabel);

      
      timeRadio.addEventListener('change', () => {
    const allLabels = document.querySelectorAll('.hour');
    
    allLabels.forEach(label => {
        const linkedInput = document.getElementById(label.htmlFor);
        if (linkedInput && !linkedInput.disabled) {
            label.style.backgroundColor = '#6C757D';
        }
    });

    const timeLabelElem = document.querySelector(`label[for="${timeRadio.id}"]`);
    if (timeLabelElem && !timeRadio.disabled) {
        timeLabelElem.style.backgroundColor = '#212529';
    }
});

    });
return timeElem;
}

displayTimeSlots()


const form = document.getElementById('form');

const workingHours = generateWorkHours();

function updateAvailability() {
    const selectedDayRadio = document.querySelector('input[name="day"]:checked');
    if (!selectedDayRadio || allBookings.length === 0) return;

    const parts = selectedDayRadio.value.split(' '); 
    const dayDigit = parts[1];

    const formattedDate = `${getCurrentMonth().month}-${dayDigit}-${currentYear}`.trim().toLowerCase();
    const totalPossibleSlots = generateWorkHours().length;
    const bookedHoursForDay = allBookings
        .filter(b => b.date.trim().toLowerCase() === formattedDate)
        .map(b => b.time.trim().toLowerCase());

    const timeRadios = document.querySelectorAll('input[name="time"]');

      if (bookedHoursForDay.length >= totalPossibleSlots) {
        selectedDayRadio.disabled = true;
        const dayLabel = document.querySelector(`label[for="${selectedDayRadio.id}"]`);
        if (dayLabel) {
            dayLabel.style.color = '#6C757D';
            dayLabel.style.textDecoration = 'line-through';
            dayLabel.style.cursor = 'not-allowed';
        }
    }
    
    timeRadios.forEach(radio => {
        const label = document.querySelector(`label[for="${radio.id}"]`);
        const isBooked = bookedHoursForDay.includes(radio.value.trim().toLowerCase());

        if (isBooked) {
            radio.disabled = true;
            if (label) {
                label.style.backgroundColor = '#E9ECEF'; 
                label.style.color = '#CED4DA';      
                label.style.borderColor = '#CED4DA';      
                     
                label.style.cursor = 'not-allowed';
                label.style.pointerEvents = 'none';  
            }
        }
    });
}


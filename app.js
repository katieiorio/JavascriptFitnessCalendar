const monthlyExerciseTimes = new Array(29).fill(0);

// style calendar so that empty days are styled darker
const numberDay = document.querySelectorAll('.numberDay');
const numberDayArray = Array.from(numberDay);
const innerTextArray = numberDayArray.map(function (numbers) {
    return numbers.innerText;
});

function activeDaysInMonth(numberDayArray) {
    for (let i = 0; i < innerTextArray.length; i++) {
        const numberDayElement = numberDayArray[i]; // Get the corresponding element
        if (innerTextArray[i] === '') {
            numberDayElement.classList.add('nonActiveDay');
        }
    } 
}

activeDaysInMonth(numberDayArray);

// first select
document.addEventListener('click', function(event) {
    const clicked = event.target;
    const isSelected = clicked.classList.contains('selectedNumberDay');// Check if the clicked element is already selected
    const previouslySelected = document.querySelector('.selectedNumberDay');// Remove 'selectedNumberDay' class from previously selected element
    let targetCell = clicked.closest('.numberDay');

    if (targetCell) {
        if (previouslySelected) {
            previouslySelected.classList.remove('selectedNumberDay');
        }
        // Add 'selectedNumberDay' class to the clicked element if it wasn't selected already
        if (!isSelected) {
            targetCell.classList.add('selectedNumberDay');
            // userTimeInputValuesArray.length = 0;
        }
    }
});

// document.getElementById('strength_addition').addEventListener('change', function() {
//     const timeFormId = document.getElementById('timeForm');
//     timeFormId.style.display = 'block';
// });
// document.getElementById('balance_addition').addEventListener('change', function() {
//     const timeFormId = document.getElementById('timeForm');
//     timeFormId.style.display = 'block';
// });
// document.getElementById('flexibility_addition').addEventListener('change', function() {
//     const timeFormId = document.getElementById('timeForm');
//     timeFormId.style.display = 'block';
// });


// add second select after first select is selected
document.getElementById('activity-select').addEventListener('change', function() {
    let noneAddition = document.getElementById('none_addition');
    let enduranceAddition = document.getElementById('endurance_addition');
    let strengthAddition = document.getElementById('strength_addition');
    let balanceAddition = document.getElementById('balance_addition');
    let flexibilityAddition = document.getElementById('flexibility_addition');

    if (this.value === 'none') {
        noneAddition.style.display = 'block'
        enduranceAddition.style.display = 'none';
        strengthAddition.style.display = 'none';
        balanceAddition.style.display = 'none';
        flexibilityAddition.style.display = 'none'; 
    } else if (this.value === 'endurance') {
        noneAddition.style.display = 'none';
        enduranceAddition.style.display = 'block';
        strengthAddition.style.display = 'none';
        balanceAddition.style.display = 'none';
        flexibilityAddition.style.display = 'none';
    } else if (this.value === 'strength') {
        noneAddition.style.display = 'none';
        enduranceAddition.style.display = 'none';
        strengthAddition.style.display = 'block';
        balanceAddition.style.display = 'none';
        flexibilityAddition.style.display = 'none';
    } else if (this.value === 'balance') {
        noneAddition.style.display = 'none';
        enduranceAddition.style.display = 'none';
        strengthAddition.style.display = 'none';
        balanceAddition.style.display = 'block';
        flexibilityAddition.style.display = 'none';
    } else if (this.value === 'flexibility') {
        noneAddition.style.display = 'none';
        enduranceAddition.style.display = 'none';
        strengthAddition.style.display = 'none';
        balanceAddition.style.display = 'none';
        flexibilityAddition.style.display = 'block';
    } else {
        noneAddition.style.display = 'block';
        enduranceAddition.style.display = 'none';
        strengthAddition.style.display = 'none';
        balanceAddition.style.display = 'none';
        flexibilityAddition.style.display = 'none';
    }
});

// time
document.getElementById('hoursInput').addEventListener('change', function(event) {
const hoursInput = document.getElementById('hoursInput');
    if (Number.isInteger(parseInt(hoursInput.value))) {
        return true;
    }
    else alert('Hour input is not a number!');
});
document.getElementById('minutesInput').addEventListener('change', function(event) {
const minutesInput = document.getElementById('minutesInput');
    if (Number.isInteger(parseInt(minutesInput.value))) {
        return true;
    }
    else alert('Minute input is not a number!');
});


// ––––––––––––––––––––––––––––––––––––––


// button actions
function updateMonthlyExerciseTime() {
    const minutesValue = document.getElementById('minutesInput').value;
    const hoursValue = document.getElementById('hoursInput').value;
    const activityValue = document.getElementById('activity-select').value;
    const secondActivityValue = document.getElementById('secondSelect').value;
    const minutesValueParse = parseInt(minutesValue);
    const hoursValueParse = parseInt(hoursValue) * 60;
    const totalMinutesInput = minutesValueParse + hoursValueParse;
    const selectedDate = document.querySelector('.selectedNumberDay');
    if ((minutesValue == '' && hoursValue == '') ||
        activityValue == '' ||
        secondActivityValue == '' ||
        selectedDate == null ||
        Number.isInteger(hoursValueParse) == false ||
        Number.isInteger(minutesValueParse) == false ||
        document.getElementById('activity-select').value == 'null' ||
        (document.getElementById('endurance-select').value == 'default' &&
        document.getElementById('strength-select').value == 'default' &&
        document.getElementById('balance-select').value == 'default' &&
        document.getElementById('flexibility-select').value == 'default'
        ))  {
            alert("Please input correct activity criteria in all fields: activity, time, date");
            return false;
    }
    else if (document.querySelector('.selectedNumberDay').firstElementChild.childElementCount >= 4) {
        alert("You have reached the maximum daily exercise input allowance. Nice job!");
        return false;
    }
    else {
        const dayOfMonthToArray = parseFloat(selectedDate.innerText)-1;
        monthlyExerciseTimes[dayOfMonthToArray] += totalMinutesInput;
    }
};

document.getElementById('addButton').addEventListener('click', function(event) {
    updateMonthlyExerciseTime();

    const selectedDate = document.querySelector('.selectedNumberDay');
    const dayOfMonthToArray = parseFloat(selectedDate.innerText)-1;
    const accessDayValueInArray = monthlyExerciseTimes[dayOfMonthToArray];
    
    // const totalTimeSelectedDate = document.querySelector('.selectedNumberDay :nth-child(3)')
    
    if (document.querySelector('.selectedNumberDay').firstElementChild.childElementCount >= 4 || parseInt(accessDayValueInArray) == 0) {
        return false;
    }
    else if (document.getElementById('activity-select').value == 'endurance') {
        if (document.getElementById('endurance-select').value == 'endurance1') {
            selectedDate.firstElementChild.innerHTML +='<img src="img/running.png" alt="running" class="exerciseIcons"></img>'
        }
        if (document.getElementById('endurance-select').value == 'endurance2') {
            selectedDate.firstElementChild.innerHTML +='<img src="img/walking.png" alt="walking" class="exerciseIcons"></img>'
        }
        if (document.getElementById('endurance-select').value == 'endurance3') {
            selectedDate.firstElementChild.innerHTML +='<img src="img/biking.png" alt="biking" class="exerciseIcons"></img>'
        }
        if (document.getElementById('endurance-select').value == 'endurance4') {
            selectedDate.firstElementChild.innerHTML +='<img src="img/swimming.png" alt="swimming" class="exerciseIcons"></img>'
        }
        if (document.getElementById('endurance-select').value == 'endurance5') {
            selectedDate.firstElementChild.innerHTML +='<img src="img/endurance.png" alt="endurance" class="exerciseIcons"></img>'
        }
    }
    else if (document.getElementById('activity-select').value == 'strength') {
        if (document.getElementById('strength-select').value == 'strength1') {
            selectedDate.firstElementChild.innerHTML +='<img src="img/lifting.png" alt="lifting" class="exerciseIcons"></img>'
        }
        if (document.getElementById('strength-select').value == 'strength2') {
            selectedDate.firstElementChild.innerHTML +='<img src="img/band.png" alt="bands" class="exerciseIcons"></img>'
        }
        if (document.getElementById('strength-select').value == 'strength3') {
            selectedDate.firstElementChild.innerHTML +='<img src="img/strength.png" alt="other" class="exerciseIcons"></img>'
        }
    }
    else if (document.getElementById('activity-select').value == 'balance') {
        if (document.getElementById('balance-select').value == 'balance1') {
            selectedDate.firstElementChild.innerHTML +='<img src="img/yoga.png" alt="yoga" class="exerciseIcons"></img>'
        }
        if (document.getElementById('balance-select').value == 'balance2') {
            selectedDate.firstElementChild.innerHTML +='<img src="img/pilates.png" alt="pilates" class="exerciseIcons"></img>'
        }
        if (document.getElementById('balance-select').value == 'balance3') {
            selectedDate.firstElementChild.innerHTML +='<img src="img/taichi.png" alt="taichi" class="exerciseIcons"></img>'
        }
        if (document.getElementById('balance-select').value == 'balance4') {
            selectedDate.firstElementChild.innerHTML +='<img src="img/balance.png" alt="balance" class="exerciseIcons"></img>'
        }
    }
    else if (document.getElementById('activity-select').value == 'flexibility') {
        if (document.getElementById('flexibility-select').value == 'flexibility1') {
            selectedDate.firstElementChild.innerHTML +='<img src="img/neck.png" alt="neck" class="exerciseIcons"></img>'
        }
        if (document.getElementById('flexibility-select').value == 'flexibility2') {
            selectedDate.firstElementChild.innerHTML +='<img src="img/back.png" alt="back" class="exerciseIcons"></img>'
        }
        if (document.getElementById('flexibility-select').value == 'flexibility3') {
            selectedDate.firstElementChild.innerHTML +='<img src="img/leg.png" alt="leg" class="exerciseIcons"></img>'
        }
        if (document.getElementById('flexibility-select').value == 'flexibility4') {
            selectedDate.firstElementChild.innerHTML +='<img src="img/arm.png" alt="arm" class="exerciseIcons"></img>'
        }
    }
        


        const getDivToAddTime =  document.querySelector('.selectedNumberDay div:nth-child(3)').firstElementChild;
        const totalExerciseMinutesFullMonth = monthlyExerciseTimes.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        if (parseInt(accessDayValueInArray) != 0) {
            getDivToAddTime.innerHTML = `${Math.floor(accessDayValueInArray/60)} hrs.  ${accessDayValueInArray % 60} min.`;
            } else {
                return false;
            }
        document.getElementById('totalTimeDisplay').innerHTML = "Total Monthly Exercise: " + `<span id="totalTimeNumbersDisplay">${Math.floor(totalExerciseMinutesFullMonth/60)} hrs.  ${totalExerciseMinutesFullMonth % 60} min.</span>`;
});


function updateMonthlyExerciseTimeOnClear() {
    const totalExerciseMinutesFullMonth = monthlyExerciseTimes.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    document.getElementById('totalTimeDisplay').innerHTML = "Total Monthly Exercise: " + `<span id="totalTimeNumbersDisplay">${Math.floor(totalExerciseMinutesFullMonth/60)} hrs.  ${totalExerciseMinutesFullMonth % 60} min.</span>`;
};


document.getElementById('clearButtonId').addEventListener('click', function(event) {
    const selectedDate = document.querySelector('.selectedNumberDay');
    const dayOfMonthToArray = parseFloat(selectedDate.innerText)-1;
    const getDivToAddTime =  document.querySelector('.selectedNumberDay div:nth-child(3)').firstElementChild;
    monthlyExerciseTimes[dayOfMonthToArray] = 0;
    getDivToAddTime.innerHTML = '';
    document.querySelector('.selectedNumberDay').firstElementChild.innerHTML = '';
    updateMonthlyExerciseTimeOnClear();
});


























// __________________________
// THROW AWAY CODE

// document.getElementById('activity-select').addEventListener('change', function() {
//     const timeFormId = document.getElementById('timeForm');
//     const isExerciseShown = document.getElementById('activity-select').value;
//     if (isExerciseShown !== '') {
//         if (isExerciseShown == 'endurance') {
//             document.getElementById('endurance-select').addEventListener('change', function() {
//                 const timeFormId = document.getElementById('timeForm');
//                 const isEnduranceShown = document.getElementById('endurance-select').value;
//                 if (isEnduranceShown !== '') {
//                     timeFormId.style.display = 'block';
//                 } else {
//                     timeFormId.style.display = 'none';
//                 };
//             });
//         }
//         else if (isExerciseShown == 'strength') {
//             document.getElementById('strength-select').addEventListener('change', function() {
//                 const timeFormId = document.getElementById('timeForm');
//                 const isStrengthShown = document.getElementById('strength-select').value;
//                 if (isStrengthShown !== '') {
//                     timeFormId.style.display = 'block';
//                 } else {
//                     timeFormId.style.display = 'none';
//                 };
//             });
//         }
//         else {
//             timeFormId.style.display = 'none';
//         };
//     }
//     else {
//         timeFormId.style.display = 'none';
//     };
// });





// function calculateExerciseTime(hoursValue, minutesValue){
//     const totalMinutes = parseInt(hoursValue * 60 + minutesValue);
//     const totalTimeArray = [totalMinutes];
//     let totalSum = 0;
    
//     for(let i = 0; i < totalTimeArray.length; i++) {
//         totalSum += totalTimeArray[i];
//     }
//     return totalSum;
// }
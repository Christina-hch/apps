const secondHand = document.querySelector('.second');
const minuteHand = document.querySelector('.minute');
const hourHand = document.querySelector('.hour');
function setDate(){
    let date = new Date()
    let second = date.getSeconds();
    let minute = date.getMinutes();
    let hour = date.getHours();
    let secondAngle = (second/60)*360+180;
    let minuteAngle = (minute/60)*360+ (second/60)*(360/60)+180;
    let hourAngle = ((hour%12)/12)*360+(minute/60)*(360/12)+180;
    secondHand.style.transform = `rotate(${secondAngle}deg)`;
    minuteHand.style.transform = `rotate(${minuteAngle}deg)`;
    hourHand.style.transform = `rotate(${hourAngle}deg)`;
}

setInterval(setDate,1000);
setDate();
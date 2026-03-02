var no = document.querySelector("#no")
var yes = document.querySelector("#yes")
var card = document.querySelector("#sticker")
var sticker = document.querySelector("#sticker img")
var h1 = document.querySelector("#big")
var h3 = document.querySelector("#small")
var noCount = 0;
let size = 16;
let bok = 10;
var start = document.querySelector("#start");
var done = document.querySelector("#done");


yes.addEventListener("click",function(){
    done.play();
})



no.addEventListener("click", function handleNO(){

    no.innerHTML = `
    <h2 style = "color:black;font-size: 20px;">no!</h2>`

    size = size + 15;
    yes.style.fontSize = size + "px";

    bok = bok - 9;
    no.style.fontSize = size + "px"

    noCount++;
    if (noCount == 1){
        no.innerHTML = `
    <h2 style = "color:black;font-size: 10px;">no!</h2>`
        h1.innerHTML = "Sorry dii ab maaf v krdo n please🥺";
    h3.innerHTML = "ab se no badmasi🥺promiss👍 only pdhai";
        
     sticker.src = "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmJnNGJvYXlydHpqNWJvazVrdnM0NjQ2MXg4Ym12aXFpdW9memFkdyZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/IxmmhNo2MI8r9PrgE3/200.webp";
    sticker.animate([
        {opacity : 0},
        {opacity : 1}
    ],
{
    duration : 1000

})
}
    else if (noCount == 2){
        no.innerHTML = `
    <h2 style = "color:black;font-size: 8px;">no!</h2>`
        h1.innerHTML = "<p>waise v april-attmpt ke baad Aap chli jaaogi na??🥺 </p>";
        h3.innerHTML = "<p>To abse no faaltu baat.only pdhai.</p>"

        sticker.src = "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXk3N2R6eXpmcXh4cTJrbzkxa2R2bmt5Y3psanVheWt2ZHZ6aXg4ZiZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/pwK1G8lOU72ZorlkgL/200w.webp";
    sticker.animate([
        {opacity : 0.6},
        {opacity : 1}
    ],
{
    duration : 1000

})

    }
    else if (noCount == 3){
        no.innerHTML = `
    <h2 style = "color:black;font-size: 5px;">no!</h2>`
        h1.innerHTML = "<p>ab maan v jao na dii??🥺 please</p>";
        h3.innerHTML = "<p>ab kitna code krwaogi??🥺</p>";
    
    sticker.src = "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXk3N2R6eXpmcXh4cTJrbzkxa2R2bmt5Y3psanVheWt2ZHZ6aXg4ZiZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/fUey3PrttFs6HJ6tHU/200w.webp";
    sticker.animate([
        {opacity : 0},
        {opacity : 1}
    ],
{
    duration : 1000

})
    
    }
}) 

yes.addEventListener("click", function handleYES(){
    h1.innerHTML = "<h1>Thanku dii🥰</h1>";
    h3.innerHTML = "<p>Unblock krdo diii💕Now we are jst tech frnd!!</p>";
        sticker.src = "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDRxMnhnaG0wem9qZWczd25ycGNodHV0NzdtdGx1dnJsOW1nMXgxeiZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/67KsrjDg2bUWI5uyvB/200w.webp";
        yes.innerHTML = "✔️";
    sticker,yes.animate([
        {opacity : 0.4},
        {opacity : 1}
    ],
{
    duration : 500

})

})


let nobtn = document.querySelector("#no");
nobtn.addEventListener("mouseenter", function(){
    setTimeout(() => {
    let x = Math.floor(Math.random() * 300);
    let y = Math.floor(Math.random() * 300);
    nobtn.style.position = "absolute";
    nobtn.style.left = x + "px";
    nobtn.style.top = y + "px";
    }, 200);

})

yes.addEventListener("mouseover", function(){

    yes.style.transition = "0.5s ease all";
})


yes.addEventListener("click", function(){
    card.classList.add("container");
    h1.innerHTML = `
    <h1 style = "color:white;font-size: 40px;">❤️Thanku dii🥰</h1>`
    yes.display = "none";
    yes.style.backgroundColor = "transparent";
    no.style.display = "none";
})

for (let i = 0; i < 70; i++){
    let bubble = document.createElement("span");
    // bubble.classList.add("bubble");
    bubble.style.left = Math.random() * 100 + "vw";
    bubble.style.animationDuration = (Math.random() * 5 + 3) + "s";
    bubble.style.width = 10 + Math.random() * 70 + "px";
    bubble.style.height = bubble.style.width;
    document.querySelector(".bubbles").appendChild(bubble);
}
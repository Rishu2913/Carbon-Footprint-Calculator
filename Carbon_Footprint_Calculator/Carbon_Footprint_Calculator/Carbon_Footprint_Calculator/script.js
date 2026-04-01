tsParticles.load("tsparticles",{

background:{color:"#1e1e2f"},

particles:{
number:{value:60},
color:{value:"#00adb5"},
size:{value:3},
move:{enable:true,speed:1},
opacity:{value:0.5}
}

});

let charts={};

document.getElementById("calculatorForm")
.addEventListener("submit",function(e){

e.preventDefault();

const miles=parseFloat(document.getElementById("miles").value)||0;
const electricity=parseFloat(document.getElementById("electricity").value)||0;
const flights=parseFloat(document.getElementById("flights").value)||0;
const diet=document.getElementById("diet").value;

const CO2_PER_MILE=0.40;
const CO2_PER_KWH=0.72;
const CO2_PER_FLIGHT=300;

const DIET_FACTORS={
low:1500,
medium:2000,
high:3300
};

const weeklyDriving=miles*CO2_PER_MILE;
const weeklyElectricity=(electricity*CO2_PER_KWH)/4;
const weeklyFlights=(flights*CO2_PER_FLIGHT)/52;
const weeklyDiet=DIET_FACTORS[diet]/52;

const total=
weeklyDriving+
weeklyElectricity+
weeklyFlights+
weeklyDiet;

document.getElementById("result").innerHTML=
`<strong>Your Carbon Footprint</strong><br>
<span class="result-value">
${total.toFixed(2)} kg CO₂
</span>`;

createBarChart(weeklyDriving,weeklyElectricity,weeklyFlights,weeklyDiet);
createPieChart(electricity);
createLineChart(weeklyDriving,weeklyFlights,weeklyElectricity,weeklyDiet);

generateSuggestions(miles,electricity,flights,diet);

});

function createBarChart(d,e,f,di){

if(charts.chart1) charts.chart1.destroy();

charts.chart1=new Chart(document.getElementById("chart1"),{

type:"bar",

data:{
labels:["Driving","Electricity","Flights","Diet"],
datasets:[{
label:"kg CO₂ per week",
data:[d,e,f,di]
}]
},

options:{
plugins:{legend:{labels:{color:"white"}}},
scales:{
x:{ticks:{color:"white"}},
y:{ticks:{color:"white"}}
}
}

});

}

function createPieChart(electricity){

if(charts.chart2) charts.chart2.destroy();

const renewable=electricity*0.3;
const nonRenewable=electricity*0.7;

charts.chart2=new Chart(document.getElementById("chart2"),{

type:"pie",

data:{
labels:["Renewable","Non-Renewable"],
datasets:[{
data:[renewable,nonRenewable]
}]
},

options:{
plugins:{legend:{labels:{color:"white"}}}
}

});

}

function createLineChart(d,f,e,di){

if(charts.chart3) charts.chart3.destroy();

const transport=d+f;
const lifestyle=e+di;

charts.chart3=new Chart(document.getElementById("chart3"),{

type:"line",

data:{
labels:["Transport","Lifestyle"],
datasets:[{
label:"Weekly CO₂",
data:[transport,lifestyle],
tension:0.4
}]
},

options:{
plugins:{legend:{labels:{color:"white"}}},
scales:{
x:{ticks:{color:"white"}},
y:{ticks:{color:"white"}}
}
}

});

}

function generateSuggestions(miles,electricity,flights,diet){

const container=document.getElementById("suggestionList");

let suggestions=[];

if(miles>50){
suggestions.push({
title:"🚗 Reduce Car Usage",
text:"Use public transport or carpool for some trips.",
saving:"Save ~10–20 kg CO₂ per week"
});
}

if(electricity>200){
suggestions.push({
title:"💡 Reduce Electricity",
text:"Switch to LED bulbs and energy efficient appliances.",
saving:"Save ~8–15 kg CO₂ per week"
});
}

if(flights>3){
suggestions.push({
title:"✈ Reduce Flights",
text:"Consider trains or virtual meetings when possible.",
saving:"Save ~300 kg CO₂ per flight"
});
}

if(diet==="high"){
suggestions.push({
title:"🥗 Adjust Diet",
text:"Reduce red meat consumption and include plant-based meals.",
saving:"Save ~15–25 kg CO₂ per week"
});
}

suggestions.push({
title:"🌞 Use Renewable Energy",
text:"Install solar panels or switch to green electricity providers.",
saving:"Save ~30% electricity emissions"
});

suggestions.push({
title:"♻ Reduce Waste",
text:"Recycle, compost food waste, and avoid single-use plastics.",
saving:"Save ~5–10 kg CO₂ per week"
});

suggestions.push({
title:"🚶 Walk or Cycle",
text:"Short trips can be done without a car.",
saving:"Save ~3–5 kg CO₂ per week"
});

container.innerHTML="";

suggestions.forEach(s=>{

container.innerHTML+=`

<div class="suggestion-card">

<h3>${s.title}</h3>
<p>${s.text}</p>
<span>${s.saving}</span>

</div>

`;

});

}
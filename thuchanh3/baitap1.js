/* ============================ */
/* BÀI 1.1 - QUẢN LÝ SINH VIÊN */
/* ============================ */

let students=[]

let filteredStudents=[]

let sortAsc=true


function getRank(score){

if(score>=8.5) return "Giỏi"
if(score>=7) return "Khá"
if(score>=5) return "Trung bình"
return "Yếu"

}


function renderTable(){

const tbody=document.getElementById("tableBody")
tbody.innerHTML=""

if(filteredStudents.length===0){

document.getElementById("noResult").style.display="block"
return

}else{

document.getElementById("noResult").style.display="none"

}

filteredStudents.forEach((student,index)=>{

const row=document.createElement("tr")

if(student.score<5){
row.classList.add("lowScore")
}

row.innerHTML=`
<td>${index+1}</td>
<td>${student.name}</td>
<td>${student.score}</td>
<td>${getRank(student.score)}</td>
<td>
<button data-id="${student.id}" class="deleteBtn">Xóa</button>
</td>
`

tbody.appendChild(row)

})

updateStats()

}


function updateStats(){

let total=students.length

let avg=0

if(total>0){

avg=students.reduce((sum,s)=>sum+s.score,0)/total

}

document.getElementById("stats").innerText=
`Tổng sinh viên: ${total} | Điểm trung bình: ${avg.toFixed(2)}`

}


/* ============================ */
/* BÀI 1.1 - THÊM SINH VIÊN */
/* ============================ */

document.getElementById("addBtn").onclick=()=>{

const name=document.getElementById("nameInput").value.trim()

const score=parseFloat(document.getElementById("scoreInput").value)

if(name==="" || isNaN(score) || score<0 || score>10){

alert("Dữ liệu không hợp lệ")
return

}

students.push({
id:Date.now(),
name,
score
})

document.getElementById("nameInput").value=""
document.getElementById("scoreInput").value=""

document.getElementById("nameInput").focus()

applyFilters()

}


/* Enter để thêm */

document.getElementById("scoreInput")
.addEventListener("keydown",(e)=>{

if(e.key==="Enter"){

document.getElementById("addBtn").click()

}

})


/* Xóa sinh viên */

document.getElementById("tableBody")
.addEventListener("click",(e)=>{

if(e.target.classList.contains("deleteBtn")){

const id=e.target.dataset.id

students=students.filter(s=>s.id!=id)

applyFilters()

}

})


/* ============================ */
/* BÀI 1.2 - TÌM KIẾM + LỌC */
/* ============================ */

function applyFilters(){

const keyword=document
.getElementById("searchInput")
.value
.toLowerCase()

const filter=document
.getElementById("filterSelect")
.value


filteredStudents=students.filter(s=>{

const matchName=s.name
.toLowerCase()
.includes(keyword)

const rank=getRank(s.score)

const matchRank=(filter==="all"||rank===filter)

return matchName && matchRank

})


/* sắp xếp */

filteredStudents.sort((a,b)=>{

return sortAsc ? a.score-b.score : b.score-a.score

})

renderTable()

}


/* tìm kiếm realtime */

document
.getElementById("searchInput")
.addEventListener("input",applyFilters)


/* lọc */

document
.getElementById("filterSelect")
.addEventListener("change",applyFilters)


/* sắp xếp */

document
.getElementById("scoreHeader")
.addEventListener("click",()=>{

sortAsc=!sortAsc

document.getElementById("scoreHeader").innerText=
sortAsc?"Điểm ▲":"Điểm ▼"

applyFilters()

})
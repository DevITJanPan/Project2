
function checkLogin(){
    let email=localStorage.getItem("userLogin");
    if(email==null){
    window.location.href="login.html";
    }
}
let currentPage=1;
let recordsPerPage=3;
function renderData(page,studentManagementStore){
  
  let pageMax=getTotalPage(studentManagementStore);
  if(page<1){
    page=1;
  }
  if(page>pageMax){
    page=pageMax;
  }
  let content=document.getElementById("content");
  content.innerHTML="";
  let indexMinOnPage=(page-1)*recordsPerPage;
  let indexMaxOnPage;
  if(page*recordsPerPage>studentManagementStore.length){
    indexMaxOnPage=studentManagementStore.length;
  }else{
    indexMaxOnPage=page*recordsPerPage;
  }
  for(let index=indexMinOnPage;index<indexMaxOnPage;index++){
    content.innerHTML+=`
    <tr>
              <td>${index+1}</td>
              <td>${studentManagementStore[index].courseId}</td>
              <td>${studentManagementStore[index].courseName}</td>
              <td>${studentManagementStore[index].courseTime}</td>
              <td>${studentManagementStore[index].status}</td>
              <td>
                <button onclick=editManagement('${studentManagementStore[index].courseId}')><i class="fa-regular fa-pen-to-square"></i></button>
                <td onclick=deleteManagement('${studentManagementStore[index].courseId}')><i class="fa-solid fa-trash-can"></i></td>
              </td>
            </tr>
    `
  }
  let listPages=document.getElementById("listPages");
  listPages.innerHTML="";
  for(let i=1;i<=pageMax;i++){
    listPages.innerHTML+=`<li><a href="javascript:clickPage('${i}')">${i}</a></li>`;
  }
  let preview=document.getElementById("preview");
  let next=document.getElementById("next");
  if(currentPage==1){
    preview.style.visibility="hidden";
  }else{
    preview.style.visibility="visible";
  }
  if(currentPage==pageMax){
    next.style.visibility="hidden";
  }else{
    next.style.visibility="visible";
  }
}
function clickPage(page){
  currentPage=page;
  let studentManagementStore=localStorage.getItem("studentManagementStore")?JSON.parse(localStorage.getItem("studentManagementStore")):[];
  renderData(page,studentManagementStore);
}
function previewPage(){
  currentPage--;
  let studentManagementStore=localStorage.getItem("studentManagementStore")?JSON.parse(localStorage.getItem("studentManagementStore")):[];
  renderData(page,studentManagementStore);
}
function nextPage(){
  currentPage++;
  let studentManagementStore=localStorage.getItem("studentManagementStore")?JSON.parse(localStorage.getItem("studentManagementStore")):[];
  renderData(page,studentManagementStore);
}
function getTotalPage(studentManagementStore){
  return Math.ceil(studentManagementStore.length/recordsPerPage);
}
var newCourseModal = new bootstrap.Modal(document.getElementById('newCourse'), {
  keyboard: false
});
//Hàm thêm mới dữ liệu
let btnSubmit = document.getElementById("btnSubmit");
btnSubmit.addEventListener("click", function (event) {
  event.preventDefault();
  let courseId = document.getElementById("courseId").value;
  let courseName = document.getElementById("courseName").value;
  let courseTime = document.getElementById("courseTime").value;
  let status = document.querySelector("input[type='radio']:checked").value;
  let studentManagementStore = localStorage.getItem("studentManagementStore") ? JSON.parse(localStorage.getItem("studentManagementStore")) : [];
  studentManagementStore.push({
      courseId,
      courseName,
      courseTime,
      status,
      "arrClass": []
  });
  localStorage.setItem("studentManagementStore", JSON.stringify(studentManagementStore));
  document.getElementById("courseId").value = "";
  document.getElementById("courseName").value = "";
  document.getElementById("courseTime").value = "";
  document.getElementById("active").checked = true;
  newCourseModal.hide();

})
// // Hàm hiển thị thông tin danh mục cần cập nhật
function editManagement(courseId){
  let studentManagementStore=localStorage.getItem("studentManagementStore")?JSON.parse(localStorage.getItem("studentManagementStore")):[];
  let index=getCourseById(studentManagementStore,courseId);
  document.getElementById("courseId").value=studentManagementStore[index].courseId;
  document.getElementById("courseId").readOnly=true;
  document.getElementById("courseName").value=studentManagementStore[index].courseName;
  document.getElementById("courseTime").value=studentManagementStore[index].courseTime;
  if(studentManagementStore[index].status=="active"){
    document.getElementById("active").checked=true;
  }else{
    document.getElementById("inActive").checked=true;
  }
}
// Hàm lấy thông tin danh mục theo mã danh mục
function getCourseById(studentManagementStore, courseId) {
  for (let index = 0; index < studentManagementStore.length; index++) {
      if (studentManagementStore[index].courseId == courseId) {
          return index;
      }
  }
  return -1;
}
// Hàm cập nhật danh mục
function updateStudentManagement(){
  let studentManagementStore=localStorage.getItem("studentManagementStore")?JSON.parse(localStorage.getItem("studentManagementStore")):[];
  let updateStudentManagement=getDataForm();
  let index=getCourseById(studentManagementStore,updateStudentManagement.courseId);
  if(index>-1){
    studentManagementStore[index]=updateStudentManagement;

  }
  localStorage.setItem("studentManagementStore",JSON.stringify(studentManagementStore));
  resetForm();
  document.getElementById("courseId").readOnly=false;
  renderData(1,studentManagementStore);
}
// Hàm xóa danh mục
function deleteManagement(courseId){
  let studentManagementStore=localStorage.getItem("studentManagementStore")?JSON.parse(localStorage.getItem("studentManagementStore")):[];
  let index =getCourseById("studentManagementStore",courseId);
  studentManagementStore.splice(index,1)
  localStorage.setItem("studentManagementStore",JSON.stringify(studentManagementStore));
  renderData(1,studentManagementStore);

}
let btnSearch=document.getElementById("btnSearch");
btnSearch.addEventListener("click",function(event){
  event.preventDefault();
  let studentManagementStore=localStorage.getItem("studentManagementStore")?JSON.parse(localStorage.getItem("studentManagementStore")):[];
  let courseNameSearch=document.getElementById("btnSearch").value;
  let studentManagementStoreNameSearch=studentManagementStore.filter(studentManagementStore=>course.courseName.includes(courseNameSearch));
  renderData(1,studentManagementStoreNameSearch);
})
// Hàm sắp xếp danh mục
function handSortCatalog(){
  let sortTarget=document.getElementById("sort").value;
  let studentManagementStore=localStorage.getItem("studentManagementStore")?JSON.parse(localStorage.getItem("studentManagementStore")):[];
  switch(sortTarget){
    case "courseNameASC":
      studentManagementStore.sort((a,b)=>(a.courseName>b.courseName) ? 1:(a.courseName<b.courseName)? -1:0);
      break;
      case "courseNameDESC":
        studentManagementStore.sort((a,b)=>(a.courseName>b.courseName) ? -1:(a.courseName<b.courseName)? 1:0);
        break;
  }
  localStorage.setItem("studentManagementStore",JSON.stringify(studentManagementStore));
  renderData(1,studentManagementStore);
}
let studentManagementStore=localStorage.getItem("studentManagementStore")?JSON.parse(localStorage.getItem("studentManagementStore")):[];
document.onload=renderData(1,studentManagementStore);
  function logOut(){
      localStorage.removeItem("userLogin");
      window.location.href="./login.html";
  }
  function resetManagement(){
   window.location.href="dashboard.html";
  }
  function classroomManagement(){
   window.location.href="quanlykhoahoc.html";
  }
  document.getElementById("btnLogOut").addEventListener("click",logOut);
  document.onload=checkLogin();
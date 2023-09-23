
var firebaseConfig = {
  apiKey: "AIzaSyBCvwUbbIW7uKEYUIMgLyZZOiQMPI8rKtw",
  authDomain: "minute-prints.firebaseapp.com",
  projectId: "minute-prints",
  storageBucket: "minute-prints.appspot.com",
  messagingSenderId: "612027663649",
  appId: "1:612027663649:web:005a76af6c049d40036a60",
  measurementId: "G-TXRQ1548X2"
};
 
firebase.initializeApp(firebaseConfig);


function countPDFPages(fileURL) {
  return new Promise((resolve, reject) => {
    // Load the PDF document
    const loadingTask = pdfjsLib.getDocument(fileURL);

    loadingTask.promise.then((pdf) => {
      // Get the total number of pages in the document
      const totalPages = pdf.numPages;
      resolve(totalPages);
    }, reject);
  });
}

let fileName;
let fileInput;
var pageCount;
var db= firebase.firestore();
var database = firebase.database();
var sn=document.getElementById("firstDropdown");
let fileUpload=document.getElementById("file-upload");

if (fileUpload){

//Event listener for file upload  
fileUpload.addEventListener('change', function (event) {

  timestamp = new Date().getTime();
//getting values of printing details
var city=document.getElementById("firstDropdown").value;
var shopval=document.getElementById("secondDropdown").value;
var val1 = document.querySelector('input[name="radio1"]:checked').value;
var val2 = document.querySelector('input[name="radio2"]:checked').value;
var val3 = document.querySelector('input[name="radio3"]:checked').value;
var cnum=document.getElementById("cnum").innerText;

  fileInput = document.getElementById('file-upload');
  const labelUpload = document.getElementById('label-upload');

  const file = event.target.files[0];
  const reader = new FileReader();

//Reading the number of pages
  reader.onload = function (e) {
    const fileURL = e.target.result;
    countPDFPages(fileURL).then((totalPages) => {
      console.log('Total Pages:', totalPages);
    }).catch((error) => {
      console.error('Error:', error);
    });
   
  };

  reader.readAsDataURL(file);
  

  //Storing to fire storage
  if (fileInput.files.length > 0) {
    labelUpload.textContent = fileInput.files[0].name;
  } else {
    labelUpload.textContent = '';
  }
  fileName = fileInput.files[0].name+timestamp;

  
  let storageRef = firebase.storage().ref("Shop/"+city+"/"+shopval+"/"+fileName);

  let task = storageRef.put(event.target.files[0]);
  alert("File Uploaded");


//Function for generating download link
task.on('state_changed', null, null, function() {

   timestamp = new Date().getTime().toString();
  // Once the upload is complete, get the download URL
  task.snapshot.ref.getDownloadURL().then(function(downloadURL) {


    // Create a new node in the Firestore Database with the download URL
    db.collection("ShopList/"+city+"/"+shopval).doc(timestamp).set({
      name: fileName,
      url: downloadURL,
      district : city,
      shopname: shopval,
      type : val1,
      orientation : val2,
      side : val3,
      copies: cnum
    })
    

  });

  db.collection("/idlist").doc("id").set({ id : timestamp,district : city,shopname: shopval});

 var uidRef = database.ref("/current_uid/user_id");
 uidRef.on('value',function(snapshot){
   let uid=snapshot.val();
 var uidRef1 = database.ref("/users/"+uid);
 uidRef1.on("value", function(snapshot) {
   var data = snapshot.val();
   var uemail = data.email;
   var uname =data.name;
   var mob=data.mob;

//
updates = { email:uemail,user:uname,mobile:mob};
///
var idRef1 = db.collection("idlist").doc("id");
idRef1.get()
.then(function(doc) {

   // Access the document data
   var id = doc.data()["id"];
   var shopname=doc.data()["shopname"];
   var district=doc.data()["district"];
   var shopname=shopname.toString();
   var district=district.toString();
   var id =id.toString();

   console.log(district)
   var dataRef12 =db.collection("ShopList/"+district+"/"+shopname+"/").doc(id);
 

 dataRef12.update(updates)
 .then(() => {
   console.log("Document updated successfully!");
 })
 .catch((error) => {
   console.error("Error updating document: ", error);
 });

})
///
 }, function(error) {
   console.error("Error retrieving data:", error);
 });
 });
 
});

});

}

function profile(){
  window.location.assign("profile.html")
}
plus=0;
plus=document.querySelector(".plus");
minus=document.querySelector(".minus");
num=document.querySelector(".num");
let a =1;
if(plus){
plus.addEventListener("click", ()=>{
  a++;
  a=(a<10)?"0"+a:a;
  num.innerText=a;
  console.log(a);
});
}
if(minus){
minus.addEventListener("click", ()=>{
  if(a>1){
    a--;
    a=(a<10)?"0"+a:a;
    num.innerText=a;
  }
});
}

let mediaRecorder;
let chunks = [];
let stream;
let audioPlayer = document.getElementById("audio-player");
let audioUrl = 'null'

document.getElementById("start").addEventListener('click', function (event) {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(function (streamData) {
      stream = streamData;
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.addEventListener('dataavailable', function (event) {
        chunks.push(event.data);
      });
      mediaRecorder.start();
      console.log('Recording started');
      document.getElementById("stop").style.display="block";
      document.getElementById("start").style.display="none";
      document.getElementById("text").textContent="Recording : ";
    })
    .catch(function (error) {
      console.error('Error accessing microphone : ', error);
    });
});

document.getElementById("stop").addEventListener('click', function (event) {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
    mediaRecorder.addEventListener('stop', function () {
      const audioBlob = new Blob(chunks, { type: 'audio/webm' });
      audioUrl = URL.createObjectURL(audioBlob);
      console.log(audioPlayer)
      audioPlayer.src = audioUrl;
      //audioPlayer.play(); // Uncomment this line to play the recorded audio automatically
      console.log('Recording stopped');
      document.getElementById("start").style.display="block";
      console.log('Audio URL:', audioUrl);
      document.getElementById("audio-player").style.display = "block";
      document.getElementById("stop").style.display="none";
      document.getElementById("text").textContent="To Change recording : ";
      // Do something with the recorded audio data (e.g., upload to Firebase)
    });
  }
});

function price(){

  window.location.href = "price.html";
}

function pay(){
  var data=document.getElementsByName("btn");
  var i;
  for(i=0;i<=data.length;i++){
      if(data[i].checked){
          if(data[i].value=="Offline"){
              window.location.assign("offline.html");
          }
          else{
            window.location.href = "C:\\Users\\USER\\Desktop\\MInute Print\\Minute Prints\\login\\pay1.html";
          }
      }
  }


}

function populateSecondDropdown() {
  var firstDropdown = document.getElementById("firstDropdown");
  var secondDropdown = document.getElementById("secondDropdown");
  var selectedOption = firstDropdown.value;

  // Clear existing options
  secondDropdown.innerHTML = "";

  if (selectedOption === "Thrissur") {
    // Populate options for option1
    var option1Values = ["Shop t1", "Shop t2", "Shop t3"];
    for (var i = 0; i < option1Values.length; i++) {
      var option = document.createElement("option");
      option.text = option1Values[i];
      secondDropdown.add(option);
    }
  } else if (selectedOption === "Ernakulam") {
    var option1Values = ["Shop e1", "Shop e2", "Shop e3"];
    for (var i = 0; i < option1Values.length; i++) {
      var option = document.createElement("option");
      option.text = option1Values[i];
      secondDropdown.add(option);
    }
  }
  else if (selectedOption === "Kollam") {
    var option1Values = ["Shop k1", "Shop k2", "Shop k3"];
    for (var i = 0; i < option1Values.length; i++) {
      var option = document.createElement("option");
      option.text = option1Values[i];
      secondDropdown.add(option);
    }
  }
  else if (selectedOption === "Kozhikode") {
    var option1Values = ["Shop kz1", "Shop kz2", "Shop kz3"];
    for (var i = 0; i < option1Values.length; i++) {
      var option = document.createElement("option");
      option.text = option1Values[i];+
      secondDropdown.add(option);
    }
  }
}


function updateDetails(){
//Retrieving data from firestore for price calculator
var idRef1 = db.collection("idlist").doc("id");

idRef1.get()
.then(function(doc) {

    // Access the document data
    var id = doc.data()["id"];
    var shopname=doc.data()["shopname"];
    var district=doc.data()["district"];
    var shopname=shopname.toString();
    var district=district.toString();
    var id =id.toString();
color1=1;
side1=1;
    console.log(district)
    var dataRef12 =db.collection("ShopList/"+district+"/"+shopname+"/").doc(id);
  
 
    dataRef12.get().then(function(doc){

      var fieldValue = doc.data()["copies"];
      var field1Value = doc.data()["type"];
      var field2Value = doc.data()["side"];
      const currentDate = new Date();
      const day = currentDate.getDate().toString().padStart(2, '0');
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const year = currentDate.getFullYear().toString().slice(-2);

      const formattedDate = `${day}/${month}/${year}`;
/////
  if(field1Value.toString()=="color")
  { color1=2.5; }
  else{ color1 = 1; }
  if(field2Value.toString()=="SingleSide")
  { side1=2; }
  else{ side1 = 1.1; }
  var amount=color1*side1*2*fieldValue;
////
      document.getElementById('copies1').innerHTML = "";
      document.getElementById('copies1').innerHTML = fieldValue;
      document.getElementById("color1").innerHTML = "";
      document.getElementById('color1').innerHTML = field1Value;
      document.getElementById("side1").innerHTML = "";
      document.getElementById('side1').innerHTML = field2Value;
      document.getElementById("amount1").innerHTML = amount;

updates = { amount:amount, date : formattedDate};
var idRef1 = db.collection("idlist").doc("id");
idRef1.get()
.then(function(doc) {

   // Access the document data
   var id = doc.data()["id"];
   var shopname=doc.data()["shopname"];
   var district=doc.data()["district"];
   var shopname=shopname.toString();
   var district=district.toString();
   var id =id.toString();

   var dataRef12 =db.collection("ShopList/"+district+"/"+shopname+"/").doc(id);
 

 dataRef12.update(updates)
 .then(() => {
   console.log("Document updated amount successfully!");
 })
 .catch((error) => {
   console.error("Error updating document: ", error);
 });

})

    })
    .catch(function(error) {
      console.log("Error getting document:", error);
    });

})
.catch(function(error) {
  console.log("Error getting document:", error);
});

//  
  document.getElementById("mode1").innerHTML = "";
  var data=document.querySelector('input[name="btn"]:checked').value;
  document.getElementById('mode1').innerHTML=data;
  database.ref("/mode/").set({mode:data});

  document.getElementById('pages1').innerHTML=2;

}

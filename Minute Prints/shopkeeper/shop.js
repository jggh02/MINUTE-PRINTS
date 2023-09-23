
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
var db= firebase.firestore();
var database = firebase.database();

var sRefid = database.ref("/current_sid/shop_id");
 sRefid.on('value',function(snapshot){
   let sid=snapshot.val();
 var sRefid1 = database.ref("/shops/"+sid);
 sRefid1.on("value", function(snapshot1) {
  var data = snapshot1.val();
  var dist = data.district;
  var shop = data.name;


db.collection("/ShopList/"+dist+"/"+shop)
      .orderBy(firebase.firestore.FieldPath.documentId()) // Order by timestamp
      .get()
      .then((querySnapshot) => {
        
        const orderTableBody = document.getElementById("tbody");
        count=0;
        querySnapshot.forEach((doc) => {
          count++;
          const order = doc.data();
          const orderId = "C"+count;
          const copies = order.copies;
          const printingDetails = order.email;
          const name = order.name;
          const type = order.type;
          const side = order.side;
          const url = order.url;
          const amt= order.amount+' Rs';
          const date= order.date;
          const row = document.createElement("tr");
           
          row.innerHTML = `

            <td>${orderId}</td>
            <td>${printingDetails}</td>
            <td>${name}</td>
            <td>${amt}</td>
            <td>online</td>
            <td>${date}</td>
            <td>${copies}</td>
            <td>${type}</td>
            <td>${side}</td>
            
      
            <td>
              <button class="action-button processing" onclick="markProcessing('${status}')">Processing</button>
              
            </td>
            <td>
              <a href="${url}">
              <button>Print</button>
              </a>
            </td>
          `;
          orderTableBody.appendChild(row);
        });
      })
      .catch((error) => {
        console.error("Error fetching orders: ", error);
      });

    })
  })

  const aboutLink = document.getElementById("about-link");
  const aboutDetails = document.getElementById("about-details");

  aboutLink.addEventListener("click", function(event) {
    event.preventDefault();
    aboutDetails.style.display = "block";
  });
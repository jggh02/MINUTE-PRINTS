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
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage(app);
auth.onAuthStateChanged(async function (user) {
  if (user) {
    const dataCollectionRef = collection(db, "data");
    const querySnapshot = await getDocs(query(dataCollectionRef, orderBy("timestamp")));
    let count = 1;
    console.log(querySnapshot)
    for (const doc of querySnapshot.docs) {
      const pdfRef = ref(storage, doc.data().File);
      console.log(doc.data().Faudio)
      const audioRef = ref(storage, doc.data().Faudio);
      const docId=doc.id;
      
      // Access the 'Name' property from the document data
      const pdfDownloadURL = await getDownloadURL(pdfRef);
      const audioDownloadURL = await getDownloadURL(audioRef);
     
      const row = document.getElementById("tbody").insertRow(0);
      row.insertCell(0).innerHTML = count;
      row.insertCell(1).innerHTML = doc.data().email;
      row.insertCell(2).innerHTML = doc.data().FName;
      row.insertCell(3).innerHTML = doc.data().Fprice;
      row.insertCell(4).innerHTML = doc.data().Fmethod;
      row.insertCell(5).innerHTML = doc.data().Date;
      row.insertCell(6).innerHTML = doc.data().Fcount;
      row.insertCell(7).innerHTML = doc.data().FType;
      row.insertCell(8).innerHTML = doc.data().Fside;
      row.insertCell(9).innerHTML = `<audio src="${audioDownloadURL}" controls></audio>`;
      row.insertCell(10).innerHTML = doc.data().Fstatus;
      row.insertCell(11).innerHTML = `<img src="../images/open.gif" alt="Your GIF"></a>`;
      count++;

      
      var done = "Done";
      const imageElement = row.cells[11].querySelector("img");
      imageElement.onclick = async function () {
        sessionStorage.setItem("documentId",docId);
        sessionStorage.setItem("pdfDownloadURL",pdfDownloadURL);
        window.location.href = "./update.html";
        //window.location.href = pdfDownloadURL;
      }

    }

  } else {
    window.location.href = "../login.html";
  }
});
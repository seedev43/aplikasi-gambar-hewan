navigator.mediaDevices
  .getUserMedia({ audio: true })
  .then(function (stream) {
    console.log("You let me use your mic!");
  })
  .catch(function (err) {
    console.log("No mic for you!");
  });

function runSpeechRecognition() {
  let action = document.getElementById("action");
  let button = document.getElementById("button");
  let animalImage = document.getElementById("animalImage");
  let imageNotFoundElement = document.getElementById("res");
  let brElement = document.getElementById("br");

  var SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
  var recognition = new SpeechRecognition();

  recognition.onstart = function () {
    button.textContent = "Mendengarkan...";
    // action.innerHTML = "<small>mendengarkan...</small>";
  };
  recognition.onspeechend = function () {
    button.textContent = "Klik untuk berbicara";
    // action.innerHTML = "<small>Selesai...</small>";
    recognition.stop();
  };

  recognition.onresult = function (event) {
    var transcript = event.results[0][0].transcript;
    console.log("Gambar yang dicari:", transcript);
    function getRandomItem(arr) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      const item = arr[randomIndex];
      return item;
    }

    let namaHewan = [
      "kucing",
      "anjing",
      "babi",
      "buaya",
      "sapi",
      "kambing",
      "jerapah",
      "singa",
      "harimau",
      "monyet",
    ];
    let found = false;

    for (let index = 0; index < namaHewan.length; index++) {
      const element = namaHewan[index];
      if (transcript.toLowerCase() === element) {
        let rand = [];
        const jumlahGambar = 4; // Replace with the actual number of image files

        for (let i = 0; i < jumlahGambar; i++) {
          rand.push(`./assets/gambar/${element}/${i}.jpg`);
        }

        const item = getRandomItem(rand);
        console.log(item);
        animalImage.setAttribute("src", item);
        // console.log(element);
        found = true;
        break;
      }
    }
    if (!found) {
      showImageNotFound(transcript);
    }

    // if (transcript.toLowerCase() == "kucing") {
    //   let gambarKucing = [
    //     "./assets/gambar/kucing1.jpg",
    //     "https://cdn06.pramborsfm.com/storage/app/media/Prambors/Editorial/KUCING-20200918070556.jpg?tr=w-800",
    //     "https://i0.wp.com/www.rukita.co/stories/wp-content/uploads/2022/04/pexels-inge-wallumr%C3%B8d-177809.jpg?fit=1360%2C907&ssl=1",
    //   ];
    //   const item = getRandomItem(gambarKucing);
    //   animalImage.src = item;
    // } else if (transcript.toLowerCase() == "babi") {
    //   animalImage.src = "./assets/gambar/babi1.jpg";
    // } else if (transcript.toLowerCase() == "anjing") {
    //   animalImage.src = "./assets/gambar/anjing1.jpg";
    // } else {
    //   showImageNotFound(transcript);
    // }

    if (imageNotFoundElement) {
      imageNotFoundElement.remove();
    }
    if (brElement) {
      brElement.remove();
    }
  };

  recognition.lang = "id-ID";
  recognition.start();
}

function showImageNotFound(transcript) {
  var hrElement = document.querySelector("hr");
  var brElement = document.createElement("br");
  brElement.setAttribute("id", "br");
  var spanElement = document.createElement("span");
  spanElement.setAttribute("id", "res");

  spanElement.textContent = "Gambar " + transcript + " tidak tersedia.";
  var parentElement = hrElement.parentNode;
  parentElement.insertBefore(brElement, hrElement);
  parentElement.insertBefore(spanElement, hrElement);
}

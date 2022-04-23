function getDate() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();
  return today =  yyyy + '-' + mm + '-' + dd;
}

let dateMax = document.querySelector('#start').setAttribute('max', getDate())
let date = document.querySelector('#start').value = getDate()

document.querySelector('#go').addEventListener('click', picOfTheDay)
function picOfTheDay() {
  fetch(`https://api.nasa.gov/planetary/apod?api_key=zBKjFL09eMxBB4M12clV1Rjdta5LOuUcxT0Fi6OH&date=${document.querySelector('#start').value}&thumbs=true`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data);
      document.querySelector('#second-section').classList.remove('hidden')
      document.querySelector('#sec-container').classList.remove('hidden')
      document.querySelector('#s').classList.remove('hidden')
      document.querySelector('img').src = data.url
      document.querySelector('h2').innerText = data.title
      document.querySelector('p').textContent = data.explanation
      fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=viewCount&key=AIzaSyBeGebo1r3WZZKnkdIfF-B3E-xi3FQFcik&q=${data.title}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            document.querySelector('#video').src = `https://www.youtube.com/embed/${data.items[1].id.videoId}`
        })
      .catch(err => {
          console.log(`error ${err}`)
      })
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}




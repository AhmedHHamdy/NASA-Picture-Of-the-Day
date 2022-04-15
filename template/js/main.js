document.querySelector('#go').addEventListener('click', picOfTheDay)
function picOfTheDay() {
  let date = document.querySelector('#start').value
  fetch(`https://api.nasa.gov/planetary/apod?api_key=[apikey]&date=${date}&thumbs=true`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data);
      document.querySelector('#second-section').classList.remove('hidden')
      document.querySelector('#sec-container').classList.remove('hidden')
      document.querySelector('#s').classList.remove('hidden')
      document.querySelector('img').src = data.url
      document.querySelector('h2').innerText = data.title
      document.querySelector('p').textContent = data.explanation
      fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=viewCount&key=[apikey]&q=${data.title}`)
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




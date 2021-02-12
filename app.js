const searchResult = () => {
    const searchField = document.getElementById('search-field').value
    const url = `https://api.lyrics.ovh/suggest/${searchField}`
    fetch(url)
        .then(res => res.json())
        .then(data => showSong(data.data))
}

const showSong = songs => {
    songContainer =document.getElementById('song-container')
    songContainer.innerText = ''
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = "single-result row align-items-center my-3 p-3"
        songDiv.innerHTML = `
        <div class="col-md-9">
                        <h3 class="lyrics-name">${song.title}</h3>
                        <p class="author lead">Album by <span>${song.artist.name}t</span></p>
                        <audio controls>
                                <source src="${song.preview}" type="audio/ogg">
                                
                         </audio>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button onclick="songsLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
                    </div>
        `
        songContainer.appendChild(songDiv);

    })
}

const songsLyric = (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/:${artist}/${title}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayLyric(data.lyrics))
    
   .catch(error => displayError('Sorry! I failed to load lyrics, Please try again later!!!') )} 
        



const displayLyric = lyrics => {
    const lyricDiv = document.getElementById('song-lyric')
    lyricDiv.innerText = lyrics;
}

const displayError = error => {
    const errorTag = document.getElementById('error-message');
    errorTag.innerText = error;
} 
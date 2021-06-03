const form = document.getElementById('form')
const search = document.getElementById('search')
const result = document.getElementById('result')

const apiURL = 'https://api.lyrics.ovh';

form.addEventListener('submit', e => {
    e.preventDefault();
    searchvalue = search.value.trim();
    //check if value entered is empty or not
    if (!searchvalue) {
        alert("Nothing to search");
    } else {
        searchsong(searchvalue)

    }
})

async function searchsong(searchvalue) {
    const searchresult = await fetch(`${apiURL}/suggest/${searchvalue}`)
    const data = await searchresult.json();
    showdata(data)
}

function showdata(data) {

    result.innerHTML = `
    <ul class="song-list">
      ${data.data
        .map(song=> `<li>
                    <div>
                        <strong>${song.artist.name}</strong> -${song.title} 
                    </div>
                    <span data-artist="${song.artist.name}" data-songtitle="${song.title}"> get lyrics</span>
                </li>`
        )
        .join('')}
    </ul>
  `;
}

// toget lyrics on clicking on the get lyrics button

result.addEventListener('click',e=>{
    const clickedelemnt =e.target;

    if (clickedelemnt.tagName==='SPAN'){
        const artist=clickedelemnt.getAttribute('data-artist');
        const songtitle=clickedelemnt.getAttribute('data-songtitle');

        getlyrics(artist,songtitle)
    }
})

//to display lyrics

async function getlyrics(artist,songtitle){
    const res=await fetch(`${apiURL}/v1/${artist}/${songtitle}`)
    const data=await res.json();

    const lyrics=data.lyrics.replace(/(\r\n|\r|\n)/g,'<br>');

    result.innerHTML = `<h2><strong>${artist}</strong> -${songtitle}</h2>
    <p>${lyrics}</p>`;
   
}
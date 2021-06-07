/*
features to be added
Include preview samples for each track
Only display songs not currently present in the playlist in the search results
Add a loading screen while playlist is saving
Update the access token logic to expire at exactly the right time, instead of setting expiration from when the user initiates their next search
After user redirect on login, restoring the search term from before the redirect
Ensure playlist information doesn’t get cleared if a user has to refresh their access token

*/




let userAccessToken = '';
let expiresIn;
const clientID = '58b0b44d6a36401ba4b6bab925186aff'
const redirectURI = window.location.href;



 
export const spotify = {
     getAccessToken() {
        if(userAccessToken){
            return userAccessToken
        }else if (window.location.href.match(/access_token=([^&]*)/)) {
            userAccessToken = window.location.href.match(/access_token=([^&]*)/)[1];
            expiresIn = Number(window.location.href.match(/expires_in=([^&]*)/)[1]);
            window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return userAccessToken
        }else{
           window.location.assign(`https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`) 
        }
    
    },

  async search(searchTerm){
      this.getAccessToken()
    console.log(searchTerm);
      try{
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
            headers: {Authorization: `Bearer ${userAccessToken}`}
          })
          if(response.ok){
            const jsonResponse = await response.json()
            if(jsonResponse){
                const Tracks = jsonResponse.tracks.items.map((track)=>{
                    return {
                        id:track.id,
                        Name:track.name,
                        Artist:track.artists[0].name,
                        Album:track.album.name,
                        URI:track.uri
                    }
                })
                console.log(Tracks);
                return Tracks
            } else {
                return  {
                    id:7, name:'tusboy', artist:'tus', album:'javap'
                  }
            }
          }
      }catch(error){
          console.log(error)
      }
       
    },

    async savePlaylist(name, playlistTracks){
        if(!name || !playlistTracks){
            return;
        }
        let userID;
        let playlistID;
        let headers = {Authorization: `Bearer ${userAccessToken}`};
        const response = await fetch('https://api.spotify.com/v1/me', {headers:headers});
        if(response.ok){
            const jsonResponse = await response.json();
            userID = jsonResponse.id;
        }
        const response1 = await fetch(`https://api.spotify.com/v1//v1/users/${userID}/playlists`, {
            headers: headers,
            method: 'POST',
            body:{name:name}
        })
        if(response1.ok){
            const jsonResponse1 = await response1.json();
            playlistID = jsonResponse1.id;
        }
        const response2 = await fetch(`/v1/users/{user_id}/playlists/${playlistID}/tracks`, {
            headers: headers,
            method: 'POST',
            body:{"uris":playlistTracks}
        })
        if(response2.ok){
            console.log('ok');
            alert('ok')
        }
    }
}

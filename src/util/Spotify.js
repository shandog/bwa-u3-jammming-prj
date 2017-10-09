const clientId = '8299de55386d47fca92ddd56357a355a';
// const clientSecret = 'a2d4af45e9594a3b93e661496ed08af6';
const redirectURI = 'http://localhost:3000/'; //'http://shan_jamming.surge.sh' //
var accessToken;
var expiresIn;

const Spotify = {

    getAccessToken(){
        //#78
        if(accessToken){
            return accessToken;
        }
          var at= window.location.href.match(/access_token=([^&]*)/);
          var ep= window.location.href.match(/expires_in=([^&]*)/);
        if (at && ep) {
            accessToken = at[0];
            expiresIn = ep[0];
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
            } else    {
            window.location=`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        }
    },
    
    search(searchTerm){
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,{
            headers: {Authorization: `Bearer ${accessToken}`}
          }).then(response => {
            if (response.ok){
              return response.json();
            }
            throw new Error('Request failed!');
          }, networkError => console.log(networkError.message)
          ).then(jsonResponse => {
            //console.log(jsonResponse.tracks)
              if (jsonResponse.total === 0){
                  return [];
              } else {
                return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }))
              }
          });
    },

    savePlaylist(plname,trackURIs){
        var userId ='';
        if(accessToken){
            return new Promise(resolve => resolve(accessToken));
        }
       // if (!plname || !trackURIs.length)
          //  {
          //  console.log('error in spotify.js: playlistName & trackURIs both empty');
          //  return;
          //  }   
            else {
            const accessToken = Spotify.getAccessToken();
            return fetch('https://api.spotify.com/v1/me', {
                headers:  { Authorization: `Bearer ${accessToken}` },
             }).then(response => response.json()
              ).then(jsonResponse => {
                userId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                    headers:  { Authorization: `Bearer ${accessToken}` },
                    method: 'POST',
                    body: JSON.stringify({Name: plname})
                }).then(response => response.json()
                    ).then(jsonResponse => {
                        const playlistId = jsonResponse.id;
                        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                            headers: { Authorization: `Bearer ${accessToken}` },
                            method: 'POST',
                            body: JSON.stringify({uris: trackURIs})
                        });
                    });
            })
        }  
    }
    
}
export default Spotify;

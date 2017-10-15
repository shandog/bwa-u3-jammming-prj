const clientId = '8299de55386d47fca92ddd56357a355a';
const redirectURI = 'http://localhost:3000/'; // 'http://shan_jamming.surge.sh/' //
let expiresIn;
let userId ='';
let accessToken = '' ; // Spotify.getAccessToken(); //this.state.getAccessToken();


let Spotify = {
    getAccessToken(){
        if(accessToken){
            return accessToken // new Promise(resolve => resolve(accessToken));
        } else{
            let at= window.location.href.match(/access_token=([^&]*)/);
            let ep= window.location.href.match(/expires_in=([^&]*)/);
           // console.log(at)
           // console.log(ep)
            if (at && ep) {
                accessToken = at[1];
                expiresIn = ep[1];
                window.setTimeout(() => accessToken = '', expiresIn * 1000);
                window.history.pushState('Access Token', null, '/');
                return accessToken;
            } else {
                window.location=`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            }
        }
    },

    search(searchTerm){
        let accessToken = Spotify.getAccessToken();
        let headers = {Authorization: `Bearer ${accessToken}`};
        if(accessToken && searchTerm !==''){
            return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
                       {headers: headers
        }).then(response => {
            if (response.ok) {
                return response.json();
                }
                console.log(response);
                //throw new Error('Request Failed!');
                }, networkError => console.log(networkError.message)
            ).then(jsonResponse => {
                if (!jsonResponse.tracks) {
                  return [];
                }
                return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }))
            });
        }
    },

    savePlaylist(name,trackURIs){
       // console.log(name,trackURIs);
        let accessToken = Spotify.getAccessToken();
        let headers = {Authorization: `Bearer ${accessToken}`};
        if(name === "" || trackURIs.length === 0 ){
       //    console.log("stuck in here");     
           return;
        }
        else {
           // console.log("here"); 
            if(accessToken){    
                //console.log(this); 
                return fetch(`https://api.spotify.com/v1/me`, {
                        headers: headers,
                }).then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    console.log(response);
                    //throw new Error('request failed!');
                    }, networkError => console.log(networkError.message)
                ).then(jsonResponse => {
                    console.log(jsonResponse);
                    userId = jsonResponse.id;
                    return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                        headers: headers,
                        method: 'POST',
                        body: JSON.stringify({name: name})
                    }).then(response => {
                        if (response.ok) {
                            return response.json();
                        }
                        console.log(response);
                        //throw new Error('request failed!');
                        }, networkError => console.log(networkError.message)
                    ).then(jsonResponse => {
                        console.log(jsonResponse);
                        const playlistId = jsonResponse.id;
                        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                                headers: headers,
                                method: 'POST',
                                body: JSON.stringify({uris: trackURIs})
                        })
                    })
                })
            } else{
                    console.log("no accesstoken");
                    } 
                //})
            }
        }
    }
export default Spotify

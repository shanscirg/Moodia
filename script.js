//SPOTIFY
// const request = require("request");
// const user_id = "shannon";
// const token = "Bearer "
// const playlists_url = "https://api.spotify.com/v1/users/" + user_id + "/playlists"

// request({ url: playlists_url, headers: { "Authorization": token } }, function (err, res) {
//     if (res) {
//         const playlists = JSON.parse(res.body);
//         const playlist_url = playlists.items[0].href
//         request({ url: playlist_url, headers: { "Authorization": token } }), function (err, res) {
//             if (res) {
//                 const playlist = JSON.parse(res.body);
//                 console.log("playlist: " + playlist.name);
//                 playlist.tracks.forEach(function (track) {
//                     console.log(track.track.name);
//                 });
//             }
//         }
//     }
// })


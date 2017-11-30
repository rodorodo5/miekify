var app = angular.module('app', ['spotify', 'ngRoute', 'ngStorage'])



app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })
        .when('/dashboard', {
            templateUrl: 'views/dashboard.html',
            controller: 'MainController'
        })
        .otherwise({
            redirectTo: "/home"
        })

}]);

app.config(function(SpotifyProvider) {
    SpotifyProvider.setClientId('18ac7b9b224c46fcb0665145279b6ff4');
    SpotifyProvider.setRedirectUri('http://localhost:8888/m/callback.html');
    SpotifyProvider.setScope('playlist-read-private playlist-modify-private user-library-read playlist-modify-public');
})


app.controller('MainController', ['$scope', 'Spotify', '$location', '$localStorage', function($scope, Spotify, $location, $localStorage) {

    $scope.changeView = function(view) {
        $location.path(view);
    }

    var access_token;
    var userId;

    // $scope.inputArtist = "Paramore";
    // $scope.searchArtist = searchArtist;
    $scope.login = login;
    // $scope.printToken = printToken;
    // $scope.getPlaylists = getPlaylists;
    // $scope.findUser = findUser;
    // $scope.miekifyMe = miekifyMe;
    // $scope.getSavedSongs = getSavedSongs;
    // $scope.getUserPlaylists = getUserPlaylists;



    function login() {
        return Spotify.login().then(function(data) {
            return data;
        })
    }
        
        login().then(function(data) {
            $localStorage.token = data;
            Spotify.setAuthToken(data);
            $location.path('dashboard');

             getUser().then(function(userdata) {
                console.log(userdata);

                $scope.names = userdata.display_name;
                $scope.email = userdata.email;
                $scope.followers = userdata.followers.total;
                $scope.Id = userdata.id;
                $scope.profpic = userdata.images[0].url;
                userId = userdata.id;
            })

               function getUserPlaylists() {
                return Spotify.getUserPlaylists(userId).then(function(data) {
                    var songs = data.data.items;
                    var jsonArray = [];
                    songs.forEach(function(item) {
                        var plist = item.name;
                        jsonArray.push(plist);
                    });
                    var pollo = {};
                    pollo = angular.fromJson(jsonArray);
                    $scope.playlists = pollo;
                    return pollo;
                });
            }
            getUserPlaylists().then(function(playlists) {

            })
        });

    $scope.token = $localStorage.token;



    function getUser() {
        return Spotify.getCurrentUser().then(function(data) {
            return data.data;
        })
    };
   








    function searchArtist(inputArtist) {
        if ($localStorage.token == undefined) {
            throw alert("Not logged in");
        } else {
            console.log("Input Artist:", inputArtist);
            Spotify.search(inputArtist, 'artist').then(function(data) {
                var searchResults = data.data.artists.items;
                searchResults.forEach(function(artist) {
                    var name = artist.name;
                    var popularity = artist.popularity;
                    console.log("Name:", name, "\nPopularity:", popularity, "\n");
                });
            });
        };
    };


    function printToken() {
        if ($localStorage.token == undefined) {
            throw alert("Not logged in");
        } else {
            console.log(access_token);
            alert("Printed on console.");
        }
    };

    function getPlaylists() {
        if ($localStorage.token == undefined) {
            throw alert("Not logged in");
        } else {
            alert("Getting your playlists.");

        };
    };



    function miekifyMe() {
        if ($localStorage.token == undefined) {
            throw alert("Not logged in");
        } else {
            Spotify
                .createPlaylist(userId, {
                    name: 'Miekify Recommendations'
                })
                .then(function(data) {
                    alert("You've been Miekified!");
                });
        };

    };

    function findUser(inputUser) {
        if ($localStorage.token == undefined) {
            throw alert("Not logged in");
        } else {
            console.log("Find user", inputUser);
        };

    };

    function getSavedSongs() {
        if ($localStorage.token == undefined) {
            throw alert("Not logged in");
        } else {
            Spotify.getSavedUserTracks().then(function(data) {
                console.log(data.data);
                var songs = data.data.items;
                var jsonArray = [];
                songs.forEach(function(song) {
                    var track = song.track;
                    var trackId = track.id;
                    var toJson = {
                        trackId
                    };
                    jsonArray.push(trackId);
                });
                console.log("Final output:");
                console.log(jsonArray);

                var songFeatures;
                Spotify.getTracksAudioFeatures(jsonArray).then(function(data) {
                    console.log(data.data.audio_features);
                    var json = JSON.stringify(data.data.audio_features);
                    console.log(json);
                });
            });
        };
    };



}]);
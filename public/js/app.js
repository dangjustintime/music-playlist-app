const app = angular.module('MusicApp', []);

app.controller('MusicController', ['$http', function($http) {
  this.loginFailed = false;
  this.logIn = () => {
    $http({
      method:'POST',
      url:'/sessions',
      data: {
        username: this.loginUser,
        password: this.loginPass
      }
    }).then(response => {
      this.loginFailed = false;
      this.currentUser = response.data
      console.log('CurrentUser', this.currentUser);
      this.getPlaylist();
      this.loginUser = ""
      this.loginPass = ""
    }, error => {
      this.loginFailed = true;
      console.log(error);
    })
  }

  this.register = () => {
    console.log('user: ', this.registerUser);
    console.log('pass: ', this.registerPass);
    $http({
      method:'POST',
      url:'/users',
      data: {
        username: this.registerUser,
        password: this.registerPass
      }
    }).then(response => {
      this.currentUser = response.data
      console.log('CurrentUser: ', this.currentUser);
      this.createPlaylist('Playlist1');
    }, error => {
      console.log(error);
    })
  }

  this.getBboard = () => {
    let day = this.day;
    let month = this.month;
    if (this.day < 10) {
      day = '0'+this.day
      console.log('Day: ', this.day);
    }
    if (this.month < 10) {
      month = '0' + this.month
      console.log('Month: ', this.month);
    }
    $http({
      method: 'GET',
      url: '/bboard/' + this.year + '-' + month + '-' + day
    }).then(response => {
      this.results = response.data
      console.log('Results: ', this.results);
    }, error => {
      console.log(error);
    })
  }

  this.createPlaylist = () => {
    console.log('creating Playlist (app.js)');
    $http({
      method: 'POST',
      url: '/playlists',
      data:{
        owner: this.currentUser.username,
        songs: [],
        name: this.newPlaylistName
      }
    }).then(response => {
      this.userPlaylists.push(response.data)
    }, error => {
      console.log(error);
    })
  }

  this.addSongToPlaylist = (song) => {
    this.currentPlaylist.songs.push(song)
    $http({
      method:'PUT',
      url: '/playlists/' + this.currentPlaylist._id,
      data: this.currentPlaylist
    }).then(response => {
      console.log('User Playlist: ', this.currentPlaylist);
    }, error => {
      console.log(error);
    })
  }

  this.getPlaylist = () => {
    $http({
      method:'GET',
      url:'/playlists/' + this.currentUser.username
    }).then(response => {
      this.userPlaylists = response.data;
      this.currentPlaylist = response.data[0];
      console.log('Playlist ', this.currentPlaylist);
      console.log('allPlaylists ', this.userPlaylists);
      console.log('songs ', this.currentPlaylist.songs);
    }, error => {
      console.log(error);
    })
  }

  this.getMaxYear = () => {
    let date = new Date(Date.now());
    return date.getFullYear();
  }

  this.logout = () =>{
    $http({
      method:'DELETE',
      url:'/sessions'
    }).then(response =>{
      this.currentUser = undefined;
      this.currentPlaylist = undefined;
      this.userPlaylists = undefined
    },(error)=>{
      console.log(error);
    })
  }

  this.removePlaylist = () => {
    $http({
      method: 'DELETE',
      url:'/playlists/' + this.currentPlaylist._id
    }).then(response => {
      this.getPlaylist()
    }, error => {
      console.log(error);
    })
  }

  this.getMaxYear();
}])

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
      this.createPlaylist();
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
    $http({
      method: 'POST',
      url: '/playlists',
      data: {
        owner: this.currentUser.username,
        songs: []
      }
    }).then(response => {
      this.userPlaylist = response.data
      console.log('User Playlist: ', this.userPlaylist);
    }, error => {
      console.log(error);
    })
  }

  this.addSongToPlaylist = (song) => {
    this.userPlaylist.songs.push(song)
    $http({
      method:'PUT',
      url: '/playlists/' + this.userPlaylist._id,
      data: this.userPlaylist
    }).then(response => {
      console.log('User Playlist: ', this.userPlaylist);
    }, error => {
      console.log(error);
    })
  }

  this.getPlaylist = () => {
    $http({
      method:'GET',
      url:'/playlists/' + this.currentUser.username
    }).then(response => {
      this.userPlaylist = response.data[0];
      console.log('Playlist ', this.userPlaylist);
      console.log('songs ', this.userPlaylist.songs);
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
      this.userPlaylist = undefined;
    },(error)=>{
      console.log(error);
    })
  }

  this.getMaxYear();
}])

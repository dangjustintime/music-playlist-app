const app = angular.module('MusicApp', []);

app.controller('MusicController', ['$http', function($http) {
  console.log('hi');

  this.logIn = () => {
    $http({
      method:'POST',
      url:'/sessions',
      data: {
        username: loginUser,
        password: loginPass
      }
    }).then(response => {
      this.currentUser = response.data
      console.log('CurrentUser', this.currentUser);
    }, error => {
      console.log(error);
    })
  }

  this.register = () => {
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
}])

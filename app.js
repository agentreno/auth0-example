window.addEventListener('load', function () {
  var logout = function() {
    localStorage.removeItem('id_token');
    window.location.href = '/';
  };

  var lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN);

  lock.on('authenticated', function(authResult) {
    lock.getProfile(authResult.idToken, function(error, profile) {
      if (error) {
        console.log("Error getting authentication profile.");
        return;
      }
      localStorage.setItem('id_token', authResult.idToken);
      console.log(profile);
    });
  });

  lock.on('authorization_error', function(error) {
    alert('Auth failure');
    console.log(error);
  });

  var showProfile = function (profile) {
    var message = document.getElementById('message');
    var logoutBtn = document.getElementById('logout');
    var nameSpan = document.getElementById('nickname');

    nameSpan.textContent = profile.nickname;
    message.setAttribute('display', 'block');
    logoutBtn.setAttribute('display', 'block');
  };

  var retrieveProfile = function() {
    var id_token = localStorage.getItem('id_token');
    if (id_token) {
      lock.getProfile(id_token, function(err, profile) {
        if (err) {
          console.log("Problem getting profile: " + err.message);
          return;
        }
        showProfile(profile);
      });
    } else {
      lock.show();
    }
  };

  retrieveProfile();
});

window.addEventListener('load', function () {
  var lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN);

  lock.on('authenticated', function(authResult) {
    lock.getProfile(authResult.idToken, function(error, profile) {
      if (error) {
        console.log("Error getting authentication profile.");
        return;
      }
      localStorage.setItem('id_token', authResult.idToken);
      console.log(profile);
      retrieveProfile();
    });
  });

  lock.on('authorization_error', function(error) {
    alert('Auth failure');
    console.log(error);
  });

  var showProfile = function (profile) {
    var message = document.getElementById('message');
    var loginBtn = document.getElementById('loginBtn');
    var logoutBtn = document.getElementById('logoutBtn');
    var nameSpan = document.getElementById('nickname');

    nameSpan.textContent = profile.nickname;
    message.style.display = 'block';
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'block';
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
    }
  };

  var doLogin = function() {
    var id_token = localStorage.getItem('id_token');
    if (!id_token) {
      lock.show();
    }
  };

  var doLogout = function() {
    localStorage.removeItem('id_token');
    window.location.href = '/';
  };

  var loginBtn = document.getElementById('loginBtn');
  var logoutBtn = document.getElementById('logoutBtn');
  loginBtn.addEventListener('click', function() {
    lock.show();
  });
  logoutBtn.addEventListener('click', function() {
    localStorage.removeItem('id_token');
    window.location.href = '/';
  });

  retrieveProfile();

});

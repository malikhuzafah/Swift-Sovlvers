function loginEvent() {
  var email = $("#email-input").val();
  var pass = $("#pass-input").val();
  validateLogin(email, pass);
}

function validateLogin(email, pass) {
  if (email == "") {
    $("#email-err").html("Please enter Email");
  } else if (pass == "") {
    $("#pass-err").html("Please enter Password");
  } else {
    $("#email-err").html("");
    $("#pass-err").html("");
    login(email, pass);
  }
}

function login(email, pass) {
  var data = {
    email: email,
    password: pass,
  };
  $.ajax({
    url: "http://localhost:3000/api/users/login",
    type: "POST",
    data: data,
    success: (res) => {
      localStorage.setItem("jwt", res);
      window.location.href = "home.html";
    },
    error: (err) => {
      console.log(err);
    },
  });
}

function registerEvent() {
  var name = $("#name-input").val();
  var email = $("#email-input").val();
  var pass = $("#pass-input").val();
  validateRegister(email, pass, name);
}

function validateRegister(email, pass, name) {
  if (name == "") {
    $("#name-err").html("Please enter Name");
  } else if (email == "") {
    $("#email-err").html("Please enter Email");
  } else if (pass == "") {
    $("#pass-err").html("Please enter Password");
  } else if (pass.length < 8) {
    $("#pass-err").html("Password must be 8 characters long");
  } else {
    $("#name-err").html("");
    $("#email-err").html("");
    $("#pass-err").html("");
    register(name, email, pass);
  }
}

function register(name, email, pass) {
  var data = {
    name: name,
    email: email,
    password: pass,
  };
  $.ajax({
    url: "http://localhost:3000/api/users/register",
    type: "POST",
    data: data,
    success: (res) => {
      localStorage.setItem("jwt", res);
      window.location.href = "home.html";
    },
    error: (err) => {
      console.log(err);
    },
  });
}

$(function () {
  $("#login-btn").click(loginEvent);
  $("#register-btn").click(registerEvent);
  $("#logout-btn").click(function () {
    localStorage.removeItem("jwt");
    window.location.href = "index.html";
  });
});

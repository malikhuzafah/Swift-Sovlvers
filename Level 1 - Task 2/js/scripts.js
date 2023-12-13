function loadProjects() {
  var projects = $("#portfolioTiles");
  projects.empty();
  $.ajax({
    url: "http://localhost:3000/api/projects/",
    method: "GET",
    success: function (res) {
      console.log(res);
      for (var i = 0; i < res.length; i++) {
        projects.append(
          '<div class="gallery_product col-lg-4 col-md-6 col-sm-12 filter web"><div class="container gallery_product_container"><div class="container"><a href="https://github.com/malikhuzafah/mdeicines-restfulapi" class="portfolio-item-link" target="_blank"><p class="portfolio-item-title h3"><strong>Medicines API</strong></p><p class="h6 blockquote-footer">Express</p><p class="text-muted h5">Personal Project</p></a><hr class="heading-hr"><div><a href="https://github.com/malikhuzafah/mdeicines-restfulapi" target="_blank"><span class="btn my-btn">Code</span></a><a href="https://healthica-api.herokuapp.com" target="_blank"><span class="btn my-btn">Demo</span></a><span class="btn btn-xs projects-info" data-title="Medicines API" data-bs-toggle="modal" data-subtitle="Personal Project" data-tools="NodeJs MongoDB Express" data-description="A restfull API with information about medicines like name price and quantity etc. with user authentication and authorization." data-source="https://github.com/malikhuzafah/medicines-restfulapi" data-demo="https://healthica-api.herokuapp.com" data-bs-target="#staticBackdrop"> <i class="fas fa-circle-info info-icon"></i></span></div></div></div></div>'
        );
      }
    },
    error: function (err) {
      alert(err);
    },
  });
}

$(document).on("click", 'a[href^="#"]', function (event) {
  event.preventDefault();
  $("html, body").animate(
    {
      scrollTop: $($.attr(this, "href")).offset().top,
    },
    500
  );
});

var icons = {
  React: "devicon-react-original",
  "React-native": "devicon-react-original",
  NodeJs: "devicon-nodejs-plain",
  Express: "devicon-express-original",
  MongoDB: "devicon-mongodb-plain",
  Flutter: "devicon-flutter-plain",
  Unity: "devicon-unity-original",
  Firebase: "devicon-firebase-plain",
  JQuery: "devicon-jquery-plain",
  Bootstrap: "devicon-bootstrap-plain",
};

function todayDate() {
  var d = new Date();
  var n = d.getFullYear() + "  ";
  return (document.getElementById("date").innerHTML = n);
}

function filter() {
  var value = $(this).attr("data-filter");
  if (value == "all") {
    $(".filter").show("1000");
  } else {
    $(".filter")
      .not("." + value)
      .hide("3000");
    $(".filter")
      .filter("." + value)
      .show("3000");
  }
  if ($(".filter-button").removeClass("btn-active")) {
    $(this).removeClass("btn-active");
  }
  $(this).addClass("btn-active");
}

function openNav() {
  $("#navbarSupportedContent").css("width", "100%");
  $("html, body").css({
    overflow: "hidden",
    height: "100%",
  });
}

function closeNav() {
  $("#navbarSupportedContent").css("width", "0");
  $("html, body").css({
    overflow: "auto",
    height: "auto",
  });
}

function openModal() {
  var source = this.getAttribute("data-source");
  var demo = this.getAttribute("data-demo");
  var visit = this.getAttribute("data-visit");
  var buttons = $("#modal-buttons");
  buttons.empty();
  if (source != null) {
    buttons.append(
      '<a href="' +
        source +
        '" target="_blank"><span class="btn my-btn">Code <em class="fa-solid fa-up-right-from-square"></em></span></a>'
    );
  }
  if (demo != null) {
    buttons.append(
      '<a href="' +
        demo +
        '" target="_blank"><span class="btn my-btn">Demo <em class="fa-solid fa-up-right-from-square"></em></span></a>'
    );
  }
  if (visit != null) {
    buttons.append(
      '<a href="' +
        visit +
        '" target="_blank"><span class="btn my-btn">Visit <em class="fa-solid fa-up-right-from-square"></em></span></a>'
    );
  }
  var tools = this.getAttribute("data-tools");
  var toolsSplit = tools.split(" ");
  var modalTools = $("#modal-tools");
  modalTools.empty();
  toolsSplit.forEach((element) => {
    modalTools.append(
      '<div class="col-6 col-sm-4"><span class="h6"><i class="' +
        icons[element] +
        '"></i> ' +
        element +
        "</span></div>"
    );
  });
  $("#staticBackdropLabel").html(this.getAttribute("data-title"));
  $("#modal-subtitle").html(this.getAttribute("data-subtitle"));
  $("#modal-description").html(this.getAttribute("data-description"));
}

function codeWars() {
  $.ajax({
    url: "https://www.codewars.com/api/v1/users/malik_huzafah",
    method: "GET",
    error: (err) => {
      console.log(err);
    },
    success: (response) => {
      console.log(response);
    },
  });
}

$(document).ready(function () {
  codeWars();
  if ($(window).width() > 991) {
    $(".closebtn").hide();
  } else {
    $(".closebtn").show();
  }
  window.addEventListener("resize", function () {
    if ($(window).width() > 991) {
      $(".closebtn").hide();
    } else {
      $(".closebtn").show();
    }
  });
  todayDate();
  $(".filter-button").click(filter);
  $("#navbar-toggle").click(openNav);
  $("#navbar-close-btn").click(closeNav);
  $(".gallery_product_container").click(openModal);
  $(".projects-info").click(openModal);
  $(".nav-link").click(closeNav);
  $("#send").click(function (e) {
    $("#submitted").empty();
    e.preventDefault();
    $("#send").hide();
    $("#spinner").show();
    if (!validate()) {
      $("#send").show();
      $("#spinner").hide();
      return;
    }
    var name = $("#name-input").val();
    var email = $("#email-input").val();
    var message = $("#msg-input").val();
    $.ajax({
      url: "https://formsubmit.co/ajax/huzafahrajput10@gmail.com",
      method: "POST",
      data: {
        name: name,
        email: email,
        message: message,
      },
      dataType: "json",
      success: function (res) {
        $("#name-input").val("");
        $("#email-input").val("");
        $("#msg-input").val("");
        $("#send").show();
        $("#spinner").hide();
        $("#submitted").html("Message recieved :)<br>I will contact you soon!");
      },
      error: function (err) {
        $("#send").show();
        $("#spinner").hide();
        alert("Somethong went wrong!");
      },
    });
  });
  if (localStorage.getItem("theme") === "light") {
    light();
    $("#light-switch").hide();
    $("#dark-switch").show();
  } else {
    dark();
    $("#dark-switch").hide();
    $("#light-switch").show();
  }
  $("#light-switch").click(function () {
    light();
    closeNav();
  });
  $("#dark-switch").click(function () {
    dark();
    closeNav();
  });
});

function light() {
  localStorage.setItem("theme", "light");
  $("#theme").attr(
    "href",
    "./css/themes/" + localStorage.getItem("theme") + ".css"
  );
  $("nav").removeClass("navbar-dark");
  $("nav").addClass("navbar-light");
  $("#light-switch").hide();
  $("#dark-switch").show();
}

function dark() {
  localStorage.setItem("theme", "dark");
  $("#theme").attr(
    "href",
    "./css/themes/" + localStorage.getItem("theme") + ".css"
  );
  $("nav").addClass("navbar-dark");
  $("nav").removeClass("navbar-light");
  $("#dark-switch").hide();
  $("#light-switch").show();
}

function validate() {
  var name = $("#name-input").val();
  var email = $("#email-input").val();
  var message = $("#msg-input").val();
  if (name.length <= 0) {
    $("#name-err").html("Name is required!");
    return false;
  } else {
    $("#name-err").empty();
  }
  if (email.length <= 0) {
    $("#email-err").html("Email is required!");
    return false;
  } else {
    $("#email-err").empty();
  }
  if (message.length <= 0) {
    $("#msg-err").html("Please enter some message!");
    return false;
  } else {
    $("#msg-err").empty();
  }
  $("#name-err").empty();
  $("#email-err").empty();
  $("#msg-err").empty();
  return true;
}

document.onreadystatechange = function () {
  if (document.readyState !== "complete") {
    $("#content").hide();
    $("#load").show();
  } else {
    $("#load").hide();
    $("#content").show();
  }
};

function reveal() {
  var reveals = $(".reveal");
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}
window.addEventListener("scroll", reveal);

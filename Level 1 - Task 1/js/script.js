var a = 0;
$(window).scroll(function () {
  var oTop = $("#counter").offset().top - window.innerHeight;
  if (a == 0 && $(window).scrollTop() > oTop) {
    $(".counter-value").each(function () {
      var $this = $(this),
        countTo = $this.attr("data-count");
      $({
        countNum: $this.text(),
      }).animate(
        {
          countNum: countTo,
        },
        {
          duration: 2000,
          easing: "swing",
          step: function () {
            $this.text(Math.floor(this.countNum));
          },
          complete: function () {
            $this.text(this.countNum);
          },
        }
      );
    });
    a = 1;
  }
});

$(document).on("click", 'a[href^="#"]', function (event) {
  event.preventDefault();
  $("html, body").animate(
    {
      scrollTop: $($.attr(this, "href")).offset().top - 40,
    },
    500
  );
});

function todayDate() {
  var d = new Date();
  var n = d.getFullYear() + "  ";
  return (document.getElementById("date").innerHTML = n);
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

function backNav() {
  $("#navbarSupportedContent2").css("width", "0");
}

function openProjects() {
  $("#navbarSupportedContent2").css("width", "100%");
}

$(function () {
  if ($(window).width() > 991) {
    $(".closebtn").hide();
    $(".backBtn").hide();
  } else {
    $(".closebtn").show();
    $(".backBtn").show();
  }
  window.addEventListener("resize", function () {
    if ($(window).width() > 991) {
      $(".closebtn").hide();
      $(".backBtn").hide();
    } else {
      $(".closebtn").show();
      $(".backBtn").show();
    }
  });
  $("#navbar-toggle").click(openNav);
  $("#navbar-close-btn").click(closeNav);
  $(".nav-close").click(closeNav);
  $("#proj-link").click(openProjects);
  $("#navbar-back-btn").click(backNav);

  todayDate();
  window.onscroll = function () {
    scrollFunction();
  };
  $(".navbar-brand").click(function () {
    $(window).scrollTop(0);
  });
  $(".nav-link-scroll").click(function () {
    $(window).scrollTop(0);
  });

  $(".proj-container").hover(
    function () {
      $(this).find(".proj-overlay").css("height", "100%");
      $(this).find(".proj-overlay").css("transition", "0.5s ease-in-out");
    },
    function () {
      $(this).find(".proj-overlay").css("height", "0");
      $(this).find(".proj-overlay").css("transition", "0.5s ease-in-out");
    }
  );

  $("#send").click(function () {
    $("#submitted").empty();
    $("#send").hide();
    $("#spinner").show();
    var c = 0;
    if ($("#name-input").val().length === 0) {
      $("#name-err").html("Name is required!");
    } else {
      $("#name-err").html("");
      c++;
    }
    if ($("#email-input").val().length === 0) {
      $("#email-err").html("Email is required!");
    } else {
      $("#email-err").html("");
      c++;
    }
    if ($("#msg-input").val().length === 0) {
      $("#msg-err").html("Please enter some Message!");
    } else {
      $("#msg-err").html("");
      c++;
    }
    if (c >= 3) {
      $("#submitted").html("Message recieved!<br /> We will contact you soon.");
    }
    $("#send").show();
    $("#spinner").hide();
  });
});

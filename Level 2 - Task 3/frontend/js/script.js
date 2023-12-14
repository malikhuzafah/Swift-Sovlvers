$(function () {
  loadTasks();
  $("#tasks").on("click", ".btn-del", handleDelete);
  $("#tasks").on("click", ".btn-update", handleUpdate);
  $("#update-btn").on("click", function () {
    var id = $("#id-update").val();
    var title = $("#title-update").val();
    var isCompleted =
      $("#isCompleted-update").val() === "completed" ? true : false;
    $.ajax({
      url: "http://localhost:3000/api/tasks/" + id,
      method: "PUT",
      data: {
        title: title,
        isCompleted: isCompleted,
      },
      success: function (response) {
        dismissModal();
        loadTasks();
      },
    });
  });
  $("#add-task").on("click", addTask);
  $("#cancel").on("click", dismissModal);
  $("#completed-btn").on("click", loadCompleted);
  $("#pending-btn").on("click", loadPending);
  $("#all-btn").on("click", loadTasks);
});

function markCompleted() {
  console.log("checked");
  var btn = $(this);
  var parent = btn.closest(".container");
  var id = parent.attr("data-id");
  $.ajax({
    url: "http://localhost:3000/api/tasks/" + id,
    method: "PUT",
    data: { isCompleted: true },
    success: function (response) {
      loadTasks();
    },
  });
}

function markUncompleted() {
  var btn = $(this);
  var parent = btn.closest(".container");
  var id = parent.attr("data-id");
  $.ajax({
    url: "http://localhost:3000/api/tasks/" + id,
    method: "PUT",
    data: { isCompleted: false },
    success: function (response) {
      loadTasks();
    },
  });
}

function dismissModal() {
  $("#id-update").val("");
  $("#title-update").val("");
  $("#update-modal").modal("hide");
}

function addTask() {
  var title = $("#title-input").val();
  $.ajax({
    url: "http://localhost:3000/api/tasks",
    method: "POST",
    data: {
      title: title,
    },
    success: function (response) {
      $("#title-input").val("");
      loadTasks();
    },
  });
}

function handleDelete() {
  var btn = $(this);
  var parent = btn.closest(".container");
  var id = parent.attr("data-id");
  $.ajax({
    url: "http://localhost:3000/api/tasks/" + id,
    method: "DELETE",
    success: function (response) {
      console.log("success");
      loadTasks();
    },
  });
}

function handleUpdate() {
  var btn = $(this);
  var parent = btn.closest(".container");
  var id = parent.attr("data-id");
  $.ajax({
    url: "http://localhost:3000/api/tasks/" + id,
    method: "GET",
    success: function (response) {
      console.log(response);
      $("#id-update").val(response._id);
      $("#title-update").val(response.title);
      $("#isCompleted-update").val(
        response.isCompleted ? "completed" : "pending"
      );
    },
  });
  $("#update-modal").modal("show");
}

function loadTasks() {
  $.ajax({
    url: "http://localhost:3000/api/tasks",
    method: "GET",
    error: function (err) {
      $("#tasks").html("Error Occured");
    },
    success: function (response) {
      $("#tasks").empty();
      for (var i = 0; i < response.length; i++) {
        dateObj = new Date(response[i].createdAt);
        date = dateObj.toDateString();

        $("#tasks").append(
          '<div data-id="' +
            response[i]._id +
            '" class="container task-container"><div class="row"><div class="col task-content"><div><span class="h3">' +
            response[i].title +
            "</span><br /><span>" +
            date +
            '</span></div><div><i class="fa-regular fa-pen-to-square task-btn btn-update"></i><i class="fa-solid fa-trash task-btn btn-del"></i></div></div></div></div><br>'
        );
      }
      $(".filter-btn").removeClass("active");
      $("#all-btn").addClass("active");
    },
  });
}

function loadPending() {
  $.ajax({
    url: "http://localhost:3000/api/tasks",
    method: "GET",
    error: function (response) {
      $("#tasks").html("Error Occured");
    },
    success: function (response) {
      console.log(response);
      $("#tasks").empty();
      for (var i = 0; i < response.length; i++) {
        if (!response[i].isCompleted) {
          $("#tasks").append(
            '<div data-id="' +
              response[i]._id +
              '" class="container task-container"><div class="row"><div class="col task-content"><div><span class="h3">' +
              response[i].title +
              '</span></div><div><i class="fa-regular fa-pen-to-square task-btn btn-update"></i><i class="fa-solid fa-trash task-btn btn-del"></i></div></div></div></div><br>'
          );
        }
      }
      $(".filter-btn").removeClass("active");
      $("#pending-btn").addClass("active");
    },
  });
}

function loadCompleted() {
  $.ajax({
    url: "http://localhost:3000/api/tasks",
    method: "GET",
    error: function (response) {
      $("#tasks").html("Error Occured");
    },
    success: function (response) {
      console.log(response);
      $("#tasks").empty();
      for (var i = 0; i < response.length; i++) {
        if (response[i].isCompleted) {
          $("#tasks").append(
            '<div data-id="' +
              response[i]._id +
              '" class="container task-container"><div class="row"><div class="col task-content"><div><span class="h3">' +
              response[i].title +
              '</span></div><div><i class="fa-regular fa-pen-to-square task-btn btn-update"></i><i class="fa-solid fa-trash task-btn btn-del"></i></div></div></div></div><br>'
          );
        }
        $(".filter-btn").removeClass("active");
        $("#completed-btn").addClass("active");
      }
    },
  });
}

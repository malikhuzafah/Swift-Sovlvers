$(() => {
  $("#result-container").hide();
  $("#conv-input").html(
    '<option value="f">Fahrenheit</option><option value="k">Kelvin</option>'
  );
  $("#unit-input").change(() => {
    var unit = $("#unit-input").val();
    if (unit == "c") {
      $("#conv-input").html(
        '<option value="f">Fahrenheit</option><option value="k">Kelvin</option>'
      );
    }
    if (unit == "f") {
      $("#conv-input").html(
        '<option value="c">Celsius</option><option value="k">Kelvin</option>'
      );
    }
    if (unit == "k") {
      $("#conv-input").html(
        '<option value="c">Celsius</option><option value="f">Fahrenheit</option>'
      );
    }
  });
  $("#convert-btn").click(() => {
    convert();
  });
});

function convert() {
  var temp = $("#temp-input").val();
  var unit = $("#unit-input").val();
  var conv = $("#conv-input").val();
  validate(temp, unit, conv);
}

function validate(temp, unit, conv) {
  if (temp == "") {
    $("#temp-err").html("Please enter a temperature");
  } else if (isNaN(temp)) {
    $("#temp-err").html("Please enter a valid number");
  } else if (unit == conv) {
    $("#unit-err").html("Please select a different unit to convert to");
    $("#conv-err").html("Please select a different unit to convert to");
  } else {
    $("#temp-err").html("");
    $("#unit-err").html("");
    $("#conv-err").html("");
    convertTemp(parseInt(temp), unit, conv);
  }
}

function convertTemp(temp, unit, conv) {
  var convertedTemp;
  if (unit == "c") {
    if (conv == "f") {
      convertedTemp = (temp * 9) / 5 + 32;
    } else if (conv == "k") {
      convertedTemp = temp + 273.15;
    }
  } else if (unit == "f") {
    if (conv == "c") {
      convertedTemp = ((temp - 32) * 5) / 9;
    } else if (conv == "k") {
      convertedTemp = ((temp - 32) * 5) / 9 + 273.15;
    }
  } else if (unit == "k") {
    if (conv == "c") {
      convertedTemp = temp - 273.15;
    } else if (conv == "f") {
      convertedTemp = ((temp - 273.15) * 9) / 5 + 32;
    }
  }
  $("#result").html(
    convertedTemp.toFixed(4) + (conv == "k" ? " " : " ° ") + conv.toUpperCase()
  );
  $("#result-container").show();
}

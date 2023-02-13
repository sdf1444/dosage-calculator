$(document).ready(function () {
  // Attach an event handler to the submit event of the form
  $("form").submit(function (e) {
    const form = $(this);
    // Prevent the default submit behavior of the form
    e.preventDefault();
    // Define the lookup table data
    const lookupTable = [
      {
        "Twice Daily Dose (mL)": 0.2,
        "Bottle Size (mL)": 30,
        "Number of bottle(s) per delivery": 1,
        "Total days supply": 75,
        "Number of month supply": 2.5
      },
      {
        "Twice Daily Dose (mL)": 0.3,
        "Bottle Size (mL)": 30,
        "Number of bottle(s) per delivery": 2,
        "Total days supply": 100,
        "Number of month supply": 3.3
      },
      {
        "Twice Daily Dose (mL)": 0.4,
        "Bottle Size (mL)": 30,
        "Number of bottle(s) per delivery": 2,
        "Total days supply": 75,
        "Number of month supply": 2.5
      },
      {
        "Twice Daily Dose (mL)": 0.5,
        "Bottle Size (mL)": 30,
        "Number of bottle(s) per delivery": 3,
        "Total days supply": 90,
        "Number of month supply": 3.0
      },
      {
        "Twice Daily Dose (mL)": 0.6,
        "Bottle Size (mL)": 60,
        "Number of bottle(s) per delivery": 2,
        "Total days supply": 100,
        "Number of month supply": 3.3
      },
      {
        "Twice Daily Dose (mL)": 0.7,
        "Bottle Size (mL)": 60,
        "Number of bottle(s) per delivery": 2,
        "Total days supply": 86,
        "Number of month supply": 2.9
      },
      {
        "Twice Daily Dose (mL)": 0.8,
        "Bottle Size (mL)": 60,
        "Number of bottle(s) per delivery": 2,
        "Total days supply": 75,
        "Number of month supply": 2.5
      },
      {
        "Twice Daily Dose (mL)": 0.9,
        "Bottle Size (mL)": 60,
        "Number of bottle(s) per delivery": 3,
        "Total days supply": 100,
        "Number of month supply": 3.3
      },
      {
        "Twice Daily Dose (mL)": 1,
        "Bottle Size (mL)": 60,
        "Number of bottle(s) per delivery": 3,
        "Total days supply": 100,
        "Number of month supply": 3.0
      },
      {
        "Twice Daily Dose (mL)": 1.1,
        "Bottle Size (mL)": 120,
        "Number of bottle(s) per delivery": 2,
        "Total days supply": 109,
        "Number of month supply": 3.6
      },
      {
        "Twice Daily Dose (mL)": 1.2,
        "Bottle Size (mL)": 120,
        "Number of bottle(s) per delivery": 2,
        "Total days supply": 100,
        "Number of month supply": 3.3
      },
      {
        "Twice Daily Dose (mL)": 1.3,
        "Bottle Size (mL)": 120,
        "Number of bottle(s) per delivery": 2,
        "Total days supply": 92,
        "Number of month supply": 3.1
      },
      {
        "Twice Daily Dose (mL)": 1.4,
        "Bottle Size (mL)": 120,
        "Number of bottle(s) per delivery": 2,
        "Total days supply": 86,
        "Number of month supply": 2.9
      },
      {
        "Twice Daily Dose (mL)": 1.5,
        "Bottle Size (mL)": 120,
        "Number of bottle(s) per delivery": 2,
        "Total days supply": 80,
        "Number of month supply": 2.7
      },
      {
        "Twice Daily Dose (mL)": 2,
        "Bottle Size (mL)": 120,
        "Number of bottle(s) per delivery": 3,
        "Total days supply": 90,
        "Number of month supply": 3.0
      },
      {
        "Twice Daily Dose (mL)": 2.5,
        "Bottle Size (mL)": 250,
        "Number of bottle(s) per delivery": 2,
        "Total days supply": 100,
        "Number of month supply": 3.3
      },
      {
        "Twice Daily Dose (mL)": 3,
        "Bottle Size (mL)": 250,
        "Number of bottle(s) per delivery": 2,
        "Total days supply": 83,
        "Number of month supply": 2.8
      },
      {
        "Twice Daily Dose (mL)": 3.5,
        "Bottle Size (mL)": 250,
        "Number of bottle(s) per delivery": 3,
        "Total days supply": 107,
        "Number of month supply": 3.6
      },
      {
        "Twice Daily Dose (mL)": 4,
        "Bottle Size (mL)": 360,
        "Number of bottle(s) per delivery": 2,
        "Total days supply": 90,
        "Number of month supply": 3.0
      },
      {
        "Twice Daily Dose (mL)": 4.5,
        "Bottle Size (mL)": 360,
        "Number of bottle(s) per delivery": 2,
        "Total days supply": 80,
        "Number of month supply": 2.7
      },
      {
        "Twice Daily Dose (mL)": 5,
        "Bottle Size (mL)": 360,
        "Number of bottle(s) per delivery": 3,
        "Total days supply": 108,
        "Number of month supply": 3.6
      },
      {
        "Twice Daily Dose (mL)": 5.5,
        "Bottle Size (mL)": 360,
        "Number of bottle(s) per delivery": 3,
        "Total days supply": 98,
        "Number of month supply": 3.3
      },
      {
        "Twice Daily Dose (mL)": 6,
        "Bottle Size (mL)": 360,
        "Number of bottle(s) per delivery": 3,
        "Total days supply": 90,
        "Number of month supply": 3.0
      },
    ];
    // Get the values from the form fields
    const isTakingStiripentumab = $("#isStiripentumab").val();
    const dose = $("#dose").val();
    const patientWeight = $("#patientWeight").val();
    let dailyDose = dose * patientWeight;

    // Check if the patient is taking stiripentumab and adjust the daily dose
    const maxDose = isTakingStiripentumab === "yes" ? 20 : 30;
    dailyDose = dailyDose >= maxDose ? maxDose : dailyDose;

    // Calculate the twice daily dose
    const twiceDailyDose = (dailyDose / 5).toFixed(1);
    let roundedDose = null;

    // Round the twice daily dose up or donw to the nearest 0.1ml or 0.5ml
    if (twiceDailyDose <= 1.5) {
      roundedDose = Math.round(twiceDailyDose * 10) / 10;
    } else {
      roundedDose = Math.round(twiceDailyDose * 2) / 2;
    }

    // Find the matching row in the lookup table
    const supplyDetails = lookupTable.find(
      item => item["Twice Daily Dose (mL)"] === roundedDose
    );

    // Show the success message
    const successMessage = $("<div>").text("Form submitted successfully!").addClass("success-message");
    form.prepend(successMessage);
    setTimeout(function () {
      successMessage.fadeOut(400, function () {
        successMessage.remove();
      });
    }, 1000);

    $("#twiceDailyDose").text(roundedDose);
    $("#bottleSize").text(supplyDetails["Bottle Size (mL)"]);
    $("#bottleQuantity").text(supplyDetails["Number of bottle(s) per delivery"]);
    $("#supplyLasts").text(supplyDetails["Total days supply"]);
    $("#result").show();
  });

  // Listen for form reset event
  $("form").on("reset", function (e) {
    e.preventDefault();
    // Clear the form fields
    $("#isStiripentumab").val("");
    $("#patientWeight").val("");
    $("#dose").val("");
    // Hide the result section
    $("#result").hide();
  });
});
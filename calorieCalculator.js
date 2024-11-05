function calculateCalories() {
    const age = parseInt(document.getElementById("age").value);
    const weight = parseInt(document.getElementById("weight").value);
    const heightFeet = parseInt(document.getElementById("heightFeet").value);
    const heightInches = parseInt(document.getElementById("heightInches").value);
    const activity = document.getElementById("activity").value;
    const gender = document.querySelector('input[name="gender"]:checked');

    // Check if all fields are filled
    if (!gender || !age || !weight || !heightFeet || !heightInches || !activity) {
        alert("Please fill in all fields.");
        return;
    }

    // Convert weight to kg and height to cm
    const weightInKg = weight * 0.453592; // weight in kg
    const heightInTotalInches = (heightFeet * 12) + heightInches;
    const heightInCm = heightInTotalInches * 2.54; // height in cm

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr;
    if (gender.value === "male") {
        bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * age + 5; // height in cm
    } else {
        bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * age - 161; // height in cm
    }

    // Activity multipliers
    const activityMultipliers = {
        sedentary: 1.2,
        lightly_active: 1.375,
        moderately_active: 1.55,
        very_active: 1.725,
    };

    const maintenanceCalories = bmr * activityMultipliers[activity];

    // Weight loss options
    const deficits = {
        slow: 250,
        moderate: 500,
        faster: 750,
        aggressive: 1000,
    };

    const results = Object.entries(deficits).map(([key, value]) => {
        return `${key.charAt(0).toUpperCase() + key.slice(1)} Loss: ${Math.round(maintenanceCalories - value)} calories/day`;
    });

    document.getElementById("result").innerHTML = `
        Maintenance Calories: ${Math.round(maintenanceCalories)}<br>
        ${results.join('<br>')}
    `;
}

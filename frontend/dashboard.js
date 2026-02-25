let currentUser = JSON.parse(localStorage.getItem("user"));

if(!currentUser){
    alert("Please login first!");
    window.location.href = "login.html";
}

document.getElementById("displayName").innerText = "Name - " + currentUser.name ;

document.getElementById("displayAge").innerText = "Age - " + currentUser.age;

document.getElementById("displayClass").innerText = "Class - " + currentUser.studentClass;

async function updateAttendance() {

    const total = document.getElementById("total").value;
    const attended = document.getElementById("attended").value;

    const user = JSON.parse(localStorage.getItem("user"));

    const response = await fetch("https://student-portal-3-8bbc.onrender.com/update-attendance", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: user.id,
            totalClasses: Number(total),
            attendedClasses: Number(attended)
        })
    });

    const data = await response.json();

    alert(data.message);
    document.getElementById("percentage").innerText = data.percentage + "%";
}

function logoutUser() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}
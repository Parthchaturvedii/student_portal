async function registerUser() {

    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const studentClass = document.getElementById("class").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!name || !age || !studentClass || !email || !password) {
        alert("Please fill all fields");
        return;
    }

    try {
        const response = await fetch("https://student-portal-3-8bbc.onrender.com/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                age,
                studentClass,
                email,
                password
            })
        });

        const data = await response.json();
        console.log(data);

        alert(data.message);

        if (data.message === "User registered successfully") {
            window.location.href = "login.html";
        }

    } catch (error) {
        console.error("Error:", error);
        alert("Server not responding");
    }
}
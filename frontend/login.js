async function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Please fill all fields");
        return;
    }

    // Admin Login (optional)
    if (email === "admin@stu.com" && password === "admin123") {
        localStorage.setItem("isAdmin", "true");
        window.location.href = "admin.html";
        return;
    }

    const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    console.log(data);

    if (data.message === "Login successful") {
        alert(data.message);
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "dashboard.html";
    } else {
        alert(data.message);
    }
}
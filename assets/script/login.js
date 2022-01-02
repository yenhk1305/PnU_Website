function xuLy() {
    if (form.msthe.value == "" || form.pass.value == "") {
        alert("Vui lòng nhập đầy đủ thông tin.")
    } else {
        alert("Đăng nhập thành công.")
        window.location.href = "index.html"
    }
}
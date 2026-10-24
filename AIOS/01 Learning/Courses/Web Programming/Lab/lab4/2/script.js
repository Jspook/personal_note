document.getElementById("loginform").addEventListener("submit",function(event){
    const username = document.getElementById("uname").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById("password").value;
    const confirmpassword = document.getElementById("cpassword").value;

    if (username.length < 5){
        alert("Username must more than 5 charecter");
        event.preventDefault();return
    }

    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(phone)){
        alert("Phone number must have 10 charecter");
        event.preventDefault();return
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email)){
        alert("email format incorrent");
        event.preventDefault();return
    }

    const passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passPattern.test(password)){
        alert("password format incorrect");
        event.preventDefault();return
    }

    if(password != confirmpassword){
        alert("password incorrect");
        event.preventDefault();return
    }

    alert("All Done!!!");
});

const translations = {
    th: {
        ptranslate:"ภาษา",
        head:"ลงทะเบียนผู้ใช้",
        username:"ชื่อผู้ใช้",
        Email:"อีเมล",
        phonenum:"หมายเลขโทรศัพท์",
        pass:"รหัสผ่าน",
        cpass:"ยืนยันรหัสผ่าน",
        register:"ลงทะเบียน"
    },

    en: {
        ptranslate:"Language",
        head:"User Registration",
        username:"Username",
        Email:"Email",
        phonenum:"Phone Number",
        pass:"Password",
        cpass:"Confirm Password",
        register:"Register"
    }
}


function setLanguage() {
  const lang = document.getElementById("langSelect").value;
  const selectedTranslations = translations[lang];

  Object.keys(selectedTranslations).forEach(function (id) {
    document.getElementById(id).textContent = selectedTranslations[id];
  });
}
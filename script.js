/*Inisalisasi awa (element)*/
const container = document.querySelector(".container");
const headingSpan2 = document.querySelector(".heading-span-2");
const form = document.querySelector(".form");
const eyeIcons = document.querySelectorAll('.eye-icon');


/*Eye Icon to Show and Hide Password*/
eyeIcons.forEach((icon) => {
  icon.addEventListener('click', () => {
    // Find the input field related to the clicked icon
    const passwordField = icon.previousElementSibling;

    // Toggle between 'password' and 'text'
    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      icon.classList.replace('bx-hide', 'bx-show'); // Change icon
    } else {
      passwordField.type = 'password';
      icon.classList.replace('bx-show', 'bx-hide'); // Change icon back
    }
  });
});


/*Hapus semua yang udh diinput apabila tekan tombol sign up atau sign in*/
const clearForm = () => {
  document.querySelectorAll(".form-input-wrapper").forEach((item) => {
    item.className = "form-input-wrapper";
  });
  form.reset();
};

/*Ganti judul dari sign in ke sign up ketika tekan button sign up*/
document.querySelector(".signup-btn").addEventListener("click", () => {
  container.classList.add("change");
  setTimeout(() => {
    headingSpan2.textContent = "Up";
  }, 200);
  form.className = "form sign-up";
  clearForm();
});

/*Ganti judul dari sign up ke sign in ketika teka button sign in*/
document.querySelector(".signin-btn").addEventListener("click", () => {
  container.classList.remove("change");
  setTimeout(() => {
    headingSpan2.textContent = "In";
  }, 200);
  form.className = "form sign-in";
  clearForm();
});


/*Inisialisasi awal ( Variabel)*/
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

/*Email atau Password salah*/
const error = (input, message) => {
  const inputWrapper = input.parentElement;
  inputWrapper.className = "form-input-wrapper error";
  inputWrapper.querySelector(".message").textContent = message;
};

/*Email dan Password benar*/
const success = (input) => {
  const inputWrapper = input.parentElement;
  inputWrapper.className = "form-input-wrapper success";
};

/*Cek Input Email*/
const checkEmail = (input) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (regEx.test(input.value.trim())) {
    success(input);
  } else {
    error(input, "Email tidak valid");
  }
};

/*Wajib Konfirmasi Password*/
const checkRequiredFields = (inputArr) => {
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      if (input.id === "password2") {
        error(input, "Konfirmasi Password harus diisi");
      } else {
        error(input, `${input.id} is required`);
      }
    } else {
      success(input);
    }
  });
};


/*Cek Konfirmasi Password*/
const passwordsMatch = (input1, input2) => {
  if (input1.value !== input2.value) {
    error(input2, "Password salah");
  }
};
const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    error(input, `${input.id} must be at least ${min} characters`);
  } else if (input.value.length > max) {
    error(input, `${input.id} must be less than ${max} characters`);
  } else {
    success(input);
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (form.classList[1] === "sign-up") {
    checkRequiredFields([username, email, password, password2]);
    checkLength(username, 2, 15);
    checkLength(password, 5, 25);
    passwordsMatch(password, password2);
  } else {
    checkRequiredFields([email, password]);
  }
  checkEmail(email);
});

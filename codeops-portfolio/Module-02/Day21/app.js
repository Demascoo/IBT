const form = document.getElementById("signup");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const PHONE = /^(?:\+251|0)9\d{8}$/;
function validate(name, phone) {
  if (name.length < 2) {
    return "Name must be at least 2 characters";
  }
  if (!PHONE.test(phone)) {
    return "Enter a valid Ethiopian phone number";
  }
  return "";
}
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const message = validate(name, phone);
  if (message) {
    alert(message);
    return;
  }
  const person = {
    name: name,
    phone: phone,
  };
  let people = JSON.parse(localStorage.getItem("people")) || [];
  people.push(person);
  localStorage.setItem("people", JSON.stringify(people));
  alert("Signup successful!");
  console.log("Name:", name);
  console.log("Phone:", phone);
  console.log("People signed up:", people.length);
  form.reset();
});

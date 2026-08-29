import PropTypes from "prop-types";
import { useState } from "react";
import "./OrderForm.css";

function OrderForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "Bole",
  });

  const [errors, setErrors] = useState({
    phone: "",
  });

  // Validate TeleBirr phone number
  const isValidPhone = (phone) => {
    // Ethiopian phone number format: 09XXXXXXXX or +2519XXXXXXXX
    const phoneRegex = /^(09\d{8}|(\+251)9\d{8})$/;
    return phoneRegex.test(phone);
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Validate phone number
    if (name === "phone") {
      if (value && !isValidPhone(value)) {
        setErrors({ ...errors, phone: "Use 09XXXXXXXX or +2519XXXXXXXX" });
      } else {
        setErrors({ ...errors, phone: "" });
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isValidPhone(form.phone) && form.name.trim()) {
      alert(`Order delivered to: ${form.name}, ${form.area}`);
      // Reset form
      setForm({ name: "", phone: "", area: "Bole" });
      setErrors({ phone: "" });
    }
  }

  const isFormValid = form.name.trim() && isValidPhone(form.phone);

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <h3>Delivery Information</h3>

      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your full name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone (TeleBirr)</label>
        <input
          id="phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="09XXXXXXXX"
          required
        />
        {errors.phone && <p className="error">{errors.phone}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="area">Delivery Area</label>
        <select id="area" name="area" value={form.area} onChange={handleChange}>
          <option value="Bole">Bole</option>
          <option value="Piassa">Piassa</option>
          <option value="Megenagna">Megenagna</option>
          <option value="Sarbet">Sarbet</option>
          <option value="Cazanchis">Cazanchis</option>
        </select>
      </div>

      <button type="submit" disabled={!isFormValid} className="submit-btn">
        Pay with TeleBirr
      </button>
    </form>
  );
}

export default OrderForm;

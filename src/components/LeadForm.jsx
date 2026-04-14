import { useState, useEffect } from "react";

// lead ka form
function LeadForm({ lead, onSave, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [source, setSource] = useState("Website");
  const [status, setStatus] = useState("New");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState({});

  // Edit form
  useEffect(
    function () {
      if (lead) {
        setName(lead.name);
        setEmail(lead.email);
        setPhone(lead.phone);
        setCompany(lead.company);
        setSource(lead.source);
        setStatus(lead.status);
        setNotes(lead.notes);
      }
    },
    [lead],
  );

  //Check form for validation all data fill or not
  function checkForm() {
    let err = {};

    if (name.trim() === "") {
      err.name = "Enter Name";
    }

    if (email.trim() === "") {
      err.email = "Enter Email";
    } else if (!email.includes("@") || !email.includes(".")) {
      err.email = "Proper Email";
    }

    if (phone.trim() === "") {
      err.phone = "Enter Phone Number";
    } else if (phone.length < 10) {
      err.phone = "Phone Number 10 digit";
    }

    if (company.trim() === "") {
      err.company = "Enter Company Name";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  }

  function formSubmit(e) {
    e.preventDefault();
    if (!checkForm()) return;

    let data = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      company: company.trim(),
      source: source,
      status: status,
      notes: notes.trim(),
    };

    if (lead) {
      data.id = lead.id;
    }

    onSave(data);
  }

  //New form
  return (
    <div className="overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{lead ? "Lead Edit" : "Lead Form"}</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <form className="form-body" onSubmit={formSubmit}>
          <div className="form-group">
            <label>Lead Name *</label>
            <input
              type="text"
              value={name}
              onChange={function (e) {
                setName(e.target.value);
              }}
              placeholder="Lead Name"
              className={errors.name ? "error-input" : ""}
            />
            {errors.name && <p className="error-msg">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="text"
              value={email}
              onChange={function (e) {
                setEmail(e.target.value);
              }}
              placeholder="example@email.com"
              className={errors.email ? "error-input" : ""}
            />
            {errors.email && <p className="error-msg">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label>Phone Number *</label>
            <input
              type="text"
              value={phone}
              onChange={function (e) {
                setPhone(e.target.value);
              }}
              placeholder="976048XXXX"
              className={errors.phone ? "error-input" : ""}
            />
            {errors.phone && <p className="error-msg">{errors.phone}</p>}
          </div>

          <div className="form-group">
            <label>Company Name *</label>
            <input
              type="text"
              value={company}
              onChange={function (e) {
                setCompany(e.target.value);
              }}
              placeholder="Enter Company Name"
              className={errors.company ? "error-input" : ""}
            />
            {errors.company && <p className="error-msg">{errors.company}</p>}
          </div>

          <div className="two-col">
            <div className="form-group">
              <label>Lead Source</label>
              <select
                value={source}
                onChange={function (e) {
                  setSource(e.target.value);
                }}
              >
                <option>Website</option>
                <option>Referral</option>
                <option>LinkedIn</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Lead Status</label>
              <select
                value={status}
                onChange={function (e) {
                  setStatus(e.target.value);
                }}
              >
                <option>New</option>
                <option>Contacted</option>
                <option>Follow-up</option>
                <option>Converted</option>
                <option>Lost</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Notes (Optional)</label>
            <textarea
              value={notes}
              onChange={function (e) {
                setNotes(e.target.value);
              }}
              rows={2}
              placeholder="Note..."
            />
          </div>

          <div className="form-buttons">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              {lead ? "Update" : "Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LeadForm;

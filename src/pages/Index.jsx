import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import LeadForm from "../components/LeadForm.jsx";
import LeadCard from "../components/LeadCard.jsx";

function Index() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editLead, setEditLead] = useState(null);

  //starting page data load or save in local stroage
  useEffect(function () {
    let savedData = localStorage.getItem("leads");

    if (savedData) {
      setLeads(JSON.parse(savedData));
    } else {
      // api data
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then(function (response) {
          let sources = ["Website", "Referral", "LinkedIn", "Other"];
          let statuses = ["New", "Contacted", "Follow-up", "Converted", "Lost"];

          let data = response.data.map(function (user) {
            return {
              id: crypto.randomUUID(),
              name: user.name,
              email: user.email,
              phone: user.phone
                .replace(/[^0-9]/g, "")
                .slice(0, 10)
                .padEnd(10, "0"),
              company: user.company.name,
              source: sources[Math.floor(Math.random() * sources.length)],
              status: statuses[Math.floor(Math.random() * statuses.length)],
              notes: "",
            };
          });

          setLeads(data);
          localStorage.setItem("leads", JSON.stringify(data));
        })
        .catch(function (error) {
          console.log("Data load Error:", error);
        });
    }
  }, []);

  // any change of lead than save
  useEffect(
    function () {
      if (leads.length > 0) {
        localStorage.setItem("leads", JSON.stringify(leads));
      }
    },
    [leads],
  );

  // search aur filter
  let filteredLeads = useMemo(
    function () {
      let result = leads;

      if (search.trim() !== "") {
        let term = search.toLowerCase();
        result = result.filter(function (lead) {
          return (
            lead.name.toLowerCase().includes(term) ||
            lead.company.toLowerCase().includes(term)
          );
        });
      }

      if (filterStatus !== "") {
        result = result.filter(function (lead) {
          return lead.status === filterStatus;
        });
      }

      return result;
    },
    [leads, search, filterStatus],
  );

  //when any change lead than update
  function handleSave(data) {
    if (data.id) {
      let updated = leads.map(function (l) {
        if (l.id === data.id) {
          return { ...l, ...data };
        }
        return l;
      });
      setLeads(updated);
    } else {
      data.id = crypto.randomUUID();
      setLeads([data, ...leads]);
    }
    setShowForm(false);
    setEditLead(null);
  }

  // lead delete fnc
  function handleDelete(id) {
    let updated = leads.filter(function (l) {
      return l.id !== id;
    });
    setLeads(updated);
    localStorage.setItem("leads", JSON.stringify(updated));
  }

  // edit form
  function handleEdit(lead) {
    setEditLead(lead);
    setShowForm(true);
  }

  // new lead form
  function openAddForm() {
    setEditLead(null);
    setShowForm(true);
  }

  return (
    <div>
      <div className="header">
        <div>
          <h1>Mini CRM</h1>
          <span>{leads.length} total leads</span>
        </div>
        <button className="add-btn" onClick={openAddForm}>
          + Add Lead
        </button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for company and name..."
          value={search}
          onChange={function (e) {
            setSearch(e.target.value);
          }}
        />
        <select
          value={filterStatus}
          onChange={function (e) {
            setFilterStatus(e.target.value);
          }}
        >
          <option value="">All Statuses</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Follow-up">Follow-up</option>
          <option value="Converted">Converted</option>
          <option value="Lost">Lost</option>
        </select>
      </div>

      {filteredLeads.length === 0 ? (
        <p className="no-data">No Lead Data Found.</p>
      ) : (
        <div className="cards-container">
          {filteredLeads.map(function (lead) {
            return (
              <LeadCard
                key={lead.id}
                lead={lead}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            );
          })}
        </div>
      )}

      {showForm && (
        <LeadForm
          lead={editLead}
          onSave={handleSave}
          onClose={function () {
            setShowForm(false);
            setEditLead(null);
          }}
        />
      )}
    </div>
  );
}

export default Index;

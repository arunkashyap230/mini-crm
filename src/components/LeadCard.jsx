//This component only one lead data show

//Lead card

function LeadCard({ lead, onEdit, onDelete }) {
  function tagClass(status) {
    if (status === "New") return "tag tag-new";
    if (status === "Contacted") return "tag tag-contacted";
    if (status === "Follow-up") return "tag tag-followup";
    if (status === "Converted") return "tag tag-converted";
    if (status === "Lost") return "tag tag-lost";
    return "tag";
  }

  return (
    <div className="lead-card">
      <div className="card-top">
        <div>
          <h3>{lead.name}</h3>
          <p>Source: {lead.source}</p>
        </div>
        <span className={tagClass(lead.status)}>{lead.status}</span>
      </div>
      <p>📧 {lead.email}</p>
      <p>📞 {lead.phone}</p>
      <p>🏢 {lead.company}</p>
      {lead.notes && <div className="notes-text">"{lead.notes}"</div>}
      <div className="card-buttons">
        <button className="edit-btn" onClick={() => onEdit(lead)}>
          ✏️ Edit
        </button>
        <button className="delete-btn" onClick={() => onDelete(lead.id)}>
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

export default LeadCard;

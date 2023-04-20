class Issue {
  constructor(desc, severity, assignedTo) {
    this.id = chance.guid();
    this.description = desc;
    this.severity = severity;
    this.assignedTo = assignedTo;
    this.status = 'Open';
  }
}

class IssuesList {
  constructor() {
    this.issues = JSON.parse(localStorage.getItem('issues')) || [];
  }
  
  addIssue(issue) {
    this.issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(this.issues));
  }
  
  setStatusClosed(id) {
    this.issues.forEach(issue => {
      if (issue.id == id) {
        issue.status = 'Closed';
      }
    });
    localStorage.setItem('issues', JSON.stringify(this.issues));
    this.render();
  }
  
  deleteIssue(id) {
    this.issues = this.issues.filter(issue => issue.id != id);
    localStorage.setItem('issues', JSON.stringify(this.issues));
    this.render();
  }
  
  render() {
    let issuesList = document.getElementById('issuesList');
    issuesList.innerHTML = '';
    
    this.issues.forEach(issue => {
      issuesList.innerHTML += `<div class="well">
                                <h6>Issue ID: ${issue.id}</h6>
                                <p><span class="label label-info">${issue.status}</span></p>
                                <h3>${issue.description}</h3>
                                <p><span class="priority">Priority:</span> ${issue.severity}</p>
                                <p><span class="assigned">Assigned to:</span> ${issue.assignedTo}</p>
                                <a href="#" onclick="issuesList.setStatusClosed('${issue.id}')" class="btn-warning">Close</a>
                                <a href="#" onclick="issuesList.deleteIssue('${issue.id}')" class="btn-danger">Delete</a>
                              </div>`;
    });
  }
}

const issueInputForm = document.getElementById('issueInputForm');
const issuesList = new IssuesList();

issueInputForm.addEventListener('submit', e => {
  e.preventDefault();
  
  let issueDesc = document.getElementById('issueDescInput').value;
  let issueSeverity = document.getElementById('issueSeverityInput').value;
  let issueAssignedTo = document.getElementById('issueAssignedToInput').value;
  
  let issue = new Issue(issueDesc, issueSeverity, issueAssignedTo);
  issuesList.addIssue(issue);
  
  issueInputForm.reset();
  issuesList.render();
});

issuesList.render();

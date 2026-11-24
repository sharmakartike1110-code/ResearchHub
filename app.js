const $ = (id) => document.getElementById(id);
const KEY = "researchhub_data_v1";
const defaultData = {
  user: { name: "Kartike Sharma", email: "kartike@example.com" },
  projects: [
    {
      id: 1,
      name: "Sustainable Energy Study",
      description:
        "Exploring renewable energy adoption among urban communities.",
      progress: 68,
      status: "In progress",
      due: "2026-12-12",
    },
    {
      id: 2,
      name: "AI in Higher Education",
      description: "A study of AI-supported learning experiences and outcomes.",
      progress: 35,
      status: "In progress",
      due: "2026-12-20",
    },
    {
      id: 3,
      name: "Digital Library Access",
      description:
        "Understanding student access to digital academic resources.",
      progress: 90,
      status: "In progress",
      due: "2026-11-25",
    },
  ],
  tasks: [
    {
      id: 1,
      name: "Review related literature",
      project: "Sustainable Energy Study",
      assignee: "Kartike Sharma",
      due: "2026-11-05",
      priority: "High",
      status: "In Progress",
    },
    {
      id: 2,
      name: "Prepare survey questions",
      project: "AI in Higher Education",
      assignee: "Aarav Mehta",
      due: "2026-11-08",
      priority: "Medium",
      status: "To Do",
    },
    {
      id: 3,
      name: "Organize collected sources",
      project: "Digital Library Access",
      assignee: "Kartike Sharma",
      due: "2026-11-10",
      priority: "Low",
      status: "Completed",
    },
    {
      id: 4,
      name: "Draft research objectives",
      project: "Sustainable Energy Study",
      assignee: "Simran Kaur",
      due: "2026-11-14",
      priority: "Medium",
      status: "To Do",
    },
  ],
  milestones: [
    {
      id: 1,
      title: "Finalize research topic",
      project: "Sustainable Energy Study",
      date: "2026-11-07",
      done: true,
    },
    {
      id: 2,
      title: "Complete literature review",
      project: "Sustainable Energy Study",
      date: "2026-11-18",
      done: false,
    },
    {
      id: 3,
      title: "Submit first project draft",
      project: "AI in Higher Education",
      date: "2026-12-05",
      done: false,
    },
  ],
  resources: [
    {
      id: 1,
      title: "Google Scholar",
      url: "https://scholar.google.com",
      type: "Research link",
      notes: "Search scholarly literature and academic papers.",
    },
    {
      id: 2,
      title: "Research methodology guide",
      url: "https://www.nature.com/subjects/research-methods",
      type: "Reference",
      notes: "Background reading on research methods.",
    },
  ],
  members: [
    {
      id: 1,
      name: "Kartike Sharma",
      email: "kartike@example.com",
      role: "Admin",
    },
    {
      id: 2,
      name: "Aarav Mehta",
      email: "aarav@example.com",
      role: "Team Leader",
    },
    { id: 3, name: "Simran Kaur", email: "simran@example.com", role: "Member" },
  ],
  activities: [
    {
      id: 1,
      icon: "＋",
      text: "<strong>Kartike Sharma</strong> created the ResearchHub workspace",
      time: "Today",
    },
    {
      id: 2,
      icon: "✓",
      text: "A task board is ready for your team",
      time: "Today",
    },
    {
      id: 3,
      icon: "⌁",
      text: "Research resources can be saved in your library",
      time: "Today",
    },
  ],
};
let data;
try {
  data = JSON.parse(localStorage.getItem(KEY)) || structuredClone(defaultData);
} catch {
  data = JSON.parse(JSON.stringify(defaultData));
}
function save() {
  localStorage.setItem(KEY, JSON.stringify(data));
}
if (!localStorage.getItem(KEY)) save();
function esc(v = "") {
  return String(v).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
}
function log(icon, html) {
  data.activities.unshift({
    id: Date.now(),
    icon,
    text: html,
    time: "Just now",
  });
  data.activities = data.activities.slice(0, 60);
  save();
}
function toast(msg) {
  const t = $("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => t.classList.remove("show"), 2400);
}
function empty(msg) {
  return `<div class="empty"><strong>${esc(msg)}</strong>Use the button above to add your first item.</div>`;
}
const pages = [
  "overview",
  "projects",
  "tasks",
  "milestones",
  "resources",
  "team",
  "activity",
];
function go(page) {
  if (!pages.includes(page)) return;
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.toggle("active", p.id === "page-" + page));
  document
    .querySelectorAll(".nav-link")
    .forEach((b) => b.classList.toggle("active", b.dataset.page === page));
  $("crumbTitle").textContent =
    page === "overview"
      ? "Overview"
      : page.charAt(0).toUpperCase() + page.slice(1);
  $("sidebar").classList.remove("open");
  render();
  window.scrollTo(0, 0);
}
document
  .querySelectorAll("[data-page]")
  .forEach((b) => b.addEventListener("click", () => go(b.dataset.page)));
document
  .querySelectorAll("[data-go]")
  .forEach((b) => b.addEventListener("click", () => go(b.dataset.go)));
$("menuBtn").addEventListener("click", () =>
  $("sidebar").classList.toggle("open"),
);
$("logoutBtn").addEventListener("click", () =>
  toast(
    "This is a local demo workspace. You can close the browser tab to exit.",
  ),
);
$("today").textContent = new Date().toLocaleDateString(undefined, {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
});
const hour = new Date().getHours();
$("welcome").textContent =
  (hour < 12
    ? "Good morning, "
    : hour < 18
      ? "Good afternoon, "
      : "Good evening, ") +
  data.user.name.split(" ")[0] +
  "!";
$("sideName").textContent = data.user.name;
$("sideAvatar").textContent = data.user.name[0];
$("topAvatar").textContent = data.user.name[0];
$("quickAdd").addEventListener("click", () => openModal("project"));
document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-action]");
  if (b) openModal(b.dataset.action.replace("new-", ""));
});
function statusClass(s) {
  return s === "Completed"
    ? "completed"
    : s === "In Progress"
      ? "inprogress"
      : "todo";
}
function priorityClass(s) {
  return s.toLowerCase();
}
function projectProgress(name) {
  const p = data.projects.find((x) => x.name === name);
  return p ? Number(p.progress) || 0 : 0;
}
function renderOverview() {
  $("statProjects").textContent = data.projects.length;
  $("statActive").textContent = data.tasks.filter(
    (t) => t.status === "In Progress",
  ).length;
  $("statDone").textContent = data.tasks.filter(
    (t) => t.status === "Completed",
  ).length;
  $("statTeam").textContent = data.members.length;
  $("navProjectCount").textContent = data.projects.length;
  $("overviewProjects").innerHTML = data.projects.length
    ? data.projects
        .slice(0, 4)
        .map(
          (p) =>
            `<div class="project-row"><div class="project-row-head"><strong>${esc(p.name)}</strong><span class="tag">${esc(p.status)}</span></div><p class="project-desc">${esc(p.description)}</p><div class="progress-meta"><span>Overall progress</span><b>${p.progress}%</b></div><div class="progress"><span style="width:${Math.max(0, Math.min(100, p.progress))}%"></span></div></div>`,
        )
        .join("")
    : empty("No projects yet");
  $("overviewActivity").innerHTML =
    data.activities.slice(0, 5).map(activityHTML).join("") ||
    empty("No activity yet");
  $("overviewTasks").innerHTML =
    data.tasks
      .slice(0, 6)
      .map(
        (t) =>
          `<tr><td>${esc(t.name)}</td><td>${esc(t.project)}</td><td>${esc(t.assignee)}</td><td>${esc(t.due || "—")}</td><td><span class="pill ${priorityClass(t.priority)}">${esc(t.priority)}</span></td><td><span class="pill ${statusClass(t.status)}">${esc(t.status)}</span></td></tr>`,
      )
      .join("") || `<tr><td colspan="6">No tasks yet.</td></tr>`;
}
function activityHTML(a) {
  return `<div class="activity-item"><div class="activity-icon">${esc(a.icon || "•")}</div><div class="activity-text">${a.text}<small>${esc(a.time)}</small></div></div>`;
}
function renderProjects() {
  const q = ($("projectSearch").value || "").toLowerCase();
  const list = data.projects.filter((p) =>
    (p.name + " " + p.description).toLowerCase().includes(q),
  );
  $("projectResultCount").textContent = `${list.length} project(s)`;
  $("projectsGrid").innerHTML = list.length
    ? list
        .map(
          (p) =>
            `<article class="project-card"><span class="tag">${esc(p.status)}</span><h3>${esc(p.name)}</h3><p>${esc(p.description || "No description added.")}</p><div class="card-meta"><span>Progress</span><b>${p.progress}%</b></div><div class="progress"><span style="width:${Math.min(100, p.progress)}%"></span></div><div class="card-meta"><span>Target date</span><span>${esc(p.due || "Not set")}</span></div><div class="card-actions"><button class="small-btn" data-edit-project="${p.id}">Edit progress</button><button class="small-btn danger" data-delete-project="${p.id}">Delete</button></div></article>`,
        )
        .join("")
    : empty("No matching projects");
}
function renderTasks() {
  const states = ["To Do", "In Progress", "Completed"];
  $("kanban").innerHTML = states
    .map((state) => {
      const list = data.tasks.filter((t) => t.status === state);
      return `<section class="kanban-col"><div class="kanban-title">${state}<span>${list.length}</span></div>${list.map((t) => `<article class="task-card"><span class="pill ${priorityClass(t.priority)}">${esc(t.priority)} priority</span><strong>${esc(t.name)}</strong><p>${esc(t.project)}</p><div class="task-foot"><span>♙ ${esc(t.assignee)}</span><span>${esc(t.due || "No due date")}</span></div><div class="card-actions"><button class="small-btn" data-edit-task="${t.id}">Edit</button><button class="small-btn danger" data-delete-task="${t.id}">Delete</button></div></article>`).join("") || '<div class="empty">No tasks</div>'}</section>`;
    })
    .join("");
}
function renderMilestones() {
  $("milestoneList").innerHTML = data.milestones.length
    ? data.milestones
        .map(
          (m) =>
            `<div class="milestone-item"><span class="milestone-marker" style="${m.done ? "border-color:#35aa7c;background:#e5f6ef" : ""}"></span><div><strong>${esc(m.title)}</strong><p>${esc(m.project)}</p><label class="muted" style="font-size:9px"><input type="checkbox" data-milestone="${m.id}" ${m.done ? "checked" : ""}> Mark as completed</label></div><span class="milestone-date">${esc(m.date || "No date")}<br><button class="small-btn danger" data-delete-milestone="${m.id}" style="margin-top:8px">Remove</button></span></div>`,
        )
        .join("")
    : empty("No milestones yet");
}
function renderResources() {
  const q = ($("resourceSearch").value || "").toLowerCase();
  const list = data.resources.filter((r) =>
    (r.title + " " + r.notes + " " + r.url).toLowerCase().includes(q),
  );
  $("resourceList").innerHTML = list.length
    ? list
        .map(
          (r) =>
            `<div class="resource-item"><div class="resource-icon">⌁</div><div class="resource-info"><strong>${esc(r.title)}</strong><small>${esc(r.type)} · ${esc(r.notes)}</small><a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.url)}</a></div><button class="small-btn danger" data-delete-resource="${r.id}">Remove</button></div>`,
        )
        .join("")
    : empty("No resources found");
}
function renderTeam() {
  $("teamGrid").innerHTML = data.members.length
    ? data.members
        .map(
          (m) =>
            `<article class="team-card"><div class="team-person"><div class="avatar">${esc(m.name[0].toUpperCase())}</div><div><strong>${esc(m.name)}</strong><small>${esc(m.email)}</small></div></div><span class="team-role">${esc(m.role)}</span><p>Workspace access · ${m.role === "Admin" ? "Full access" : "Collaborator access"}</p>${m.role !== "Admin" ? `<button class="small-btn danger" data-delete-member="${m.id}">Remove member</button>` : ""}</article>`,
        )
        .join("")
    : empty("No team members");
}
function render() {
  renderOverview();
  renderProjects();
  renderTasks();
  renderMilestones();
  renderResources();
  renderTeam();
  $("fullActivity").innerHTML =
    data.activities.map(activityHTML).join("") || empty("No activity yet");
}
$("projectSearch").addEventListener("input", renderProjects);
$("resourceSearch").addEventListener("input", renderResources);
function field(
  label,
  name,
  type = "text",
  placeholder = "",
  required = false,
  extra = "",
) {
  return `<div class="field"><label for="f_${name}">${label}</label><input id="f_${name}" name="${name}" type="${type}" placeholder="${placeholder}" ${required ? "required" : ""} ${extra}></div>`;
}
function selectField(label, name, options) {
  return `<div class="field"><label for="f_${name}">${label}</label><select id="f_${name}" name="${name}">${options.map((x) => `<option>${esc(x)}</option>`).join("")}</select></div>`;
}
function textArea(label, name, placeholder = "") {
  return `<div class="field"><label for="f_${name}">${label}</label><textarea id="f_${name}" name="${name}" rows="3" placeholder="${placeholder}"></textarea></div>`;
}
const backdrop = $("modalBackdrop"),
  form = $("modalForm");
let modalType = "";
function openModal(type, editId = null) {
  modalType = type;
  form.dataset.editId = editId || "";
  let title = "",
    html = "";
  if (type === "project") {
    const p = data.projects.find((x) => x.id === editId) || {};
    title = editId ? "Update project" : "Create a research project";
    html =
      field(
        "Project name",
        "name",
        "text",
        "e.g. Renewable energy research",
        true,
      ) +
      textArea("Description", "description", "What is this research about?") +
      field("Target completion date", "due", "date") +
      field(
        "Progress (%)",
        "progress",
        "number",
        "0",
        true,
        'min="0" max="100" value="' + (p.progress ?? 0) + "",
      );
  }
  if (type === "task") {
    title = "Add a task";
    html =
      field("Task title", "name", "text", "e.g. Review journal papers", true) +
      selectField(
        "Project",
        "project",
        data.projects.map((p) => p.name),
      ) +
      field("Assignee", "assignee", "text", "Team member name") +
      field("Due date", "due", "date") +
      selectField("Priority", "priority", ["Low", "Medium", "High"]) +
      selectField("Status", "status", ["To Do", "In Progress", "Completed"]);
  }
  if (type === "milestone") {
    title = "Add a milestone";
    html =
      field(
        "Milestone title",
        "title",
        "text",
        "e.g. Complete literature review",
        true,
      ) +
      selectField(
        "Project",
        "project",
        data.projects.map((p) => p.name),
      ) +
      field("Target date", "date", "date");
  }
  if (type === "resource") {
    title = "Add research resource";
    html =
      field(
        "Resource title",
        "title",
        "text",
        "Name of paper, website or document",
        true,
      ) +
      field("URL", "url", "url", "https://", true) +
      selectField("Type", "resourceType", [
        "Research link",
        "Reference",
        "Article",
        "Other",
      ]) +
      textArea("Notes", "notes", "Why is this useful?");
  }
  if (type === "member") {
    title = "Add team member";
    html =
      field("Full name", "name", "text", "Member name", true) +
      field("Email address", "email", "email", "member@example.com", true) +
      selectField("Role", "role", ["Member", "Team Leader", "Admin"]);
  }
  $("modalTitle").textContent = title;
  $("modalFields").innerHTML = html;
  backdrop.classList.add("show");
  setTimeout(() => backdrop.querySelector("input")?.focus(), 20);
}
function closeModal() {
  backdrop.classList.remove("show");
  form.reset();
  form.dataset.editId = "";
}
$("closeModal").addEventListener("click", closeModal);
$("cancelModal").addEventListener("click", closeModal);
backdrop.addEventListener("click", (e) => {
  if (e.target === backdrop) closeModal();
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(form),
    v = Object.fromEntries(fd.entries()),
    id = Date.now();
  if (modalType === "project") {
    const p = {
      id,
      name: v.name.trim(),
      description: v.description.trim(),
      due: v.due,
      progress: Math.max(0, Math.min(100, Number(v.progress) || 0)),
      status: "In progress",
    };
    data.projects.unshift(p);
    log(
      "＋",
      `<strong>${esc(data.user.name)}</strong> created project <strong>${esc(p.name)}</strong>`,
    );
  }
  if (modalType === "task") {
    if (!v.project) {
      toast("Create a project first.");
      return;
    }
    const t = { id, ...v };
    data.tasks.unshift(t);
    log("✓", `Added task <strong>${esc(t.name)}</strong> to ${esc(t.project)}`);
  }
  if (modalType === "milestone") {
    if (!v.project) {
      toast("Create a project first.");
      return;
    }
    data.milestones.unshift({ id, ...v, done: false });
    log("⚑", `Added milestone <strong>${esc(v.title)}</strong>`);
  }
  if (modalType === "resource") {
    data.resources.unshift({
      id,
      title: v.title,
      url: v.url,
      type: v.resourceType,
      notes: v.notes,
    });
    log("⌁", `Saved resource <strong>${esc(v.title)}</strong>`);
  }
  if (modalType === "member") {
    if (
      data.members.some((m) => m.email.toLowerCase() === v.email.toLowerCase())
    ) {
      toast("This email is already in the team.");
      return;
    }
    data.members.push({ id, ...v });
    log("♧", `Added team member <strong>${esc(v.name)}</strong>`);
  }
  save();
  closeModal();
  render();
  toast("Saved successfully.");
});
document.addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  if (b.dataset.deleteProject) {
    const p = data.projects.find((x) => x.id == b.dataset.deleteProject);
    if (confirm(`Delete project "${p.name}"?`)) {
      data.projects = data.projects.filter(
        (x) => x.id != b.dataset.deleteProject,
      );
      data.tasks = data.tasks.filter((t) => t.project !== p.name);
      log("−", `Deleted project <strong>${esc(p.name)}</strong>`);
      save();
      render();
      toast("Project deleted.");
    }
  }
  if (b.dataset.editProject) {
    const p = data.projects.find((x) => x.id == b.dataset.editProject);
    const val = prompt("Set project progress from 0 to 100:", p.progress);
    if (val !== null && val.trim() !== "" && !isNaN(val)) {
      p.progress = Math.max(0, Math.min(100, Number(val)));
      log("↗", `Updated progress for <strong>${esc(p.name)}</strong>`);
      save();
      render();
      toast("Progress updated.");
    }
  }
  if (b.dataset.deleteTask) {
    data.tasks = data.tasks.filter((t) => t.id != b.dataset.deleteTask);
    log("−", "A task was removed");
    save();
    render();
    toast("Task removed.");
  }
  if (b.dataset.editTask) {
    const t = data.tasks.find((x) => x.id == b.dataset.editTask);
    const next = prompt(
      "Update status: To Do, In Progress, or Completed",
      t.status,
    );
    if (["To Do", "In Progress", "Completed"].includes(next)) {
      t.status = next;
      log("✓", `Updated task <strong>${esc(t.name)}</strong> to ${esc(next)}`);
      save();
      render();
      toast("Task updated.");
    }
  }
  if (b.dataset.deleteMilestone) {
    data.milestones = data.milestones.filter(
      (x) => x.id != b.dataset.deleteMilestone,
    );
    log("−", "A milestone was removed");
    save();
    render();
    toast("Milestone removed.");
  }
  if (b.dataset.deleteResource) {
    data.resources = data.resources.filter(
      (x) => x.id != b.dataset.deleteResource,
    );
    log("−", "A research resource was removed");
    save();
    render();
    toast("Resource removed.");
  }
  if (b.dataset.deleteMember) {
    const m = data.members.find((x) => x.id == b.dataset.deleteMember);
    if (confirm(`Remove ${m.name} from the workspace?`)) {
      data.members = data.members.filter((x) => x.id != b.dataset.deleteMember);
      log("♧", `Removed team member <strong>${esc(m.name)}</strong>`);
      save();
      render();
      toast("Member removed.");
    }
  }
});
document.addEventListener("change", (e) => {
  if (e.target.dataset.milestone) {
    const m = data.milestones.find((x) => x.id == e.target.dataset.milestone);
    m.done = e.target.checked;
    log("⚑", `${esc(m.title)} marked ${m.done ? "complete" : "incomplete"}`);
    save();
    render();
  }
});
render();

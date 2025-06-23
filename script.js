let eduCount = 0;
let expCount = 0;

function addEducation() {
  const container = document.getElementById("education-section");
  const id = `edu-${eduCount++}`;
  container.innerHTML += `<input type="text" placeholder="Degree and Institute" data-type="education" data-id="${id}" oninput="updatePreview()">`;
  updateProgress();
}

function addExperience() {
  const container = document.getElementById("experience-section");
  const id = `exp-${expCount++}`;
  container.innerHTML += `<input type="text" placeholder="Role and Company" data-type="experience" data-id="${id}" oninput="updatePreview()">`;
  updateProgress();
}

function updatePreview() {
  const preview = document.getElementById("preview-content");
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const summary = document.getElementById("summary").value;
  const skills = document.getElementById("skills").value;

  const educations = [...document.querySelectorAll('[data-type="education"]')].map(e => e.value).filter(e => e);
  const experiences = [...document.querySelectorAll('[data-type="experience"]')].map(e => e.value).filter(e => e);

  preview.innerHTML = `
    <h3>${name}</h3>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Summary:</strong> ${summary}</p>
    <p><strong>Skills:</strong> ${skills}</p>
    <p><strong>Education:</strong></p>
    <ul>${educations.map(e => `<li>${e}</li>`).join('')}</ul>
    <p><strong>Experience:</strong></p>
    <ul>${experiences.map(e => `<li>${e}</li>`).join('')}</ul>
  `;
  updateProgress();
}

function updateProgress() {
  const fields = document.querySelectorAll('input, textarea');
  const filled = Array.from(fields).filter(f => f.value.trim() !== "").length;
  const percent = Math.min((filled / fields.length) * 100, 100);
  document.getElementById("progress-bar").style.width = `${percent}%`;
}

function downloadPDF() {
  const element = document.getElementById("resume-preview");
  const opt = {
    margin:       0.5,
    filename:     'resume.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  html2pdf().from(element).set(opt).save();
}

document.querySelectorAll('input, textarea').forEach(input => {
  input.addEventListener('input', updatePreview);
});

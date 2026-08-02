const GOOGLE_CLIENT_ID = "";
const DEFAULT_COORDINATOR_EMAIL = "ldenker2006@gmail.com";
const WORKOUT_TYPES = ["Strength A", "Endurance", "Power", "Mobility", "Strength B"];

const defaultWorkouts = {
  "Strength A": [
    { name: "Bulgarian S.S.", sets: 2, target: "10-12" },
    { name: "DB Rows", sets: 2, target: "10-12" },
    { name: "SL RDL", sets: 3, target: "8-10" },
    { name: "Single Arm Overhead Marches", sets: 3, target: "30-45 sec" },
    { name: "Dead Bugs", sets: 3, target: "10" },
    { name: "Band Pull Aparts", sets: 3, target: "8-10" }
  ],
  "Strength B": [
    { name: "Deadlift", sets: 3, target: "6-8" },
    { name: "Pullups", sets: 3, target: "6-8" },
    { name: "Front Squats", sets: 3, target: "6-8" },
    { name: "Benchpress", sets: 3, target: "6-8" },
    { name: "Side Planks", sets: 3, target: "45 sec" }
  ],
  Endurance: [
    { name: "Squat Pulses", sets: 4, target: "30 sec" },
    { name: "Step-Ups", sets: 4, target: "30 sec" },
    { name: "Pushups", sets: 4, target: "30 sec" },
    { name: "Mountain Climbers", sets: 4, target: "30 sec" },
    { name: "Wall Sit", sets: 4, target: "30 sec" },
    { name: "Plank Shoulder Taps", sets: 4, target: "30 sec" }
  ],
  Power: [
    { name: "S.S. Jumps", sets: 3, target: "5-6" },
    { name: "Skater Jumps", sets: 3, target: "6-8" },
    { name: "Box Jumps", sets: 3, target: "6" },
    { name: "SL Jumps", sets: 3, target: "6" },
    { name: "Explosive Pushups", sets: 3, target: "5-8" }
  ],
  Mobility: [
    { name: "90/90 Hip Flow", sets: 2, target: "45 sec" },
    { name: "Pigeon Pose", sets: 2, target: "45 sec" },
    { name: "Child's Pose", sets: 2, target: "45 sec" },
    { name: "Calf Stretch", sets: 2, target: "45 sec" },
    { name: "Ankle Mobility", sets: 1, target: "N/A" },
    { name: "Balance Work", sets: 1, target: "N/A" }
  ]
};

const defaultStartingRanges = {
  "Bulgarian S.S.": "Start: 10-25 lb DBs",
  "DB Rows": "Start: 15-30 lb DB",
  "SL RDL": "Start: 10-25 lb DBs",
  "Single Arm Overhead Marches": "Start: 5-15 lb DB",
  "Farmer Carries": "Start: 20-45 lb DBs",
  "Dead Bugs": "Start: bodyweight",
  "Band Pull Aparts": "Start: light-medium band",
  Deadlift: "Start: 45-95 lb",
  Pullups: "Start: assisted or banded",
  "Front Squats": "Start: 35-65 lb",
  Benchpress: "Start: 35-65 lb",
  "Side Planks": "Start: bodyweight",
  "Squat Pulses": "Start: bodyweight-15 lb",
  "Step-Ups": "Start: bodyweight-15 lb DBs",
  Pushups: "Start: bodyweight",
  "Mountain Climbers": "Start: bodyweight",
  "Wall Sit": "Start: bodyweight",
  "Plank Shoulder Taps": "Start: bodyweight",
  "S.S. Jumps": "Start: bodyweight",
  "Skater Jumps": "Start: bodyweight",
  "Box Jumps": "Start: bodyweight",
  "SL Jumps": "Start: bodyweight",
  "Explosive Pushups": "Start: bodyweight",
  "90/90 Hip Flow": "Start: bodyweight",
  "Pigeon Pose": "Start: bodyweight",
  "Glute Stretch": "Start: bodyweight",
  "Child's Pose": "Start: bodyweight",
  "Calf Stretch": "Start: bodyweight",
  "Ankle Mobility": "Start: bodyweight",
  "Balance Work": "Start: bodyweight"
};

const demoGuides = {
  "Bulgarian S.S.": { type: "single-leg strength", image: "bulgarian-split-squat.webp", tips: ["Keep chest tall and core tight.", "Front knee tracks over toes.", "Drive through the front foot to stand."] },
  "DB Rows": { type: "upper pull", image: "db-rows.webp", tips: ["Hinge at hips with a flat back.", "Pull elbows close to your body.", "Squeeze shoulder blades together."] },
  "SL RDL": { type: "hinge balance", image: "sl-rdl.webp", tips: ["Hinge at hips with a slight knee bend.", "Keep back flat and core engaged.", "Drive through the standing heel to return."] },
  "Single Arm Overhead Marches": { type: "core stability", image: "single-arm-overhead-marches.webp", tips: ["Press dumbbell overhead with arm by ear.", "Keep ribs down and core tight.", "March with control."] },
  "Farmer Carries": { type: "core stability", image: "single-arm-overhead-marches.webp", tips: ["Keep ribs down and core tight.", "Walk tall with steady breathing.", "Do not let the torso lean."] },
  "Dead Bugs": { type: "core control", image: "dead-bugs.webp", tips: ["Press low back into the floor.", "Move opposite arm and leg slowly.", "Do not let low back arch."] },
  "Band Pull Aparts": { type: "shoulder prep", image: "band-pull-aparts.webp", tips: ["Hold band with overhand grip.", "Pull band apart to chest height.", "Keep arms straight and controlled."] },
  Deadlift: { type: "hinge strength", image: "deadlift.webp", tips: ["Hinge at your hips.", "Keep your back flat and chest up.", "Push through your heels."] },
  Pullups: { type: "upper pull", image: "pullups.webp", tips: ["Grip bar slightly wider than shoulders.", "Engage your lats and pull with control.", "Lower down with control."] },
  "Front Squats": { type: "squat strength", image: "front-squats.webp", tips: ["Feet shoulder-width apart.", "Sit hips back and down.", "Drive through your heels to stand."] },
  Benchpress: { type: "upper push", image: "benchpress.webp", tips: ["Lie back with feet flat.", "Grip slightly wider than shoulders.", "Lower bar to mid-chest."] },
  "Side Planks": { type: "core control", image: "side-planks.webp", tips: ["Prop on your forearm.", "Stack feet and lift hips.", "Keep your body in a straight line."] },
  "Squat Pulses": { type: "endurance legs", image: "squat-pulses.webp", tips: ["Sit back into squat.", "Pulse small and keep tension.", "Keep chest up and core engaged."] },
  "Step-Ups": { type: "endurance legs", image: "step-ups.webp", tips: ["Push through heel.", "Stand tall at the top.", "Control the step down."] },
  Pushups: { type: "upper push", image: "pushups.webp", tips: ["Keep body in a straight line.", "Lower chest toward ground.", "Engage core and glutes."] },
  "Mountain Climbers": { type: "conditioning", image: "mountain-climbers.webp", tips: ["Keep core tight and hips low.", "Drive knees forward quickly.", "Maintain a steady pace."] },
  "Wall Sit": { type: "endurance legs", image: "wall-sit.webp", tips: ["Slide down until thighs are parallel.", "Keep knees over ankles.", "Hold with core and glutes engaged."] },
  "Plank Shoulder Taps": { type: "core control", image: "plank-shoulder-taps.webp", tips: ["Keep hips level.", "Tap opposite shoulder.", "Brace core to avoid rotation."] },
  "S.S. Jumps": { type: "power jump", image: "ss-jumps.webp", tips: ["Start in a lunge position.", "Explode up and switch legs.", "Land softly into a lunge."] },
  "Skater Jumps": { type: "lateral power", image: "skater-jumps.webp", tips: ["Jump side to side.", "Land softly on one leg.", "Swing arms for momentum and balance."] },
  "Box Jumps": { type: "power jump", image: "box-jumps.webp", tips: ["Dip into a quarter squat.", "Explode up onto the box.", "Land softly with knees out."] },
  "SL Jumps": { type: "single-leg power", image: "sl-jumps.webp", tips: ["Hop forward or up on one leg.", "Land softly and maintain balance.", "Use arms for balance."] },
  "Explosive Pushups": { type: "upper power", image: "explosive-pushups.webp", tips: ["Start in a strong plank position.", "Explode up, lifting hands off the floor.", "Land softly and repeat."] },
  "90/90 Hip Flow": { type: "mobility flow", image: "90-90-hip-flow.webp", tips: ["Start in 90/90 position.", "Rotate through your hips.", "Move with control and breath."] },
  "Pigeon Pose": { type: "mobility hold", image: "pigeon-pose.webp", tips: ["Bring one knee forward.", "Extend the other leg back.", "Square your hips."] },
  "Glute Stretch": { type: "mobility hold", image: "pigeon-pose.webp", tips: ["Bring one knee forward.", "Extend the other leg back.", "Hold and breathe deeply."] },
  "Child's Pose": { type: "mobility hold", image: "childs-pose.webp", tips: ["Sit back on your heels.", "Reach arms forward.", "Relax your back and shoulders."] },
  "Calf Stretch": { type: "mobility hold", image: "calf-stretch.webp", tips: ["Step one foot back.", "Keep back heel down.", "Lean into the wall."] },
  "Ankle Mobility": { type: "mobility flow", image: "ankle-mobility.webp", tips: ["Kneel with one foot forward.", "Drive knee over toes.", "Keep heel down."] },
  "Balance Work": { type: "balance", image: "balance-work.webp", tips: ["Stand on one leg.", "Engage your core.", "Keep hips level."] }
};

const USERS_KEY = "ihsaFitnessUsers";
const CURRENT_USER_KEY = "ihsaFitnessCurrentUser";
const TEAM_FEED_KEY = "ihsaFitnessTeamFeed";
const ANNOUNCEMENTS_KEY = "ihsaFitnessAnnouncements";
const COORDINATOR_KEY = "ihsaFitnessCoordinatorEmail";
const WORKOUTS_KEY = "ihsaFitnessWorkouts";
const RANGES_KEY = "ihsaFitnessStartingRanges";
const SELECTED_WORKOUT_KEY = "ihsaFitnessSelectedWorkout";
const DEMO_IMAGES_KEY = "ihsaFitnessDemoImages";

let workouts = normalizeWorkoutLibrary(JSON.parse(localStorage.getItem(WORKOUTS_KEY) || "null") || structuredClone(defaultWorkouts));
let startingRanges = { ...defaultStartingRanges, ...(JSON.parse(localStorage.getItem(RANGES_KEY) || "null") || {}) };
let demoImages = JSON.parse(localStorage.getItem(DEMO_IMAGES_KEY) || "{}");

let state = {
  page: "home",
  users: JSON.parse(localStorage.getItem(USERS_KEY) || "{}"),
  currentUserId: localStorage.getItem(CURRENT_USER_KEY) || "",
  teamFeed: JSON.parse(localStorage.getItem(TEAM_FEED_KEY) || "[]"),
  announcements: JSON.parse(localStorage.getItem(ANNOUNCEMENTS_KEY) || "[]"),
  coordinatorEmail: localStorage.getItem(COORDINATOR_KEY) || DEFAULT_COORDINATOR_EMAIL,
  selectedWorkout: localStorage.getItem(SELECTED_WORKOUT_KEY) || "Strength A"
};

const els = {
  signInButton: document.querySelector("#signInButton"),
  signInButtonText: document.querySelector("#signInButtonText"),
  accountMenu: document.querySelector("#accountMenu"),
  accountAvatar: document.querySelector("#accountAvatar"),
  accountName: document.querySelector("#accountName"),
  accountPanelName: document.querySelector("#accountPanelName"),
  accountPanelBadge: document.querySelector("#accountPanelBadge"),
  accountEmail: document.querySelector("#accountEmail"),
  accountBadgeList: document.querySelector("#accountBadgeList"),
  accountPhotoInput: document.querySelector("#accountPhotoInput"),
  accountNotifications: document.querySelector("#accountNotifications"),
  logOutButton: document.querySelector("#logOutButton"),
  signInSheet: document.querySelector("#signInSheet"),
  closeSignIn: document.querySelector("#closeSignIn"),
  previewEmail: document.querySelector("#previewEmail"),
  previewName: document.querySelector("#previewName"),
  previewSignIn: document.querySelector("#previewSignIn"),
  coordinatorMenu: document.querySelector("#coordinatorMenu"),
  coordinatorBadge: document.querySelector("#coordinatorBadge"),
  coordinatorAccountSelect: document.querySelector("#coordinatorAccountSelect"),
  transferCoordinator: document.querySelector("#transferCoordinator"),
  announcementText: document.querySelector("#announcementText"),
  sendAnnouncement: document.querySelector("#sendAnnouncement"),
  announcementList: document.querySelector("#announcementList"),
  adminWorkoutSelect: document.querySelector("#adminWorkoutSelect"),
  exerciseEditor: document.querySelector("#exerciseEditor"),
  saveExercises: document.querySelector("#saveExercises"),
  demoImageEditor: document.querySelector("#demoImageEditor"),
  exportTeamCsv: document.querySelector("#exportTeamCsv"),
  homeDate: document.querySelector("#homeDate"),
  homeWorkout: document.querySelector("#homeWorkout"),
  homeSummary: document.querySelector("#homeSummary"),
  previousTitle: document.querySelector("#previousTitle"),
  previousBadge: document.querySelector("#previousBadge"),
  previousSummary: document.querySelector("#previousSummary"),
  homeExerciseList: document.querySelector("#homeExerciseList"),
  weekRange: document.querySelector("#weekRange"),
  weekTitle: document.querySelector("#weekTitle"),
  dayGrid: document.querySelector("#dayGrid"),
  selectedDate: document.querySelector("#selectedDate"),
  selectedWorkout: document.querySelector("#selectedWorkout"),
  workoutBadge: document.querySelector("#workoutBadge"),
  exerciseList: document.querySelector("#exerciseList"),
  demoGuideList: document.querySelector("#demoGuideList"),
  workoutTypeSelect: document.querySelector("#workoutTypeSelect"),
  loggerDate: document.querySelector("#loggerDate"),
  loggerTitle: document.querySelector("#loggerTitle"),
  restPanel: document.querySelector("#restPanel"),
  logList: document.querySelector("#logList"),
  clearDay: document.querySelector("#clearDay"),
  finishWorkout: document.querySelector("#finishWorkout"),
  workoutPhoto: document.querySelector("#workoutPhoto"),
  photoPreview: document.querySelector("#photoPreview"),
  exportLogs: document.querySelector("#exportLogs"),
  saveStatus: document.querySelector("#saveStatus"),
  teamFeed: document.querySelector("#teamFeed"),
  teamLogCount: document.querySelector("#teamLogCount"),
  clearTeamFeed: document.querySelector("#clearTeamFeed"),
  celebration: document.querySelector("#celebration")
};

document.querySelectorAll(".nav-button").forEach((button) => {
  button.addEventListener("click", () => setPage(button.dataset.page));
});
document.querySelectorAll("[data-jump]").forEach((button) => {
  button.addEventListener("click", () => setPage(button.dataset.jump));
});

els.signInButton.addEventListener("click", signInWithGoogle);
els.logOutButton.addEventListener("click", logOut);
els.accountPhotoInput.addEventListener("change", updateAccountPhoto);
els.closeSignIn.addEventListener("click", closeSignInSheet);
els.previewSignIn.addEventListener("click", signInFromPreviewForm);
els.previewEmail.addEventListener("input", suggestPreviewName);
els.previewEmail.addEventListener("keydown", submitPreviewOnEnter);
els.previewName.addEventListener("keydown", submitPreviewOnEnter);
els.signInSheet.addEventListener("click", (event) => {
  if (event.target === els.signInSheet) closeSignInSheet();
});
els.workoutTypeSelect.addEventListener("change", () => setWorkout(els.workoutTypeSelect.value));
els.adminWorkoutSelect.addEventListener("change", () => {
  renderExerciseEditor();
  renderDemoImageEditor();
});
els.saveExercises.addEventListener("click", saveEditedExercises);
els.demoImageEditor.addEventListener("change", updateDemoImage);
els.demoImageEditor.addEventListener("click", (event) => {
  const resetButton = event.target.closest("[data-reset-demo]");
  if (resetButton) resetDemoImage(resetButton.dataset.resetDemo);
});
els.exportTeamCsv.addEventListener("click", exportTeamCsv);
els.sendAnnouncement.addEventListener("click", postAnnouncement);
els.announcementList.addEventListener("click", (event) => {
  const deleteButton = event.target.closest("[data-delete-announcement]");
  if (deleteButton) deleteAnnouncement(deleteButton.dataset.deleteAnnouncement);
});
els.transferCoordinator.addEventListener("click", transferCoordinator);
els.clearTeamFeed.addEventListener("click", () => {
  if (!isCoordinator()) return showCelebration("Coordinator only");
  state.teamFeed = [];
  persistTeamFeed();
  renderTeamFeed();
});

els.clearDay.addEventListener("click", () => {
  if (!ensureSignedIn()) return;
  delete currentLogs()[currentLogKey()];
  persistUsers();
  render();
  pulseSaved("Day cleared");
});

els.workoutPhoto.addEventListener("change", () => {
  if (!ensureSignedIn()) {
    els.workoutPhoto.value = "";
    return;
  }
  const file = els.workoutPhoto.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    currentLogs()[currentLogKey()] ||= makeEmptyLog();
    currentLogs()[currentLogKey()].photo = reader.result;
    currentLogs()[currentLogKey()].photoName = file.name;
    persistUsers();
    renderPhotoPreview();
    pulseSaved("Photo saved");
  });
  reader.readAsDataURL(file);
});

els.finishWorkout.addEventListener("click", () => {
  if (!ensureSignedIn()) return;
  const key = currentLogKey();
  currentLogs()[key] ||= makeEmptyLog();
  currentLogs()[key].completedAt = new Date().toISOString();
  currentLogs()[key].workout = state.selectedWorkout;
  persistUsers();

  const badgeEarned = badgeChangeForCurrentUser();
  const item = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    userId: state.currentUserId,
    name: currentUser().name,
    workout: state.selectedWorkout,
    date: formatDate(new Date()),
    log: currentLogs()[key],
    photo: currentLogs()[key].photo || "",
    createdAt: new Date().toISOString(),
    cheers: [],
    celebrations: [],
    badgeEarned
  };
  state.teamFeed.unshift(item);
  state.teamFeed = state.teamFeed.slice(0, 60);
  persistTeamFeed();
  showCelebration(badgeEarned ? `${badgeEarned.label} badge earned!` : `${currentUser().name} logged ${state.selectedWorkout}.`);
  pulseSaved("Workout posted to team");
  render();
  setPage("team");
});

els.exportLogs.addEventListener("click", () => exportMemberJson());

function setPage(page) {
  state.page = page;
  renderPages();
}

function setWorkout(workout) {
  state.selectedWorkout = workout;
  localStorage.setItem(SELECTED_WORKOUT_KEY, workout);
  render();
}

function render() {
  setText(els.homeDate, "Selected workout");
  setText(els.homeWorkout, state.selectedWorkout);
  setText(els.homeSummary, "Choose any workout type, log weight and reps, then post it to the team feed.");
  setText(els.weekRange, "Manual workout selection");
  setText(els.weekTitle, "Library");
  setText(els.selectedDate, "Selected workout");
  setText(els.selectedWorkout, state.selectedWorkout);
  setText(els.workoutBadge, state.selectedWorkout);
  setText(els.loggerDate, "Workout Tracker");
  setText(els.loggerTitle, `${state.selectedWorkout} Log`);

  renderProfile();
  renderPages();
  renderAnnouncements();
  renderWorkoutSelects();
  renderWorkoutCards();
  renderWorkout(els.exerciseList);
  renderWorkout(els.homeExerciseList);
  renderDemoGuides();
  renderPreviousSummary();
  renderLogger();
  renderTeamFeed();
  renderExerciseEditor();
  renderDemoImageEditor();
}

function renderProfile() {
  const user = currentUser();
  const badge = user ? weeklyBadgeForUser(user.id) : null;
  els.signInButton.classList.toggle("hidden", Boolean(user));
  els.accountMenu.classList.toggle("hidden", !user);
  els.signInButtonText.textContent = "Sign in with Google";
  if (user) {
    els.accountName.textContent = user.name;
    els.accountPanelName.textContent = user.name;
    els.accountEmail.textContent = user.email || "";
    renderAvatar(els.accountAvatar, user);
    els.accountPanelBadge.textContent = badge ? `${badge.label} badge` : "No badge";
    els.accountPanelBadge.className = `badge ${badge?.tier || ""}`;
    els.accountBadgeList.innerHTML = badge
      ? `<span class="account-badge ${badge.tier}">${badge.label}</span><span class="streak-pill">Streak ${badge.streak}</span>`
      : `<span class="empty-state">Log 2 workouts this week to earn Bronze.</span>`;
    renderAccountNotifications(user);
  }
  els.coordinatorMenu.classList.toggle("hidden", !isCoordinator());
  els.clearTeamFeed.classList.toggle("hidden", !isCoordinator());
  renderCoordinatorAccountOptions();
  els.coordinatorBadge.textContent = isCoordinator() ? "Active" : "Admin";
}

function renderPages() {
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.toggle("active", page.id === `${state.page}Page`);
  });
  document.querySelectorAll(".nav-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.page === state.page);
  });
}

function renderAnnouncements() {
  els.announcementList.innerHTML = "";
  if (!state.announcements.length) {
    els.announcementList.innerHTML = `<div class="empty-state">No announcements yet.</div>`;
    return;
  }
  state.announcements.slice(0, 5).forEach((item) => {
    const card = document.createElement("article");
    card.className = "announcement-card";
    const deleteButton = isCoordinator()
      ? `<button class="icon-button announcement-delete" type="button" data-delete-announcement="${escapeAttribute(item.id)}" aria-label="Delete announcement">x</button>`
      : "";
    card.innerHTML = `
      <div class="announcement-head">
        <p class="eyebrow">${formatShortDate(new Date(item.createdAt))} - ${escapeHtml(item.author)}</p>
        ${deleteButton}
      </div>
      <h3>${escapeHtml(item.title || "Team announcement")}</h3>
      <p>${escapeHtml(item.message)}</p>
    `;
    els.announcementList.appendChild(card);
  });
}

function renderWorkoutSelects() {
  const options = WORKOUT_TYPES.map((workout) => `<option value="${workout}" ${workout === state.selectedWorkout ? "selected" : ""}>${workout}</option>`).join("");
  els.workoutTypeSelect.innerHTML = options;
  els.adminWorkoutSelect.innerHTML = WORKOUT_TYPES.map((workout) => `<option value="${workout}">${workout}</option>`).join("");
  if (!els.adminWorkoutSelect.value) els.adminWorkoutSelect.value = state.selectedWorkout;
}

function renderWorkoutCards() {
  els.dayGrid.innerHTML = "";
  WORKOUT_TYPES.forEach((workout) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = `day-card ${workout === state.selectedWorkout ? "active" : ""}`;
    card.innerHTML = `<span>Workout</span><strong>${workout}</strong><small>${workouts[workout].length} exercises</small>`;
    card.addEventListener("click", () => setWorkout(workout));
    els.dayGrid.appendChild(card);
  });
}

function renderWorkout(container) {
  container.innerHTML = "";
  workouts[state.selectedWorkout].forEach((exercise) => {
    const row = document.createElement("div");
    row.className = "exercise-row";
    row.innerHTML = `
      <div>
        <strong>${escapeHtml(exercise.name)}</strong>
        <span>${escapeHtml(startingRangeFor(exercise))}</span>
      </div>
      <div class="prescription">
        <b>${trackingSetCount(exercise)}</b>
        <span>${escapeHtml(exercise.target)}</span>
      </div>
    `;
    container.appendChild(row);
  });
}

function renderDemoGuides() {
  els.demoGuideList.innerHTML = "";
  workouts[state.selectedWorkout].forEach((exercise) => {
    const guide = demoGuides[exercise.name] || guideForExercise(exercise);
    if (!guide.image) return;
    const card = document.createElement("article");
    card.className = "demo-card";
    card.innerHTML = `
      <div class="demo-visual">${demoVisualMarkup(exercise, guide)}</div>
    `;
    els.demoGuideList.appendChild(card);
  });
}

function renderPreviousSummary() {
  const previous = findPreviousSameWorkout();
  els.previousTitle.textContent = previous ? `${previous.workout} from ${formatShortDate(new Date(previous.completedAt))}` : `Previous ${state.selectedWorkout}`;
  els.previousBadge.textContent = currentUser() ? currentUser().name : "No rider";
  els.previousSummary.innerHTML = "";

  if (!currentUser()) {
    els.previousSummary.innerHTML = `<div class="empty-state">Sign in with Google to see your saved weights and reps here.</div>`;
    return;
  }
  if (!previous) {
    els.previousSummary.innerHTML = `<div class="empty-state">No previous ${state.selectedWorkout} log yet.</div>`;
    return;
  }
  workouts[state.selectedWorkout].forEach((exercise) => {
    const entries = previous.exercises?.[exercise.name] || [];
    const card = document.createElement("article");
    card.className = "previous-card";
    const sets = Array.from({ length: trackingSetCount(exercise) }, (_, index) => {
      const entry = entries[index] || {};
      return `<span>Set ${index + 1}: ${formatEntry(entry)}</span>`;
    }).join("");
    card.innerHTML = `<h3>${escapeHtml(exercise.name)}</h3><div class="previous-sets">${sets}</div>`;
    els.previousSummary.appendChild(card);
  });
}

function renderLogger() {
  const dayLog = currentLogs()[currentLogKey()] || makeEmptyLog();
  els.logList.innerHTML = "";
  els.workoutPhoto.value = "";
  renderPhotoPreview();

  if (!currentUser()) {
    els.logList.innerHTML = `<div class="empty-state">Sign in with Google before logging so your workout data and photos stay attached to your rider account.</div>`;
    return;
  }

  workouts[state.selectedWorkout].forEach((exercise) => {
    const card = document.createElement("article");
    card.className = "log-card";
    const setRows = Array.from({ length: trackingSetCount(exercise) }, (_, index) => {
      const entry = dayLog.exercises?.[exercise.name]?.[index] || {};
      return `
        <label>
          <span>Set ${index + 1} weight</span>
          <input inputmode="decimal" type="number" min="0" step="0.5" value="${entry.weight ?? ""}" data-exercise="${escapeAttribute(exercise.name)}" data-set="${index}" data-field="weight" placeholder="lbs">
        </label>
        <label>
          <span>Set ${index + 1} reps</span>
          <input inputmode="numeric" type="number" min="0" step="1" value="${entry.reps ?? ""}" data-exercise="${escapeAttribute(exercise.name)}" data-set="${index}" data-field="reps" placeholder="reps">
        </label>
      `;
    }).join("");
    card.innerHTML = `<div class="log-card-head"><div><h3>${escapeHtml(exercise.name)}</h3><p>${trackingSetCount(exercise)} sets, target ${escapeHtml(exercise.target)}</p></div><button class="ghost-button use-previous" type="button" data-use-previous="${escapeAttribute(exercise.name)}">Use previous</button></div><div class="set-grid">${setRows}</div>`;
    els.logList.appendChild(card);
  });

  els.logList.querySelectorAll("input, select").forEach((field) => {
    field.addEventListener("input", updateLog);
    field.addEventListener("change", updateLog);
  });
  els.logList.querySelectorAll("[data-use-previous]").forEach((button) => {
    button.addEventListener("click", () => usePreviousExercise(button.dataset.usePrevious));
  });
}

function renderTeamFeed() {
  els.teamLogCount.textContent = String(state.teamFeed.length);
  els.teamFeed.innerHTML = "";
  if (!state.teamFeed.length) {
    els.teamFeed.innerHTML = `<div class="empty-state">No workouts posted yet. Finish a workout to start the team feed.</div>`;
    return;
  }

  state.teamFeed.forEach((item) => {
    const cheered = currentUser() && item.cheers.includes(state.currentUserId);
    const celebrated = currentUser() && item.celebrations?.includes(state.currentUserId);
    const badgeText = item.badgeEarned ? `<div class="badge-callout">${escapeHtml(item.name)} earned ${item.badgeEarned.label} this week. Streak: ${item.badgeEarned.streak}</div>` : "";
    const card = document.createElement("article");
    card.className = "team-card";
    card.innerHTML = `
      <div>
        <p class="eyebrow">${escapeHtml(item.date || "")}</p>
        <div class="team-card-title">
          ${avatarMarkup(state.users[item.userId], item.name)}
          <h3>${escapeHtml(item.name)} logged ${escapeHtml(item.workout)}</h3>
        </div>
        <p>${relativeTime(item.createdAt)}</p>
        ${badgeText}
      </div>
      ${item.photo ? `<img class="team-photo" src="${item.photo}" alt="${escapeAttribute(item.name)}'s workout photo">` : ""}
      <details class="feed-details">
        <summary>See more</summary>
        ${teamLogDetails(item.log)}
      </details>
      <div class="feed-actions">
        <button class="cheer-button ${cheered ? "active" : ""}" type="button" data-cheer="${item.id}" aria-label="Give thumbs up to ${escapeAttribute(item.name)}"><span aria-hidden="true">&#128077;</span><strong>${item.cheers.length}</strong></button>
        ${item.badgeEarned ? `<button class="cheer-button celebrate ${celebrated ? "active" : ""}" type="button" data-celebrate="${item.id}"><span aria-hidden="true">&#127881;</span><strong>${item.celebrations?.length || 0}</strong></button>` : ""}
      </div>
    `;
    els.teamFeed.appendChild(card);
  });

  els.teamFeed.querySelectorAll("[data-cheer]").forEach((button) => button.addEventListener("click", () => toggleCheer(button.dataset.cheer)));
  els.teamFeed.querySelectorAll("[data-celebrate]").forEach((button) => button.addEventListener("click", () => toggleBadgeCelebration(button.dataset.celebrate)));
}

function renderExerciseEditor() {
  if (!isCoordinator()) return;
  const workout = els.adminWorkoutSelect.value || state.selectedWorkout;
  const rows = workouts[workout].map((exercise) => `${exercise.name}|${trackingSetCount(exercise)}|${exercise.target}|${startingRanges[exercise.name] || ""}`).join("\n");
  els.exerciseEditor.innerHTML = `
    <label class="admin-field">
      <span>Exercises: name | sets | reps/time | starting range</span>
      <textarea id="exerciseEditorText" rows="8">${escapeHtml(rows)}</textarea>
    </label>
  `;
}

function renderDemoImageEditor() {
  if (!isCoordinator()) return;
  const workout = els.adminWorkoutSelect.value || state.selectedWorkout;
  els.demoImageEditor.innerHTML = workouts[workout].map((exercise) => {
    const image = demoImageForExercise(exercise.name);
    const custom = Boolean(demoImages[exercise.name]);
    return `
      <article class="demo-edit-row">
        <img src="${escapeAttribute(image)}" alt="${escapeAttribute(exercise.name)} demo preview">
        <div>
          <strong>${escapeHtml(exercise.name)}</strong>
          <span>${custom ? "Custom team image" : "Default demo image"}</span>
          <label class="demo-upload-button">
            <input type="file" accept="image/*" data-demo-image="${escapeAttribute(exercise.name)}">
            <span>Change image</span>
          </label>
        </div>
        <button class="icon-button" type="button" data-reset-demo="${escapeAttribute(exercise.name)}" aria-label="Reset ${escapeAttribute(exercise.name)} demo image">x</button>
      </article>
    `;
  }).join("");
}

function updateLog(event) {
  if (!ensureSignedIn()) return;
  const { exercise, set, field } = event.target.dataset;
  const key = currentLogKey();
  currentLogs()[key] ||= makeEmptyLog();
  currentLogs()[key].exercises[exercise] ||= [];
  currentLogs()[key].exercises[exercise][Number(set)] ||= {};
  currentLogs()[key].exercises[exercise][Number(set)][field] = event.target.value;
  persistUsers();
  renderPreviousSummary();
  pulseSaved("Saved");
}

function usePreviousExercise(exerciseName) {
  if (!ensureSignedIn()) return;
  const previous = findPreviousSameWorkout();
  const previousSets = previous?.exercises?.[exerciseName];
  if (!previousSets?.length) {
    showCelebration("No previous sets found");
    return;
  }
  const key = currentLogKey();
  currentLogs()[key] ||= makeEmptyLog();
  currentLogs()[key].exercises[exerciseName] = previousSets.map((entry) => ({ ...entry }));
  persistUsers();
  pulseSaved("Previous sets added");
  render();
}

function renderPhotoPreview() {
  const photo = currentLogs()[currentLogKey()]?.photo;
  els.photoPreview.classList.toggle("hidden", !photo);
  els.photoPreview.innerHTML = photo ? `<img src="${photo}" alt="Selected workout upload">` : "";
}

function postAnnouncement() {
  if (!isCoordinator()) return showCelebration("Coordinator only");
  const message = els.announcementText.value.trim();
  if (!message) return;
  state.announcements.unshift({
    id: `${Date.now()}`,
    author: currentUser().name,
    title: "Fitness update",
    message,
    createdAt: new Date().toISOString()
  });
  state.announcements = state.announcements.slice(0, 20);
  localStorage.setItem(ANNOUNCEMENTS_KEY, JSON.stringify(state.announcements));
  els.announcementText.value = "";
  showCelebration("Announcement posted");
  renderAnnouncements();
}

function deleteAnnouncement(id) {
  if (!isCoordinator()) return showCelebration("Coordinator only");
  const startingCount = state.announcements.length;
  state.announcements = state.announcements.filter((item) => item.id !== id);
  if (state.announcements.length === startingCount) return;
  localStorage.setItem(ANNOUNCEMENTS_KEY, JSON.stringify(state.announcements));
  showCelebration("Announcement deleted");
  renderAnnouncements();
}

function transferCoordinator() {
  if (!isCoordinator()) return showCelebration("Coordinator only");
  const userId = els.coordinatorAccountSelect.value;
  const nextCoordinator = state.users[userId];
  if (!nextCoordinator?.email) return showCelebration("Choose a signed-in account");
  state.coordinatorEmail = nextCoordinator.email.toLowerCase();
  localStorage.setItem(COORDINATOR_KEY, state.coordinatorEmail);
  nextCoordinator.notifications ||= [];
  nextCoordinator.notifications.unshift({
    id: `${Date.now()}`,
    type: "coordinator-transfer",
    message: "You are now the Fitness Coordinator.",
    createdAt: new Date().toISOString(),
    read: false
  });
  persistUsers();
  showCelebration("Coordinator transferred");
  render();
}

function renderCoordinatorAccountOptions() {
  const users = Object.values(state.users).filter((user) => user.email);
  els.coordinatorAccountSelect.innerHTML = users.length
    ? users.map((user) => `<option value="${escapeAttribute(user.id)}" ${user.email.toLowerCase() === state.coordinatorEmail.toLowerCase() ? "selected" : ""}>${escapeHtml(user.name)} - ${escapeHtml(user.email)}</option>`).join("")
    : `<option value="">No signed-in accounts yet</option>`;
}

function saveEditedExercises() {
  if (!isCoordinator()) return showCelebration("Coordinator only");
  const workout = els.adminWorkoutSelect.value;
  const text = document.querySelector("#exerciseEditorText")?.value || "";
  const nextExercises = text.split("\n").map((line) => line.trim()).filter(Boolean).map((line) => {
    const [name, sets, target, range] = line.split("|").map((value) => value.trim());
    if (range) startingRanges[name] = range;
    return { name, sets: Number(sets) || 1, target: target || "N/A" };
  });
  if (!nextExercises.length) return;
  workouts[workout] = nextExercises;
  localStorage.setItem(WORKOUTS_KEY, JSON.stringify(workouts));
  localStorage.setItem(RANGES_KEY, JSON.stringify(startingRanges));
  showCelebration("Exercises updated");
  render();
}

function updateDemoImage(event) {
  if (!isCoordinator()) return showCelebration("Coordinator only");
  const exerciseName = event.target.dataset.demoImage;
  const file = event.target.files?.[0];
  if (!exerciseName || !file) return;
  resizeImageFile(file, 960, (dataUrl) => {
    demoImages[exerciseName] = dataUrl;
    persistDemoImages();
    showCelebration("Demo image updated");
    render();
  });
}

function resetDemoImage(exerciseName) {
  if (!isCoordinator()) return showCelebration("Coordinator only");
  if (!demoImages[exerciseName]) return showCelebration("Already using default");
  delete demoImages[exerciseName];
  persistDemoImages();
  showCelebration("Demo image reset");
  render();
}

function toggleCheer(itemId) {
  if (!ensureSignedIn()) return;
  const item = state.teamFeed.find((entry) => entry.id === itemId);
  if (!item) return;
  toggleId(item.cheers, state.currentUserId);
  persistTeamFeed();
  renderTeamFeed();
}

function toggleBadgeCelebration(itemId) {
  if (!ensureSignedIn()) return;
  const item = state.teamFeed.find((entry) => entry.id === itemId);
  if (!item) return;
  item.celebrations ||= [];
  toggleId(item.celebrations, state.currentUserId);
  persistTeamFeed();
  showCelebration("Celebration sent!");
  renderTeamFeed();
}

function signInWithGoogle() {
  if (GOOGLE_CLIENT_ID && window.google?.accounts?.id) {
    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: (response) => {
        const profile = parseJwt(response.credential);
        saveSignedInUser({ id: profile.sub, name: profile.name || profile.email, email: profile.email || "" });
      }
    });
    window.google.accounts.id.prompt();
    return;
  }
  openSignInSheet();
}

function openSignInSheet() {
  els.signInSheet.classList.remove("hidden");
  window.setTimeout(() => els.previewEmail.focus(), 80);
}

function closeSignInSheet() {
  els.signInSheet.classList.add("hidden");
}

function suggestPreviewName() {
  if (els.previewName.value.trim()) return;
  const emailName = els.previewEmail.value.split("@")[0].replace(/[._-]+/g, " ").trim();
  if (emailName) els.previewName.placeholder = titleCase(emailName);
}

function submitPreviewOnEnter(event) {
  if (event.key !== "Enter") return;
  event.preventDefault();
  signInFromPreviewForm();
}

function signInFromPreviewForm() {
  const email = els.previewEmail.value.trim().toLowerCase();
  if (!isValidEmail(email)) {
    showCelebration("Enter a Google email");
    els.previewEmail.focus();
    return;
  }
  const fallbackName = titleCase(email.split("@")[0].replace(/[._-]+/g, " "));
  const name = els.previewName.value.trim() || fallbackName;
  saveSignedInUser({ id: slugify(email), name, email });
  els.previewEmail.value = "";
  els.previewName.value = "";
  closeSignInSheet();
}

function logOut() {
  state.currentUserId = "";
  localStorage.removeItem(CURRENT_USER_KEY);
  els.accountMenu.open = false;
  showCelebration("Logged out");
  render();
}

function updateAccountPhoto() {
  if (!ensureSignedIn()) return;
  const file = els.accountPhotoInput.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    currentUser().avatar = reader.result;
    persistUsers();
    showCelebration("Account photo updated");
    render();
  });
  reader.readAsDataURL(file);
}

function saveSignedInUser(profile) {
  state.users[profile.id] ||= { id: profile.id, name: profile.name, email: profile.email, logs: {} };
  state.users[profile.id].name = profile.name;
  state.users[profile.id].email = profile.email;
  state.currentUserId = profile.id;
  localStorage.setItem(CURRENT_USER_KEY, profile.id);
  persistUsers();
  showCelebration(`Welcome, ${profile.name}!`);
  render();
}

function ensureSignedIn() {
  if (currentUser()) return true;
  setPage("home");
  openSignInSheet();
  showCelebration("Sign in first");
  return false;
}

function exportMemberJson() {
  const user = currentUser();
  const payload = { rider: user?.name || "No rider signed in", email: user?.email || "", exportedAt: new Date().toISOString(), logs: user?.logs || {} };
  downloadFile(`${slugify(user?.name || "ihsa")}-fitness-logs.json`, JSON.stringify(payload, null, 2), "application/json");
}

function exportTeamCsv() {
  if (!isCoordinator()) return showCelebration("Coordinator only");
  const weekStart = startOfWeek(new Date());
  const weekEnd = addDays(weekStart, 6);
  const rows = [["Section", "Date", "Rider", "Email", "Workout", "Exercise", "Set", "Weight", "Reps", "Completed At", "Team Mean Weight", "Entry Count"]];
  const teamBuckets = {};
  Object.values(state.users).forEach((user) => {
    Object.values(user.logs || {}).forEach((log) => {
      if (!isCurrentWeekDate(log.date, weekStart)) return;
      Object.entries(log.exercises || {}).forEach(([exercise, sets]) => {
        sets.forEach((entry, index) => {
          const weight = Number(entry?.weight);
          rows.push(["Individual Stats", log.date, user.name, user.email, log.workout, exercise, index + 1, entry?.weight || "", entry?.reps || "", log.completedAt || "", "", ""]);
          if (Number.isFinite(weight)) {
            const key = `${log.date}|${exercise}`;
            teamBuckets[key] ||= { date: log.date, exercise, total: 0, count: 0 };
            teamBuckets[key].total += weight;
            teamBuckets[key].count += 1;
          }
        });
      });
    });
  });
  Object.values(teamBuckets).sort((a, b) => a.date.localeCompare(b.date) || a.exercise.localeCompare(b.exercise)).forEach((bucket) => {
    rows.push(["Team Stats", bucket.date, "Team Mean", "", "", bucket.exercise, "", "", "", "", (bucket.total / bucket.count).toFixed(2), bucket.count]);
  });
  const weekRange = `${formatDate(weekStart)}-to-${formatDate(weekEnd)}`;
  downloadFile(`aggie-ihsa-team-fitness-week-${weekRange}.csv`, rows.map(csvRow).join("\n"), "text/csv");
}

function badgeChangeForCurrentUser() {
  const userId = state.currentUserId;
  const before = weeklyWorkoutCount(userId);
  const after = before + 1;
  const beforeBadge = badgeForCount(before);
  const afterBadge = badgeForCount(after);
  if (!afterBadge || beforeBadge?.tier === afterBadge.tier) return null;
  return { ...afterBadge, streak: streakForUser(userId, after) };
}

function weeklyBadgeForUser(userId) {
  const badge = badgeForCount(weeklyWorkoutCount(userId));
  return badge ? { ...badge, streak: streakForUser(userId) } : null;
}

function weeklyWorkoutCount(userId) {
  const start = startOfWeek(new Date());
  return state.teamFeed.filter((item) => item.userId === userId && new Date(item.createdAt) >= start).length;
}

function streakForUser(userId, currentWeekCount = weeklyWorkoutCount(userId)) {
  let streak = currentWeekCount >= 2 ? 1 : 0;
  let cursor = addDays(startOfWeek(new Date()), -7);
  while (true) {
    const next = addDays(cursor, 7);
    const count = state.teamFeed.filter((item) => item.userId === userId && new Date(item.createdAt) >= cursor && new Date(item.createdAt) < next).length;
    if (count < 2) break;
    streak += 1;
    cursor = addDays(cursor, -7);
  }
  return streak;
}

function badgeForCount(count) {
  if (count >= 5) return { tier: "gold", label: "Gold" };
  if (count >= 3) return { tier: "silver", label: "Silver" };
  if (count >= 2) return { tier: "bronze", label: "Bronze" };
  return null;
}

function findPreviousSameWorkout() {
  const logs = Object.values(currentLogs()).filter((log) => log.workout === state.selectedWorkout && log.completedAt).sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
  return logs[0] || null;
}

function teamLogDetails(log) {
  if (!log?.exercises) return `<div class="empty-state">No set details saved.</div>`;
  return Object.entries(log.exercises).map(([exercise, sets]) => `
    <div class="detail-exercise">
      <strong>${escapeHtml(exercise)}</strong>
      ${sets.map((entry, index) => `<span>Set ${index + 1}: ${formatEntry(entry)}</span>`).join("")}
    </div>
  `).join("");
}

function makeEmptyLog() {
  return { workout: state.selectedWorkout, date: formatDate(new Date()), exercises: {}, photo: "", photoName: "", completedAt: "" };
}

function currentLogKey() {
  return `${formatDate(new Date())}-${state.selectedWorkout}`;
}

function currentUser() {
  return state.users[state.currentUserId] || null;
}

function renderAvatar(element, user) {
  if (!element) return;
  if (user?.avatar) {
    element.innerHTML = `<img src="${user.avatar}" alt="">`;
    return;
  }
  element.textContent = initialsFor(user?.name || user?.email || "?");
}

function avatarMarkup(user, fallbackName = "") {
  if (user?.avatar) return `<span class="account-avatar team-avatar"><img src="${user.avatar}" alt=""></span>`;
  return `<span class="account-avatar team-avatar">${escapeHtml(initialsFor(user?.name || fallbackName || "?"))}</span>`;
}

function guideForExercise(exercise) {
  return {
    type: "movement prep",
    tips: [
      `Use the target of ${exercise.target}.`,
      "Move with control before adding load.",
      "Stop the set if form breaks."
    ]
  };
}

function demoVisualMarkup(exercise, guide) {
  return `<img src="${escapeAttribute(demoImageForExercise(exercise.name))}" alt="${escapeAttribute(exercise.name)} demonstration card" loading="lazy">`;
}

function demoImageForExercise(exerciseName) {
  if (demoImages[exerciseName]) return demoImages[exerciseName];
  const guide = demoGuides[exerciseName];
  return guide?.image ? `${guide.image}` : "AggieIHSALogo.webp";
}

function normalizeWorkoutLibrary(library) {
  const copy = structuredClone(library);
  Object.keys(defaultWorkouts).forEach((workout) => {
    copy[workout] ||= structuredClone(defaultWorkouts[workout]);
  });
  replaceExercise(copy, "Strength A", "Farmer Carries", "Single Arm Overhead Marches");
  replaceExercise(copy, "Mobility", "Glute Stretch", "Pigeon Pose");
  return copy;
}

function replaceExercise(library, workout, oldName, newName) {
  const exercises = library[workout];
  if (!Array.isArray(exercises)) return;
  const oldExercise = exercises.find((exercise) => exercise.name === oldName);
  const newExercise = exercises.find((exercise) => exercise.name === newName);
  if (oldExercise && !newExercise) oldExercise.name = newName;
}

function renderAccountNotifications(user) {
  const unread = (user.notifications || []).filter((item) => !item.read);
  els.accountNotifications.innerHTML = unread.length
    ? unread.map((item) => `<div class="notification-card">${escapeHtml(item.message)}<small>${formatShortDate(new Date(item.createdAt))}</small></div>`).join("")
    : `<div class="empty-state">No new account notifications.</div>`;
  if (unread.length) {
    user.notifications = (user.notifications || []).map((item) => ({ ...item, read: true }));
    persistUsers();
  }
}

function currentLogs() {
  return currentUser()?.logs || {};
}

function isCoordinator() {
  return (currentUser()?.email || "").toLowerCase() === state.coordinatorEmail.toLowerCase();
}

function persistUsers() {
  localStorage.setItem(USERS_KEY, JSON.stringify(state.users));
}

function persistDemoImages() {
  localStorage.setItem(DEMO_IMAGES_KEY, JSON.stringify(demoImages));
}

function persistTeamFeed() {
  localStorage.setItem(TEAM_FEED_KEY, JSON.stringify(state.teamFeed));
}

function repOptions(selected) {
  const options = ["", ...Array.from({ length: 30 }, (_, index) => String(index + 1))];
  return options.map((value) => `<option value="${value}" ${String(selected ?? "") === value ? "selected" : ""}>${value === "" ? "Select" : value}</option>`).join("");
}

function initialsFor(value) {
  const parts = String(value).trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  return parts.slice(0, 2).map((part) => part[0].toUpperCase()).join("");
}

function trackingSetCount(exercise) {
  return Number.isFinite(exercise.sets) && exercise.sets > 0 ? exercise.sets : 1;
}

function startingRangeFor(exercise) {
  return startingRanges[exercise.name] || "Start: light, controlled effort";
}

function formatEntry(entry = {}) {
  if (!entry.weight && !entry.reps) return "not logged";
  if (entry.weight && entry.reps) return `${entry.weight} lb x ${entry.reps}`;
  if (entry.weight) return `${entry.weight} lb`;
  return `${entry.reps} reps`;
}

function pulseSaved(message) {
  els.saveStatus.textContent = message;
  window.clearTimeout(pulseSaved.timer);
  pulseSaved.timer = window.setTimeout(() => { els.saveStatus.textContent = "Saved on this device"; }, 1400);
}

function showCelebration(message) {
  els.celebration.textContent = message;
  els.celebration.classList.remove("hidden");
  window.clearTimeout(showCelebration.timer);
  showCelebration.timer = window.setTimeout(() => els.celebration.classList.add("hidden"), 1900);
}

function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function resizeImageFile(file, maxSize, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const img = new Image();
    img.addEventListener("load", () => {
      const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(img.width * scale));
      canvas.height = Math.max(1, Math.round(img.height * scale));
      const context = canvas.getContext("2d");
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
      callback(canvas.toDataURL("image/webp", 0.86));
    });
    img.addEventListener("error", () => callback(reader.result));
    img.src = reader.result;
  });
  reader.readAsDataURL(file);
}

function csvRow(row) {
  return row.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(",");
}

function toggleId(list, id) {
  const index = list.indexOf(id);
  if (index >= 0) list.splice(index, 1);
  else list.push(id);
}

function parseJwt(token) {
  const payload = token.split(".")[1];
  return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isCurrentWeekDate(value, weekStart = startOfWeek(new Date())) {
  if (!value) return false;
  const date = startOfDay(new Date(`${value}T00:00:00`));
  const weekEnd = addDays(weekStart, 7);
  return date >= weekStart && date < weekEnd;
}

function startOfWeek(date) {
  const copy = startOfDay(date);
  const day = copy.getDay();
  copy.setDate(copy.getDate() - (day === 0 ? 6 : day - 1));
  return copy;
}

function startOfDay(date) {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function addDays(date, days) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return startOfDay(copy);
}

function formatDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function formatShortDate(date) {
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function slugify(value) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "rider";
}

function titleCase(value) {
  return value.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/`/g, "&#096;");
}

function setText(element, value) {
  if (element) element.textContent = value;
}

function relativeTime(isoDate) {
  const delta = Date.now() - new Date(isoDate).getTime();
  const minutes = Math.max(0, Math.round(delta / 60000));
  if (minutes < 1) return "just now";
  if (minutes === 1) return "1 minute ago";
  if (minutes < 60) return `${minutes} minutes ago`;
  const hours = Math.round(minutes / 60);
  return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
}

render();

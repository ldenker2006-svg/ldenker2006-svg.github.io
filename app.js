const GOOGLE_CLIENT_ID = "";
const TEAM_SYNC_URL = "https://ihsa-fitness-app-default-rtdb.firebaseio.com";
const TEAM_SYNC_ID = "aggie-ihsa";
const SYNC_POLL_MS = 15000;
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyC6Yc6dIIYA5aTnEyU-6IjlMNSibmlSNiE",
  authDomain: "ihsa-fitness-app.firebaseapp.com",
  databaseURL: "https://ihsa-fitness-app-default-rtdb.firebaseio.com",
  projectId: "ihsa-fitness-app",
  storageBucket: "ihsa-fitness-app.firebasestorage.app",
  messagingSenderId: "718264416647",
  appId: "1:718264416647:web:ca6a667e4c7c07c55b7b22",
  measurementId: "G-E7KRBMQLR0"
};
const FCM_VAPID_KEY = "BFzJFSrHYZn95aTPyzaU87MygtFvZ9N3w-cKIkxfRl5tK4DKaePMBhGHB3791aq46o2wpvLUwR8qVnNqXxm3bxQ";
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
const BUDDIES_KEY = "ihsaFitnessBuddyWorkouts";
const ANNOUNCEMENTS_KEY = "ihsaFitnessAnnouncements";
const COORDINATOR_KEY = "ihsaFitnessCoordinatorEmail";
const WORKOUTS_KEY = "ihsaFitnessWorkouts";
const RANGES_KEY = "ihsaFitnessStartingRanges";
const SELECTED_WORKOUT_KEY = "ihsaFitnessSelectedWorkout";
const DEMO_IMAGES_KEY = "ihsaFitnessDemoImages";
const TRACKER_TIMER_KEY = "ihsaFitnessTrackerTimer";

let workouts = normalizeWorkoutLibrary(JSON.parse(localStorage.getItem(WORKOUTS_KEY) || "null") || structuredClone(defaultWorkouts));
let startingRanges = { ...defaultStartingRanges, ...(JSON.parse(localStorage.getItem(RANGES_KEY) || "null") || {}) };
let demoImages = JSON.parse(localStorage.getItem(DEMO_IMAGES_KEY) || "{}");
let syncTimer = 0;
let syncStatus = TEAM_SYNC_URL ? "Connecting team sync..." : "Device-only preview";
let firebaseMessaging = null;
let trackerTimer = JSON.parse(localStorage.getItem(TRACKER_TIMER_KEY) || "null") || { running: false, startedAt: "", elapsedSeconds: 0 };
let trackerTimerInterval = 0;
let locationWatchId = null;

let state = {
  page: "home",
  users: JSON.parse(localStorage.getItem(USERS_KEY) || "{}"),
  currentUserId: localStorage.getItem(CURRENT_USER_KEY) || "",
  teamFeed: JSON.parse(localStorage.getItem(TEAM_FEED_KEY) || "[]"),
  buddies: JSON.parse(localStorage.getItem(BUDDIES_KEY) || "[]"),
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
  enableNotifications: document.querySelector("#enableNotifications"),
  notificationStatus: document.querySelector("#notificationStatus"),
  accountNotifications: document.querySelector("#accountNotifications"),
  logOutButton: document.querySelector("#logOutButton"),
  signInSheet: document.querySelector("#signInSheet"),
  closeSignIn: document.querySelector("#closeSignIn"),
  previewEmail: document.querySelector("#previewEmail"),
  previewName: document.querySelector("#previewName"),
  previewSignIn: document.querySelector("#previewSignIn"),
  coordinatorNavButton: document.querySelector("#coordinatorNavButton"),
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
  resetPoints: document.querySelector("#resetPoints"),
  homeDate: document.querySelector("#homeDate"),
  homeWorkout: document.querySelector("#homeWorkout"),
  homeSummary: document.querySelector("#homeSummary"),
  myPointsTitle: document.querySelector("#myPointsTitle"),
  myPointsBadge: document.querySelector("#myPointsBadge"),
  myPointsSummary: document.querySelector("#myPointsSummary"),
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
  cardioOptions: document.querySelector("#cardioOptions"),
  cardioActivitySelect: document.querySelector("#cardioActivitySelect"),
  customCardioField: document.querySelector("#customCardioField"),
  customCardioActivity: document.querySelector("#customCardioActivity"),
  cardioMetricFields: document.querySelector("#cardioMetricFields"),
  cardioDuration: document.querySelector("#cardioDuration"),
  cardioDistance: document.querySelector("#cardioDistance"),
  customStrengthPanel: document.querySelector("#customStrengthPanel"),
  customStrengthName: document.querySelector("#customStrengthName"),
  customStrengthExercises: document.querySelector("#customStrengthExercises"),
  saveCustomStrength: document.querySelector("#saveCustomStrength"),
  timerDisplay: document.querySelector("#timerDisplay"),
  workoutTimerButton: document.querySelector("#workoutTimerButton"),
  shareLocationButton: document.querySelector("#shareLocationButton"),
  locationStatus: document.querySelector("#locationStatus"),
  loggerDate: document.querySelector("#loggerDate"),
  loggerTitle: document.querySelector("#loggerTitle"),
  restPanel: document.querySelector("#restPanel"),
  logList: document.querySelector("#logList"),
  clearDay: document.querySelector("#clearDay"),
  finishWorkout: document.querySelector("#finishWorkout"),
  workoutDescription: document.querySelector("#workoutDescription"),
  exportLogs: document.querySelector("#exportLogs"),
  saveStatus: document.querySelector("#saveStatus"),
  teamFeed: document.querySelector("#teamFeed"),
  teamLogCount: document.querySelector("#teamLogCount"),
  teamStandingsPanel: document.querySelector("#teamStandingsPanel"),
  teamPointsList: document.querySelector("#teamPointsList"),
  buddyWorkoutType: document.querySelector("#buddyWorkoutType"),
  buddyWorkoutTime: document.querySelector("#buddyWorkoutTime"),
  buddyDestination: document.querySelector("#buddyDestination"),
  buddyNote: document.querySelector("#buddyNote"),
  postBuddyWorkout: document.querySelector("#postBuddyWorkout"),
  buddyList: document.querySelector("#buddyList"),
  buddyCount: document.querySelector("#buddyCount"),
  syncStatus: document.querySelector("#syncStatus"),
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
els.enableNotifications.addEventListener("click", enableBrowserNotifications);
els.accountMenu.addEventListener("toggle", markAccountNotificationsRead);
els.closeSignIn.addEventListener("click", closeSignInSheet);
els.previewSignIn.addEventListener("click", signInFromPreviewForm);
els.previewEmail.addEventListener("input", suggestPreviewName);
els.previewEmail.addEventListener("keydown", submitPreviewOnEnter);
els.previewName.addEventListener("keydown", submitPreviewOnEnter);
els.signInSheet.addEventListener("click", (event) => {
  if (event.target === els.signInSheet) closeSignInSheet();
});
els.workoutTypeSelect.addEventListener("change", () => setWorkout(els.workoutTypeSelect.value));
els.cardioActivitySelect.addEventListener("change", updateCardioLog);
els.customCardioActivity.addEventListener("input", updateCardioLog);
els.cardioDuration.addEventListener("input", updateCardioLog);
els.cardioDistance.addEventListener("input", updateCardioLog);
els.saveCustomStrength.addEventListener("click", saveCustomStrengthWorkout);
els.workoutTimerButton.addEventListener("click", toggleWorkoutTimer);
els.shareLocationButton.addEventListener("click", shareWorkoutLocation);
els.postBuddyWorkout.addEventListener("click", postBuddyWorkout);
els.buddyList.addEventListener("click", (event) => {
  const joinButton = event.target.closest("[data-join-buddy]");
  if (joinButton) toggleBuddyJoin(joinButton.dataset.joinBuddy);
});
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
els.resetPoints.addEventListener("click", resetYearlyPoints);
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

els.workoutDescription.addEventListener("input", () => {
  if (!ensureSignedIn()) return;
  currentLogs()[currentLogKey()] ||= makeEmptyLog();
  currentLogs()[currentLogKey()].description = els.workoutDescription.value;
  persistUsers();
  pulseSaved("Description saved");
});

els.finishWorkout.addEventListener("click", () => {
  if (!ensureSignedIn()) return;
  const key = currentLogKey();
  currentLogs()[key] ||= makeEmptyLog();
  currentLogs()[key].completedAt = new Date().toISOString();
  currentLogs()[key].workout = activeWorkoutLabel();
  currentLogs()[key].description = els.workoutDescription.value.trim();
  if (state.selectedWorkout === "Endurance") syncCardioLog(currentLogs()[key]);
  syncTimerToLog(currentLogs()[key]);
  const workoutPoints = awardWorkoutPoints(state.currentUserId, currentLogs()[key]);
  const buddyPoints = awardBuddyCompletionPoint(state.currentUserId, currentLogs()[key]);
  const pointsAwarded = workoutPoints + buddyPoints;
  persistUsers();
  if (buddyPoints) persistBuddies();

  const item = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    userId: state.currentUserId,
    name: currentUser().name,
    workout: activeWorkoutLabel(),
    date: formatDate(new Date()),
    log: currentLogs()[key],
    description: currentLogs()[key].description || "",
    createdAt: new Date().toISOString(),
    cheers: [],
    pointsAwarded
  };
  state.teamFeed.unshift(item);
  state.teamFeed = state.teamFeed.slice(0, 60);
  persistTeamFeed();
  resetTrackerTimer();
  showCelebration(`${currentUser().name} earned ${pointsAwarded} points${buddyPoints ? " with buddy bonus" : ""}.`);
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
  renderMyPoints();
  checkBuddyReminders();
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
  renderBuddyWorkoutSelect();
  renderBuddies();
  renderTeamPoints();
  renderTeamFeed();
  renderExerciseEditor();
  renderDemoImageEditor();
}

function renderMyPoints() {
  const user = currentUser();
  const points = user ? yearlyPointsForUser(user) : 0;
  setText(els.myPointsTitle, user ? `${new Date().getFullYear()} total` : "Year total");
  setText(els.myPointsBadge, `${points} pts`);
  setText(els.myPointsSummary, user
    ? "Completed workouts and completed buddy workouts add to your individual yearly score."
    : "Sign in to see your individual point count.");
}

function renderProfile() {
  const user = currentUser();
  const points = user ? yearlyPointsForUser(user) : 0;
  els.signInButton.classList.toggle("hidden", Boolean(user));
  els.accountMenu.classList.toggle("hidden", !user);
  els.signInButtonText.textContent = "Sign in with Google";
  if (user) {
    els.accountName.textContent = user.name;
    els.accountPanelName.textContent = user.name;
    els.accountEmail.textContent = user.email || "";
    renderAvatar(els.accountAvatar, user);
    els.accountPanelBadge.textContent = `${points} pts`;
    els.accountPanelBadge.className = "badge points-badge";
    els.accountBadgeList.innerHTML = `<span class="account-badge points">${points} yearly points</span><span class="streak-pill">Scored by workout type</span>`;
    renderAccountNotifications(user);
  }
  els.coordinatorNavButton.classList.toggle("hidden", !isCoordinator());
  els.clearTeamFeed.classList.toggle("hidden", !isCoordinator());
  els.teamStandingsPanel.classList.toggle("hidden", !isCoordinator());
  if (!isCoordinator() && state.page === "coordinator") state.page = "home";
  renderCoordinatorAccountOptions();
  els.coordinatorBadge.textContent = isCoordinator() ? "Active" : "Admin";
}

function renderPages() {
  if (!isCoordinator() && state.page === "coordinator") state.page = "home";
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
  if (!memberWorkoutTypes().includes(state.selectedWorkout)) state.selectedWorkout = "Strength A";
  const options = memberWorkoutTypes().map((workout) => `<option value="${escapeAttribute(workout)}" ${workout === state.selectedWorkout ? "selected" : ""}>${escapeHtml(workout)}</option>`).join("");
  els.workoutTypeSelect.innerHTML = options;
  els.adminWorkoutSelect.innerHTML = WORKOUT_TYPES.map((workout) => `<option value="${workout}">${workout}</option>`).join("");
  if (!WORKOUT_TYPES.includes(els.adminWorkoutSelect.value)) {
    els.adminWorkoutSelect.value = WORKOUT_TYPES.includes(state.selectedWorkout) ? state.selectedWorkout : WORKOUT_TYPES[0];
  }
}

function memberWorkoutTypes() {
  const customNames = Object.keys(currentUser()?.customWorkouts || {});
  return [...WORKOUT_TYPES, ...customNames];
}

function workoutExercises(workout) {
  return currentUser()?.customWorkouts?.[workout]?.exercises || workouts[workout] || [];
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
  if (!workoutExercises(state.selectedWorkout).length) {
    container.innerHTML = `<div class="empty-state">No exercises added yet.</div>`;
    return;
  }
  workoutExercises(state.selectedWorkout).forEach((exercise) => {
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
  workoutExercises(state.selectedWorkout).forEach((exercise) => {
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
  workoutExercises(state.selectedWorkout).forEach((exercise) => {
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
  els.workoutDescription.value = dayLog.description || "";
  renderCardioOptions(dayLog);
  renderCustomStrengthPanel();
  renderTrackingTools(dayLog);

  if (!currentUser()) {
    els.logList.innerHTML = `<div class="empty-state">Sign in with Google before logging so your workout data and team description stay attached to your rider account.</div>`;
    return;
  }

  if (isCustomCardioMode()) {
    els.logList.innerHTML = `<div class="empty-state">Log your cardio activity above, then add a team post description before finishing.</div>`;
    return;
  }

  workoutExercises(state.selectedWorkout).forEach((exercise) => {
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

function renderTeamPoints() {
  const riders = Object.values(state.users)
    .filter((user) => user.email)
    .map((user) => ({ ...user, points: yearlyPointsForUser(user) }))
    .sort((a, b) => b.points - a.points || a.name.localeCompare(b.name));
  els.teamPointsList.innerHTML = riders.length
    ? riders.map((user, index) => `
      <article class="points-row ${tierClassForRank(index)}">
        <span>${tierLabelForRank(index)}</span>
        ${avatarMarkup(user, user.name)}
        <strong>${escapeHtml(user.name)}</strong>
        <b>${user.points} pts</b>
      </article>
    `).join("")
    : `<div class="empty-state">No team points yet. Finish a workout to start the yearly total.</div>`;
}

function tierLabelForRank(index) {
  if (index === 0) return "S";
  if (index < 3) return "A";
  if (index < 6) return "B";
  return "C";
}

function tierClassForRank(index) {
  return `tier-${tierLabelForRank(index).toLowerCase()}`;
}

function renderBuddyWorkoutSelect() {
  const selected = els.buddyWorkoutType.value || state.selectedWorkout;
  els.buddyWorkoutType.innerHTML = memberWorkoutTypes().map((workout) => `<option value="${escapeAttribute(workout)}" ${workout === selected ? "selected" : ""}>${escapeHtml(workout)}</option>`).join("");
}

function renderBuddies() {
  const now = Date.now();
  const upcoming = state.buddies
    .filter((item) => !item.time || new Date(item.time).getTime() + 3600000 >= now)
    .sort((a, b) => new Date(a.time || 0) - new Date(b.time || 0));
  els.buddyCount.textContent = String(upcoming.length);
  els.buddyList.innerHTML = "";
  if (!upcoming.length) {
    els.buddyList.innerHTML = `<div class="empty-state">No buddy workouts posted yet.</div>`;
    return;
  }
  upcoming.forEach((item) => {
    const joined = currentUser() && item.joiners?.includes(state.currentUserId);
    const creator = state.users[item.userId];
    const joinerNames = (item.joiners || []).map((id) => state.users[id]?.name).filter(Boolean);
    const joinerMarkup = joinerNames.length
      ? `<div class="buddy-joiner-chips">${joinerNames.map((name) => `<span>${escapeHtml(name)}</span>`).join("")}</div>`
      : `<div class="buddy-joiners empty">No one has joined yet.</div>`;
    const card = document.createElement("article");
    card.className = "buddy-card";
    card.innerHTML = `
      <div class="buddy-card-head">
        ${avatarMarkup(creator, item.name)}
        <div>
          <p class="eyebrow">${escapeHtml(item.workout)}</p>
          <h3>${escapeHtml(item.name)} is going ${formatBuddyTime(item.time)}</h3>
        </div>
      </div>
      <div class="buddy-meta">
        <span>${escapeHtml(item.destination || "Destination TBD")}</span>
        ${item.note ? `<span>${escapeHtml(item.note)}</span>` : ""}
      </div>
      <div class="buddy-joiners"><strong>Squad joining</strong>${joinerMarkup}</div>
      <button class="cheer-button ${joined ? "active" : ""}" type="button" data-join-buddy="${escapeAttribute(item.id)}">${joined ? "Joined" : "Join"} <strong>${item.joiners?.length || 0}</strong></button>
    `;
    els.buddyList.appendChild(card);
  });
}

function postBuddyWorkout() {
  if (!ensureSignedIn()) return;
  const workout = els.buddyWorkoutType.value || state.selectedWorkout;
  const time = els.buddyWorkoutTime.value;
  const destination = els.buddyDestination.value.trim();
  if (!time || !destination) return showCelebration("Add a time and destination");
  state.buddies.unshift({
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    userId: state.currentUserId,
    name: currentUser().name,
    workout,
    time,
    destination,
    note: els.buddyNote.value.trim(),
    joiners: [state.currentUserId],
    buddyPointsAwarded: [],
    createdAt: new Date().toISOString()
  });
  state.buddies = state.buddies.slice(0, 80);
  persistBuddies();
  els.buddyWorkoutTime.value = "";
  els.buddyDestination.value = "";
  els.buddyNote.value = "";
  showCelebration("Buddy workout posted");
  renderBuddies();
}

function toggleBuddyJoin(itemId) {
  if (!ensureSignedIn()) return;
  const item = state.buddies.find((entry) => entry.id === itemId);
  if (!item) return;
  item.joiners ||= [];
  const wasJoined = item.joiners.includes(state.currentUserId);
  toggleId(item.joiners, state.currentUserId);
  if (!wasJoined) {
    if (item.userId !== state.currentUserId) {
      addUserNotification(item.userId, `${currentUser().name} joined your ${item.workout} buddy workout.`);
    }
  }
  persistBuddies();
  if (!wasJoined) persistUsers();
  showCelebration(wasJoined ? "Left buddy workout" : "Joined buddy workout");
  renderBuddies();
}

function renderTeamFeed() {
  els.teamLogCount.textContent = String(state.teamFeed.length);
  setText(els.syncStatus, syncStatus);
  els.teamFeed.innerHTML = "";
  if (!state.teamFeed.length) {
    els.teamFeed.innerHTML = `<div class="empty-state">No workouts posted yet. Finish a workout to start the team feed.</div>`;
    return;
  }

  state.teamFeed.forEach((item) => {
    const cheered = currentUser() && item.cheers.includes(state.currentUserId);
    const pointsText = item.pointsAwarded ? `<div class="badge-callout">${escapeHtml(item.name)} earned ${Number(item.pointsAwarded)} yearly points.</div>` : "";
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
        ${pointsText}
      </div>
      ${item.description ? `<p class="team-description">${escapeHtml(item.description)}</p>` : ""}
      <details class="feed-details">
        <summary>See more</summary>
        ${teamLogDetails(item.log)}
      </details>
      <div class="feed-actions">
        <button class="cheer-button ${cheered ? "active" : ""}" type="button" data-cheer="${item.id}" aria-label="Give thumbs up to ${escapeAttribute(item.name)}"><span aria-hidden="true">&#128077;</span><strong>${item.cheers.length}</strong></button>
      </div>
    `;
    els.teamFeed.appendChild(card);
  });

  els.teamFeed.querySelectorAll("[data-cheer]").forEach((button) => button.addEventListener("click", () => toggleCheer(button.dataset.cheer)));
}

function renderExerciseEditor() {
  if (!isCoordinator()) return;
  const workout = els.adminWorkoutSelect.value || state.selectedWorkout;
  if (!workouts[workout]) return;
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
  if (!workouts[workout]) return;
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

function renderCardioOptions(dayLog) {
  const isEndurance = state.selectedWorkout === "Endurance";
  els.cardioOptions.classList.toggle("hidden", !isEndurance);
  if (!isEndurance) return;

  els.cardioActivitySelect.value = dayLog.cardio?.activity || "Programmed Endurance Workout";
  els.customCardioActivity.value = dayLog.cardio?.customActivity || "";
  els.cardioDuration.value = dayLog.cardio?.duration || "";
  els.cardioDistance.value = dayLog.cardio?.distance || "";
  const custom = els.cardioActivitySelect.value === "Other Cardio";
  const metrics = isCustomCardioMode();
  els.customCardioField.classList.toggle("hidden", !custom);
  els.cardioMetricFields.classList.toggle("hidden", !metrics);
}

function renderCustomStrengthPanel() {
  const isStrength = state.selectedWorkout.toLowerCase().includes("strength");
  els.customStrengthPanel.classList.toggle("hidden", !currentUser() || !isStrength);
}

function saveCustomStrengthWorkout() {
  if (!ensureSignedIn()) return;
  const name = els.customStrengthName.value.trim();
  const exercises = parseExerciseLines(els.customStrengthExercises.value);
  if (!name || !exercises.length) return showCelebration("Add a workout name and exercises");
  const user = currentUser();
  user.customWorkouts ||= {};
  user.customWorkouts[name] = { name, exercises };
  exercises.forEach((exercise) => {
    if (exercise.range) startingRanges[exercise.name] = exercise.range;
  });
  state.selectedWorkout = name;
  localStorage.setItem(SELECTED_WORKOUT_KEY, name);
  persistUsers();
  localStorage.setItem(RANGES_KEY, JSON.stringify(startingRanges));
  els.customStrengthName.value = "";
  els.customStrengthExercises.value = "";
  els.customStrengthPanel.open = false;
  showCelebration("Custom workout added");
  render();
}

function parseExerciseLines(text) {
  return text.split("\n").map((line) => line.trim()).filter(Boolean).map((line) => {
    const [name, sets, target, range] = line.split("|").map((value) => value.trim());
    return { name, sets: Number(sets) || 1, target: target || "N/A", range: range || "" };
  }).filter((exercise) => exercise.name);
}

function renderTrackingTools(dayLog) {
  const seconds = timerElapsedSeconds(dayLog);
  els.timerDisplay.textContent = formatDuration(seconds);
  els.workoutTimerButton.textContent = trackerTimer.running ? "Stop timer" : "Start timer";
  els.shareLocationButton.textContent = locationWatchId !== null ? "Stop location" : "Share live location";
  const points = dayLog.locationTrack?.length || 0;
  els.locationStatus.textContent = locationWatchId !== null
    ? `Live route tracking: ${points} point${points === 1 ? "" : "s"}`
    : points
      ? `Route saved: ${points} point${points === 1 ? "" : "s"}`
      : "Location not shared";
}

function toggleWorkoutTimer() {
  if (!ensureSignedIn()) return;
  if (trackerTimer.running) {
    trackerTimer.elapsedSeconds = timerElapsedSeconds();
    trackerTimer.running = false;
    trackerTimer.startedAt = "";
    stopLiveLocation();
  } else {
    trackerTimer.running = true;
    trackerTimer.startedAt = new Date().toISOString();
  }
  persistTrackerTimer();
  syncTimerToCurrentLog();
  renderLogger();
  startTrackerTimerLoop();
}

function startTrackerTimerLoop() {
  window.clearInterval(trackerTimerInterval);
  if (!trackerTimer.running) return;
  trackerTimerInterval = window.setInterval(() => {
    syncTimerToCurrentLog({ silent: true });
    renderTrackingTools(currentLogs()[currentLogKey()] || makeEmptyLog());
  }, 1000);
}

function timerElapsedSeconds(dayLog = null) {
  if (trackerTimer.running && trackerTimer.startedAt) {
    return Number(trackerTimer.elapsedSeconds || 0) + Math.floor((Date.now() - new Date(trackerTimer.startedAt).getTime()) / 1000);
  }
  return Number(trackerTimer.elapsedSeconds || dayLog?.timerSeconds || 0);
}

function syncTimerToCurrentLog({ silent = false } = {}) {
  if (!currentUser()) return;
  const key = currentLogKey();
  currentLogs()[key] ||= makeEmptyLog();
  syncTimerToLog(currentLogs()[key]);
  persistUsers();
  if (!silent) pulseSaved("Timer saved");
}

function syncTimerToLog(log) {
  log.timerSeconds = timerElapsedSeconds(log);
  log.timerStartedAt = trackerTimer.startedAt || log.timerStartedAt || "";
}

function resetTrackerTimer() {
  stopLiveLocation();
  trackerTimer = { running: false, startedAt: "", elapsedSeconds: 0 };
  persistTrackerTimer();
  window.clearInterval(trackerTimerInterval);
}

function persistTrackerTimer() {
  localStorage.setItem(TRACKER_TIMER_KEY, JSON.stringify(trackerTimer));
}

function shareWorkoutLocation() {
  if (!ensureSignedIn()) return;
  if (locationWatchId !== null) {
    stopLiveLocation();
    renderLogger();
    pulseSaved("Location stopped");
    return;
  }
  startLiveLocation();
}

function startLiveLocation() {
  if (!navigator.geolocation) return showCelebration("Location is not available");
  if (!trackerTimer.running) return showCelebration("Start the timer first");
  if (locationWatchId !== null) return;
  els.locationStatus.textContent = "Requesting live location...";
  const key = currentLogKey();
  currentLogs()[key] ||= makeEmptyLog();
  currentLogs()[key].locationTrack ||= [];
  locationWatchId = navigator.geolocation.watchPosition((position) => {
    appendLocationPoint(position);
  }, () => {
    stopLiveLocation();
    els.locationStatus.textContent = "Location not shared";
    showCelebration("Location permission was not allowed");
  }, { enableHighAccuracy: true, timeout: 12000, maximumAge: 5000 });
  renderLogger();
}

function appendLocationPoint(position) {
  const key = currentLogKey();
  currentLogs()[key] ||= makeEmptyLog();
  const point = {
    lat: Number(position.coords.latitude.toFixed(5)),
    lng: Number(position.coords.longitude.toFixed(5)),
    at: new Date().toISOString()
  };
  const track = currentLogs()[key].locationTrack ||= [];
  const previous = track[track.length - 1];
  if (!previous || previous.lat !== point.lat || previous.lng !== point.lng) track.push(point);
  currentLogs()[key].location = { ...point, sharedAt: point.at };
  persistUsers();
  renderTrackingTools(currentLogs()[key]);
}

function stopLiveLocation() {
  if (locationWatchId === null) return;
  navigator.geolocation.clearWatch(locationWatchId);
  locationWatchId = null;
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

function updateCardioLog() {
  if (state.selectedWorkout !== "Endurance") return;
  const key = currentLogKey();
  if (!ensureSignedIn()) {
    renderCardioOptions(makeEmptyLog());
    return;
  }
  currentLogs()[key] ||= makeEmptyLog();
  syncCardioLog(currentLogs()[key]);
  persistUsers();
  renderLogger();
  pulseSaved("Cardio saved");
}

function syncCardioLog(log) {
  log.cardio = {
    activity: els.cardioActivitySelect.value,
    customActivity: els.customCardioActivity.value.trim(),
    duration: els.cardioDuration.value,
    distance: els.cardioDistance.value
  };
  log.workout = activeWorkoutLabel();
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
  scheduleSharedSync();
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
  scheduleSharedSync();
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
  scheduleSharedSync();
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
  scheduleSharedSync();
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
  state.users[profile.id] ||= { id: profile.id, name: profile.name, email: profile.email, logs: {}, customWorkouts: {}, pointsByYear: {} };
  state.users[profile.id].name = profile.name;
  state.users[profile.id].email = profile.email;
  state.users[profile.id].logs ||= {};
  state.users[profile.id].customWorkouts ||= {};
  state.users[profile.id].pointsByYear ||= {};
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
  const rows = [["Section", "Date", "Rider", "Email", "Workout", "Exercise", "Set", "Weight", "Reps", "Completed At", "Year Points", "Timer", "Location", "Team Mean Weight", "Entry Count"]];
  const teamBuckets = {};
  Object.values(state.users).forEach((user) => {
    Object.values(user.logs || {}).forEach((log) => {
      if (!isCurrentWeekDate(log.date, weekStart)) return;
      if (log.cardio && log.cardio.activity !== "Programmed Endurance Workout") {
        rows.push(["Individual Stats", log.date, user.name, user.email, log.workout, cardioActivityLabel(log.cardio), "Cardio", log.cardio.distance || "", log.cardio.duration || "", log.completedAt || "", yearlyPointsForUser(user), formatDuration(log.timerSeconds || 0), routeCsvValue(log), "", ""]);
      }
      Object.entries(log.exercises || {}).forEach(([exercise, sets]) => {
        sets.forEach((entry, index) => {
          const weight = Number(entry?.weight);
          rows.push(["Individual Stats", log.date, user.name, user.email, log.workout, exercise, index + 1, entry?.weight || "", entry?.reps || "", log.completedAt || "", yearlyPointsForUser(user), formatDuration(log.timerSeconds || 0), routeCsvValue(log), "", ""]);
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
    rows.push(["Team Stats", bucket.date, "Team Mean", "", "", bucket.exercise, "", "", "", "", "", "", "", (bucket.total / bucket.count).toFixed(2), bucket.count]);
  });
  const weekRange = `${formatDate(weekStart)}-to-${formatDate(weekEnd)}`;
  downloadFile(`aggie-ihsa-team-fitness-week-${weekRange}.csv`, rows.map(csvRow).join("\n"), "text/csv");
}

function awardWorkoutPoints(userId, log) {
  const user = state.users[userId];
  if (!user) return 0;
  const points = pointsForLog(log);
  const year = String(new Date().getFullYear());
  user.pointsByYear ||= {};
  user.pointsByYear[year] = Number(user.pointsByYear[year] || 0) + points;
  return points;
}

function pointsForLog(log) {
  const workout = state.selectedWorkout;
  if (workout === "Endurance") return 10;
  if (workout === "Power") return 8;
  if (workout === "Mobility") return completedExerciseCount(log) >= workoutExercises(workout).length ? 5 : 2;
  if (workout.toLowerCase().includes("strength")) return Math.min(completedExerciseCount(log), 5) * 2;
  return Math.min(completedExerciseCount(log), 5) * 2;
}

function completedExerciseCount(log) {
  return workoutExercises(state.selectedWorkout).filter((exercise) => exerciseHasEntry(log?.exercises?.[exercise.name])).length;
}

function exerciseHasEntry(entries = []) {
  return entries.some((entry) => String(entry?.weight || "").trim() || String(entry?.reps || "").trim());
}

function yearlyPointsForUser(user, year = new Date().getFullYear()) {
  return Number(user?.pointsByYear?.[String(year)] || 0);
}

function awardBonusPoint(userId) {
  const user = state.users[userId];
  if (!user) return 0;
  const year = String(new Date().getFullYear());
  user.pointsByYear ||= {};
  user.pointsByYear[year] = Number(user.pointsByYear[year] || 0) + 1;
  return 1;
}

function awardBuddyCompletionPoint(userId, log) {
  const buddy = matchingBuddyWorkoutForCompletion(userId, log);
  if (!buddy) return 0;
  buddy.buddyPointsAwarded ||= [];
  if (buddy.buddyPointsAwarded.includes(userId)) return 0;
  buddy.buddyPointsAwarded.push(userId);
  return awardBonusPoint(userId);
}

function matchingBuddyWorkoutForCompletion(userId, log) {
  const completedAt = log?.completedAt ? new Date(log.completedAt).getTime() : Date.now();
  const workoutLabel = log?.workout || activeWorkoutLabel();
  const sameDay = formatDate(new Date(completedAt));
  return state.buddies.find((item) => {
    if (!item.joiners?.includes(userId) || item.buddyPointsAwarded?.includes(userId)) return false;
    if (formatDate(new Date(item.time)) !== sameDay) return false;
    const plannedAt = new Date(item.time).getTime();
    const closeEnough = Math.abs(completedAt - plannedAt) <= 6 * 60 * 60 * 1000;
    return closeEnough && buddyWorkoutMatches(item.workout, workoutLabel);
  });
}

function buddyWorkoutMatches(plannedWorkout, completedWorkout) {
  if (plannedWorkout === completedWorkout) return true;
  if (plannedWorkout === "Endurance" && ["Running", "Biking", "Swimming", "Pilates", "Extra Riding Lesson", "Other Cardio"].includes(completedWorkout)) return true;
  return false;
}

function addUserNotification(userId, message, id = `${Date.now()}-${Math.random().toString(16).slice(2)}`) {
  const user = state.users[userId];
  if (!user) return false;
  user.notifications ||= [];
  if (user.notifications.some((item) => item.id === id)) return false;
  user.notifications.unshift({
    id,
    type: "buddy",
    message,
    createdAt: new Date().toISOString(),
    read: false
  });
  return true;
}

function checkBuddyReminders() {
  const user = currentUser();
  if (!user) return;
  const now = Date.now();
  let changed = false;
  state.buddies.forEach((item) => {
    if (!item.joiners?.includes(user.id) || !item.time) return;
    const startsAt = new Date(item.time).getTime();
    const minutesUntil = Math.round((startsAt - now) / 60000);
    if (minutesUntil < 0 || minutesUntil > 60) return;
    changed = addUserNotification(
      user.id,
      `${item.workout} buddy workout at ${item.destination} starts in about ${Math.max(minutesUntil, 0)} minutes.`,
      `buddy-reminder-${item.id}`
    ) || changed;
  });
  if (changed) persistUsers();
}

function resetYearlyPoints() {
  if (!isCoordinator()) return showCelebration("Coordinator only");
  const year = String(new Date().getFullYear());
  Object.values(state.users).forEach((user) => {
    user.pointsByYear ||= {};
    user.pointsByYear[year] = 0;
  });
  persistUsers();
  showCelebration("Yearly points reset");
  render();
}

function findPreviousSameWorkout() {
  const label = activeWorkoutLabel();
  const logs = Object.values(currentLogs()).filter((log) => (log.workout || state.selectedWorkout) === label && log.completedAt).sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
  return logs[0] || null;
}

function teamLogDetails(log) {
  const detailRows = [];
  if (log?.description) {
    detailRows.push(`<div class="detail-exercise"><strong>Team note</strong><span>${escapeHtml(log.description)}</span></div>`);
  }
  if (log?.cardio && log.cardio.activity !== "Programmed Endurance Workout") {
    const activity = cardioActivityLabel(log.cardio);
    const duration = log.cardio.duration ? `${escapeHtml(log.cardio.duration)} min` : "No duration entered";
    const distance = log.cardio.distance ? `${escapeHtml(log.cardio.distance)} miles` : "No distance entered";
    detailRows.push(`<div class="detail-exercise"><strong>${escapeHtml(activity)}</strong><span>Duration: ${duration}</span><span>Distance: ${distance}</span></div>`);
  }
  if (log?.timerSeconds) {
    detailRows.push(`<div class="detail-exercise"><strong>Workout timer</strong><span>${formatDuration(log.timerSeconds)}</span></div>`);
  }
  if (log?.location) {
    const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(log.location.lat)},${encodeURIComponent(log.location.lng)}`;
    detailRows.push(`<div class="detail-exercise"><strong>Shared route</strong>${routeMapMarkup(log.locationTrack || [log.location])}<span><a href="${mapsUrl}" target="_blank" rel="noopener">Open latest point on map</a></span></div>`);
  }
  Object.entries(log?.exercises || {}).forEach(([exercise, sets]) => {
    detailRows.push(`
    <div class="detail-exercise">
      <strong>${escapeHtml(exercise)}</strong>
      ${sets.map((entry, index) => `<span>Set ${index + 1}: ${formatEntry(entry)}</span>`).join("")}
    </div>
  `);
  });
  return detailRows.join("") || `<div class="empty-state">No details saved.</div>`;
}

function makeEmptyLog() {
  return { workout: activeWorkoutLabel(), date: formatDate(new Date()), exercises: {}, cardio: {}, description: "", completedAt: "" };
}

function currentLogKey() {
  return `${formatDate(new Date())}-${activeWorkoutKeyLabel()}`;
}

function activeWorkoutLabel() {
  if (state.selectedWorkout !== "Endurance" || !els.cardioActivitySelect) return state.selectedWorkout;
  const activity = els.cardioActivitySelect.value || "Programmed Endurance Workout";
  if (activity === "Programmed Endurance Workout") return "Endurance";
  if (activity === "Other Cardio") return els.customCardioActivity.value.trim() || "Other Cardio";
  return activity;
}

function activeWorkoutKeyLabel() {
  if (state.selectedWorkout !== "Endurance" || !els.cardioActivitySelect) return state.selectedWorkout;
  const activity = els.cardioActivitySelect.value || "Programmed Endurance Workout";
  return activity === "Programmed Endurance Workout" ? "Endurance" : activity;
}

function isCustomCardioMode() {
  return state.selectedWorkout === "Endurance" && els.cardioActivitySelect?.value !== "Programmed Endurance Workout";
}

function cardioActivityLabel(cardio) {
  if (!cardio) return "Cardio";
  if (cardio.activity === "Other Cardio") return cardio.customActivity || "Other Cardio";
  return cardio.activity || "Cardio";
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
}

function markAccountNotificationsRead() {
  const user = currentUser();
  if (!user || !els.accountMenu.open) return;
  const unread = (user.notifications || []).some((item) => !item.read);
  if (!unread) return;
  user.notifications = (user.notifications || []).map((item) => ({ ...item, read: true }));
  persistUsers();
}

function currentLogs() {
  const user = currentUser();
  if (!user) return {};
  user.logs ||= {};
  return user.logs;
}

function isCoordinator() {
  return (currentUser()?.email || "").toLowerCase() === state.coordinatorEmail.toLowerCase();
}

function persistUsers() {
  localStorage.setItem(USERS_KEY, JSON.stringify(state.users));
  scheduleSharedSync();
}

function persistDemoImages() {
  localStorage.setItem(DEMO_IMAGES_KEY, JSON.stringify(demoImages));
  scheduleSharedSync();
}

function persistTeamFeed() {
  localStorage.setItem(TEAM_FEED_KEY, JSON.stringify(state.teamFeed));
  scheduleSharedSync();
}

function persistBuddies() {
  localStorage.setItem(BUDDIES_KEY, JSON.stringify(state.buddies));
  scheduleSharedSync();
}

function sharedSyncEnabled() {
  return /^https?:\/\//.test(TEAM_SYNC_URL);
}

function sharedSyncEndpoint() {
  const base = TEAM_SYNC_URL.replace(/\/$/, "");
  return `${base}/teams/${encodeURIComponent(TEAM_SYNC_ID)}.json`;
}

function sharedPayload() {
  return {
    users: state.users,
    teamFeed: state.teamFeed,
    buddies: state.buddies,
    announcements: state.announcements,
    coordinatorEmail: state.coordinatorEmail,
    workouts,
    startingRanges,
    demoImages,
    updatedAt: new Date().toISOString()
  };
}

function applySharedPayload(data) {
  if (!data || typeof data !== "object") return;
  state.users = { ...state.users, ...(data.users || {}) };
  state.teamFeed = Array.isArray(data.teamFeed) ? data.teamFeed : state.teamFeed;
  state.buddies = Array.isArray(data.buddies) ? data.buddies : state.buddies;
  state.announcements = Array.isArray(data.announcements) ? data.announcements : state.announcements;
  state.coordinatorEmail = data.coordinatorEmail || state.coordinatorEmail;
  workouts = normalizeWorkoutLibrary(data.workouts || workouts);
  startingRanges = { ...startingRanges, ...(data.startingRanges || {}) };
  demoImages = { ...demoImages, ...(data.demoImages || {}) };
  localStorage.setItem(USERS_KEY, JSON.stringify(state.users));
  localStorage.setItem(TEAM_FEED_KEY, JSON.stringify(state.teamFeed));
  localStorage.setItem(BUDDIES_KEY, JSON.stringify(state.buddies));
  localStorage.setItem(ANNOUNCEMENTS_KEY, JSON.stringify(state.announcements));
  localStorage.setItem(COORDINATOR_KEY, state.coordinatorEmail);
  localStorage.setItem(WORKOUTS_KEY, JSON.stringify(workouts));
  localStorage.setItem(RANGES_KEY, JSON.stringify(startingRanges));
  localStorage.setItem(DEMO_IMAGES_KEY, JSON.stringify(demoImages));
}

async function loadSharedState({ silent = false } = {}) {
  if (!sharedSyncEnabled()) {
    syncStatus = "Device-only preview";
    return;
  }
  try {
    const response = await fetch(sharedSyncEndpoint(), { cache: "no-store" });
    if (!response.ok) throw new Error(`Sync returned ${response.status}`);
    const data = await response.json();
    if (!data) {
      await saveSharedState();
      syncStatus = "Team sync connected";
      renderTeamFeed();
      return;
    }
    applySharedPayload(data);
    syncStatus = "Team sync connected";
    render();
  } catch (error) {
    syncStatus = "Team sync unavailable";
    if (!silent) showCelebration("Team sync unavailable");
    renderTeamFeed();
  }
}

function scheduleSharedSync() {
  if (!sharedSyncEnabled()) return;
  window.clearTimeout(syncTimer);
  syncTimer = window.setTimeout(saveSharedState, 450);
}

async function saveSharedState() {
  if (!sharedSyncEnabled()) return;
  try {
    const response = await fetch(sharedSyncEndpoint(), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sharedPayload())
    });
    if (!response.ok) throw new Error(`Sync returned ${response.status}`);
    syncStatus = "Team sync connected";
    renderTeamFeed();
  } catch (error) {
    syncStatus = "Team sync unavailable";
    renderTeamFeed();
  }
}

function initializeSharedSync() {
  if (!sharedSyncEnabled()) {
    syncStatus = "Device-only preview";
    return;
  }
  loadSharedState();
  window.setInterval(() => loadSharedState({ silent: true }), SYNC_POLL_MS);
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
  return exercise.range || startingRanges[exercise.name] || "Start: light, controlled effort";
}

function formatEntry(entry = {}) {
  if (!entry.weight && !entry.reps) return "not logged";
  if (entry.weight && entry.reps) return `${entry.weight} lb x ${entry.reps}`;
  if (entry.weight) return `${entry.weight} lb`;
  return `${entry.reps} reps`;
}

function formatDuration(seconds = 0) {
  const total = Math.max(0, Number(seconds) || 0);
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const remainingSeconds = total % 60;
  if (hours) return `${hours}:${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

function routeCsvValue(log) {
  const track = log?.locationTrack?.length ? log.locationTrack : log?.location ? [log.location] : [];
  return track.map((point) => `${point.lat},${point.lng}`).join(";");
}

function routeMapMarkup(track = []) {
  const points = track.filter((point) => Number.isFinite(Number(point.lat)) && Number.isFinite(Number(point.lng)));
  if (!points.length) return "";
  if (points.length === 1) return `<div class="route-map single-point"><span></span></div>`;
  return `
    <div class="route-map" aria-label="Saved workout route">
      <svg viewBox="0 0 220 120" role="img" aria-hidden="true">
        <polyline points="${routePolylinePoints(points)}"></polyline>
        <circle cx="${routePoint(points[0], points).x}" cy="${routePoint(points[0], points).y}" r="4"></circle>
        <circle cx="${routePoint(points[points.length - 1], points).x}" cy="${routePoint(points[points.length - 1], points).y}" r="5"></circle>
      </svg>
    </div>
  `;
}

function routePolylinePoints(points) {
  return points.map((point) => {
    const position = routePoint(point, points);
    return `${position.x},${position.y}`;
  }).join(" ");
}

function routePoint(point, points) {
  const lats = points.map((item) => Number(item.lat));
  const lngs = points.map((item) => Number(item.lng));
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const xRange = maxLng - minLng || 0.0001;
  const yRange = maxLat - minLat || 0.0001;
  return {
    x: Math.round(16 + ((Number(point.lng) - minLng) / xRange) * 188),
    y: Math.round(104 - ((Number(point.lat) - minLat) / yRange) * 88)
  };
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

function formatBuddyTime(value) {
  if (!value) return "soon";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "soon";
  return date.toLocaleString(undefined, { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
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

function updateNotificationStatus(message) {
  if (els.notificationStatus) els.notificationStatus.textContent = message;
}

async function initializeFirebaseMessaging() {
  if (!window.firebase || !("serviceWorker" in navigator) || !("Notification" in window)) {
    updateNotificationStatus("Browser notifications are not supported on this device.");
    return;
  }

  try {
    if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
    firebaseMessaging = firebase.messaging();
    firebaseMessaging.onMessage((payload) => {
      const notice = payload.notification || {};
      updateNotificationStatus(notice.title ? `New notification: ${notice.title}` : "New notification received.");
    });
    updateNotificationStatus(Notification.permission === "granted" ? "Notifications are enabled on this device." : "Notifications are off on this device.");
  } catch (error) {
    console.error("Firebase Messaging setup failed", error);
    updateNotificationStatus("Notifications need Firebase setup to finish.");
  }
}

async function enableBrowserNotifications() {
  if (!firebaseMessaging) {
    updateNotificationStatus("Notifications are still loading. Try again in a moment.");
    return;
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      updateNotificationStatus("Notifications were not enabled. You can change this in your browser settings.");
      return;
    }

    const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
    const token = await firebaseMessaging.getToken({
      vapidKey: FCM_VAPID_KEY,
      serviceWorkerRegistration: registration
    });
    if (!token) throw new Error("Firebase did not return a notification token.");

    localStorage.setItem("ihsa-fitness-fcm-token", token);
    updateNotificationStatus("Notifications are enabled on this device.");
  } catch (error) {
    console.error("Could not enable notifications", error);
    updateNotificationStatus("Could not enable notifications. Check browser permissions and try again.");
  }
}

render();
startTrackerTimerLoop();
window.setInterval(() => {
  checkBuddyReminders();
  renderProfile();
}, 60000);
initializeSharedSync();
initializeFirebaseMessaging();



// Firebase Realtime Database keeps all devices on the same team feed immediately.
let realtimeTeamRef = null;

function mergeSharedItems(remoteItems = [], localItems = [], limit = 0) {
  const byId = new Map();
  [...remoteItems, ...localItems].forEach((item) => {
    if (!item || !item.id) return;
    const previous = byId.get(item.id);
    byId.set(item.id, previous ? { ...previous, ...item, cheers: Array.from(new Set([...(previous.cheers || []), ...(item.cheers || [])])) } : item);
  });
  const items = Array.from(byId.values()).sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  return limit ? items.slice(0, limit) : items;
}

function mergeTeamPayload(remote, local) {
  const saved = remote && typeof remote === "object" ? remote : {};
  return {
    ...saved,
    ...local,
    users: { ...(saved.users || {}), ...(local.users || {}) },
    teamFeed: mergeSharedItems(saved.teamFeed || [], local.teamFeed || [], 60),
    buddies: mergeSharedItems(saved.buddies || [], local.buddies || []),
    announcements: mergeSharedItems(saved.announcements || [], local.announcements || [], 20),
    updatedAt: new Date().toISOString()
  };
}

saveSharedState = async function () {
  if (!realtimeTeamRef) return;
  try {
    await realtimeTeamRef.transaction((remote) => mergeTeamPayload(remote, sharedPayload()));
    syncStatus = "Team sync connected";
    renderTeamFeed();
  } catch (error) {
    syncStatus = "Team sync unavailable";
    renderTeamFeed();
  }
};

loadSharedState = async function () {};

function enableRealtimeTeamSync() {
  if (!window.firebase || typeof firebase.database !== "function") return;
  try {
    if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
    realtimeTeamRef = firebase.database().ref("teams/" + TEAM_SYNC_ID);
    realtimeTeamRef.on("value", (snapshot) => {
      const team = snapshot.val();
      if (!team) {
        scheduleSharedSync();
        return;
      }
      applySharedPayload(team);
      syncStatus = "Team sync connected";
      render();
    }, () => {
      syncStatus = "Team sync unavailable";
      renderTeamFeed();
    });
  } catch (error) {
    syncStatus = "Team sync unavailable";
    renderTeamFeed();
  }
}

enableRealtimeTeamSync();

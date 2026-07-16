const homeScreen = document.querySelector("#homeScreen");
const createMatchScreen = document.querySelector("#createMatchScreen");
const inningsScreen = document.querySelector("#inningsScreen");
const scorecardScreen = document.querySelector("#scorecardScreen");
const secondInningsScreen = document.querySelector("#secondInningsScreen");
const appShell = document.querySelector(".app-shell");
const openCreateMatch = document.querySelector("#openCreateMatch");
const backHome = document.querySelector("#backHome");
const backToSetup = document.querySelector("#backToSetup");
const backToInnings = document.querySelector("#backToInnings");
const backToFirstScorecard = document.querySelector("#backToFirstScorecard");
const createMatchForm = document.querySelector("#createMatchForm");
const inningsForm = document.querySelector("#inningsForm");
const secondInningsForm = document.querySelector("#secondInningsForm");
const teamOne = document.querySelector("#teamOne");
const teamTwo = document.querySelector("#teamTwo");
const teamOneTossLabel = document.querySelector("#teamOneTossLabel");
const teamTwoTossLabel = document.querySelector("#teamTwoTossLabel");
const formMessage = document.querySelector("#formMessage");
const inningsMessage = document.querySelector("#inningsMessage");
const battingTeamName = document.querySelector("#battingTeamName");
const bowlingTeamName = document.querySelector("#bowlingTeamName");
const secondBattingTeamName = document.querySelector("#secondBattingTeamName");
const secondBowlingTeamName = document.querySelector("#secondBowlingTeamName");
const secondInningsTarget = document.querySelector("#secondInningsTarget");
const secondInningsMessage = document.querySelector("#secondInningsMessage");
const scoreTotalOvers = document.querySelector("#scoreTotalOvers");
const summaryTeamName = document.querySelector("#summaryTeamName");
const summaryScore = document.querySelector("#summaryScore");
const summaryOvers = document.querySelector("#summaryOvers");
const chaseInfoCard = document.querySelector("#chaseInfoCard");
const chaseTargetText = document.querySelector("#chaseTargetText");
const chaseNeedText = document.querySelector("#chaseNeedText");
const tableStrikeName = document.querySelector("#tableStrikeName");
const tableStrikeRuns = document.querySelector("#tableStrikeRuns");
const tableStrikeBalls = document.querySelector("#tableStrikeBalls");
const tableStrikeFours = document.querySelector("#tableStrikeFours");
const tableStrikeSixes = document.querySelector("#tableStrikeSixes");
const tableStrikeRate = document.querySelector("#tableStrikeRate");
const tableNonStrikeName = document.querySelector("#tableNonStrikeName");
const tableNonStrikeRuns = document.querySelector("#tableNonStrikeRuns");
const tableNonStrikeBalls = document.querySelector("#tableNonStrikeBalls");
const tableNonStrikeFours = document.querySelector("#tableNonStrikeFours");
const tableNonStrikeSixes = document.querySelector("#tableNonStrikeSixes");
const tableNonStrikeRate = document.querySelector("#tableNonStrikeRate");
const tableBowlerName = document.querySelector("#tableBowlerName");
const tableBowlerOvers = document.querySelector("#tableBowlerOvers");
const tableBowlerWickets = document.querySelector("#tableBowlerWickets");
const tableBowlerRuns = document.querySelector("#tableBowlerRuns");
const thisOverBalls = document.querySelector("#thisOverBalls");
const wideExtra = document.querySelector("#wideExtra");
const noBallExtra = document.querySelector("#noBallExtra");
const byesExtra = document.querySelector("#byesExtra");
const legByesExtra = document.querySelector("#legByesExtra");
const wicketEvent = document.querySelector("#wicketEvent");
const inningsExtraTotal = document.querySelector("#inningsExtraTotal");
const inningsExtraBreakdown = document.querySelector("#inningsExtraBreakdown");
const scorePickerButtons = document.querySelectorAll("[data-run]");
const swapStrike = document.querySelector("#swapStrike");
const retireBatsman = document.querySelector("#retireBatsman");
const endInnings = document.querySelector("#endInnings");
const undoBall = document.querySelector("#undoBall");
const scoringModal = document.querySelector("#scoringModal");
const scoringPromptForm = document.querySelector("#scoringPromptForm");
const scoringPromptTitle = document.querySelector("#scoringPromptTitle");
const scoringPromptLabel = document.querySelector("#scoringPromptLabel");
const scoringPromptInput = document.querySelector("#scoringPromptInput");
const scoringPromptMessage = document.querySelector("#scoringPromptMessage");
const scoringPromptSubmit = document.querySelector("#scoringPromptSubmit");
const scoringPromptCancel = document.querySelector("#scoringPromptCancel");
const retireOptions = document.querySelector("#retireOptions");
const retireStrike = document.querySelector("#retireStrike");
const retireNonStrike = document.querySelector("#retireNonStrike");
const retireStrikeName = document.querySelector("#retireStrikeName");
const retireNonStrikeName = document.querySelector("#retireNonStrikeName");
const inningsBreakModal = document.querySelector("#inningsBreakModal");
const inningsBreakTarget = document.querySelector("#inningsBreakTarget");
const inningsBreakRate = document.querySelector("#inningsBreakRate");
const inningsBreakQuestion = document.querySelector("#inningsBreakQuestion");
const startSecondInningsYes = document.querySelector("#startSecondInningsYes");
const startSecondInningsNo = document.querySelector("#startSecondInningsNo");
const matchResultModal = document.querySelector("#matchResultModal");
const matchResultText = document.querySelector("#matchResultText");
const matchResultNewMatch = document.querySelector("#matchResultNewMatch");
const matchResultScorecard = document.querySelector("#matchResultScorecard");
const matchResultShare = document.querySelector("#matchResultShare");
const matchResultDownload = document.querySelector("#matchResultDownload");
const openScorecardDetails = document.querySelector("#openScorecardDetails");
const scorecardDetailsModal = document.querySelector("#scorecardDetailsModal");
const closeScorecardDetails = document.querySelector("#closeScorecardDetails");
const scorecardDetailsTitle = document.querySelector("#scorecardDetailsTitle");
const scorecardDetailsBody = document.querySelector("#scorecardDetailsBody");
const shareScorecard = document.querySelector("#shareScorecard");
const downloadScorecard = document.querySelector("#downloadScorecard");
const matchHistoryList = document.querySelector("#matchHistoryList");

const APP_STATE_KEY = "cricketScorecardAppState";
const MATCH_HISTORY_KEY = "cricketScorecardCompletedMatches";

let currentMatch = null;
let scoringState = null;
let scoreHistory = [];
let promptQueue = [];
let activePrompt = null;
let firstInnings = null;
let inningsNumber = 1;
let matchResultSummary = "";
let activeScorecardMatch = null;

function getActiveScreenName() {
  return document.querySelector(".screen.is-active")?.id || "homeScreen";
}

function saveAppState() {
  localStorage.setItem(APP_STATE_KEY, JSON.stringify({
    currentMatch,
    scoringState,
    scoreHistory,
    promptQueue,
    activePrompt,
    firstInnings,
    inningsNumber,
    matchResultSummary,
    activeScreen: getActiveScreenName()
  }));
}

function clearSavedAppState() {
  localStorage.removeItem(APP_STATE_KEY);
  localStorage.removeItem("cricketScorecardLive");
  localStorage.removeItem("cricketScorecardInnings");
  localStorage.removeItem("cricketScorecardMatch");
}

function resetForNewMatch() {
  clearSavedAppState();
  currentMatch = null;
  scoringState = null;
  scoreHistory = [];
  promptQueue = [];
  activePrompt = null;
  firstInnings = null;
  inningsNumber = 1;
  matchResultSummary = "";
  createMatchForm.reset();
  inningsForm.reset();
  secondInningsForm.reset();
  updateTossLabels();
  clearExtras();
  scoringModal.hidden = true;
  inningsBreakModal.hidden = true;
  matchResultModal.hidden = true;
  scorecardDetailsModal.hidden = true;
  formMessage.textContent = "";
  formMessage.className = "form-message";
  inningsMessage.textContent = "";
  inningsMessage.className = "form-message";
  secondInningsMessage.textContent = "";
  secondInningsMessage.className = "form-message";
}

function showScreen(screen) {
  homeScreen.classList.remove("is-active");
  createMatchScreen.classList.remove("is-active");
  inningsScreen.classList.remove("is-active");
  scorecardScreen.classList.remove("is-active");
  secondInningsScreen.classList.remove("is-active");
  appShell.classList.toggle("scorecard-layout", screen === scorecardScreen);
  screen.classList.add("is-active");
  if (screen === homeScreen) {
    renderMatchHistory();
  }
  saveAppState();
}

function updateTossLabels() {
  teamOneTossLabel.textContent = teamOne.value.trim() || "Team Name 1";
  teamTwoTossLabel.textContent = teamTwo.value.trim() || "Team Name 2";
}

function getRadioValue(name) {
  return createMatchForm.querySelector(`input[name="${name}"]:checked`)?.value || "";
}

function formatOvers(legalBalls) {
  return `${Math.floor(legalBalls / 6)}.${legalBalls % 6}`;
}

function strikeRate(player) {
  return player.balls ? Math.round((player.runs / player.balls) * 100) : 0;
}

function economyRate(bowler) {
  const overs = bowler.legalBalls / 6;
  return overs ? (bowler.runs / overs).toFixed(2) : "0.00";
}

function rotateStrike() {
  const striker = scoringState.striker;
  scoringState.striker = scoringState.nonStriker;
  scoringState.nonStriker = striker;
}

function getPlayer(name) {
  return scoringState.players[name];
}

function getMaxLegalBalls() {
  return Number(currentMatch.totalOvers || 0) * 6;
}

function formatRunRate(value) {
  return Number.isInteger(value) ? String(value) : value.toFixed(2);
}

function getBallsLeft() {
  return Math.max(0, getMaxLegalBalls() - scoringState.legalBalls);
}

function getRunsNeeded() {
  if (inningsNumber !== 2 || !scoringState.target) {
    return 0;
  }

  return Math.max(0, scoringState.target - scoringState.runs);
}

function isInningsFinished() {
  return scoringState.wickets >= Number(currentMatch.totalWickets || 10)
    || scoringState.legalBalls >= getMaxLegalBalls()
    || (inningsNumber === 2 && scoringState.target && scoringState.runs >= scoringState.target);
}

function setScoringControlsDisabled(isDisabled) {
  scorePickerButtons.forEach((button) => {
    button.disabled = isDisabled;
  });

  [swapStrike, retireBatsman, endInnings, undoBall, wideExtra, noBallExtra, byesExtra, legByesExtra, wicketEvent].forEach((control) => {
    control.disabled = isDisabled;
  });
}

function getUniquePlayerName(name) {
  if (!scoringState.players[name]) {
    return name;
  }

  let index = 2;
  let nextName = `${name} ${index}`;

  while (scoringState.players[nextName]) {
    index += 1;
    nextName = `${name} ${index}`;
  }

  return nextName;
}

function clearExtras() {
  wideExtra.checked = false;
  noBallExtra.checked = false;
  byesExtra.checked = false;
  legByesExtra.checked = false;
  wicketEvent.checked = false;
}

function getBallLabel(runs, isWide, isNoBall, isByes, isLegByes, isWicket) {
  if (isWicket) {
    return runs > 0 ? `W+${runs}` : "W";
  }

  if (isWide) {
    return runs > 0 ? `Wd+${runs}` : "Wd";
  }

  if (isNoBall) {
    return runs > 0 ? `Nb+${runs}` : "Nb";
  }

  if (isByes) {
    return `${runs}B`;
  }

  if (isLegByes) {
    return `${runs}LB`;
  }

  return String(runs);
}

function updateScorecard() {
  const striker = getPlayer(scoringState.striker);
  const nonStriker = getPlayer(scoringState.nonStriker);

  scoreTotalOvers.textContent = currentMatch.totalOvers;
  summaryTeamName.textContent = scoringState.battingTeam;
  summaryScore.textContent = `${scoringState.runs} / ${scoringState.wickets}`;
  summaryOvers.textContent = formatOvers(scoringState.legalBalls);

  if (inningsNumber === 2 && scoringState.target) {
    chaseInfoCard.hidden = false;
    chaseTargetText.textContent = `Target: ${scoringState.target}`;
    chaseNeedText.textContent = getRunsNeeded() > 0
      ? `Need ${getRunsNeeded()} runs from ${getBallsLeft()} balls`
      : `${scoringState.battingTeam} reached the target`;
  } else {
    chaseInfoCard.hidden = true;
  }

  tableStrikeName.textContent = `${scoringState.striker} *`;
  tableStrikeRuns.textContent = striker.runs;
  tableStrikeBalls.textContent = striker.balls;
  tableStrikeFours.textContent = striker.fours;
  tableStrikeSixes.textContent = striker.sixes;
  tableStrikeRate.textContent = strikeRate(striker);

  tableNonStrikeName.textContent = scoringState.nonStriker;
  tableNonStrikeRuns.textContent = nonStriker.runs;
  tableNonStrikeBalls.textContent = nonStriker.balls;
  tableNonStrikeFours.textContent = nonStriker.fours;
  tableNonStrikeSixes.textContent = nonStriker.sixes;
  tableNonStrikeRate.textContent = strikeRate(nonStriker);

  tableBowlerName.textContent = scoringState.bowler.name;
  tableBowlerOvers.textContent = formatOvers(scoringState.bowler.legalBalls);
  tableBowlerWickets.textContent = scoringState.bowler.wickets;
  tableBowlerRuns.textContent = scoringState.bowler.runs;
  thisOverBalls.innerHTML = scoringState.thisOver.length
    ? scoringState.thisOver.map((ball) => `<b>${ball}</b>`).join("")
    : "<b>-</b>";

  inningsExtraTotal.textContent = scoringState.extras.total;
  inningsExtraBreakdown.textContent = `${scoringState.extras.wide} WD,${scoringState.extras.noBall} N,${scoringState.extras.byes} B`;
  localStorage.setItem("cricketScorecardLive", JSON.stringify(scoringState));
  saveAppState();
}

function saveScoreHistory() {
  scoreHistory.push(JSON.stringify(scoringState));
}

function cloneInningsSummary(state, number) {
  return {
    number,
    battingTeam: state.battingTeam,
    bowlingTeam: state.bowlingTeam,
    runs: state.runs,
    wickets: state.wickets,
    legalBalls: state.legalBalls,
    target: state.target,
    players: Object.entries(state.players).map(([name, stats]) => ({
      name,
      ...stats,
      isStriker: name === state.striker,
      isNonStriker: name === state.nonStriker
    })),
    bowlers: Object.entries(state.bowlers || { [state.bowler.name]: state.bowler }).map(([name, stats]) => ({
      name,
      ...stats
    })),
    extras: { ...state.extras }
  };
}

function getCompletedInnings() {
  const innings = [];

  if (firstInnings?.scorecard) {
    innings.push(firstInnings.scorecard);
  }

  if (scoringState) {
    const currentSummary = cloneInningsSummary(scoringState, inningsNumber);
    const existingIndex = innings.findIndex((item) => item.number === currentSummary.number);

    if (existingIndex >= 0) {
      innings[existingIndex] = currentSummary;
    } else {
      innings.push(currentSummary);
    }
  }

  return innings;
}

function getMatchHistory() {
  try {
    const matches = JSON.parse(localStorage.getItem(MATCH_HISTORY_KEY) || "[]");
    return Array.isArray(matches) ? matches : [];
  } catch (error) {
    return [];
  }
}

function saveMatchHistory(matches) {
  localStorage.setItem(MATCH_HISTORY_KEY, JSON.stringify(matches.slice(0, 20)));
}

function formatHistoryDate(timestamp) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(timestamp));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function saveCompletedMatchToHistory() {
  if (!matchResultSummary || !currentMatch || !scoringState) {
    return;
  }

  const innings = getCompletedInnings();
  const id = [
    currentMatch.teamOne,
    currentMatch.teamTwo,
    matchResultSummary,
    innings.map((item) => `${item.battingTeam}-${item.runs}-${item.wickets}-${item.legalBalls}`).join("|")
  ].join("::");

  const history = getMatchHistory();

  if (history.some((match) => match.id === id)) {
    return;
  }

  history.unshift({
    id,
    createdAt: Date.now(),
    teamOne: currentMatch.teamOne,
    teamTwo: currentMatch.teamTwo,
    result: matchResultSummary,
    innings
  });

  saveMatchHistory(history);
  renderMatchHistory();
}

function renderMatchHistory() {
  if (!matchHistoryList) {
    return;
  }

  const history = getMatchHistory();

  if (!history.length) {
    matchHistoryList.innerHTML = '<p class="empty-history">No completed matches yet.</p>';
    return;
  }

  matchHistoryList.innerHTML = history.map((match, index) => `
    <article class="history-card">
      <div>
        <strong>${escapeHtml(match.teamOne || "Team 1")} vs ${escapeHtml(match.teamTwo || "Team 2")}</strong>
        <span>${escapeHtml(formatHistoryDate(match.createdAt))}</span>
      </div>
      <p>${escapeHtml(match.result)}</p>
      <button type="button" data-history-index="${index}">Scorecard</button>
    </article>
  `).join("");
}

function buildScorecardText(historyMatch = activeScorecardMatch) {
  const lines = ["Club Cricket Scorecard"];
  const inningsSource = historyMatch?.innings || getCompletedInnings();

  inningsSource.forEach((innings) => {
    lines.push("");
    lines.push(`${innings.battingTeam}: ${innings.runs}/${innings.wickets} (${formatOvers(innings.legalBalls)} ov)`);
    innings.players.forEach((player) => {
      lines.push(`${player.name}${player.isStriker ? " *" : ""}: ${player.runs} (${player.balls})`);
    });
    lines.push(`Extras: ${innings.extras.total}`);
    innings.bowlers.forEach((bowler) => {
      lines.push(`${bowler.name}: ${formatOvers(bowler.legalBalls)}-${bowler.wickets}-${bowler.runs}`);
    });
  });

  const resultText = historyMatch?.result || matchResultSummary;

  if (resultText) {
    lines.push("");
    lines.push(resultText);
  }

  lines.push("");
  lines.push("Created by Hassan Sheraz");
  return lines.join("\n");
}

function renderScorecardDetails(historyMatch = null) {
  activeScorecardMatch = historyMatch;
  const inningsSource = historyMatch?.innings || getCompletedInnings();
  const detailsTitle = historyMatch?.result || matchResultSummary || "Live Scorecard";
  const inningsCards = inningsSource.map((innings) => {
    const runRate = innings.legalBalls ? ((innings.runs / innings.legalBalls) * 6).toFixed(2) : "0.00";
    const batterRows = innings.players.map((player) => `
      <tr>
        <td>${player.name}${player.isStriker ? " *" : ""}</td>
        <td>${player.runs}</td>
        <td>${player.balls}</td>
        <td>${player.fours}</td>
        <td>${player.sixes}</td>
        <td>${strikeRate(player)}</td>
      </tr>
    `).join("");
    const bowlerRows = innings.bowlers.map((bowler) => `
      <tr>
        <td>${bowler.name}</td>
        <td>${formatOvers(bowler.legalBalls)}</td>
        <td>${bowler.wickets}</td>
        <td>${bowler.runs}</td>
        <td>${economyRate(bowler)}</td>
      </tr>
    `).join("");

    return `
      <article class="details-innings-card">
        <header>
          <strong>${innings.battingTeam}</strong>
          <span>${innings.runs} / ${innings.wickets} (${formatOvers(innings.legalBalls)} overs)</span>
          <small>CRR: ${runRate}</small>
        </header>
        <table>
          <thead><tr><th>Batsman</th><th>R</th><th>B</th><th>4s</th><th>6s</th><th>SR</th></tr></thead>
          <tbody>${batterRows}</tbody>
        </table>
        <p>Extras: ${innings.extras.total} (${innings.extras.wide} WD, ${innings.extras.noBall} N, ${innings.extras.byes} B)</p>
        <table>
          <thead><tr><th>Bowler</th><th>Over</th><th>Wickets</th><th>Runs</th><th>Econ</th></tr></thead>
          <tbody>${bowlerRows}</tbody>
        </table>
      </article>
    `;
  }).join("");

  scorecardDetailsTitle.textContent = detailsTitle;
  scorecardDetailsBody.innerHTML = inningsCards || "<p>No scorecard yet.</p>";
}

function openScorecardModal(historyMatch = null) {
  renderScorecardDetails(historyMatch);
  scorecardDetailsModal.hidden = false;
}

function shareScorecardText() {
  const text = encodeURIComponent(buildScorecardText());
  window.open(`https://wa.me/?text=${text}`, "_blank");
}

async function downloadScorecardPdf() {
  if (scorecardDetailsModal.hidden) {
    openScorecardModal(activeScorecardMatch);
  }

  const panel = document.querySelector(".scorecard-details-panel");
  const detailsBody = document.querySelector(".scorecard-details-body");
  const closeButton = panel?.querySelector(".scorecard-details-top button");
  const actions = panel?.querySelector(".scorecard-details-actions");

  if (!panel || !detailsBody) {
    return;
  }

  const previousPanelStyle = {
    width: panel.style.width,
    height: panel.style.height,
    maxHeight: panel.style.maxHeight,
    overflow: panel.style.overflow,
    gridTemplateRows: panel.style.gridTemplateRows
  };
  const previousBodyStyle = {
    height: detailsBody.style.height,
    maxHeight: detailsBody.style.maxHeight,
    overflow: detailsBody.style.overflow
  };

  try {
    const htmlToImage = await import("https://cdn.jsdelivr.net/npm/html-to-image@1.11.11/+esm");
    const { jsPDF } = await import("https://cdn.jsdelivr.net/npm/jspdf@2.5.1/+esm");
    const panelWidth = Math.ceil(panel.getBoundingClientRect().width || panel.scrollWidth);

    panel.classList.add("is-exporting");
    panel.style.width = `${panelWidth}px`;
    panel.style.height = "auto";
    panel.style.maxHeight = "none";
    panel.style.overflow = "visible";
    panel.style.gridTemplateRows = "auto auto auto";
    detailsBody.style.height = "auto";
    detailsBody.style.maxHeight = "none";
    detailsBody.style.overflow = "visible";
    if (closeButton) closeButton.hidden = true;
    if (actions) actions.hidden = true;

    await document.fonts?.ready;
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

    const exportWidth = Math.ceil(panel.scrollWidth);
    const exportHeight = Math.ceil(panel.scrollHeight);

    const dataUrl = await htmlToImage.toPng(panel, {
      backgroundColor: "#07110f",
      cacheBust: true,
      pixelRatio: 2,
      width: exportWidth,
      height: exportHeight,
      style: {
        width: `${exportWidth}px`,
        height: `${exportHeight}px`,
        maxHeight: "none",
        overflow: "visible"
      }
    });

    const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 24;
    const imageWidth = pageWidth - margin * 2;
    const imageHeight = exportHeight * (imageWidth / exportWidth);
    const pageContentHeight = pageHeight - margin * 2;

    let position = margin;
    let remainingHeight = imageHeight;
    pdf.addImage(dataUrl, "PNG", margin, position, imageWidth, imageHeight);

    while (remainingHeight > pageContentHeight) {
      remainingHeight -= pageContentHeight;
      position -= pageContentHeight;
      pdf.addPage();
      pdf.addImage(dataUrl, "PNG", margin, position, imageWidth, imageHeight);
    }

    pdf.save("cricket-scorecard.pdf");
  } catch (error) {
    const text = encodeURIComponent(buildScorecardText());
    window.open(`data:text/plain;charset=utf-8,${text}`, "_blank");
  } finally {
    panel.classList.remove("is-exporting");
    panel.style.width = previousPanelStyle.width;
    panel.style.height = previousPanelStyle.height;
    panel.style.maxHeight = previousPanelStyle.maxHeight;
    panel.style.overflow = previousPanelStyle.overflow;
    panel.style.gridTemplateRows = previousPanelStyle.gridTemplateRows;
    detailsBody.style.height = previousBodyStyle.height;
    detailsBody.style.maxHeight = previousBodyStyle.maxHeight;
    detailsBody.style.overflow = previousBodyStyle.overflow;
    if (closeButton) closeButton.hidden = false;
    if (actions) actions.hidden = false;
  }
}

function openNextPrompt() {
  if (activePrompt || !promptQueue.length || isInningsFinished()) {
    if (isInningsFinished()) {
      setScoringControlsDisabled(true);
      endInnings.textContent = "Innings ended";
    }
    return;
  }

  activePrompt = promptQueue.shift();
  scoringPromptMessage.textContent = "";
  scoringPromptInput.value = "";
  retireOptions.hidden = activePrompt.type !== "retire";
  scoringPromptTitle.textContent = activePrompt.type === "bowler"
    ? "Change Bowler"
    : activePrompt.type === "retire"
      ? "Retire Batsman"
      : "New Batsman";
  scoringPromptLabel.textContent = activePrompt.type === "bowler"
    ? "*Bowler"
    : activePrompt.type === "retire"
      ? "Replaced By"
      : "*Batsman";
  scoringPromptSubmit.textContent = activePrompt.type === "bowler"
    ? "Add Bowler"
    : activePrompt.type === "retire"
      ? "Create"
      : "Add Batsman";
  scoringPromptCancel.textContent = activePrompt.type === "bowler"
    ? "No"
    : activePrompt.type === "retire"
      ? "Cancel"
      : "End innings";
  if (activePrompt.type === "retire") {
    retireStrikeName.textContent = scoringState.striker;
    retireNonStrikeName.textContent = scoringState.nonStriker;
    retireStrike.checked = true;
  }
  scoringModal.hidden = false;
  setScoringControlsDisabled(true);
  saveAppState();
  scoringPromptInput.focus();
}

function queuePrompt(prompt) {
  promptQueue.push(prompt);
  saveAppState();
  openNextPrompt();
}

function closePrompt() {
  activePrompt = null;
  scoringModal.hidden = true;
  setScoringControlsDisabled(false);
  saveAppState();
  openNextPrompt();
}

function prepareSecondInningsSetup() {
  const requiredRuns = firstInnings.target;
  const targetText = `${firstInnings.chasingTeam} needs ${requiredRuns} runs in ${currentMatch.totalOvers} overs`;

  secondBattingTeamName.textContent = firstInnings.chasingTeam;
  secondBowlingTeamName.textContent = firstInnings.defendingTeam;
  secondInningsTarget.textContent = targetText;
  secondInningsMessage.textContent = "";
  secondInningsForm.reset();
}

function showFirstInningsBreak() {
  firstInnings = {
    runs: scoringState.runs,
    wickets: scoringState.wickets,
    target: scoringState.runs + 1,
    defendingTeam: scoringState.battingTeam,
    chasingTeam: scoringState.bowlingTeam,
    scorecard: cloneInningsSummary(scoringState, 1)
  };

  const requiredRunRate = firstInnings.target / Number(currentMatch.totalOvers || 1);
  inningsBreakTarget.textContent = `${firstInnings.chasingTeam} needs ${firstInnings.target} runs in ${currentMatch.totalOvers} overs`;
  inningsBreakRate.textContent = `Required run rate is ${formatRunRate(requiredRunRate)}`;
  inningsBreakQuestion.textContent = "First innings completed. Do you want to start second innings?";
  inningsBreakModal.hidden = false;
  setScoringControlsDisabled(true);
  saveAppState();
}

function finishCurrentInnings() {
  promptQueue = [];
  activePrompt = null;
  scoringModal.hidden = true;

  if (inningsNumber === 1) {
    showFirstInningsBreak();
    return;
  }

  setScoringControlsDisabled(true);
  endInnings.textContent = scoringState.runs >= scoringState.target ? "Target reached" : "Match ended";
  showMatchResult();
  saveAppState();
}

function showMatchResult() {
  const chasingWon = scoringState.runs >= scoringState.target;

  if (chasingWon) {
    const wicketsLeft = Math.max(0, Number(currentMatch.totalWickets || 10) - scoringState.wickets);
    matchResultSummary = `${scoringState.battingTeam} win by ${wicketsLeft} wicket${wicketsLeft === 1 ? "" : "s"}`;
  } else {
    const runsMargin = Math.max(1, (firstInnings?.runs || scoringState.target - 1) - scoringState.runs);
    matchResultSummary = `${scoringState.bowlingTeam} win by ${runsMargin} run${runsMargin === 1 ? "" : "s"}`;
  }

  matchResultText.textContent = matchResultSummary;
  renderScorecardDetails();
  matchResultModal.hidden = false;
  saveCompletedMatchToHistory();
  saveAppState();
}

function startScorecard(innings, options = {}) {
  currentMatch = JSON.parse(localStorage.getItem("cricketScorecardMatch") || "{}");
  inningsNumber = options.inningsNumber || 1;
  const openingBowler = {
    name: innings.bowlerName,
    legalBalls: 0,
    runs: 0,
    wickets: 0
  };
  scoringState = {
    battingTeam: options.battingTeam || battingTeamName.textContent,
    bowlingTeam: options.bowlingTeam || bowlingTeamName.textContent,
    target: options.target || null,
    runs: 0,
    wickets: 0,
    legalBalls: 0,
    striker: innings.strikeBatsman,
    nonStriker: innings.nonStrikeBatsman,
    players: {
      [innings.strikeBatsman]: { runs: 0, balls: 0, fours: 0, sixes: 0 },
      [innings.nonStrikeBatsman]: { runs: 0, balls: 0, fours: 0, sixes: 0 }
    },
    bowler: openingBowler,
    bowlers: {
      [innings.bowlerName]: openingBowler
    },
    extras: {
      total: 0,
      wide: 0,
      noBall: 0,
      byes: 0,
      legByes: 0
    },
    retiredPlayers: [],
    thisOver: []
  };
  scoreHistory = [];
  promptQueue = [];
  activePrompt = null;
  scoringModal.hidden = true;
  inningsBreakModal.hidden = true;
  matchResultModal.hidden = true;
  if (inningsNumber === 1) {
    firstInnings = null;
    matchResultSummary = "";
  }
  clearExtras();
  scorePickerButtons.forEach((button) => {
    button.disabled = false;
  });
  setScoringControlsDisabled(false);
  endInnings.textContent = "End innings";
  updateScorecard();
  showScreen(scorecardScreen);
}

function restoreSavedAppState() {
  const savedState = localStorage.getItem(APP_STATE_KEY);

  if (!savedState) {
    return false;
  }

  try {
    const saved = JSON.parse(savedState);

    currentMatch = saved.currentMatch || JSON.parse(localStorage.getItem("cricketScorecardMatch") || "null");
    scoringState = saved.scoringState || null;
    scoreHistory = Array.isArray(saved.scoreHistory) ? saved.scoreHistory : [];
    promptQueue = Array.isArray(saved.promptQueue) ? saved.promptQueue : [];
    if (saved.activePrompt) {
      promptQueue.unshift(saved.activePrompt);
    }
    activePrompt = null;
    firstInnings = saved.firstInnings || null;
    inningsNumber = saved.inningsNumber || 1;
    matchResultSummary = saved.matchResultSummary || "";

    if (currentMatch) {
      teamOne.value = currentMatch.teamOne || "";
      teamTwo.value = currentMatch.teamTwo || "";
      updateTossLabels();
    }

    scoringModal.hidden = true;
    inningsBreakModal.hidden = true;
    matchResultModal.hidden = true;
    scorecardDetailsModal.hidden = true;
    clearExtras();

    if (scoringState) {
      showScreen(scorecardScreen);
      updateScorecard();

      if (matchResultSummary) {
        setScoringControlsDisabled(true);
        endInnings.textContent = scoringState.runs >= scoringState.target ? "Target reached" : "Match ended";
        matchResultText.textContent = matchResultSummary;
        renderScorecardDetails();
        matchResultModal.hidden = false;
      } else if (saved.activeScreen === "secondInningsScreen" && firstInnings) {
        prepareSecondInningsSetup();
        showScreen(secondInningsScreen);
      } else if (firstInnings && inningsNumber === 1 && isInningsFinished()) {
        const requiredRunRate = firstInnings.target / Number(currentMatch.totalOvers || 1);
        inningsBreakTarget.textContent = `${firstInnings.chasingTeam} needs ${firstInnings.target} runs in ${currentMatch.totalOvers} overs`;
        inningsBreakRate.textContent = `Required run rate is ${formatRunRate(requiredRunRate)}`;
        inningsBreakQuestion.textContent = "First innings completed. Do you want to start second innings?";
        inningsBreakModal.hidden = false;
        setScoringControlsDisabled(true);
      } else if (promptQueue.length && !isInningsFinished()) {
        openNextPrompt();
      } else {
        setScoringControlsDisabled(isInningsFinished());
        endInnings.textContent = isInningsFinished() ? "Innings ended" : "End innings";
      }

      saveAppState();
      return true;
    }

    if (saved.activeScreen === "createMatchScreen") {
      showScreen(createMatchScreen);
      return true;
    }

    return false;
  } catch (error) {
    clearSavedAppState();
    return false;
  }
}

function addRuns(runs) {
  if (!scoringState) {
    return;
  }

  saveScoreHistory();

  const isWide = wideExtra.checked;
  const isNoBall = noBallExtra.checked;
  const isByes = byesExtra.checked;
  const isLegByes = legByesExtra.checked;
  const isWicket = wicketEvent.checked;
  const isLegalBall = !isWide && !isNoBall;
  const isBatRuns = !isByes && !isLegByes;
  const player = getPlayer(scoringState.striker);
  const ballLabel = getBallLabel(runs, isWide, isNoBall, isByes, isLegByes, isWicket);
  let overEnded = false;
  let extraRuns = 0;

  if (isWide) {
    extraRuns += 1;
    scoringState.extras.wide += 1;
  }

  if (isNoBall) {
    extraRuns += 1;
    scoringState.extras.noBall += 1;
  }

  if (isByes) {
    scoringState.extras.byes += runs;
  }

  if (isLegByes) {
    scoringState.extras.legByes += runs;
  }

  if (isLegalBall) {
    scoringState.legalBalls += 1;
    scoringState.bowler.legalBalls += 1;
    player.balls += 1;
  }

  scoringState.thisOver.push(ballLabel);

  if (isBatRuns) {
    player.runs += runs;
    player.fours += runs === 4 ? 1 : 0;
    player.sixes += runs === 6 ? 1 : 0;
  }

  scoringState.runs += runs + extraRuns;
  scoringState.extras.total += extraRuns + (isByes || isLegByes ? runs : 0);
  scoringState.bowler.runs += runs + extraRuns;

  if (isWicket) {
    scoringState.wickets += 1;
    scoringState.bowler.wickets += 1;
  } else if (runs % 2 === 1) {
    rotateStrike();
  }

  if (isLegalBall && scoringState.legalBalls % 6 === 0) {
    scoringState.thisOver = [];
    overEnded = true;
    rotateStrike();
  }

  clearExtras();
  updateScorecard();

  if (isWicket && !isInningsFinished()) {
    queuePrompt({ type: "batsman" });
  }

  if (overEnded && !isInningsFinished()) {
    queuePrompt({ type: "bowler" });
  }

  if (isInningsFinished()) {
    finishCurrentInnings();
  }
}

openCreateMatch.addEventListener("click", () => {
  showScreen(createMatchScreen);
  teamOne.focus();
});

matchHistoryList?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-history-index]");

  if (!button) {
    return;
  }

  const historyIndex = Number(button.dataset.historyIndex);
  const historyMatch = getMatchHistory()[historyIndex];

  if (historyMatch?.innings?.length) {
    openScorecardModal(historyMatch);
  } else {
    scorecardDetailsTitle.textContent = "Scorecard unavailable";
    scorecardDetailsBody.innerHTML = "<p>This completed match was saved before scorecard details were available.</p>";
    scorecardDetailsModal.hidden = false;
  }
});

backHome.addEventListener("click", () => {
  showScreen(homeScreen);
  formMessage.textContent = "";
  formMessage.className = "form-message";
});

backToSetup.addEventListener("click", () => {
  showScreen(createMatchScreen);
  inningsMessage.textContent = "";
  inningsMessage.className = "form-message";
});

backToInnings.addEventListener("click", () => {
  showScreen(inningsScreen);
});

backToFirstScorecard.addEventListener("click", () => {
  showScreen(scorecardScreen);
});

teamOne.addEventListener("input", updateTossLabels);
teamTwo.addEventListener("input", updateTossLabels);

createMatchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const teamOneName = teamOne.value.trim();
  const teamTwoName = teamTwo.value.trim();

  formMessage.className = "form-message";

  if (!teamOneName || !teamTwoName) {
    formMessage.textContent = "Please enter both team names.";
    formMessage.classList.add("error");
    return;
  }

  const match = {
    teamOne: teamOneName,
    teamTwo: teamTwoName,
    tossWinner: getRadioValue("tossWinner") === "teamOne" ? teamOneName : teamTwoName,
    chooseTo: getRadioValue("chooseTo"),
    totalOvers: Number(createMatchForm.totalOvers.value),
    totalWickets: Number(createMatchForm.totalWickets.value || 10)
  };

  if (!getRadioValue("tossWinner") || !match.chooseTo) {
    formMessage.textContent = "Please select toss winner and choose Bat or Bowl.";
    formMessage.classList.add("error");
    return;
  }

  clearSavedAppState();
  currentMatch = match;
  scoringState = null;
  scoreHistory = [];
  promptQueue = [];
  activePrompt = null;
  firstInnings = null;
  inningsNumber = 1;
  matchResultSummary = "";
  localStorage.setItem("cricketScorecardMatch", JSON.stringify(match));
  const tossLoser = match.tossWinner === teamOneName ? teamTwoName : teamOneName;
  const battingTeam = match.chooseTo === "Bat" ? match.tossWinner : tossLoser;
  const bowlingTeam = battingTeam === teamOneName ? teamTwoName : teamOneName;

  battingTeamName.textContent = battingTeam;
  bowlingTeamName.textContent = bowlingTeam;
  formMessage.textContent = "";
  showScreen(inningsScreen);
});

inningsForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const innings = {
    strikeBatsman: inningsForm.strikeBatsman.value.trim(),
    nonStrikeBatsman: inningsForm.nonStrikeBatsman.value.trim(),
    bowlerName: inningsForm.bowlerName.value.trim()
  };

  if (!innings.strikeBatsman || !innings.nonStrikeBatsman || !innings.bowlerName) {
    inningsMessage.textContent = "Please complete all player fields.";
    inningsMessage.className = "form-message error";
    return;
  }

  localStorage.setItem("cricketScorecardInnings", JSON.stringify(innings));
  inningsMessage.className = "form-message";
  inningsMessage.textContent = "";
  startScorecard(innings);
});

secondInningsForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const innings = {
    strikeBatsman: secondInningsForm.secondStrikeBatsman.value.trim(),
    nonStrikeBatsman: secondInningsForm.secondNonStrikeBatsman.value.trim(),
    bowlerName: secondInningsForm.secondBowlerName.value.trim()
  };

  if (!innings.strikeBatsman || !innings.nonStrikeBatsman || !innings.bowlerName) {
    secondInningsMessage.textContent = "Please complete all player fields.";
    secondInningsMessage.className = "form-message error";
    return;
  }

  secondInningsMessage.textContent = "";
  secondInningsMessage.className = "form-message";
  startScorecard(innings, {
    inningsNumber: 2,
    battingTeam: firstInnings.chasingTeam,
    bowlingTeam: firstInnings.defendingTeam,
    target: firstInnings.target
  });
});

scorePickerButtons.forEach((button) => {
  button.addEventListener("click", () => {
    addRuns(Number(button.dataset.run));
  });
});

wideExtra.addEventListener("click", () => {
  if (!scoringState || activePrompt || isInningsFinished()) {
    return;
  }

  clearExtras();
  wideExtra.checked = true;
  addRuns(0);
});

wicketEvent.addEventListener("click", () => {
  if (!scoringState || activePrompt || isInningsFinished()) {
    return;
  }

  clearExtras();
  wicketEvent.checked = true;
  addRuns(0);
});

swapStrike.addEventListener("click", () => {
  if (!scoringState) {
    return;
  }

  saveScoreHistory();
  rotateStrike();
  updateScorecard();
});

retireBatsman.addEventListener("click", () => {
  if (!scoringState || activePrompt) {
    return;
  }

  queuePrompt({ type: "retire" });
});

endInnings.addEventListener("click", () => {
  finishCurrentInnings();
});

undoBall.addEventListener("click", () => {
  const previous = scoreHistory.pop();

  if (!previous) {
    return;
  }

  scoringState = JSON.parse(previous);
  updateScorecard();
});

scoringPromptForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!activePrompt || !scoringState) {
    return;
  }

  const name = scoringPromptInput.value.trim();

  if (!name) {
    scoringPromptMessage.textContent = "Please enter a name.";
    return;
  }

  saveScoreHistory();

  if (activePrompt.type === "bowler") {
    const bowler = {
      name,
      legalBalls: 0,
      runs: 0,
      wickets: 0
    };
    scoringState.bowlers[name] = bowler;
    scoringState.bowler = bowler;
  }

  if (activePrompt.type === "batsman") {
    const playerName = getUniquePlayerName(name);
    scoringState.striker = playerName;
    scoringState.players[playerName] = { runs: 0, balls: 0, fours: 0, sixes: 0 };
  }

  if (activePrompt.type === "retire") {
    const retiredRole = retireNonStrike.checked ? "nonStriker" : "striker";
    const playerName = getUniquePlayerName(name);
    scoringState.retiredPlayers.push(scoringState[retiredRole]);
    scoringState[retiredRole] = playerName;
    scoringState.players[playerName] = { runs: 0, balls: 0, fours: 0, sixes: 0 };
  }

  updateScorecard();
  closePrompt();
});

scoringPromptCancel.addEventListener("click", () => {
  if (!activePrompt) {
    return;
  }

  if (activePrompt.type === "batsman") {
    setScoringControlsDisabled(true);
    endInnings.textContent = "Innings ended";
    activePrompt = null;
    promptQueue = [];
    scoringModal.hidden = true;
    saveAppState();
    return;
  }

  closePrompt();
});

startSecondInningsYes.addEventListener("click", () => {
  inningsBreakModal.hidden = true;
  prepareSecondInningsSetup();
  setScoringControlsDisabled(false);
  showScreen(secondInningsScreen);
  saveAppState();
  secondInningsForm.secondStrikeBatsman.focus();
});

startSecondInningsNo.addEventListener("click", () => {
  inningsBreakModal.hidden = true;
  setScoringControlsDisabled(true);
  endInnings.textContent = "Match ended";
  saveAppState();
});

matchResultNewMatch.addEventListener("click", () => {
  resetForNewMatch();
  showScreen(createMatchScreen);
  teamOne.focus();
});

matchResultScorecard.addEventListener("click", () => {
  matchResultModal.hidden = true;
  openScorecardModal();
});

matchResultShare.addEventListener("click", shareScorecardText);

matchResultDownload.addEventListener("click", downloadScorecardPdf);

openScorecardDetails.addEventListener("click", () => {
  openScorecardModal();
});

closeScorecardDetails.addEventListener("click", () => {
  scorecardDetailsModal.hidden = true;
});

shareScorecard.addEventListener("click", shareScorecardText);

downloadScorecard.addEventListener("click", downloadScorecardPdf);

renderMatchHistory();
restoreSavedAppState();

if ("serviceWorker" in navigator) {
  let isRefreshing = false;

  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (isRefreshing) {
      return;
    }

    isRefreshing = true;
    window.location.reload();
  });

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js")
      .then((registration) => registration.update())
      .catch(() => {});
  });
}

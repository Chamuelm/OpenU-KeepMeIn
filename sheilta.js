$(document).ready(()=> {
  const func = getFunction(window.location.pathname);
  if(func) func();
});

function getFunction(path) {
  const functionMap = {
    "/pls/dmyopt2/myop.myop_screen": mainPage
  }

  return functionMap[path];
}


function mainPage() {
  // Messages
  $(selectors.mainPage_messages_actions).replaceWith(`<div class="message_actions">
  <a class="niceButton" id="selectAllMessages">בטל סימון להכל</a>
  <a class="niceButton" href="javascript:submit_all('chadash')">עדכון תצוגה</a>
  <a class="niceButton" href="KOLHAODAOT.showhod">ארכיון הודעות</a>
  <a class="niceButton" href="sms.sms_screen">הגדרות משלוח הודעות</a>
  </div>`)
  document.getElementById('selectAllMessages').addEventListener('click', selectAllMessages);


  // Grades
  if($(selectors.mainPage_grades_header)[0]) {
    $(selectors.mainPage_grades_header)[0].setAttribute('colspan', 5);
    $(selectors.mainPage_grades_header).after(`<td colspan="2" style="border: 0px;" nowrap="" bgcolor="#ffffff" align="left">
    <div class="message_actions">
    <a class="niceButton" id="selectAllGrades">בטל סימון להכל</a>
    </div>
    </td>`);
  
    document.getElementById('selectAllGrades').addEventListener('click', selectAllGrades);
  }

  // Requests
  $(selectors.mainPage_requests_actions).replaceWith(`<div class="message_actions">
  <a class="niceButton" id="selectAllRequests">בטל סימון להכל</a>
  <a class="niceButton" href="pniot.tree">בקשה חדשה</a>
  <a class="niceButton" href="javascript:submit_all('pniya')">עדכון תצוגה</a>
  <a class="niceButton" href="kolhapniot.newsearch">כל הבקשות</a>
  </div>`)
  document.getElementById('selectAllRequests').addEventListener('click', selectAllRequests);

  // Calender
  axios.get("https://sheilta.apps.openu.ac.il/pls/dmyopt2/luach_shana.first").then(function(data) {
    var parser = new DOMParser()
    var el = parser.parseFromString(data.data, "text/html");
  });
}


function selectAllMessages() {
  window.top.document.forms.form1.check_array_hodaa_new.forEach(el => el.checked = !el.checked);
}

function selectAllRequests() {
  window.top.document.forms.form1.check_array_pn.forEach(el => el.checked = !el.checked);
}

function selectAllGrades() {
  window.top.document.forms.form1.check_array_matala.forEach(el => el.checked = !el.checked);
}






const selectors = {
  mainPage__messages: '#right_col > div:nth-child(3) > table > tbody > tr > td > form > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table > tbody > tr:nth-child(3)',
  mainPage_messages_actions: '#right_col > div:nth-child(3) > table > tbody > tr > td > form > table > tbody > tr:nth-child(1) > td > div:nth-child(2)',
  mainPage_grades_header: '#right_col > div:nth-child(3) > table > tbody > tr > td > form > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(1) > td:nth-child(1)',
  mainPage_requests_actions: '#right_col > div:nth-child(3) > table > tbody > tr > td > form > table > tbody > tr:nth-child(6) > td > table:nth-child(2) > tbody > tr:nth-child(1) > td > div:nth-child(2)'
}
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
  $('head').append('<link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet">');

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

  // Classes
  axios.get('https://sheilta.apps.openu.ac.il/student360').then((response) => {
      const parser = new DOMParser();
      const el = parser.parseFromString(response.data, "text/html");
      const grade = el.querySelector(selectors.s360_avg_grade).innerHTML;
      const points = el.querySelector(selectors.s360_points).innerHTML;
      const s360_pending_points = el.querySelector(selectors.s360_pending_points).innerHTML;
      const classes = el.querySelector(selectors.s360_classes);

      $(selectors.mainPage_sideCard).after(`<div class="inner">
        <div class="left">
          <h3 class="title1"> פריטים מהירים </h3>
          <ul style="text-align: right;">
            <li>ציון ממוצע: <span class="grade">${grade}</span></li>
            <li>${points}</li>
            <li>${s360_pending_points}</li>
          </ul>
        </div>
      </div>`)

      $(selectors.mainPage_newTable).after(`<tr><td align="right" style="padding-right: 0px;">
      <div style="float:right" class="blue_title">מועדי המפגשים בקורסים שלי</div><br/><br/>
      ${classes.innerHTML}
      </td></tr>
      <tr><td></td></tr><tr><td></td></tr><tr align="right"><td></td></tr>`)

  })
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
  mainPage_requests_actions: '#right_col > div:nth-child(3) > table > tbody > tr > td > form > table > tbody > tr:nth-child(6) > td > table:nth-child(2) > tbody > tr:nth-child(1) > td > div:nth-child(2)',
  s360_avg_grade: '#body > section > div > div > div.col-md-10.col-md-offset-1.main-wrapper > div.row.info.green-info > div > div:nth-child(2) > div.row.space-bottom > div:nth-child(3) > p',
  s360_classes: '#body > section > div > div > div.col-md-10.col-md-offset-1.main-wrapper > div.row.info.green-info > div > div:nth-child(4)',
  mainPage_sideCard: '#left_col > div:nth-child(1)',
  mainPage_newTable: '#right_col > div:nth-child(3) > table > tbody > tr > td > form > table > tbody > tr:nth-child(5)',
  s360_points: '#body > section > div > div > div.col-md-10.col-md-offset-1.main-wrapper > div.row.info.green-info > div > div:nth-child(2) > div.row.space-bottom > div:nth-child(2) > p:nth-child(3)',
  s360_pending_points: '#body > section > div > div > div.col-md-10.col-md-offset-1.main-wrapper > div.row.info.green-info > div > div:nth-child(2) > div.row.space-bottom > div:nth-child(2) > p:nth-child(4)',
  s360_number_of_couses: '#body > section > div > div > div.col-md-10.col-md-offset-1.main-wrapper > div.row.info.light-green-info > div > div:nth-child(2) > div.row > div:nth-child(1) > div > div:nth-child(2) > p > span'
}
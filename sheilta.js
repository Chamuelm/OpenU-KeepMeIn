const realDoc = window.top.document;
const parser = new DOMParser();

const selectors = {
  mainPage__messages: '#right_col > div:nth-child(3) > table > tbody > tr > td > form > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table > tbody > tr:nth-child(3)',
  mainPage_messages_actions: '#right_col > div:nth-child(3) > table > tbody > tr > td > form > table > tbody > tr:nth-child(1) > td > div:nth-child(2)',
  mainPage_grades_header: '#right_col > div:nth-child(3) > table > tbody > tr > td > form > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(1) > td:nth-child(1)',
  mainPage_requests_actions: '#right_col > div:nth-child(3) > table > tbody > tr > td > form > table > tbody > tr:nth-child(6) > td > table:nth-child(2) > tbody > tr:nth-child(1) > td > div:nth-child(2)',
  mainPage_requests_actions_fallback: '#right_col > div:nth-child(3) > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > div:nth-child(2)',
  s360_avg_grade: '#body > section > div > div > div.col-md-10.col-md-offset-1.main-wrapper > div.row.info.green-info > div > div:nth-child(2) > div.row.space-bottom > div:nth-child(3) > p',
  s360_classes: '#body > section > div > div > div.col-md-10.col-md-offset-1.main-wrapper > div.row.info.green-info > div > div:nth-child(4)',
  mainPage_sideCard: '#left_col > div:nth-child(1)',
  mainPage_newTable: '#right_col > div:nth-child(3) > table > tbody > tr > td > form > table > tbody > tr:nth-child(5)',
  s360_points: '#body > section > div > div > div.col-md-10.col-md-offset-1.main-wrapper > div.row.info.green-info > div > div:nth-child(2) > div.row.space-bottom > div:nth-child(2) > p:nth-child(3)',
  s360_pending_points: '#body > section > div > div > div.col-md-10.col-md-offset-1.main-wrapper > div.row.info.green-info > div > div:nth-child(2) > div.row.space-bottom > div:nth-child(2) > p:nth-child(4)',
  s360_number_of_couses: '#body > section > div > div > div.col-md-10.col-md-offset-1.main-wrapper > div.row.info.light-green-info > div > div:nth-child(2) > div.row > div:nth-child(1) > div > div:nth-child(2) > p > span'
}

document.onreadystatechange = function () {
  var state = document.readyState;
  if (state == 'complete') {
    const func = getFunction(window.location.pathname);
    if(func) func();
  }
}

function getFunction(path) {
  const functionMap = {
    "/pls/dmyopt2/myop.myop_screen": mainPage
  }

  return functionMap[path];
}


function mainPage() {
  const css = parser.parseFromString('<link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet">', "text/html");
  window.top.document.querySelector('head').append(css.head.firstChild);

  // Messages
  try {
    const msgButtons = parser.parseFromString(`<div class="message_actions">
    <a class="niceButton" id="selectAllMessages">בטל סימון להכל</a>
    <a class="niceButton" href="javascript:submit_all('chadash')">עדכון תצוגה</a>
    <a class="niceButton" href="KOLHAODAOT.showhod">ארכיון הודעות</a>
    <a class="niceButton" href="sms.sms_screen">הגדרות משלוח הודעות</a>
    </div>`, "text/html");
    window.top.document.querySelector(selectors.mainPage_messages_actions).replaceWith(msgButtons.body.firstChild)
    realDoc.getElementById('selectAllMessages').addEventListener('click', selectAllMessages);
  } catch(err) {
    console.err(err);
  }


  // Grades
  try {
    if(window.top.document.querySelector(selectors.mainPage_grades_header)) {
      window.top.document.querySelector(selectors.mainPage_grades_header).setAttribute('colspan', 5);
      const grdButton = parser.parseFromString(`<td colspan="2" style="border: 0px;" nowrap="" bgcolor="#ffffff" align="left">
      <div class="message_actions">
      <a class="niceButton" id="selectAllGrades">בטל סימון להכל</a>
      </div>
      </td>`, "text/html");
      window.top.document.querySelector(selectors.mainPage_grades_header).after(grdButton.body.firstChild);
    
      realDoc.getElementById('selectAllGrades').addEventListener('click', selectAllGrades);
    }
  } catch(err) {
    console.err(err);
  }

  // Requests
  try {
    const reqButton = parser.parseFromString(`<div class="message_actions">
    <a class="niceButton" id="selectAllRequests">בטל סימון להכל</a>
    <a class="niceButton" href="pniot.tree">בקשה חדשה</a>
    <a class="niceButton" href="javascript:submit_all('pniya')">עדכון תצוגה</a>
    <a class="niceButton" href="kolhapniot.newsearch">כל הבקשות</a>
    </div>`, "text/html");
    const requests =   window.top.document.querySelector(selectors.mainPage_requests_actions) || window.top.document.querySelector(selectors.mainPage_requests_actions_fallback)
    requests.replaceWith(reqButton.body.firstChild)
    realDoc.getElementById('selectAllRequests').addEventListener('click', selectAllRequests);
  } catch(err) {
    console.err(err);
  }

  axios.get('https://sheilta.apps.openu.ac.il/student360').then((response) => {
    try {
      const el = parser.parseFromString(response.data, "text/html");
      const grade = el.querySelector(selectors.s360_avg_grade).innerHTML;
      const points = el.querySelector(selectors.s360_points).innerHTML;
      const s360_pending_points = el.querySelector(selectors.s360_pending_points).innerHTML;
      const classes = el.querySelector(selectors.s360_classes);
      const quick = parser.parseFromString(`<div class="inner">
      <div class="left">
        <h3 class="title1"> פריטים מהירים </h3>
        <ul style="text-align: right;">
          <li>ציון ממוצע: <span class="grade">${grade}</span></li>
          <li>${points}</li>
          <li>${s360_pending_points}</li>
        </ul>
      </div>
    </div>`, "text/html");


    let table = document.createElement( 'tr' );
    table.innerHTML = `<td align="right" style="padding-right: 0px;">
      <div style="float:right" class="blue_title">מועדי המפגשים בקורסים שלי</div><br/><br/>
        ${classes.innerHTML}
      </td></tr>
      <tr><td></td></tr><tr><td></td></tr><tr align="right"><td></td>`;

      window.top.document.querySelector(selectors.mainPage_sideCard).after(quick.body.firstChild)
      window.top.document.querySelector(selectors.mainPage_newTable).after(table)
    } catch(err) {
      console.err(err);
    }
  })
}


function selectAllMessages() {
  window.top.document.forms.form1.check_array_hodaa_new.forEach(el => el.checked = !el.checked);
}

function selectAllRequests() {
  if(window.top.document.forms.form1.check_array_pn.length) {
    window.top.document.forms.form1.check_array_pn.forEach(el => el.checked = !el.checked);
  } else {
    window.top.document.forms.form1.check_array_pn.checked = !window.top.document.forms.form1.check_array_pn.checked;
  }
}

function selectAllGrades() {
  if(window.top.document.forms.form1.check_array_matala.length) {
    window.top.document.forms.form1.check_array_matala.forEach(el => el.checked = !el.checked);
  } else {
    window.top.document.forms.form1.check_array_matala.checked = !window.top.document.forms.form1.check_array_matala.checked;
  }
}
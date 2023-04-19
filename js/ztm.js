// Notification.requestPermission().then((result) => {
//     if (result === "granted") {
//       randomNotification();
//     }
//   });
//

// function randomNotification() {
//   const notifTitle = "Dupa";
//   const notifBody = `HAHAHHAHAHAHAA.`;
//   const options = {
//     body: notifBody
//   };
//   new Notification(notifTitle, options);
//   setTimeout(randomNotification, 30000);
// }

const template = `<article>
<h3>{TITLE}</h3>
<span>{DATE}</span>
<a href="{LINK}">{LINK}</a>
</article>`

function check_ztm() {
  let content = '';
  $("#results").html(content);

  let lines = $("#lines").val();
  let lines_split = lines.split(/\W/).map(line => line.toLowerCase()).filter(line => !!line);

  let queryParams = lines_split.map(line => "line=" + line).join("&");
  $.get("https://hxlqiid2l6.execute-api.eu-central-1.amazonaws.com/default/ztm?" + queryParams).then(result => {
    for (let i=0; i<result.length; i++){
      let date = new Date(result[i].date);

      let date_str;
      if (date.getDate() == (new Date().getDate())){
        date_str = date.toLocaleDateString("pl-PL", {hour: "numeric", minute: "numeric", second: "numeric",})
      } else {
        date_str = date.toLocaleDateString("pl-PL")
      }
      let article = template.replaceAll(/\{TITLE\}/g, result[i].title)
          .replaceAll(/\{DATE\}/g, date_str)
          .replaceAll(/\{LINK\}/g, result[i].link);
      content += article;
    }
    if (!content){
      $("#results").html("<h3>Brak utrudnień!</h3>");
    } else {
      $("#results").html(content);
    }

  })
}


$(document).ready(
    $("#form").on("submit", event => {
      event.preventDefault();
      check_ztm();
    })
)


$(".btn-pre-value").click(event => {
  let val = $("#lines").val();
  if (val){
    val += "," + event.target.textContent;
  } else {
    val = event.target.textContent;
  }
  $("#lines").val(val);
})

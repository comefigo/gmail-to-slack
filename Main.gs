var postUrl = "<slack incoming webhooks url>"; // 
var postChannel = "<#chanel name>"; // #チャンネル名 / 個人宛の場合は @ユーザ名
var dateSpanMin = 1; // 監視期間（分単位） タイマーで設定する値と同じにしてください
var userName = 'Gmail'; // Slackに表示される投稿者名（Slackに実在しなくてもOK）

// n分前のメールをすべて通知する
function gmail2Slack() {
    var nowDate = new Date();
    var unixNowTime = nowDate.getTime();
    var pastTime = unixNowTime - (dateSpanMin * 60 * 1000); // n分前の時間を取得

    if (unixNowTime <= pastTime) {
        post2Slack("get gmail failed.", userName);
    }

    // 10桁のみ使用
    var q = "before:" + String(unixNowTime).substring(0, 10) + " after:" + String(pastTime).substring(0, 10);

    // dateSpanMin分前のメールを取得
    var threads = GmailApp.search(q);

    var count = threads.length;

    for (var i = 0; i < count; i++) {
        var thread = threads[i];
        var lastDate = thread.getLastMessageDate();
        var datetime = lastDate.getFullYear() + "/" + (lastDate.getMonth() + 1) + "/" + lastDate.getDate() + " " + lastDate.getHours() + ":" + lastDate.getMinutes() + ":" + lastDate.getSeconds();

        //チャット、スパム、ごみ箱以外
        if (thread.isInChats() || thread.isInSpam() && thread.isInTrash()) {
            continue;
        }

        //slackに通知
        post2Slack("件名:" + thread.getFirstMessageSubject() + "    <" + thread.getPermalink() + "|詳細>", userName);
    }
}

// Slack送信
function post2Slack(message, username) {
    var jsonData = {
        "channel": postChannel,
        "username": username,
        "text": message,
        "icon_emoji": ":email:"
    };
    var payload = JSON.stringify(jsonData);
    var options = {
        "method": "post",
        "contentType": "application/json",
        "payload": payload
    };

    UrlFetchApp.fetch(postUrl, options);
}
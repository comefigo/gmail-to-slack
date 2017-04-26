# GmailをSlackに通知

Google App ScriptでGmailをタイマー(分、時間、日、月、年)で監視し、
監視間隔内に来たメール（迷惑メール、削除済みメール、チャットを除く）をすべてSlackに通知する

## 方法

0. Slack Web hooks urlの取得
1. 通知させたいGoogleユーザでログイン
2. 新規[Google App Script](https://www.google.com/script/start/)を作成
3. プロジェクト名は任意の名前を入力
4. コードには、Main.gsの内容を張り付け
5. 以下の箇所を修正してください

    ```
    var postUrl = "<slack incoming webhooks url>"; // Slack incoming webhooks url
    var postChannel = "<#chanel name>"; // #チャンネル名 / 個人宛の場合は @ユーザ名
    var dateSpanMin = 1; // 監視期間（分単位） 後述のスクリプトタイマーで設定する値（分単位で）と同じにしてください
    var userName = 'Gmail'; // Slackに表示される投稿者名（Slackに実在しなくてもOK）
    ```

6. Slackで受信する際のアイコンを設定する場合は以下を修正してください（任意）

    ```
    "icon_emoji": ":email:"
    ```

7. [実行タイマーの設定](http://pineplanter.moo.jp/non-it-salaryman/2016/05/20/google-apps-script-minute-timer/)



## リファレンス

- [Gmail検索用演算子](https://support.google.com/mail/answer/7190?hl=ja)
- [Gmail Api](https://developers.google.com/apps-script/reference/gmail/gmail-app)
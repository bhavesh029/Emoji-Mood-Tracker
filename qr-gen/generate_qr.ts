var QRCode = require("qrcode-svg");
var qrcode = new QRCode({
  content:
    "https://api.emojiTracker.com/v1/marketing/app-store-redirector/1?source=maid-referral-inapp",
  padding: 4,
  width: 256,
  height: 256,
  color: "#000000",
  background: "#ffffff",
  ecl: "M",
});
qrcode.save("sample.svg", function (error) {
  if (error) throw error;
  console.log("Done!");
});

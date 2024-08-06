const { join } = require("node:path");
const { Tray, Menu, app, nativeImage } = require("electron/main");

const Timer = (startTime) => ({
  type: "normal",
  label: ((new Date().getTime() - startTime) / 1000).toFixed(2),
});

const update = (tray, startTime) =>
  tray.setContextMenu(Menu.buildFromTemplate([Timer(startTime)]));

const trayIcon = nativeImage
  .createFromPath(join(__dirname, "tray.png"))
  .resize({
    width: 18,
    height: 18,
  });

app.whenReady().then(() => {
  const tray = new Tray(trayIcon);
  const startTime = new Date().getTime();
  update(tray, startTime);
  setInterval(() => update(tray, startTime), 100);
});

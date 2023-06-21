// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: red; icon-glyph: magic;
const dataUrl = "https://windguru-widget.onrender.com/scrape";


let widget = await createWidget();
Script.setWidget(widget);
widget.presentMedium();
Script.complete();


async function createWidget() {
const widget = new ListWidget();
const data = await new Request(dataUrl).loadJSON();


let title = widget.addText("Windguru Arbousiers");
title.font = Font.systemFont(20);windDirNum
title.textColor = Color.white();

widget.addSpacer(15);

let dataWind = widget.addText(`${data.windAvg}  |  ${data.windGust}  |  ${data.windDirValue}  |  ${data.windDirNum}`);
dataWind.font = Font.semiboldSystemFont(25);
dataWind.textColor = Color.white();
title.centerAlignText();
dataWind.centerAlignText();

let direction = 0;
switch (true) {
    case (data.windDirValue >= 337.5 || data.windDirValue < 22.5):
      direction = 'N';
      break;
    case (data.windDirValue >= 22.5 && data.windDirValue < 67.5):
      direction = 'NE';
      break;
    case (data.windDirValue >= 67.5 && data.windDirValue < 112.5):
      direction = 'E';
      break;
    case (data.windDirValue >= 112.5 && data.windDirValue < 157.5):
      direction = 'SE';
      break;
    case (data.windDirValue >= 157.5 && data.windDirValue < 202.5):
      direction = 'S';
      break;
    case (data.windDirValue >= 202.5 && data.windDirValue < 247.5):
      direction = 'SW';
      break;
    case (data.windDirValue >= 247.5 && data.windDirValue < 292.5):
      direction = 'W';
      break;
    case (data.windDirValue >= 292.5 && data.windDirValue < 337.5):
      direction = 'NW';
      break;
}

let arrow = widget.addText(`${direction}`);
arrow.font = Font.semiboldSystemFont(25);
dataWind.centerAlignText();

let gradient = new LinearGradient()


gradient.colors = [new Color("3a8cc1"), new Color("00A9D6")];
gradient.locations = [0, 1];


widget.backgroundGradient = gradient
return widget;
}

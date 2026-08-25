import webcat from "webcat";

webcat.start({
  localDataPath: "webcat/data",
  staticHookPath: "webcat/hooks/content.js",
  iconsPath: "webcat/icons",
  pagesPath: "webcat/pages",
});

module.exports = function chromeLoad(grunt) {
  var exec = require('child_process').execSync,
      tabRegex = /\[(\d+):(\d+)\]\s/;

  function openFreshTab(url) {
    exec('chrome-cli open ' + url);
    grunt.log.writeln('Opening fresh tab at ' + url);
  }

  grunt.registerMultiTask('chrome-load', 'Load or reload relevant Chrome tabs', function chromeLoadTask() {
    var tabList,
        urlRegex,
        matchingTabs;

    tabList = exec('chrome-cli list links', {encoding: 'utf8'}).split('\n');

    if (this.data.reload_pattern) {
      urlRegex = new RegExp(this.data.reload_pattern);
      matchingTabs = tabList.filter(urlRegex.test.bind(urlRegex));
      console.log(matchingTabs);

      if (matchingTabs.length) {
        matchingTabs.forEach(function reloadTab(tabInfo) {
          // [0] is full match, [1] is window id, [2] is tab id
          exec('chrome-cli reload -t ' + tabRegex.exec(tabInfo)[2]);
        });
        grunt.log.writeln('Reloaded ' + matchingTabs.length + ' tab' + (matchingTabs.length > 1 ? 's' : '') + ' matching ' + urlRegex.toString());
      } else {
        openFreshTab(this.data.new_url);
      }
    } else {
      openFreshTab(this.data.new_url);
    }
  });
};

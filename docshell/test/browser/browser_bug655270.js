/* Any copyright is dedicated to the Public Domain.
   http://creativecommons.org/publicdomain/zero/1.0/ */

/** 
 * Test for Bug 655273 
 *
 * Call pushState and then make sure that the favicon service associates our
 * old favicon with the new URI.
 */

function test() {
  const testDir = "http://mochi.test:8888/browser/docshell/test/browser/";
  const origURL = testDir + "file_bug655270.html";
  const newURL  = origURL + '?new_page';

  const faviconURL = testDir + "favicon_bug655270.ico";

  waitForExplicitFinish();

  let tab = BrowserTestUtils.addTab(gBrowser, origURL);

  // The page at origURL has a <link rel='icon'>, so we should get a call into
  // our observer below when it loads.  Once we verify that we have the right
  // favicon URI, we call pushState, which should trigger another onPageChange
  // event, this time for the URI after pushState.

  let observer = {
    onPageChanged: function(aURI, aWhat, aValue) {
      if (aWhat != Ci.nsINavHistoryObserver.ATTRIBUTE_FAVICON)
        return;

      if (aURI.spec == origURL) {
        is(aValue, faviconURL, 'FaviconURL for original URI');
        // Ignore the promise returned here and wait for the next
        // onPageChanged notification.
        ContentTask.spawn(tab.linkedBrowser, null, function() {
          content.history.pushState('', '', '?new_page');
        });
      }

      if (aURI.spec == newURL) {
        is(aValue, faviconURL, 'FaviconURL for new URI');
        gBrowser.removeTab(tab);
        PlacesUtils.history.removeObserver(this);
        finish();
      }
    },

    onBeginUpdateBatch: function() { },
    onEndUpdateBatch: function() { },
    onVisits: function() { },
    onTitleChanged: function() { },
    onDeleteURI: function() { },
    onClearHistory: function() { },
    onDeleteVisits: function() { },
    QueryInterface: ChromeUtils.generateQI([Ci.nsINavHistoryObserver])
  };

  PlacesUtils.history.addObserver(observer);
}

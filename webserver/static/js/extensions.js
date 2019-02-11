!function(e){function t(e,t){return function(n){n.innerHTML="";var o=document.createElement("ul");o.className="tttie-extension-list",t.forEach(function(t){var n=document.createElement("li"),i=document.createElement("label"),a=document.createElement("input");a.id=t.id,a.type="checkbox",a.name=e?"tttie-channels":"tttie-roles",i.htmlFor=t.id,i.innerText=(e?"#":"")+t.name,n.appendChild(a),n.appendChild(i),o.appendChild(n)}),n.appendChild(o)}}var n=!1;function o(t){var n=[];for(var o of document.querySelectorAll("div.tttie-extension-channel-list"))o.querySelectorAll('input[name="tttie-channels"]').forEach(function(e){e.checked&&n.push(e.id)});var i=[];for(var o of document.querySelectorAll("div.tttie-extension-role-list"))o.querySelectorAll('input[name="tttie-roles"]').forEach(function(e){e.checked&&i.push(e.id)});var a=document.querySelector("input#tttie-extension-store-id");"new"===ttbot.extension||a.value||t(!1);var r,c=document.querySelector("input#tttie-extension-cmd");(!c.value||c.value.includes(" ")||c.value.length>20)&&t(!1);var l=document.querySelector("textarea#tttie-textarea-code");r=!l&&document.querySelector("div.monaco-container#extension-monaco-container")?e.ttbot.editor.getValue():l.value;var u=document.querySelector("input#tttie-extension-name");(!u.value||u.value.length>100)&&t(!1),t({allowedChannels:n,allowedRoles:i,commandTrigger:c.value,code:r,name:u.value,store:a.value||null})}function i(t,n,o){n&&o||("new"===t.id?document.title+=" - New extension":document.title+=" - Extension: "+t.name);var i=document.querySelector("h1#tttie-title");"new"===t.id?i.innerText="Create a new extension":i.innerText="Extension: "+t.name;var a=document.querySelector("input#tttie-extension-name");for(var r of(a.value=t.name,document.querySelectorAll("div.tttie-extension-channel-list")))r.querySelectorAll('input[name="tttie-channels"]').forEach(function(e){t.allowedChannels.includes(e.id)?e.checked=!0:e.checked=!1});for(var r of document.querySelectorAll("div.tttie-extension-role-list"))r.querySelectorAll('input[name="tttie-roles"]').forEach(function(e){t.allowedRoles.includes(e.id)?e.checked=!0:e.checked=!1});if(document.querySelector("input#tttie-extension-store-id").value=t.store,document.querySelector("input#tttie-extension-cmd").value=t.commandTrigger,n){var c=document.querySelector("textarea#tttie-textarea-code");!c&&document.querySelector("div.monaco-container#extension-monaco-container")?e.ttbot.editor.setValue(t.code):c.value=t.code}}window.addEventListener("load",function(){var a=document.querySelectorAll("div.tttie-extension-channel-list"),r=document.querySelectorAll("div.tttie-extension-role-list");e.ttbot.getAvailableChannels().then(function(n){return a.forEach(t(!0,n)),e.ttbot.getAvailableRoles(!0)}).then(function(n){return r.forEach(t(!1,n.filter(function(t){return t.id!==e.ttbot.guildId}))),e.ttbot.getExtension()}).then(function(t){var a,r,c=document.querySelector("textarea#tttie-textarea-code");if(!c&&document.querySelector("div.monaco-container#extension-monaco-container")){var l=function(){fetch("/tt.bot.d.ts").then(function(e){return e.text()}).then(function(n){console.log(n),e.monaco.languages.typescript.javascriptDefaults.addExtraLib(n),e.ttbot.editor=e.monaco.editor.create(document.querySelector("div.monaco-container#extension-monaco-container"),{value:t.code,language:"javascript",theme:"vs-dark"}),e.addEventListener("resize",function(){e.ttbot.editor.layout({height:600,width:document.body.clientWidth>650?650:350})})})},u=function(){if(e.ttbot.monacoLoaded)return l();setTimeout(u,100)};e.ttbot.monacoLoaded?l():setTimeout(u,100)}else c.value=t.code;i(t),function(t,o,i){t.addEventListener("click",function(){if(n)return!1;n=!0;var a=t.innerHTML;t.innerText="Saving...";var r=e.ttbot.extensionData;i(function(i){var c=function(i,r){t.innerHTML=a,n=!1,o(e.ttbot.extensionData,i,r)};i?e.ttbot.updateExtension(i).then(function(e){return c(!1,!0)}).then(function(){if("new"===e.ttbot.extension)e.location="/dashboard/"+e.ttbot.guildId+"/extensions/"+e.ttbot.extensionData.id+(e.ttbot.editor?"/monaco":"");else{if(r.name===e.ttbot.extensionData.name)return;e.location.reload()}}):c(!0,!1)})})}(document.querySelector("a.tttie-linkbutton#save"),i,o),a=document.querySelector("a.tttie-linkbutton#reset"),r=function(e){i(e,!0)},a.addEventListener("click",function(){r(e.ttbot.extensionData,!0)})})})}(window);
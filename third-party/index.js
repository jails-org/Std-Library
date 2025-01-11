const thirdParty = (name) => new Promise((resolve, reject) => {
  const script = document.querySelector(`script[data-name=${name}]`);
  if (!script)
    reject({ error: "ThirdPartyScriptError", message: `There is no script with data-name: ${name} in the document.` });
  else if (script.src) {
    const e = document.createElement("script");
    e.onload = () => {
      new Function(script.text)(), resolve(e);
    }, e.src = script.src, document.head.appendChild(e);
  } else
    eval(script.text), resolve(script);
});
export {
  thirdParty
};

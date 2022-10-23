interface Config {
  instance: string;
  protocol: number;
}

function validateConfig(object: unknown):object is Config {
  if(typeof (object as Config).instance !== "string")
    return false;
  if(typeof (object as Config).protocol !== "number")
    return false;
  return true;
}

function addCandidate(candidate:{index:number,name:string}):HTMLDivElement {
  const card = document.createElement("div");
  card.classList.add("card");
  const summary = card.appendChild(document.createElement("summary"));
  summary.addEventListener("click", () => {
    if(card.classList.contains("active")) {
      card.classList.remove("active");
    } else {
      [...document.getElementsByClassName("card active")]
        .forEach(element => element.classList.remove("active"));
      card.classList.add("active");
    }
  });
  
  const summaryMarker = summary.appendChild(document.createElement("span"));
  summaryMarker.innerText="⏵";
  
  summary.appendChild((document.createTextNode(candidate.name)));
  
  // TODO: API `v2`;
  // const paragraph = card.appendChild(document.createElement("paragraph"));
  // paragraph.innerHTML = DOMPurify.sanitize(marked.parse(candidate.body))
  
  const button = card.appendChild(document.createElement("button"));
  button.value=candidate.index.toString();
  return card;
}

const config = await (await fetch("config/server.json")).json();

if(!validateConfig(config))
  throw new TypeError("File 'config/server.json' is not of type 'Config'.");

const request = fetch("http://"+config.instance+"/api/v"+config.protocol.toString()+"/candidates", {
  headers: {
    "X-Authorization": "MagicValue",
    "Access-Control-Allow-Origin": "*"
  },
  credentials: "omit",
  mode: "no-cors",
  method: "GET"
});

window.addEventListener("load", () => {
  const main = document.getElementsByTagName("main")[0];
  if(!main) return;
  request.then(req => {
    if(!req.ok)
      throw new Error("Request error: "+req.statusText+" ("+req.status.toString()+").")
    req.json().then(candidates => {
      if(Array.isArray(candidates)) {
        candidates.forEach((name, index) => {
          if(typeof name === "string")
            main.appendChild(addCandidate({name,index}));
        });
      }
    });
  });
});

export {};
"use strict"

function getOrders(username) {
  document.getElementById("loading").hidden = false
  fetch(`http://localhost:4040/orders/${username}`)
    .then(response => response.json())
    .then(data => {
      let stringifiedData = JSON.stringify(data, null, 2) // additional parameters to make it pretty
      console.log(stringifiedData)
      document.getElementById("codeElement").innerText = "\n" + stringifiedData
      document.getElementById("loading").hidden = true
    });
}

function onGetOrders() {
  let username = document.getElementById("username").value

  console.log("username: ", username)

  getOrders(username)
}

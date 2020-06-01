import * as M from "../node_modules/materialize-css/dist/js/materialize";
// All components imports here!
import Header from "./components/Header";
import MainApp from "./components/MainApp";
import Uploader from "./services/Uploader";

document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll("select");
  var instances = M.FormSelect.init(elems);
});

const app = async () => {
  document.getElementById("header").innerHTML = Header();
  document.getElementById("app").innerHTML = await MainApp();
  new Uploader();
};
app();

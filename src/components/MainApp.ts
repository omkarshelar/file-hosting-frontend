import ProgressComponent from "./ProgressComponent";
import Link from "./Link";

const MainApp = async () => {
  let template = `
    <form action="#">
			<label for="upload">Select a file : </label>
      <!-- <input type="file" id="file-input" name="myfile"> -->

      <div class="file-field input-field">
        <div class="btn red">
          <span>File</span>
          <input type="file" id="file-input" name="myfile" required>
        </div>
        <div class="file-path-wrapper">
          <input class="file-path validate" type="text">
        </div>
      </div>
      <div class="input-field col s3 m6 l3">
        <select id="timeSelect">
          <option value="1" selected>30 mins</option>
          <option value="2">1 hr</option>
          <option value="3">12 hrs</option>
          <option value="4">1 day</option>
        </select>
      </div>
      <div class="input-field col s12">
        <input id="password" type="password" class="validate">
        <label for="password">Password(Keep blank for no password)</label>
      </div>
      <button id="upload-button" class="waves-effect waves-light btn red">Upload File</button>
      </form>
      <div id="progressComponent"></div>
      <div id="linkTemplate"></div>
	`;
  ProgressComponent().subscribe((progressTemplate) => {
    document.querySelector("#progressComponent").innerHTML = progressTemplate;
  });
  Link().subscribe((linkTemplate) => {
    document.querySelector("#linkTemplate").innerHTML = `${linkTemplate}`;
  });
  return template;
};

export default MainApp;

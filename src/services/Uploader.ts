import { progressSub } from "../components/ProgressComponent";
import { link } from "../components/Link";

class Uploader {
  APIDomain = "https://3ysaorp2qi.execute-api.ap-south-1.amazonaws.com/prod";
  constructor() {
    document
      .querySelector("#upload-button")
      .addEventListener("click", this.uploadHandler);
  }

  uploadHandler = async (event) => {
    event.preventDefault();
    link.next(null);
    let fileName = this.validateFile();
    if (!fileName) {
      return;
    }
    try {
      // Get S3 signed url
      const response = await this.getSignedURL(fileName);
      response = JSON.parse(response);
      if (response.UploadURL && response.Key) {
        // Upload the file to signed url
        await this.uploadFile(response.UploadURL, response.Key);
        const expiryTime = this.getExpiryTime();
        // Get custom URL to share with user
        let customURI = await this.getCustomURI(response.Key, expiryTime);
        customURI = JSON.parse(customURI);
        // console.log(`${this.APIDomain}/asset/${customURI.URL}`);
        link.next(`${this.APIDomain}/asset/${customURI.URL}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  validateFile = () => {
    // user has not chosen any file
    if (document.querySelector("#file-input").files.length === 0) {
      alert("Error : No file selected");
      return null;
    }

    // first file that was chosen
    var file = document.querySelector("#file-input").files[0];
    // max 1 GB size allowed
    if (file.size > 1024 * 1024 * 1024) {
      alert("Error : Exceeded size 1GB");
      return null;
    }
    return file.name;
  };

  getSignedURL(fileName) {
    return new Promise((resolve, reject) => {
      var request = new XMLHttpRequest();
      request.open(
        "GET",
        `${this.APIDomain}/signed-url-upload/${fileName}`,
        true
      );
      request.onload = function () {
        if (this.status === 200) {
          resolve(this.response);
        }
        reject("Could not upload your file. Please try again later!");
      };
      request.send();
    });
  }

  uploadFile(url, key) {
    return new Promise((resolve, reject) => {
      var request = new XMLHttpRequest();
      request.open("PUT", url, true);
      request.upload.addEventListener("progress", (e) => {
        var percent_complete = (e.loaded / e.total) * 100;

        // Percentage of upload completed
        progressSub.next(percent_complete);
      });
      request.onload = function () {
        if (request.status === 200) {
          resolve();
        } else {
          reject();
        }
      };
      request.send(document.querySelector("#file-input").files[0]);
    });
  }

  getCustomURI(key, expiryTime) {
    return new Promise((resolve, reject) => {
      var request = new XMLHttpRequest();
      request.open(
        "POST",
        `${this.APIDomain}/custom-uri/${key}/${expiryTime}`,
        true
      );
      request.onload = function () {
        if (this.status === 201) {
          resolve(this.response);
        }
        reject("Could not upload your file. Please try again later!");
      };
      request.send();
    });
  }

  getExpiryTime() {
    const timeSelector = document.getElementById("timeSelect");
    const selected = timeSelector.options[timeSelector.selectedIndex].value;
    const unixTime = Math.floor(new Date().getTime() / 1000);
    switch (selected) {
      case "1":
        return unixTime + 30 * 60; // 30 mins
        break;
      case "2":
        return unixTime + 60 * 60; // 1 hr
        break;
      case "3":
        return unixTime + 12 * 60 * 60; // 12 hrs
        break;
      case "4":
        return unixTime + 24 * 60 * 60; // 1 day
        break;
    }
  }
}

export default Uploader;

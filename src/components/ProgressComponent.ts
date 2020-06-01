import { Subject } from "rxjs";
export const progressSub = new Subject<number>();

const ProgressComponent = (): Subject<string> => {
  const template = new Subject<string>();
  progressSub.subscribe((precentComplete) => {
    template.next(`<div id="progressComponent">
				<div class="progress">
					<div class="determinate" id="progressBar" style="width: 0%;"></div>
				</div>
			<div>`);
    document.getElementById("progressBar").style = `width: ${Math.floor(
      precentComplete
    )}%`;
    if (precentComplete === 100) {
      template.next(`<h5>File Uploaded!</h5>`);
    }
  });
  return template;
};

export default ProgressComponent;

import { Subject } from "rxjs";
export const link = new Subject<string>();

const Link = () => {
  const linkTemplate = new Subject<string>();

  link.subscribe((link) => {
    if (link) {
      linkTemplate.next(`
			<h5>Here's the link to your file :
				<br>
				<a href="${link}" target="_blank">${link}<a>
			</h5>
		`);
    } else {
      linkTemplate.next(``);
    }
  });
  return linkTemplate;
};

export default Link;

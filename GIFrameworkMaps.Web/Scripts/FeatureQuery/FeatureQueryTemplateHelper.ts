import { DateTime } from "luxon";
import { default as nunjucks } from "nunjucks";  
export function configureNunjucks() {
  const env = nunjucks.configure({ autoescape: false });
  env.addFilter("date", (str, format) => {
    try {
      let dt = DateTime.fromISO(str);
      if (!dt.isValid) {
        //attempt to parse with js parser
        dt = DateTime.fromJSDate(new Date(Date.parse(str)));
      }
      if (dt.isValid) {
        if (format) {
          return dt.toFormat(format);
        } else {
          return dt.toLocaleString();
        }
      }
    } catch (e) {
      console.error(e);
    }
    console.warn(
      `Could not parse ${str} as a date. Returning unformatted string.`,
    );
    return str;
  });
}

export function renderTemplate(template: string, props: object) {
  if (template) {
    return nunjucks.renderString(template, props);
  }
  return "";
}


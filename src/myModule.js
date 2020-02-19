const name = "lohith";
const message = "some text from this module";

const greeting = name => {
  return ` hi ${name}`;
};
export { message, greeting, name as default };

import figlet from "figlet";

console.log(
  figlet.textSync("Boo!", {
    font: "Ghost",
    horizontalLayout: "default",
    verticalLayout: "default",
    width: 80,
    whitespaceBreak: true,
  })
);

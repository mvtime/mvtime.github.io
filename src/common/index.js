function _statuslog() {
  // console.log("📚 " + Array.from(arguments).join(" \n"));
  console.log(
    `%cMVTT`,
    "background:#272727;color:#C9B092;padding:10px 20px;font-family:Lato,sans-serif;font-weight:bold;font-size:1.5em",
    ...Array.from(arguments)
  );
}

export { _statuslog };

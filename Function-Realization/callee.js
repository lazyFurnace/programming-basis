var arrData = [
  "外层1",
  "外层2",
  "外层3",
  ["中层1", "中层2", "中层3", "中层4", "中层5", "中层6"],
  "外层4",
  "外层5",
  "外层6",
  ["中层1", "中层2", "中层3", ["内层1", "内层2", "内层3"]]
];
var outData = [];
function callMe(data) {
  // console.log(data);

  for (var i = 0; i < data.length; i++) {
    // console.log(typeof(data[i]));
    if (typeof data[i] == "object") {
      // console.log(data[i]);
      arguments.callee(data[i]);
    } else {
      outData.push(data[i]);
    }
  }
}
callMe(arrData);
console.log(outData);

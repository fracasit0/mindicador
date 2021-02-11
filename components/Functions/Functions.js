import React from "react";

function getFromObject(object, key) {
    let result = [];
    for (var i = 0; i < object.length; i++)
      if (object[i][`${key}`])
        if (result.length < 11)
          if (key !== "fecha") {
            result.push(object[i][`${key}`]);
          } else {
            result.push(object[i][`${key}`].split("T")[0]);
          }
    return result;
  }

  export default getFromObject;
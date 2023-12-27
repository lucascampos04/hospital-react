import React from "react";
import "../public/crudUsersStyle.css"

function getBackgroundColorClass(plano){
    switch(plano){
      case "gold":
          return "ouro-bg";
        case "silver":
          return "prata-bg";
        case "vip":
          return "vip-bg";
        case "bronze":
          return "bronze-bg";
        default:
          return "sem-plano-bg";
    }
  }

  export default getBackgroundColorClass
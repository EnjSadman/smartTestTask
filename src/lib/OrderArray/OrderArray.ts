import { AscDesc } from "../../utils/enums";
import { User } from "../../utils/types";

 export function orderArray (array : User[], parameter: keyof User, order : AscDesc) : User[] {
  const copyArray = [...array];

  copyArray.sort((a, b) => {
    const aParameter = a[parameter];
    const bParameter = b[parameter];

    if (typeof aParameter === "string" && typeof bParameter === "string") {
      return (order === AscDesc.ascending)
      ? aParameter.localeCompare(bParameter)
      : bParameter.localeCompare(aParameter)
    }
    return 0;
  })

  return copyArray;
};
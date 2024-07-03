export const dynamicJsonBuilder = (object: Record<string, any>) => {
    const json: Record<string, any> = {};
  
    for (const key in object) {
      if (object[key]) {
        json[key] = object[key];
      }
    }
  
    return { json };
  };
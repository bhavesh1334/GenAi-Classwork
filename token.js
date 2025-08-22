import { Tiktoken } from "js-tiktoken";

import o200k_base from "js-tiktoken/ranks/o200k_base";


const encoder = new Tiktoken(o200k_base)

const encodeText = (text) => {
  return encoder.encode(text);
}


const encoded= encodeText("Hello, world! This is a test of the Tiktoken encoder.");
console.log(encoded);


const decoded = encoder.decode(encoded);
console.log(decoded);


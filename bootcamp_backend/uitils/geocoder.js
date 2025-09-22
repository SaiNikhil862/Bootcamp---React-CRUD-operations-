import NodeGeocoder from "node-geocoder";
import { GEOCODER_PROVIDER, GEOCODER_API_KEY } from "../Config/index.js";


const options = {
  provider: GEOCODER_PROVIDER,
  httpAdapter: "https",
  apiKey: GEOCODER_API_KEY,
  formatter: null,
};

export let geocoder = NodeGeocoder(options);

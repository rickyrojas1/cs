"use strict";
import React from "react";
import Reddit from "./Reddit";

import makeAsyncScriptLoader from "react-async-script";

const callbackName = "onloadcallback";
const URL = `https://www.reddit.com/.embed?limit=5`;

export default makeAsyncScriptLoader(Reddit, URL, {callbackName: callbackName});

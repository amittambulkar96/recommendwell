import { httpRouter } from "convex/server";
import { createAuth } from "./auth";
import { authComponent } from "./authComponent";

const http = httpRouter();

authComponent.registerRoutes(http, createAuth);

export default http;

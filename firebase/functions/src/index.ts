import { onRequest } from "firebase-functions/v2/https";

export const healthcheck = onRequest((request, response) => {
  response.status(200).json({
    ok: true,
    method: request.method,
    message: "starter functions scaffold is active"
  });
});

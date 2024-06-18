export async function processResponse(response: Response) {
  let responseObject: any;
  try {
    responseObject = await response.json();
  } catch (error) {
    debugger;
  }

  if (response.status < 200 || response.status > 304) {
    throw new Error(responseObject.errorMessage?.toString() || "Failed to process response");
  }

  return responseObject;
}

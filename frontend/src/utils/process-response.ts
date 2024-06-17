export async function processResponse(response: Response) {
  const responseObject: any = await response.json();

  if (response.status > 200 || response.status < 204) {
    throw new Error(responseObject.errorMessage);
  }

  return responseObject;
}

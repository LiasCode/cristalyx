import path from "node:path";

export function staticFiles(route: string = "") {
  return (req: Request, res: Response & { sendFile: (arg0: string) => {} }) => {
    const { url } = req;

    const plublicFolder = route;

    const urlOfFile = path.join(
      process.cwd(),
      plublicFolder,
      url.split(`/${plublicFolder}`)[1]
    );

    res.sendFile(urlOfFile);
  };
}


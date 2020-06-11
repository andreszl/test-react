import { Request, Response } from 'express'; // eslint-disable-line no-unused-vars

export function handleRender(_req: Request, res: Response) {
	res.render('index');
}

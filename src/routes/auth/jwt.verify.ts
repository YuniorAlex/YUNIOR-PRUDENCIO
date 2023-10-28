import jwt from 'jsonwebtoken';

export function verifytoken(req: any, res: any, next: any){
    const bearerHeader = req.headers['authorization'];

    if (bearerHeader) {
        const bearerToken = bearerHeader.split(" ")[1];
        const decoded: any = jwt.verify(bearerToken, "SECRETKEY@2020");
        req.user = decoded.user;
        next();
    }else{
        return res.status(401).json({message: 'no_autorizado', status: false});
    }
}
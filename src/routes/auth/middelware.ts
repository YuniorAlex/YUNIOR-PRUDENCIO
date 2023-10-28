export const authRole = (roles: any) => {
    return (req: any, res: any, next: any) => {
        const usuarioRol = req.user.codRol;
        if (roles.includes(usuarioRol)) {
            next()
        }else{
            return res.status(401).json({message: 'permiso_denegado', status: false});
        }
    }
} 
import { AppError } from "@errors/AppError";
import { UsuariosRepository } from "@repositories/Usuarios/UsuariosRepository";
import { NextFunction, Request, Response } from "express";


export async function ensureAdmin(req: Request, res: Response, next: NextFunction) {
    const { id } = req.user;

    const usuariosRepository = new UsuariosRepository();

    const user = await usuariosRepository.findUserById(id);

    if (!user.admin) {
        throw new AppError("Usuario não é um administrador", 401);
    }

    return next();
}
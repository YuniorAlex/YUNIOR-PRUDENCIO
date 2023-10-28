import {Entity,PrimaryColumn, Column, BaseEntity, OneToMany} from "typeorm"
import { Usuarios } from "../../usuarios/entities/usuarios";

@Entity()
export class Roles extends BaseEntity{

    @PrimaryColumn()
    codigo: string;

    @Column()
    nombre: string;

    @OneToMany(() => Usuarios, usuario => usuario.codRol)
    rol: Usuarios[];
}
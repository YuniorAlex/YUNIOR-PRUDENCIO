import {Entity,PrimaryColumn, Column, BaseEntity, ManyToOne, JoinColumn} from "typeorm"
import { Roles } from "../../roles/entities/roles";

@Entity()
export class Usuarios extends BaseEntity{

    @PrimaryColumn()
    codigo: string;

    @Column()
    nombre: string;

    @Column()
    email: string;

    @Column()
    telefono: string;

    @Column()
    puesto: string;

    @Column()
    codRol: string;

    @ManyToOne(() => Roles, rol => rol.codigo)
    @JoinColumn({name: 'codRol', referencedColumnName: 'codigo'})
    rol: Roles;
}
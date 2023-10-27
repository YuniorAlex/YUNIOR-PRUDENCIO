import {Entity,PrimaryColumn, Column, BaseEntity} from "typeorm"

@Entity()
export class Pedidosdet extends BaseEntity{

    @PrimaryColumn()
    numpedido: string;

    @Column()
    fechapedido: Date;

    @Column()
    fecharecepcion: Date;

    @Column()
    fechadespacho: Date;

    @Column()
    fechaentrega: Date;

    @Column()
    codvendedor: string;

    @Column()
    codrepartidor: string;

    @Column()
    codestado: string;
}
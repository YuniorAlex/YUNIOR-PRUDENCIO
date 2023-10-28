import {Entity,PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToMany, JoinTable} from "typeorm"
import { Productos } from "../../productos/entities/productos";

@Entity()
export class Pedidos extends BaseEntity{

    @PrimaryGeneratedColumn()
    numPedido: string;

    @Column()
    fechaPedido: Date;

    @Column({ nullable: true })
    fechaRecepcion: Date;

    @Column({ nullable: true })
    fechaDespacho: Date;

    @Column({ nullable: true })
    fechaEntrega: Date;

    @Column()
    codVendedor: string;

    @Column({ nullable: true })
    codRepartidor: string;

    @Column()
    codEstado: string;

    @ManyToMany(() => Productos, {eager: true})
    @JoinTable({
        name: "pedidosdet",
        joinColumn: {
            name: "numPedido",
            referencedColumnName: "numPedido"
        },
        inverseJoinColumn: {
            name: "codProducto",
            referencedColumnName: "sku"
        }
    })
    listaProductos: Productos[]
}
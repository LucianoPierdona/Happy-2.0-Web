import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Orphanage from "./Orphanage";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Orphanage, (orphanage) => orphanage.creatorId, {
    cascade: ["insert", "update"],
  })
  @JoinColumn({ name: "creatorId" })
  orphanages: Orphanage[];
}

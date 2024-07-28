import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Link } from "./link.entity";

type Role = "USER" | "ADMIN";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true, unique: true })
  email?: string;

  @Column({ nullable: true })
  image?: string;

  @Column({ type: "enum", enum: ["USER", "ADMIN"], default: "USER" })
  role!: Role;

  @CreateDateColumn()
  createdDate!: Date;

  @UpdateDateColumn()
  updatedDate!: Date;

  @ManyToMany(() => Link, (link) => link.users)
  @JoinTable()
  links!: Promise<Link[]>;
}

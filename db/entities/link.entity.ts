import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Link {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  url!: string;

  @Column()
  imageUrl!: string;

  @Column()
  category!: string;

  @ManyToMany(() => User, (user) => user.links)
  users!: Promise<User[]>;
}

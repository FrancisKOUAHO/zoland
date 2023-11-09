import {DateTime} from 'luxon'
import {BaseModel, column, manyToMany, ManyToMany} from '@ioc:Adonis/Lucid/Orm'
import User from "App/Models/User";

export default class UserCharacter extends BaseModel {
  @column({isPrimary: true})
  public id: string

  @column()
  public user_id: string

  @column()
  public character_id: string

  @column()
  public game_room_id: string

  @column.dateTime()
  public chosen_at: DateTime

  @column.dateTime({autoCreate: true})
  public createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true})
  public updatedAt: DateTime

  @manyToMany(() => User, {
    pivotTable: 'user_characters'
  })
  public users: ManyToMany<typeof User>
}

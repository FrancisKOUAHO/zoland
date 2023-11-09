import {DateTime} from 'luxon'
import {BaseModel, column, HasMany, hasMany} from '@ioc:Adonis/Lucid/Orm'
import UserCharacter from "App/Models/UserCharacter";

export default class GameRoom extends BaseModel {
  @column({isPrimary: true})
  public id: string

  @column()
  public code: string

  @column()
  public start_time: DateTime

  @column()
  public end_time: DateTime

  @column()
  public status: string

  @column.dateTime({autoCreate: true})
  public createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true})
  public updatedAt: DateTime

  @hasMany(() => UserCharacter)
  public characters: HasMany<typeof UserCharacter>
}

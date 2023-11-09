import {DateTime} from 'luxon'
import {BaseModel, column} from '@ioc:Adonis/Lucid/Orm'

export default class UserAction extends BaseModel {
  @column({isPrimary: true})
  public id: string

  @column()
  public user_id: string

  @column()
  public action_id: string

  @column()
  public game_room_id: string

  @column()
  public voted_at: DateTime

  @column.dateTime({autoCreate: true})
  public createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true})
  public updatedAt: DateTime
}

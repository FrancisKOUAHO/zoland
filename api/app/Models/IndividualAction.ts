import {DateTime} from 'luxon'
import {BaseModel, column, ManyToMany, manyToMany, BelongsTo, belongsTo} from '@ioc:Adonis/Lucid/Orm'
import User from "App/Models/User";
import GameRoom from "App/Models/GameRoom";

export default class IndividualAction extends BaseModel {
  @column({isPrimary: true})
  public id: string

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public game_room_id: string

  @column()
  public vote: string

  @column.dateTime({autoCreate: true})
  public createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true})
  public updatedAt: DateTime

  @manyToMany(() => User, {
    pivotTable: 'user_actions'
  })
  public users: ManyToMany<typeof User>

  @belongsTo(() => GameRoom)
  public gameRoom: BelongsTo<typeof GameRoom>

}
